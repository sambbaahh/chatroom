import * as db from '../config/database.js';
import leaveRoom from './leave-room.js';

const joinRoom = async (socket, io, roomId) => {
  try {
    if (socket.roomId === roomId) return;

    if (socket.roomId) {
      await leaveRoom(socket, io);
    }

    socket.join(roomId);
    socket.roomId = roomId;

    socket.emit('room-joined', roomId);

    const messages = await db.query(
      "SELECT content, sended_at, CASE WHEN username = $1 THEN 'ME' ELSE username END FROM messages" +
        ' INNER JOIN users ON messages.sender_id = users.id WHERE room_id = $2 ORDER BY sended_at ASC',
      [socket.username, roomId]
    );

    socket.emit('messages-received-on-join', messages.rows);

    const modifiedRoom = await db.query(
      'UPDATE rooms SET users = array_append(users, $1) WHERE id = $2 RETURNING *',
      [socket.username, roomId]
    );
    io.emit('room-modified', modifiedRoom.rows[0]);

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
