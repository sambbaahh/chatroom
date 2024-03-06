import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormsModule } from '@angular/forms';
import { RoomJoining, RequestEnum, RoomCreation } from '../../interfaces';

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
  public newRoomName: string = '';

  constructor(
    private router: Router,
    public webSocketService: WebsocketService
  ) {}

  joinRoom(roomId: number, roomName: string) {
    const joinRoom: RoomJoining = {
      type: RequestEnum.JOIN,
      roomId: roomId,
      username: this.webSocketService.username,
    };
    this.webSocketService.sendMessage(JSON.parse(JSON.stringify(joinRoom)));
    this.router.navigate(['room', roomId, roomName]);
    this.webSocketService.isInRoom = true;
  }

  createRoom() {
    const newRoom: RoomCreation = {
      type: RequestEnum.NEW_ROOM,
      roomName: this.newRoomName,
    };
    this.webSocketService.sendMessage(JSON.parse(JSON.stringify(newRoom)));
    this.newRoomName = '';
  }
}
