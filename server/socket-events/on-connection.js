import * as db from '../config/database.js';
import joinRoom from './join-room.js';

const onConnection = async (socket, io) => {
  try {
    const rooms = await db.query(
      'SELECT rooms.id AS id, rooms.name AS name, ARRAY_REMOVE(ARRAY_AGG(users.username), NULL) AS users' +
        ' FROM rooms LEFT JOIN room_users ON rooms.id = room_users.room_id LEFT JOIN users ON room_users.user_id = users.id' +
        ' GROUP BY rooms.id, rooms.name'
    );
    socket.emit('receive-rooms-on-join', rooms.rows);

    //if server was down, it's possible that user is still connected to the room
    const room = await db.query(
      'SELECT room_id AS room FROM room_users WHERE user_id = $1',
      [socket.userId]
    );

    if (room.rows[0]) {
      socket.roomId = room.rows[0].room;
      await joinRoom(socket, io, room.rows[0].room);
    }
  } catch (err) {
    console.log(err);
  }
};

export default onConnection;
