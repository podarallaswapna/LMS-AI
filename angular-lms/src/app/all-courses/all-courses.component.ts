import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';

interface CourseRecord {
  id: number;
  category: string;
  courseName: string;
  level: string;
  description: string;
}

interface CourseTrack {
  id: string;
  title: string;
  level: string;
  description: string;
  modules: Array<{
    id: string;
    title: string;
    sample: string;
    level: string;
  }>;
}

@Component({
  selector: 'app-all-courses',
  imports: [CommonModule, RouterLink],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css'
})
export class AllCoursesComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly apiUrl = `${environment.apiBaseUrl}/api/courses`;

  courseTracks: CourseTrack[] = [];
  filteredTracks: CourseTrack[] = [];
  isLoading = true;
  errorMessage = '';
  selectedCategory = '';
  selectedCourse = '';

  ngOnInit(): void {
    this.loadCourses();
    this.route.queryParamMap.subscribe((params) => {
      this.selectedCategory = params.get('category') || '';
      this.selectedCourse = params.get('course') || '';
      this.applyFilter();
    });
  }

  private loadCourses(): void {
    this.http
      .get<{ data: CourseRecord[] }>(this.apiUrl)
      .subscribe({
        next: (response) => {
          this.courseTracks = this.groupCourses(response.data || []);
          this.applyFilter();
          this.isLoading = false;
          this.errorMessage = '';
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'Unable to load courses from the database. Please make sure the backend is running.';
        }
      });
  }

  clearFilter(): void {
    this.selectedCategory = '';
    this.selectedCourse = '';
    this.filteredTracks = [...this.courseTracks];
  }

  private applyFilter(): void {
    if (!this.selectedCategory) {
      this.filteredTracks = [...this.courseTracks];
      return;
    }

    const matchedTrack = this.courseTracks.find(
      (track) => track.title.toLowerCase() === this.selectedCategory.toLowerCase()
    );

    if (!matchedTrack) {
      this.filteredTracks = [];
      return;
    }

    if (!this.selectedCourse) {
      this.filteredTracks = [matchedTrack];
      return;
    }

    const matchedModule = matchedTrack.modules.find(
      (module) => module.title.toLowerCase() === this.selectedCourse.toLowerCase()
    );

    this.filteredTracks = matchedModule
      ? [
          {
            ...matchedTrack,
            modules: [matchedModule]
          }
        ]
      : [];
  }

  private groupCourses(courses: CourseRecord[]): CourseTrack[] {
    const grouped = new Map<string, CourseRecord[]>();

    for (const course of courses) {
      const key = course.category;
      const items = grouped.get(key) || [];
      items.push(course);
      grouped.set(key, items);
    }

    return Array.from(grouped.entries()).map(([category, items]) => ({
      id: this.toId(category),
      title: category,
      level: this.resolveTrackLevel(category),
      description: this.resolveTrackDescription(category),
      modules: items.map((item) => ({
        id: `${this.toId(category)}-${this.toId(item.courseName)}`,
        title: item.courseName,
        sample: item.description,
        level: item.level
      }))
    }));
  }

  private toId(value: string): string {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  private resolveTrackLevel(category: string): string {
    const levels: Record<string, string> = {
      MERN: 'Full Stack',
      MEAN: 'Full Stack',
      'Front End': 'UI Development',
      Backend: 'Server Side'
    };

    return levels[category] || 'Course Track';
  }

  private resolveTrackDescription(category: string): string {
    const descriptions: Record<string, string> = {
      MERN: 'Build modern JavaScript applications using MongoDB, Express, React, and Node.js.',
      MEAN: 'Create Angular-based full stack applications backed by MongoDB, Express, and Node.js.',
      'Front End': 'Master core browser technologies for clean, responsive, and interactive user interfaces.',
      Backend: 'Learn server-side languages and platforms used to power modern applications.'
    };

    return descriptions[category] || 'Course information loaded dynamically from the database.';
  }
}
