import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'landing-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  username: string = '';

  onSubmit(): void {
    console.log(this.username);
  }
}
