const leaveRoom = (ws, rooms) => {
  const currentRoom = rooms.get(Number(ws.currentRoomId));

  //delete user's websocket from the users array
  currentRoom.users = currentRoom.users.filter(user => user.id !== ws.id);
  ws.currentRoomId = null;
};

export default leaveRoom