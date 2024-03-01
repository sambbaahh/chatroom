import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

interface Room {
  id: number;
  name: string;
  userCount: number;
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
  ],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css',
})
export class LobbyComponent {
  username: string = '';
  rooms: Room[] = [];

  constructor(
    private router: Router,
    private webSocketService: WebsocketService
  ) {
    this.username = localStorage.getItem('username') as string;
  }

  ngOnInit() {
    this.webSocketService.getMessages().subscribe({
      next: (paramRooms: any) => {
        this.rooms = [...paramRooms];
      },
      error: (err) => {
        console.error('WebSocket error:', err);
      },
    });
  }

  onNavigateToRoom(roomId: number) {
    console.log(roomId);

    this.router.navigate(['chat/1']);
  }
}
