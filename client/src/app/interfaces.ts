export enum RequestEnum {
  NEW_USER = 'new-user',
  NEW_ROOM = 'create-room',
  JOIN = 'join-room',
  MESSAGE = 'send-message',
  LEAVE = 'leave-room',
}

export interface NewUser {
  type: RequestEnum.NEW_USER;
  userId: string;
  username: string;
}

export interface NewMessage {
  type: RequestEnum.MESSAGE;
  content: string;
  timestamp: string;
  roomId: number;
}
export interface ReceivedMessage extends NewMessage {
  userId: string;
  username: string;
}

export interface Room {
  id: number;
  name: string;
  userCount: number;
}
export interface RoomCreation {
  type: RequestEnum.NEW_ROOM;
  roomName: string;
}
export interface RoomJoining {
  type: RequestEnum.JOIN;
  roomId: number;
  username: string;
}
