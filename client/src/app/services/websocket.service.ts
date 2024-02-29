import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private url: string = 'ws://localhost:3000';
  private subject$: WebSocketSubject<unknown>;

  constructor() {
    this.subject$ = webSocket(this.url);
  }

  sendMessage(message: string) {
    this.subject$.next(message);
  }

  getMessages() {
    return this.subject$.asObservable();
  }
}
