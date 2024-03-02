import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormsModule } from '@angular/forms';
import { Room } from '../../services/websocket.service';

export enum RequestEnum {
  NEW = 'create-room',
  JOIN = 'join-room',
  MESSAGE = 'send-message',
  LEAVE = 'leave-room',
}

interface RoomCreation {
  type: RequestEnum.NEW;
  roomName: string;
}
interface RoomJoining {
  type: RequestEnum.JOIN;
  roomId: number;
  username: string;
}

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DividerModule,
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
  ],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css',
})
export class LobbyComponent {
  roomname: string = '';

  constructor(
    private router: Router,
    public webSocketService: WebsocketService
  ) {}

  joinRoom(roomId: number) {
    const joinRoom: RoomJoining = {
      type: RequestEnum.JOIN,
      roomId: roomId,
      username: this.webSocketService.username,
    };
    this.webSocketService.sendMessage(JSON.parse(JSON.stringify(joinRoom)));
    this.router.navigate(['chat', roomId]);
  }

  createRoom() {
    const newRoom: RoomCreation = {
      type: RequestEnum.NEW,
      roomName: this.roomname,
    };
    this.webSocketService.sendMessage(JSON.parse(JSON.stringify(newRoom)));
    this.roomname = '';
  }
}
