import * as db from '../config/database.js';
import leaveRoom from './leave-room.js';

const joinRoom = async (socket, io, roomId) => {
  try {
    //already in room so user has to disconnect first
    if (socket.roomId) {
      await leaveRoom(socket, io);
    }
    socket.join(roomId);
    socket.roomId = roomId;

    await db.query(
      'INSERT INTO room_users (room_id, user_id) VALUES ($1, $2)',
      [socket.roomId, socket.userId]
    );

    const room = await db.query(
      'SELECT rooms.id AS id, rooms.name AS name, ARRAY_REMOVE(ARRAY_AGG(users.username), NULL) AS users' +
        ' FROM rooms LEFT JOIN room_users ON rooms.id = room_users.room_id LEFT JOIN users ON room_users.user_id = users.id' +
        ' WHERE rooms.id = $1 ' +
        ' GROUP BY rooms.id, rooms.name',
      [socket.roomId]
    );

    socket.emit('room-joined', room.rows[0]);
    io.emit('room-updated', room.rows[0]);

    const messages = await db.query(
      "SELECT content, sended_at, CASE WHEN username = $1 THEN 'ME' ELSE username END FROM messages" +
        ' INNER JOIN users ON messages.sender_id = users.id WHERE room_id = $2 ORDER BY sended_at ASC',
      [socket.username, roomId]
    );
    socket.emit('messages-received-on-join', messages.rows);

    const joinMessage = `${socket.username} has joined the room`;
    io.to(socket.roomId).emit('message-received', {
      username: 'ADMIN',
      content: joinMessage,
    });
    await db.query(
      'INSERT INTO messages (sender_id, room_id, content) VALUES ($1, $2, $3)',
      [1, socket.roomId, joinMessage] //'admin' user has id of 1
    );
  } catch (err) {
    console.log(err);
  }
};

export default joinRoom;
