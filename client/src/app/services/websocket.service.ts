import { Injectable, Input } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

export interface Room {
  id: number;
  name: string;
  userCount: number;
}

export interface Message {
  content: string;
  timestamp: string;
  roomId: number;
  userId: string;
  username: string;
}

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
  private _messages: Message[] = [];
  private _roomId: number | null = null;
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
            this.userId = data.userId;
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

  public sendMessage(message: string) {
    this.subject$.next(message);
  }

  @Input()
  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }

  @Input()
  public get userId(): string {
    return this._userId;
  }
  public set userId(value: string) {
    this._userId = value;
  }

  @Input()
  public get isLobbyInitialized(): boolean {
    return this._isLobbyInitialized;
  }
  public set isLobbyInitialized(value: boolean) {
    this._isLobbyInitialized = value;
  }

  @Input()
  public get rooms(): Room[] {
    return this._rooms;
  }
  public set rooms(value: Room[]) {
    this._rooms = value;
  }

  @Input()
  public get messages(): Message[] {
    return this._messages;
  }
  public set messages(value: Message[]) {
    this._messages = value;
  }

  @Input()
  public get roomId(): number | null {
    return this._roomId;
  }
  public set roomId(value: number | null) {
    this._roomId = value;
  }

  @Input()
  public get isInRoom(): boolean {
    return this._isInRoom;
  }
  public set isInRoom(value: boolean) {
    this._isInRoom = value;
  }
}
