import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { RequestEnum } from '../lobby/lobby.component';
import { ActivatedRoute, Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Message } from '../../services/websocket.service';

interface NewMessage extends Message {
  type: RequestEnum.MESSAGE;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [InputTextModule, ButtonModule, InputGroupModule, FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  public messages: Message[] = [];
  public messageContent: string = '';
  private roomId: number = -1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public webSocketService: WebsocketService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.roomId = Number(id);
    })
  }
  sendMessage() {
    const message: NewMessage = {
      type: RequestEnum.MESSAGE,
      content: this.messageContent,
      timestamp: new Date().toLocaleTimeString(),
      roomId: this.roomId,
      username: this.webSocketService.username,
      userId: this.webSocketService.userId,
    };
    this.webSocketService.sendMessage(JSON.parse(JSON.stringify(message)));
    this.messageContent = ''
  }
}
