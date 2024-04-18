import fs from 'fs';
import path from 'path';
import passportJwt from 'passport-jwt';
import * as db from './database.js';
import { log } from 'console';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const __dirname = import.meta.dirname;

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf-8');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

const configurePassport = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      db.query(
        'SELECT * FROM users WHERE id = $1',
        [jwt_payload.sub],
        (err, user) => {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        }
      );
    })
  );
};

export default configurePassport;
