import * as db from '../config/database.js';

const onConnection = async (socket) => {
  const rooms = await db.query('SELECT * FROM rooms');
  socket.emit('receive-rooms-on-join', rooms.rows);
};

export default onConnection;
