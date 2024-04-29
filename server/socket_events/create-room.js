import * as db from '../config/database.js';
import joinRoom from './join-room.js';

const createRoom = async (socket, roomName) => {
  const createdRoom = await db.query(
    'INSERT INTO rooms (name, creator_id) VALUES ($1, $2) RETURNING *',
    [roomName, socket.userId]
  );
  socket.broadcast.emit('room-created', createdRoom.rows[0]);
  await joinRoom(socket, createdRoom.rows[0].id);
};

export default createRoom;
