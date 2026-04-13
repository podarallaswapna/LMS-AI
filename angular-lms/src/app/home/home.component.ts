import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly features = [
    'User friendly navigation and onboarding',
    'Responsive layout for desktop, tablet, and mobile',
    'SPA experience powered by Angular routing'
  ];

  readonly workflowItems = [
    'Template-driven forms',
    'Reactive form ready layout',
    'Form validation blocks',
    'REST API / Web API area',
    'Program-based TypeScript section'
  ];
}
