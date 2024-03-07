import notifyRoomsUpdate from "../helpers/notify-rooms-update.js";

const leaveRoom = (ws, rooms, allUsers) => {
  try {
    const currentRoom = rooms.get(Number(ws.currentRoomId));

    //delete user's websocket from the users array
    currentRoom.users = currentRoom.users.filter(
      (user) => user.userId !== ws.userId
    );
    ws.currentRoomId = null;

    //user count is decreased by one so we need to notify users
    notifyRoomsUpdate(allUsers, rooms);
  } catch (error) {
    console.log(error);
  }
};

export default leaveRoom;
