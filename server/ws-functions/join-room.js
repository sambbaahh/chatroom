import notifyRoomsUpdate from "../helpers/notify-rooms-update.js";

const joinRoom = (data, ws, rooms, allUsers) => {
  try {
    const joinedRoom = rooms.get(Number(data.roomId));
    joinedRoom.users.push(ws);

    ws.send(JSON.stringify({ messageHistory: joinedRoom.messages }));
    ws.currentRoomId = Number(data.roomId);

    //user count is increased by one so we need to notify users
    notifyRoomsUpdate(allUsers, rooms);
  } catch (error) {
    console.log(error);
  }
};

export default joinRoom;
