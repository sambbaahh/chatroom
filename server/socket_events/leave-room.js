import * as db from '../config/database.js';

const leaveRoom = async (socket, io) => {
  try {
    socket.leave(socket.roomId);

    const modifiedRoom = await db.query(
      'UPDATE rooms SET users = array_remove(users, $1) WHERE id = $2 RETURNING *',
      [socket.username, socket.roomId]
    );

    io.emit('room-modified', modifiedRoom.rows[0]);
  } catch (err) {
    console.log(err);
  }
};

export default leaveRoom;
