import * as db from '../config/database.js';

const joinRoom = async (socket, io, roomId) => {
  try {
    socket.join(roomId);
    socket.roomId = roomId;

    const messages = await db.query(
      "SELECT content, sended_at, CASE WHEN username = $1 THEN 'ME' ELSE username END FROM messages" +
        ' INNER JOIN users ON messages.sender_id = users.id WHERE room_id = $2 ORDER BY sended_at ASC',
      [socket.username, roomId]
    );

    socket.emit('receive-messages-on-join', messages.rows);

    await db.query(
      'UPDATE rooms SET users = array_append(users, $1) WHERE id = $2',
      [socket.username, roomId]
    );

    const joinMessage = `${socket.username} has joined the room`;

    io.to(socket.roomId).emit('receive-message', {
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
