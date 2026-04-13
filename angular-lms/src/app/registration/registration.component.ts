import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';

interface RegistrationPayload {
  name: string;
  designation: string;
  course: string;
  location: string;
}

@Component({
  selector: 'app-registration',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/api/registrations`;

  formModel = {
    name: '',
    designation: '',
    course: '',
    location: '',
  };

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  readonly courseOptions = [
    'MERN',
    'MEAN',
    'Front End',
    'Backend',
    'Java',
    '.NET'
  ];

  submitRegistration(): void {
    if (this.isSubmitting) {
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    const payload: RegistrationPayload = {
      name: this.formModel.name.trim(),
      designation: this.formModel.designation.trim(),
      course: this.formModel.course.trim(),
      location: this.formModel.location.trim()
    };

    if (!payload.name || !payload.designation || !payload.course || !payload.location) {
      this.errorMessage = 'Please fill in all required fields before submitting.';
      return;
    }

    this.isSubmitting = true;

    this.http.post<{ message: string }>(this.apiUrl, payload).subscribe({
      next: (response) => {
        this.successMessage = response.message || 'Registration created successfully.';
        this.errorMessage = '';
        this.isSubmitting = false;
        this.formModel = {
          name: '',
          designation: '',
          course: '',
          location: ''
        };
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage =
          error?.error?.message || 'Unable to submit registration. Please check the backend service.';
      }
    });
  }
}
