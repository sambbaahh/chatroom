const createRoom = (data, ws, rooms) => {
  let newRoomId = 1;

  if (rooms.size === 0) {
    rooms.set(newRoomId, {
      name: data.roomName,
      clients: [ws],
      messages: [],
    });
  } else {
    newRoomId = Math.max(...rooms.keys()) + 1;
    rooms.set(newRoomId, {
      name: data.roomName,
      clients: [ws],
      messages: [],
    });
  }

  ws.currentRoomId = newRoomId;
};

export default createRoom;
