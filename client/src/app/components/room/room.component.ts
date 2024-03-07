import { Component, ElementRef, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ReceivedMessage,
  RoomJoining,
  RequestEnum,
  NewMessage,
} from '../../interfaces';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    InputGroupModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent {
  public messages: ReceivedMessage[] = [];
  public messageContent: string = '';

  @ViewChild('messages') messagesContainer: ElementRef | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public webSocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    const isValidUser: boolean = this.webSocketService.initializeUser();
    if (!isValidUser) {
      this.router.navigate(['']);
    } else {
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        const name = params.get('name');

        this.webSocketService.roomId = Number(id);
        this.webSocketService.roomName = name;
      });

      //user has come from the web address, not from the UI
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
            this.webSocketService.roomId = null;
            this.webSocketService.roomName = null;
            this.webSocketService.messages = [];
            this.webSocketService.isInRoom = false;
            routerSubscription.unsubscribe();
          }
        }
      });
    }
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
    };
    this.webSocketService.sendMessage(JSON.parse(JSON.stringify(message)));
    this.messageContent = '';
  }
}
