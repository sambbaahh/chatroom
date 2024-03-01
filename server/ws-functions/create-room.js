import getRoomsArray from "../helpers/get-rooms-array.js";

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

  if(allUsers){
    allUsers.forEach((user) => {
      //user is not in the room at the moment, so we need to notify about the new room.
      if (!user.currentRoomId) {
        user.send(getRoomsArray(rooms))
      }
    });
  }
};

export default createRoom;
