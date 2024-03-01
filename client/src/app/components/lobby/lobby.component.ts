import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { Observable, Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

interface Room {
  id: number;
  name: string;
  userCount: number;
}

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [ButtonModule, DividerModule],
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

  onNavigateToRoom() {
    this.router.navigate(['chat/1']);
  }
}
