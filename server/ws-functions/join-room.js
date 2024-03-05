import notifyRoomsUpdate from "../helpers/notify-rooms-update.js";

const joinRoom = (data, ws, rooms, allUsers) => {
  const joinedRoom = rooms.get(Number(data.roomId));
  joinedRoom.users.push(ws);

  // joinedRoom.users.forEach(
  //   (user) =>
  //     user.userId !== ws.userId &&
  //     user.send(
  //       JSON.stringify({
  //         content: `${ws.username} joined room!`,
  //       }).toString()
  //     )
  // );

  ws.send(JSON.stringify({ messageHistory: joinedRoom.messages }));

  //user count is increased by one so we need to notify users
  notifyRoomsUpdate(allUsers, rooms);

  ws.currentRoomId = Number(data.roomId);
};

export default joinRoom;
