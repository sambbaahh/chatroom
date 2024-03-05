const sendMessage = (data, ws, rooms) => {
  try {
    const joinedRoom = rooms.get(Number(data.roomId));
    const newMessage = {
      content: data.content,
      timestamp: data.timestamp,
      username: ws.username,
      userId: ws.userId,
    };
    joinedRoom.messages.push(newMessage);

    joinedRoom.users.forEach((user) =>
      user.send(JSON.stringify({ newMessage: newMessage }))
    );
  } catch (error) {
    console.log(error);
  }
};

export default sendMessage;
