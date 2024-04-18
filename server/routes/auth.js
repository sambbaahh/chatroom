import express from 'express';
import crypto from 'crypto';
import { genPassword, issueJWT } from '../helpers/authUtils.js';
import * as db from '../config/database.js';

const router = express.Router();

router.post('/login', (req, res, next) => {});

router.post('/register', (req, res, next) => {
  const { password, username } = req.body;
  const saltHashObject = genPassword(password);

  const hash = saltHashObject.hash;
  const salt = saltHashObject.salt;

  db.query(
    'INSERT INTO users(username, hash, salt) VALUES($1, $2, $3) RETURNING id',
    [username, hash, salt]
  )
    .then((result) => {
      const jwt = issueJWT(result.rows[0]);
      res.json({
        success: true,
        user: username,
        token: jwt.token,
        expiresIn: jwt.expires,
      });
    })
    .catch((err) => next(err));
});

export default router;
