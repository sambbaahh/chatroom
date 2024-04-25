import 'dotenv/config';
import express from 'express';
import configurePassport from './config/passport.js';
import passport from 'passport';
import { Server } from 'socket.io';

import authRouter from './routes/auth.js';
import handleSocketEvent from './socket_events/index.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const io = new Server(3001, {
  // options
});

configurePassport(passport);
app.use(passport.initialize());

app.use('/api', authRouter);

io.on(
  'connection',
  // passport.authenticate('jwt', { session: false }),
  (socket) => handleSocketEvent(socket)
);

app.listen(PORT, () => {
  console.log('Listening port ' + PORT);
});
