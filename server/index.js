import { WebSocketServer } from "ws";

const rooms = new Map();

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);

    wss.clients.forEach(
      (client) => client !== ws && client.send(Buffer.from(data).toString())
    );
  });
});
