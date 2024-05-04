import 'dotenv/config';
import express from 'express';
import configurePassport from './config/passport.js';
import passport from 'passport';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import authRouter from './routes/auth.js';
import handleSocketEvent from './socket-events/index.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

const httpServer = createServer(app);

configurePassport(passport);
app.use(passport.initialize());

app.use('/api', authRouter);

const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:5173' },
});

io.engine.use((req, res, next) => {
  const isHandshake = req._query.sid === undefined;
  if (isHandshake) {
    passport.authenticate('jwt', { session: false })(req, res, next);
  } else {
    next();
  }
});

io.on('connection', (socket) => {
  console.log(socket.id);
  handleSocketEvent(socket, io);
});

httpServer.listen(PORT, () => {
  console.log('Listening port ' + PORT);
});
