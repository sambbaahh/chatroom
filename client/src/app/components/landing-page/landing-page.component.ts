import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TabViewModule } from 'primeng/tabview';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'landing-page',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    PasswordModule,
    TabViewModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  public username: string = '';
  public password: string = '';

  constructor(private router: Router) {}

  onSubmitLogin(): void {
    this.router.navigate(['/lobby']);
  }
  onSubmitRegister(): void {
    this.router.navigate(['/lobby']);
  }
}
