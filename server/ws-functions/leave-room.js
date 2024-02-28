const leaveRoom = (ws, rooms) => {
  const currentRoom = rooms.get(Number(ws.currentRoomId));

  //delete user's websocket from the users array
  currentRoom.users.filter((websocket) => websocket !== ws);
};
