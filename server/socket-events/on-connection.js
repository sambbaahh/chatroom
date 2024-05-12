import * as db from '../config/database.js';

const onConnection = async (socket) => {
  try {
    const rooms = await db.query('SELECT * FROM rooms ORDER BY name ASC');
    socket.emit('receive-rooms-on-join', rooms.rows);
  } catch (err) {
    console.log(err);
  }
};

export default onConnection;
