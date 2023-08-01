import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeMainComponent } from './components/home/home-main/home-main.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { AboutMainComponent } from './components/about/about-main/about-main.component';
import { CandidateListComponent } from './components/candidate/candidate-list/candidate-list.component';
import { CandidateDetailsComponent } from './components/candidate/candidate-details/candidate-details.component';
import { CandidateApplicationComponent } from './components/candidate/candidate-application/candidate-application.component';
import { CandidatureListComponent } from './components/candidature/candidature-list/candidature-list.component';
import { CandidatureDetailsComponent } from './components/candidature/candidature-details/candidature-details.component';
import { InterviewsComponent } from './components/interviews/interviews.component';
import { OpenProcessesComponent } from './components/open-processes/open-processes.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserManagementComponent } from './components/user-management/user-management.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'password-change',
    component: ChangePasswordComponent
  },
  {
    path: '',
    component: HomeMainComponent,
  },
  {
    path: 'about',
    component: AboutMainComponent,
  },
  {
    path: 'candidate-list',
    component: CandidateListComponent,
  },
  {
    path: 'candidate-details',
    component: CandidateDetailsComponent,
  },
  {
    path: 'candidate-application',
    component: CandidateApplicationComponent,
  },
  {
    path: 'candidature-list',
    component: CandidatureListComponent,
  },
  {
    path: 'candidature-details',
    component: CandidatureDetailsComponent,
  },
  {
    path: 'interviews',
    component: InterviewsComponent,
  },
  {
    path: 'open-processes',
    component: OpenProcessesComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: '**',
    component: HomeMainComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
