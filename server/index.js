import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
import createRoom from "./ws-functions/create-room.js";
import joinRoom from "./ws-functions/join-room.js";
import sendMessage from "./ws-functions/send-message.js";
import leaveRoom from "./ws-functions/leave-room.js";

const NEW = "new-room";
const JOIN = "join-room";
const MESSAGE = "new-message";
const LEAVE = "leave-room";

const wss = new WebSocketServer({ port: 3000 });
const rooms = new Map();

wss.on("connection", (ws) => {
  ws.on("error", console.error);
  ws.id = uuidv4();

  ws.send(
    JSON.stringify(
      Array.from(rooms, ([key, value]) => ({
        id: key,
        name: value.name,
        userCount: value.users.length,
      }))
    )
  );

  ws.on("message", function message(message) {
    const data = JSON.parse(message);

    switch (data.type) {
      case NEW:
        createRoom(data, ws, rooms);
        break;
      case JOIN:
        joinRoom(data, ws, rooms);
        break;
      case MESSAGE:
        sendMessage(data, ws, rooms);
        break;
      case LEAVE:
        leaveRoom(ws, rooms)
        break;
      default:
        console.log("Case not found");
        break;
    }
  });

  ws.on("error", (error) => {
    console.log("Error happened");
    console.log(error);
  })
});

wss.on("close", (ws) => {

})
