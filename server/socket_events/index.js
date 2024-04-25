const handleSocketEvent = (socket) => {
  socket.on('test', () => {
    console.log('pö');
    socket.emit('vuhvuh');
  });
};

export default handleSocketEvent;
