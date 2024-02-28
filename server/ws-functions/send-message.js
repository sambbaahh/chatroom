const sendMessage = (data, ws, rooms) => {
  try {
    const joinedRoom = rooms.get(Number(data.roomId));
    const newMessage = {
      message: data.message,
      sender: ws.id,
    };
    joinedRoom.messages.push(newMessage);

    joinedRoom.users.forEach(
      (user) =>
      user !== ws && user.send(JSON.stringify(newMessage).toString())
    );
  } catch (error) {
    console.log(error);
  }
};

export default sendMessage;
