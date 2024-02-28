const joinRoom = (data, ws, rooms) => {
  const joinedRoom = rooms.get(Number(data.roomId));
  joinedRoom.clients.push(ws);
  ws.send(JSON.stringify(joinedRoom.messages).toString());
};

export default joinRoom;
