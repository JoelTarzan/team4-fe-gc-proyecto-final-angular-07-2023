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
import { CandidatureCreateComponent } from './components/candidature/candidature-create/candidature-create.component';
import { authGuard } from './guards/auth.guard';
import { candidateGuard } from './guards/candidate.guard';
import { adminGuard } from './guards/admin.guard';
import { rrhhOrAdminGuard } from './guards/rrhh-or-admin.guard';
import { rrhhGuard } from './guards/rrhh.guard';

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
    component: ChangePasswordComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    component: HomeMainComponent,
    canActivate: [authGuard]
  },
  {
    path: 'about',
    component: AboutMainComponent,
    canActivate: [authGuard]
  },
  {
    path: 'candidate-list',
    component: CandidateListComponent,
    canActivate: [authGuard, rrhhOrAdminGuard]
  },
  {
    path: 'candidate-details/:id',
    component: CandidateDetailsComponent,
    canActivate: [authGuard, rrhhOrAdminGuard]
  },
  {
    path: 'candidate-application/:id',
    component: CandidateApplicationComponent,
    canActivate: [authGuard, rrhhOrAdminGuard]
  },
  {
    path: 'candidature-list',
    component: CandidatureListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'candidature-create',
    component: CandidatureCreateComponent,
    canActivate: [authGuard, rrhhOrAdminGuard]
  },
  {
    path: 'candidature-details/:id',
    component: CandidatureDetailsComponent,
    canActivate: [authGuard, rrhhOrAdminGuard]
  },
  {
    path: 'interviews',
    component: InterviewsComponent,
    canActivate: [authGuard, rrhhGuard]
  },
  {
    path: 'open-processes',
    component: OpenProcessesComponent,
    canActivate: [authGuard, candidateGuard]
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: '**',
    component: HomeMainComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
