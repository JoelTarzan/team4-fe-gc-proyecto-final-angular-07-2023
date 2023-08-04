import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/utils/navbar/navbar.component';
import { SkillsComponent } from './components/utils/skills/skills.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { HomeMainComponent } from './components/home/home-main/home-main.component';
import { HomeCardComponent } from './components/home/home-card/home-card.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutMainComponent } from './components/about/about-main/about-main.component';
import { AboutCardComponent } from './components/about/about-card/about-card.component';
import { CandidatureListComponent } from './components/candidature/candidature-list/candidature-list.component';
import { CandidatureDetailsComponent } from './components/candidature/candidature-details/candidature-details.component';
import { OpenProcessesComponent } from './components/open-processes/open-processes.component';
import { InterviewsComponent } from './components/interviews/interviews.component';
import { CandidateListComponent } from './components/candidate/candidate-list/candidate-list.component';
import { CandidateDetailsComponent } from './components/candidate/candidate-details/candidate-details.component';
import { CandidateApplicationComponent } from './components/candidate/candidate-application/candidate-application.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { PaginationComponent } from './components/utils/pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SkillsComponent,
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    HomeMainComponent,
    HomeCardComponent,
    ProfileComponent,
    AboutMainComponent,
    AboutCardComponent,
    CandidatureListComponent,
    CandidatureDetailsComponent,
    OpenProcessesComponent,
    InterviewsComponent,
    CandidateListComponent,
    CandidateDetailsComponent,
    CandidateApplicationComponent,
    UserManagementComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
