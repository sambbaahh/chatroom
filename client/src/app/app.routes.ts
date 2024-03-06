import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { RoomComponent } from './components/room/room.component';

export const routes: Routes = [
  {
    path: '',
    title: 'ChatRoom',
    component: LandingPageComponent,
  },
  {
    path: 'lobby',
    title: 'ChatRoom - Lobby',
    component: LobbyComponent,
  },
  {
    path: 'room/:id/:name',
    title: 'ChatRoom - Room',
    component: RoomComponent,
  },
  {
    path: '**',
    component: LandingPageComponent,
  },
];
