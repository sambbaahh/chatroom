import * as db from '../config/database.js';

const sendMessage = async (socket, content) => {
  socket.to(socket.roomId).emit('receive-message', {
    username: socket.username,
    content,
  });
  socket.emit('receive-message', {
    username: 'ME',
    content,
  });

  await db.query(
    'INSERT INTO messages (sender_id, room_id, content) VALUES ($1, $2, $3)',
    [socket.userId, socket.roomId, content]
  );
};

export default sendMessage;
