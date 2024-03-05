import getRoomsArray from "./get-rooms-array.js";

const notifyRoomsUpdate = (allUsers, rooms) => {
  if (allUsers) {
    allUsers.forEach((user) => {
      user.send(JSON.stringify({ rooms: getRoomsArray(rooms) }));
    });
  }
};

export default notifyRoomsUpdate;
