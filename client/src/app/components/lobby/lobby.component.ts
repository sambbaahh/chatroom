import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css',
})
export class LobbyComponent {
  username: string = '';

  constructor(
    private router: Router,
    private webSocketService: WebsocketService
  ) {
    this.username = localStorage.getItem('username') as string;
    webSocketService.sendMessage('miau');
  }

  ngOnInit() {
    this.webSocketService.getMessages().subscribe({
      next: (message) => {
        console.log(message);
      },
      error: (err) => {
        console.error('WebSocket error:', err);
      },
      complete: () => {
        console.log('WebSocket connection closed.');
      },
    });
  }
}
