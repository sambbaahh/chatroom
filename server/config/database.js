import pg from 'pg';
import { genPassword } from '../helpers/authUtils.js';

const { Pool, Client } = pg;

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

export const query = async (text, params, callback) => {
  if (callback) {
    return pool.query(text, params, callback);
  }

  return pool.query(text, params);
};

export const setupDatabase = async () => {
  const client = new Client({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: 'postgres', //connect to the postgresql default database
  });

  await client.connect();

  const res = await client.query(
    `SELECT datname FROM pg_catalog.pg_database WHERE datname = '${process.env.PGDATABASE}'`
  );

  if (res.rowCount === 0) {
    //create database and create tables
    await client.query(`CREATE DATABASE ${process.env.PGDATABASE}`);
    await client.end();

    //use pool to connect to the new database
    await pool.query(tableCreateScript);

    //add admin user
    const adminPassword = genPassword(process.env.ADMINPASSWORD || 'password'); // default password is 'password'
    const adminName = 'ADMIN';
    await pool.query(
      'INSERT INTO users(username, hash, salt) VALUES($1, $2, $3)',
      [adminName, adminPassword.hash, adminPassword.salt]
    );

    console.log(`Created database: ${process.env.PGDATABASE}.`);
  } else {
    console.log(`Database ${process.env.PGDATABASE} already exists.`);
  }
};

const tableCreateScript = `
BEGIN;

CREATE TABLE IF NOT EXISTS public.rooms
(
    id serial NOT NULL,
    name text NOT NULL,
    creator_id serial NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.users
(
    id serial NOT NULL,
    username text NOT NULL,
    hash text NOT NULL,
    salt text NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT name UNIQUE (username)
);

CREATE TABLE IF NOT EXISTS public.messages
(
    id serial NOT NULL,
    content text NOT NULL,
    sended_at timestamp with time zone NOT NULL DEFAULT NOW(),
    sender_id serial NOT NULL,
    room_id serial NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.room_users
(
    room_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (room_id, user_id)
);

ALTER TABLE IF EXISTS public.rooms
    ADD FOREIGN KEY (creator_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.messages
    ADD FOREIGN KEY (room_id)
    REFERENCES public.rooms (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.messages
    ADD FOREIGN KEY (sender_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.room_users
    ADD FOREIGN KEY (room_id)
    REFERENCES public.rooms(id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE IF EXISTS public.room_users
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users(id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

END;
`;
