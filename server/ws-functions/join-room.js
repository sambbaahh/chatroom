const joinRoom = (data, ws, rooms) => {
  const joinedRoom = rooms.get(Number(data.roomId));
  joinedRoom.users.push(ws);
  ws.send(JSON.stringify(joinedRoom.messages).toString());

  ws.currentRoomId = Number(data.roomId);
};

export default joinRoom;
