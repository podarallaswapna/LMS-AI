import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  credentials = { userId: '', password: '' };
  errorMessage = '';

  onSignIn(form: any) {
    this.errorMessage = '';
    if (form.valid) {
      // Demo: Accept any credentials, set sign-in state
      localStorage.setItem('isSignedIn', 'true');
      window.dispatchEvent(new Event('storage'));
      window.location.href = '/dashboard';
    } else {
      this.errorMessage = 'Please fill in all fields correctly.';
    }
  }
}
