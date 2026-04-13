import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { RegistrationComponent } from './registration/registration.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: AllCoursesComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'dashboard', component: StudentDashboardComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '**', redirectTo: '' }
];
