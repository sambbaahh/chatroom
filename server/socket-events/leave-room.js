import * as db from '../config/database.js';

const leaveRoom = async (socket, io) => {
  try {
    if (!socket.roomId) return;

    socket.leave(socket.roomId);

    const modifiedRoom = await db.query(
      'UPDATE rooms SET users = array_remove(users, $1) WHERE id = $2 RETURNING *',
      [socket.username, socket.roomId]
    );
    io.emit('room-modified', modifiedRoom.rows[0]);

    const leaveMessage = `${socket.username} has left the room`;
    io.to(socket.roomId).emit('receive-message', {
      username: 'ADMIN',
      content: leaveMessage,
    });
    await db.query(
      'INSERT INTO messages (sender_id, room_id, content) VALUES ($1, $2, $3)',
      [1, socket.roomId, leaveMessage] //'admin' user has id of 1
    );
  } catch (err) {
    console.log(err);
  }
};

export default leaveRoom;
