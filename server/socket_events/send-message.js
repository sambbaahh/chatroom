import * as db from '../config/database.js';

const sendMessage = async (socket, content) => {
  socket
    .to(socket.request.roomId)
    .emit('receive-message', { sender: socket.request.userId, content });

  await db.query(
    'INSERT INTO messages (sender_id, room_id, content) VALUES ($1, $2, $3)',
    [socket.request.userId, socket.request.roomId, content]
  );
};

export default sendMessage;
