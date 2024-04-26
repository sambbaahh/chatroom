import * as db from '../config/database.js';

const joinRoom = async (socket, roomId) => {
  socket.join(roomId);
  const messages = await db.query('SELECT * FROM messages WHERE room_id = $1', [
    roomId,
  ]);

  socket.emit('receive-message', messages.rows);

  await db.query(
    'UPDATE rooms SET users = array_append(users, $1) WHERE id = $2',
    [socket.request.userId, roomId]
  );
  socket.request.roomId = roomId;
};

export default joinRoom;
