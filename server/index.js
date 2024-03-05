import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
import createRoom from "./ws-functions/create-room.js";
import joinRoom from "./ws-functions/join-room.js";
import sendMessage from "./ws-functions/send-message.js";
import leaveRoom from "./ws-functions/leave-room.js";
import getRoomsArray from "./helpers/get-rooms-array.js";
import newUser from "./ws-functions/new-user.js";

const NEW_USER = "new-user";
const NEW_ROOM = "create-room";
const JOIN = "join-room";
const MESSAGE = "send-message";
const LEAVE = "leave-room";

const wss = new WebSocketServer({ port: 3000 });

//structure:
//(1, {name: room1, users: [socket1, socket2], messages: []})
const rooms = new Map();

wss.on("connection", (ws) => {
  try {
    console.log("New connection!");
    ws.userId = uuidv4();

    ws.send(JSON.stringify({ rooms: getRoomsArray(rooms) }));

    ws.on("message", function message(message) {
      const data = JSON.parse(message);
      console.log(data);

      switch (data.type) {
        case NEW_USER:
          newUser(data, ws);
          break;
        case NEW_ROOM:
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

    ws.on("error", () => {
      console.log("Error happened");
      if (ws.currentRoomId) {
        leaveRoom(ws, rooms);
      }
    });
    ws.on("close", () => {
      console.log("Connection closed!");
      if (ws.currentRoomId) {
        leaveRoom(ws, rooms);
      }
    });
  } catch (error) {
    console.log(error);
  }
});
