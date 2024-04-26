import createRoom from './create-room.js';
import joinRoom from './join-room.js';
import leaveRoom from './leave-room.js';
import sendMessage from './send-message.js';

const handleSocketEvent = (socket) => {
  socket.on('join-room', async (message) => await joinRoom(socket, message));

  socket.on(
    'create-room',
    async (roomName) => await createRoom(socket, roomName)
  );

  socket.on('leave-room', async () => await leaveRoom(socket));

  socket.on(
    'send-message',
    async (content) => await sendMessage(socket, content)
  );

  socket.on('disconnect', async () => await leaveRoom(socket));
};

export default handleSocketEvent;
