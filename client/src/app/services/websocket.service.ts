import { Injectable, Input } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Room, ReceivedMessage, NewUser, RequestEnum } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private url: string = 'ws://localhost:3000';
  private subject$: WebSocketSubject<unknown>;

  private _username: string = '';
  private _userId: string = '';
  private _isLobbyInitialized: boolean = false;

  private _rooms: Room[] = [];
  private _messages: ReceivedMessage[] = [];
  private _roomId: number | null = null;
  private _roomName: string | null = null;
  private _isInRoom: boolean = false;

  constructor() {
    this.subject$ = webSocket(this.url);
    this.initializeWebSocket();
  }

  public initializeWebSocket() {
    this.subject$.asObservable().subscribe({
      next: (data: any) => {
        if (data.rooms) {
          if (!this.isLobbyInitialized) {
            this.rooms = [...data.rooms];
            this.isLobbyInitialized = true;
          } else {
            this.rooms = [...data.rooms];
          }
        } else if (data.messageHistory) {
          this.messages = data.messageHistory;
        } else if (data.newMessage) {
          this.messages = [...this._messages, data.newMessage];
        }
      },
      error: (err) => {
        console.error('WebSocket error:', err);
      },
    });
  }

  public initializeUser(): boolean {
    const storageUsername: string | null = localStorage.getItem('username');
    const storageUserId: string | null = localStorage.getItem('userId');
    if (storageUsername && storageUserId) {
      const existingUser: NewUser = {
        type: RequestEnum.NEW_USER,
        username: storageUsername as string,
        userId: storageUserId as string,
      };
      this.sendMessage(JSON.parse(JSON.stringify(existingUser)));
      this.username = storageUsername as string;
      this.userId = storageUserId as string;
      return true;
    } else {
      return false;
    }
  }

  public sendMessage(message: string) {
    this.subject$.next(message);
  }

  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }

  public get userId(): string {
    return this._userId;
  }
  public set userId(value: string) {
    this._userId = value;
  }

  public get isLobbyInitialized(): boolean {
    return this._isLobbyInitialized;
  }
  public set isLobbyInitialized(value: boolean) {
    this._isLobbyInitialized = value;
  }

  public get rooms(): Room[] {
    return this._rooms;
  }
  public set rooms(value: Room[]) {
    this._rooms = value;
  }

  public get messages(): ReceivedMessage[] {
    return this._messages;
  }
  public set messages(value: ReceivedMessage[]) {
    this._messages = value;
  }

  public get roomId(): number | null {
    return this._roomId;
  }
  public set roomId(value: number | null) {
    this._roomId = value;
  }

  public get roomName(): string | null {
    return this._roomName;
  }
  public set roomName(value: string | null) {
    this._roomName = value;
  }

  public get isInRoom(): boolean {
    return this._isInRoom;
  }
  public set isInRoom(value: boolean) {
    this._isInRoom = value;
  }
}
