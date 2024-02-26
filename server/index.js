import net from "net";
let clientConnections = [];

//create tcp server
const server = net.createServer((client) => {
  clientConnections.push(client);
  console.log("new connection: " + client.remoteAddress + ":" + client.remotePort)

  client.on("data", (data) => {
    console.log("data received");
    clientConnections.forEach((connection) => {
      if (client !== connection) {
        connection.write(data);
      }
    });
  });

  client.on("close", () => {
    console.log("pöö");
    // Remove closed client connection
    const index = clientConnections.indexOf(client);
    if (index !== -1) {
      clientConnections.splice(index, 1);
    }
  });

  client.on('error', (err) => {
    console.log('Connection error:', err.message);
  });
});


//listen port 3000
server.listen(3000, () => {
  console.log("Server started");
});
