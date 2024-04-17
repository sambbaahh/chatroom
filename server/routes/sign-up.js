import express from "express";
import crypto from "crypto";
import * as db from "../database/index.js";

const router = express.Router();

router.post("/", express.json(), function (req, res, next) {
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      console.log(hashedPassword.toString("base64"));
      db.query(
        "INSERT INTO users (name, password, salt) VALUES ($1, $2, $3)",
        [req.body.username, hashedPassword.toString("base64"), salt],
        function (err) {
          if (err) {
            return next(err);
          }
          var user = {
            id: this.lastID,
            username: req.body.username,
          };
          req.login(user, function (err) {
            if (err) {
              return next(err);
            }
            res.redirect("/");
          });
        }
      );
    }
  );
});

export default router;
