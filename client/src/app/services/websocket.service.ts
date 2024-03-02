import { Injectable, Input } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private url: string = 'ws://localhost:3000';
  private subject$: WebSocketSubject<unknown>;
  private _username: string = '';
  private _userId: number = -1;
  private _isLobbyInitialized: boolean = false;

  constructor() {
    this.subject$ = webSocket(this.url);
  }

  @Input()
  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }

  @Input()
  public get userId(): number {
    return this._userId;
  }
  public set userId(value: number) {
    this._userId = value;
  }

  @Input()
  public get isLobbyInitialized(): boolean {
    return this._isLobbyInitialized;
  }
  public set isLobbyInitialized(value: boolean) {
    this._isLobbyInitialized = value;
  }

  sendMessage(message: string) {
    this.subject$.next(message);
  }

  getMessages() {
    return this.subject$.asObservable();
  }
}
