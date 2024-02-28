const createRoom = (data, ws, rooms) => {
  if (rooms.size === 0) {
    rooms.set(1, {
      name: data.roomName,
      clients: [ws],
      messages: [],
    });
  } else {
    rooms.set(Math.max(...rooms.keys()) + 1, {
      name: data.roomName,
      clients: [ws],
      messages: [],
    });
  }
};

export default createRoom;
