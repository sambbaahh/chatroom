const newUser = (data, ws) => {
  try {
    ws.userId = data.userId;
    ws.username = data.username;
  } catch (error) {
    console.log(error);
  }
};

export default newUser;
