import getRoomsArray from "../helpers/get-rooms-array.js";

const createRoom = (data, ws, rooms, allUsers) => {
  let newRoomId = 1;

  if (rooms.size === 0) {
    rooms.set(newRoomId, {
      name: data.roomName,
      users: [ws],
      messages: [],
    });
  } else {
    newRoomId = Math.max(...rooms.keys()) + 1;
    rooms.set(newRoomId, {
      name: data.roomName,
      users: [ws],
      messages: [],
    });
  }

  if(allUsers){
    allUsers.forEach((user) => {
      //user is not in the room at the moment, so we need to notify about the new room.
      if (!user.currentRoomId) {
        user.send(getRoomsArray(rooms))
      }
    });
  }

  ws.currentRoomId = newRoomId;
};

export default createRoom;
