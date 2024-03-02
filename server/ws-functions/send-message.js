const sendMessage = (data, rooms) => {
  try {
    const joinedRoom = rooms.get(Number(data.roomId));
    const newMessage = {
        content: data.content,
        timestamp: data.timestamp,
        username: data.username,
        userId: data.userId,
    };
    joinedRoom.messages.push(newMessage);

    joinedRoom.users.forEach((user) =>
      user.send(JSON.stringify({newMessage: newMessage}))
    );

  } catch (error) {
    console.log(error);
  }
};

export default sendMessage;
