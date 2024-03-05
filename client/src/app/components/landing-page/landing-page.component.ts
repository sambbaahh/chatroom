import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { NewUser, RequestEnum } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'landing-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  public newUsername: string = '';
  public newUserId: string = uuidv4();

  constructor(
    private router: Router,
    public webSocketService: WebsocketService
  ) {
    const storageUsername = localStorage.getItem('username');
    if (storageUsername) {
      this.newUsername = storageUsername;
    }
  }

  onSubmit(): void {
    const storageUsername = localStorage.getItem('username');
    const storageUserId = localStorage.getItem('userId');

    if (this.newUsername === storageUsername) {
      this.webSocketService.username = storageUsername as string;
      this.webSocketService.userId = storageUserId as string;
    } else {
      const newUser: NewUser = {
        type: RequestEnum.NEW_USER,
        username: this.newUsername,
        userId: this.newUserId,
      };

      this.webSocketService.sendMessage(JSON.parse(JSON.stringify(newUser)));
      localStorage.setItem('username', this.newUsername);
      localStorage.setItem('userId', this.newUserId);
    }

    this.router.navigate(['/lobby']);
  }
}
