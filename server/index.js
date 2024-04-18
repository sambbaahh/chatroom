import 'dotenv/config';
import express from 'express';
import authRouter from './routes/auth.js';
import configurePassport from './config/passport.js';
import passport from 'passport';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

configurePassport(passport);
app.use(passport.initialize());

app.use('/api', authRouter);

app.listen(PORT, () => {
  console.log('Listening port ' + PORT);
});
