const newUser = (data, ws) => {
  ws.userId = data.userId;
  ws.username = data.username;
};

export default newUser;
