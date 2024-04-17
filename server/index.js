import 'dotenv/config'
import express from "express";
import signUp from "./routes/sign-up.js"

const app = express();
app.use("/sign-up", signUp)

app.listen(3000, () => {
  console.log("Listening port 3000");
})







