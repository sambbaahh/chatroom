import * as db from '../config/database.js';

const joinRoom = async (socket, roomId) => {
  socket.join(roomId);
  const messages = await db.query('SELECT * FROM messages WHERE room_id = $1', [
    roomId,
  ]);
  socket.emit('receive-message', messages.rows);
  socket.request.roomId = roomId;
};

export default joinRoom;
