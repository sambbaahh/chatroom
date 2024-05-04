import createRoom from './create-room.js';
import joinRoom from './join-room.js';
import leaveRoom from './leave-room.js';
import sendMessage from './send-message.js';
import onConnection from './on-connection.js';

const handleSocketEvent = (socket, io) => {
  onConnection(socket);

  socket.userId = socket.request.user.rows[0].id;
  socket.username = socket.request.user.rows[0].username;

  socket.on('join-room', (message) => joinRoom(socket, io, message));

  socket.on('create-room', (roomName) => createRoom(socket, io, roomName));

  socket.on('send-message', (content) => sendMessage(socket, content));

  socket.on('leave-room', () => leaveRoom(socket, io));
  socket.on('disconnect', () => leaveRoom(socket, io));
};

export default handleSocketEvent;
