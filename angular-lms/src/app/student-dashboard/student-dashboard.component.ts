import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
// Use global anychart from CDN
declare const anychart: any;

interface DashboardResponse {
  totalCourses: number;
  totalCategories: number;
  totalRegistrations: number;
  courseBreakdown: Array<{
    category: string;
    totalCourses: number;
  }>;
  registrationBreakdown: Array<{
    course: string;
    totalRegistrations: number;
  }>;
  recentRegistrations: Array<{
    id: number;
    name: string;
    designation: string;
    course: string;
    location: string;
    createdAt: string;
  }>;
}

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit, AfterViewInit {
  // Chart containers
  courseChartId = 'course-category-chart';
  registrationChartId = 'registration-breakdown-chart';
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/api/dashboard`;

  dashboard: DashboardResponse | null = null;
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.http.get<{ data: DashboardResponse }>(this.apiUrl).subscribe({
      next: (response) => {
        this.dashboard = response.data;
        this.isLoading = false;
        setTimeout(() => {
          this.renderCharts();
        }, 0);
      },
      error: () => {
        this.errorMessage =
          'Unable to load dashboard data. Please make sure the backend and MySQL are running.';
        this.isLoading = false;
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.dashboard) {
      this.renderCharts();
    }
  }

  renderCharts(): void {
    if (!this.dashboard) return;

    // Course Category Pie Chart
    const courseData = this.dashboard.courseBreakdown.map(item => [item.category, item.totalCourses]);
    const courseChart = anychart.pie(courseData);
    courseChart.title('Courses by Category');
    courseChart.container(this.courseChartId);
    courseChart.draw();

    // Registration Breakdown Bar Chart
    const regData = this.dashboard.registrationBreakdown.map(item => [item.course, item.totalRegistrations]);
    const regChart = anychart.column(regData);
    regChart.title('Registrations by Course');
    regChart.container(this.registrationChartId);
    regChart.draw();
  }

  get topRegisteredCourse(): string {
    return this.dashboard?.registrationBreakdown.length
      ? this.dashboard.registrationBreakdown[0].course
      : 'No registrations yet';
  }
}
