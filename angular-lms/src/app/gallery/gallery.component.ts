import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  readonly galleryItems = [
    'Smart classroom sessions',
    'Team workshops and code labs',
    'Learner celebrations',
    'Project reviews',
    'Campus events',
    'Community meetups'
  ];
}
