import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

interface MenuCourseRecord {
  category: string;
  courseName: string;
}

interface CourseMenu {
  id: string;
  label: string;
  description: string;
  children: Array<{
    label: string;
  }>;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isSignedIn = false;
  private readonly http = inject(HttpClient);
  private readonly coursesApiUrl = `${environment.apiBaseUrl}/api/courses`;

  title = 'angular-lms';

  isNavOpen = false;
  isCoursesMenuOpen = false;
  activeSubmenu: string | null = null;

  courseMenus: CourseMenu[] = [];

  ngOnInit(): void {
    this.loadCourseMenus();
    this.isSignedIn = !!localStorage.getItem('isSignedIn');
    window.addEventListener('storage', () => {
      this.isSignedIn = !!localStorage.getItem('isSignedIn');
    });
  }

  signOut(): void {
    localStorage.removeItem('isSignedIn');
    this.isSignedIn = false;
  }

  toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;
  }

  toggleCoursesMenu(): void {
    this.isCoursesMenuOpen = !this.isCoursesMenuOpen;

    if (!this.isCoursesMenuOpen) {
      this.activeSubmenu = null;
    }
  }

  toggleSubmenu(menuId: string): void {
    this.activeSubmenu = this.activeSubmenu === menuId ? null : menuId;
  }

  closeMenus(): void {
    this.isNavOpen = false;
    this.isCoursesMenuOpen = false;
    this.activeSubmenu = null;
  }

  private loadCourseMenus(): void {
    this.http
      .get<{ data: MenuCourseRecord[] }>(this.coursesApiUrl)
      .subscribe({
        next: (response) => {
          this.courseMenus = this.buildCourseMenus(response.data || []);
        },
        error: () => {
          this.courseMenus = [];
        }
      });
  }

  private buildCourseMenus(courses: MenuCourseRecord[]): CourseMenu[] {
    const grouped = new Map<string, string[]>();

    for (const course of courses) {
      const items = grouped.get(course.category) || [];
      items.push(course.courseName);
      grouped.set(course.category, items);
    }

    return Array.from(grouped.entries()).map(([category, items]) => ({
      id: this.toId(category),
      label: category,
      description: items.join(', '),
      children: items.map((item) => ({ label: item }))
    }));
  }

  private toId(value: string): string {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
}
