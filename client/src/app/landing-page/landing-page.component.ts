import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'landing-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  username: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    localStorage.setItem('username', this.username);
    this.router.navigate(['/lobby']);
  }
}
