import * as db from '../config/database.js';

const joinRoom = async (socket, roomId) => {
  socket.join(roomId);
  const messages = await db.query(
    'SELECT content, sended_at, username FROM messages INNER JOIN users ON messages.sender_id = users.id WHERE room_id = $1 ORDER BY sended_at ASC',
    [roomId]
  );

  socket.emit('receive-messages-on-join', messages.rows);

  await db.query(
    'UPDATE rooms SET users = array_append(users, $1) WHERE id = $2',
    [socket.userId, roomId]
  );
  socket.roomId = roomId;
};

export default joinRoom;
