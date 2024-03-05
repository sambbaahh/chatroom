import { Component, ElementRef, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { RequestEnum } from '../lobby/lobby.component';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Message } from '../../services/websocket.service';
import { RoomJoining } from '../lobby/lobby.component';

interface NewMessage extends Message {
  type: RequestEnum.MESSAGE;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    InputGroupModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  public messages: Message[] = [];
  public messageContent: string = '';

  @ViewChild('messages') messagesContainer: ElementRef | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public webSocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.webSocketService.roomId = Number(id);
    });
    //user has come from the web address, not the UI
    if (!this.webSocketService.isInRoom) {
      const joinRoom: RoomJoining = {
        type: RequestEnum.JOIN,
        roomId: this.webSocketService.roomId as number,
        username: this.webSocketService.username,
      };
      this.webSocketService.sendMessage(JSON.parse(JSON.stringify(joinRoom)));
    }

    //if user press back button in browser, we need to send leave room message to the server
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          this.webSocketService.sendMessage(
            JSON.parse(JSON.stringify({ type: RequestEnum.LEAVE }))
          );
          routerSubscription.unsubscribe();
        }
      }
    });
  }

  ngAfterViewChecked(): void {
    //scroll to the bottom if scrollbar in messagelist
    this.messagesContainer!.nativeElement!.scrollTop =
      this.messagesContainer?.nativeElement?.scrollHeight;
  }

  sendMessage() {
    const message: NewMessage = {
      type: RequestEnum.MESSAGE,
      content: this.messageContent,
      timestamp: new Date().toLocaleTimeString('fi-FI', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      roomId: this.webSocketService.roomId as number,
      username: this.webSocketService.username,
      userId: this.webSocketService.userId,
    };
    this.webSocketService.sendMessage(JSON.parse(JSON.stringify(message)));
    this.messageContent = '';
  }
}
