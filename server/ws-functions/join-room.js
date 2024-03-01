const joinRoom = (data, ws, rooms) => {
  const joinedRoom = rooms.get(Number(data.roomId));
  joinedRoom.users.push(ws);

  joinedRoom.users.forEach(
    (user) =>
    user !== ws && user.send(JSON.stringify(`${data.username} joined room!`).toString())
  );

  ws.send(JSON.stringify(joinedRoom.messages).toString());

  ws.currentRoomId = Number(data.roomId);
};

export default joinRoom;
