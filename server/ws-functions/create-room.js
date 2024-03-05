import notifyRoomsUpdate from "../helpers/notify-rooms-update.js";

const createRoom = (data, rooms, allUsers) => {
  let newRoomId = 1;

  if (rooms.size === 0) {
    rooms.set(newRoomId, {
      name: data.roomName,
      users: [],
      messages: [],
    });
  } else {
    newRoomId = Math.max(...rooms.keys()) + 1;
    rooms.set(newRoomId, {
      name: data.roomName,
      users: [],
      messages: [],
    });
  }

  //new room has been maden so we need to notify users
  notifyRoomsUpdate(allUsers, rooms);
};

export default createRoom;
