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
  private storageUsername: string | null = localStorage.getItem('username');
  private storageUserId: string | null = localStorage.getItem('userId');

  constructor(
    private router: Router,
    public webSocketService: WebsocketService
  ) {
    if (this.storageUsername) {
      this.newUsername = this.storageUsername;
    }
  }

  onSubmit(): void {
    if (this.newUsername === this.storageUsername) {
      const existingUser: NewUser = {
        type: RequestEnum.NEW_USER,
        username: this.storageUsername as string,
        userId: this.storageUserId as string,
      };
      this.webSocketService.sendMessage(
        JSON.parse(JSON.stringify(existingUser))
      );
      this.webSocketService.username = this.storageUsername as string;
      this.webSocketService.userId = this.storageUserId as string;
    } else {
      const newUser: NewUser = {
        type: RequestEnum.NEW_USER,
        username: this.newUsername,
        userId: this.newUserId,
      };

      this.webSocketService.sendMessage(JSON.parse(JSON.stringify(newUser)));
      this.webSocketService.username = this.newUsername;
      this.webSocketService.userId = this.newUserId;
      localStorage.setItem('username', this.newUsername);
      localStorage.setItem('userId', this.newUserId);
    }

    this.router.navigate(['/lobby']);
  }
}
