import net from "net";
const PORT = 3000;
const HOST = "127.0.0.1";
//get random free port
const LOCAL_PORT = 0;

//connect to server
const client = net.createConnection(
  { port: PORT, host: HOST, localPort: LOCAL_PORT },
  () => {
    process.stdin.on("data", (data) => {
      //console.log(Buffer.from(data).toString());
      if(Buffer.from(data).toString() === "close"){
        client.end()
      } else {
        client.write(data);
      }
    });
  }
);

client.on("data", (data) => {
  console.log("client received data:");
  console.log(Buffer.from(data).toString());
});
