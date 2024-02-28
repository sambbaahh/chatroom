import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";

const NEW_ROOM = "new-room";
const JOIN = "join";
const MESSAGE = "message";

const wss = new WebSocketServer({ port: 3000 });
const rooms = new Map();

wss.on("connection", (ws) => {
  ws.on("error", console.error);
  ws.id = uuidv4();

  ws.on("message", function message(message) {
    const data = JSON.parse(message);

    switch (data.type) {
      case NEW_ROOM:
        createRoom(data, ws, rooms);
        break;
      case JOIN:
        joinRoom(data, ws, rooms);
        break;
      case MESSAGE:
        sendMessage(data, ws, rooms);
        break;

      default:
    }
  });
});
