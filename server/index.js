import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";

const rooms = new Map();

const NEW_ROOM = "new-room";
const JOIN = "join";
const MESSAGE = "message";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (ws) => {
  ws.on("error", console.error);
  ws.id = uuidv4();

  ws.on("message", function message(message) {
    const data = JSON.parse(message);

    switch (data.type) {
      case NEW_ROOM:
        createRoom(data, ws);
        break;
      case JOIN:
        joinRoom(data);
      case MESSAGE:
        wss.clients.forEach(
          (client) => client !== ws && client.send(Buffer.from(data).toString())
        );
        break;

      default:
    }
  });
});

const createRoom = (data, ws) => {
  if (rooms.size === 0) {
    rooms.set(1, {
      name: data.name,
      users: [ws],
      messages: [],
    });
  } else {
    rooms.set(Math.max(...rooms.keys()) + 1, {
      name: data.name,
      users: [ws],
      messages: [],
    });
  }
  console.log(rooms);
};

const joinRoom = () => {
  
}
