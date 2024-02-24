import net from "net";
let socketConnections = [];

//create tcp server
const server = net.createServer((socket) => {
  socketConnections.push(socket);

  socket.on("data", data => {
    socketConnections.forEach(connection => {
      if(socket !== connection){
        connection.write(data)
      }
    });
  })

  socket.on("close", () => {
    // Remove closed socket connection
    const index = socketConnections.indexOf(socket);
    if (index !== -1) {
      socketConnections.splice(index, 1);
    }
  });
  
});


//listen port 3000
server.listen(3000, () => {
  console.log("Server started");
})