import * as db from '../config/database.js';

const joinRoom = async (socket, roomId) => {
  try {
    socket.join(roomId);

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

    socket.roomId = roomId;
  } catch (err) {
    console.log(err);
  }
};

export default joinRoom;
