import 'dotenv/config';
import * as path from 'path';
import express from 'express';
import passport from 'passport';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import authRouter from './routes/auth.js';
import handleSocketEvent from './socket-events/index.js';
import configurePassport from './config/passport.js';
import { setupDatabase } from './config/database.js';
import configureSocketIo from './config/socket-io.js';

setupDatabase();

const PORT = process.env.PORT || 3000;
const __dirname = import.meta.dirname;

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

configureSocketIo(io, passport);

io.on('connection', (socket) => handleSocketEvent(socket, io));

app.use('/assets', express.static(path.join(__dirname, './dist/assets')));
app.get('*', function (req, res) {
  res.sendFile('index.html', {
    root: path.join(__dirname, './dist'),
  });
});

httpServer.listen(PORT, () => {
  console.log('Listening port ' + PORT);
});
