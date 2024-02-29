import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LobbyComponent } from './lobby/lobby.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
  {
    path: '',
    title: "ChatRoom",
    component: LandingPageComponent,
  },
  {
    path: 'lobby',
    title: "ChatRoom - Lobby",
    component: LobbyComponent,
  },
  {
    path: 'chat/:id',
    title: "ChatRoom - Chat",
    component: ChatComponent,
  },
  {
    path: '**',
    component: LandingPageComponent,
  }
];
