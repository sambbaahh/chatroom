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
    async function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      console.log(hashedPassword.toString("base64"));
      db.query(
        "INSERT INTO users(name, password, salt) VALUES ($1, $2, $3) RETURNING id",
        [req.body.name, hashedPassword.toString("base64"), salt.toString("base64")],
        function (err, queryData) {
          if (err) {
            return next(err);
          }
          var user = {
            id: queryData.rows[0].id,
            username: req.body.name,
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
