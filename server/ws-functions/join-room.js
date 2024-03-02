const joinRoom = (data, ws, rooms) => {
  const joinedRoom = rooms.get(Number(data.roomId));
  joinedRoom.users.push(ws);

  // joinedRoom.users.forEach(
  //   (user) =>
  //     user !== ws &&
  //     user.send(JSON.stringify({newMessage:`${data.username} joined room!`}).toString())
  // );

  ws.send(JSON.stringify({ messageHistory: joinedRoom.messages }));

  ws.currentRoomId = Number(data.roomId);
};

export default joinRoom;
