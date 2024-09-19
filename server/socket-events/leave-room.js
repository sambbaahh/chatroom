import * as db from '../config/database.js';

const leaveRoom = async (socket, io) => {
  try {
    if (!socket.roomId) return;

    socket.emit('room-left');

    await db.query('DELETE FROM room_users * WHERE room_users.user_id = $1', [
      socket.userId,
    ]);

    const room = await db.query(
      'SELECT rooms.id AS id, rooms.name AS name, ARRAY_REMOVE(ARRAY_AGG(users.username), NULL) AS users' +
        ' FROM rooms LEFT JOIN room_users ON rooms.id = room_users.room_id LEFT JOIN users ON room_users.user_id = users.id' +
        ' WHERE rooms.id = $1' +
        ' GROUP BY rooms.id, rooms.name',
      [socket.roomId]
    );

    io.emit('room-updated', room.rows[0]);

    const leaveMessage = `${socket.username} has left the room`;
    io.to(socket.roomId).emit('message-received', {
      username: 'ADMIN',
      content: leaveMessage,
    });
    await db.query(
      'INSERT INTO messages (sender_id, room_id, content) VALUES ($1, $2, $3)',
      [1, socket.roomId, leaveMessage] //'admin' user has id of 1
    );

    socket.leave(socket.roomId);
    socket.roomId = undefined;
  } catch (err) {
    console.log(err);
  }
};

export default leaveRoom;
