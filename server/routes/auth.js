import express from 'express';
import { genPassword, issueJWT, validPassword } from '../helpers/authUtils.js';
import passport from 'passport';
import * as db from '../config/database.js';

const router = express.Router();

router.get(
  '/test-jwt',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.status(200).send('it works, congratulations!');
  }
);

router.post('/login', (req, res, next) => {
  const { password, username } = req.body;
  db.query('SELECT * FROM users WHERE username = $1', [username]).then(
    (user) => {
      const userObject = user.rows[0];
      if (!userObject) {
        return res.status(401).json({ success: false, msg: 'User not found' });
      }
      const hash = userObject.hash;
      const salt = userObject.salt;

      const isValidUser = validPassword(password, hash, salt);

      if (isValidUser) {
        const tokenObject = issueJWT(userObject);
        return res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        return res
          .status(401)
          .json({ success: false, msg: 'The given password is invalid' });
      }
    }
  );
});

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
