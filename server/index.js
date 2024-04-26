import 'dotenv/config';
import express from 'express';
import configurePassport from './config/passport.js';
import passport from 'passport';
import { createServer } from 'http';
import { Server } from 'socket.io';

import authRouter from './routes/auth.js';
import handleSocketEvent from './socket_events/index.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const httpServer = createServer(app);

configurePassport(passport);
app.use(passport.initialize());

app.use('/api', authRouter);

const io = new Server(httpServer);
io.on('connection', (socket) => {
  socket.request.userId = 1;
  handleSocketEvent(socket);
});

httpServer.listen(PORT, () => {
  console.log('Listening port ' + PORT);
});
