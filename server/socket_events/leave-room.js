import * as db from '../config/database.js';

const leaveRoom = async (socket) => {
  socket.leave(socket.roomId);

  const modifiedRoom = await db.query(
    'UPDATE rooms SET users = array_remove(users, $1) WHERE id = $2 RETURNING *',
    [socket.userId, socket.roomId]
  );

  socket.broadcast.emit('room-modified', modifiedRoom.rows[0]);
};

export default leaveRoom;