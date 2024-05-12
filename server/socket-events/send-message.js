import * as db from '../config/database.js';

const sendMessage = async (socket, content) => {
  try {
    socket.to(socket.roomId).emit('message-received', {
      username: socket.username,
      content,
    });

    socket.emit('message-received', {
      username: 'ME',
      content,
    });

    await db.query(
      'INSERT INTO messages (sender_id, room_id, content) VALUES ($1, $2, $3)',
      [socket.userId, socket.roomId, content]
    );
  } catch (err) {
    console.log(err);
  }
};

export default sendMessage;
