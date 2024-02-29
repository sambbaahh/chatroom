import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LobbyComponent } from './lobby/lobby.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'lobby',
    component: LobbyComponent,
  },
  {
    path: 'chat/:id',
    component: ChatComponent,
  },
  {
    path: '**',
    component: LandingPageComponent,
  }
];
