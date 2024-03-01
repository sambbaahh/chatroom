import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
import createRoom from "./ws-functions/create-room.js";
import joinRoom from "./ws-functions/join-room.js";
import sendMessage from "./ws-functions/send-message.js";
import leaveRoom from "./ws-functions/leave-room.js";
import getRoomsArray from "./helpers/get-rooms-array.js";

const NEW = "create-room";
const JOIN = "join-room";
const MESSAGE = "send-message";
const LEAVE = "leave-room";

const wss = new WebSocketServer({ port: 3000 });

//structure:
//(1, {name: room1, users: [socket1, socket2], messages: []})
const rooms = new Map();

wss.on("connection", (ws) => {
  console.log("New connection!");
  ws.id = uuidv4();

  ws.send(getRoomsArray(rooms));

  ws.on("message", function message(message) {
    const data = JSON.parse(message);

    switch (data.type) {
      case NEW:
        createRoom(data, rooms, wss.clients);
        break;
      case JOIN:
        joinRoom(data, ws, rooms);
        break;
      case MESSAGE:
        sendMessage(data, ws, rooms);
        break;
      case LEAVE:
        leaveRoom(ws, rooms);
        break;
      default:
        console.log("Case not found");
        break;
    }
  });

  ws.on("error", (error) => {
    console.log("Error happened");
    console.log(error);
  });
  ws.on("close", () => {
    console.log("Connection closed!");
  });
});
