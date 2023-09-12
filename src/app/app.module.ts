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
import { ListPostulatedComponent } from './components/candidature/list-postulated/list-postulated.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarComponent } from './components/utils/progress-bar/progress-bar.component';
import { RatingComponent } from './components/candidate/rating/rating.component';
import { CandidatureCreateComponent } from './components/candidature/candidature-create/candidature-create.component';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenStorageService } from './services/token-storage.service';


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
    PaginationComponent,
    ListPostulatedComponent,
    ProgressBarComponent,
    RatingComponent,
    CandidatureCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return sessionStorage.getItem('TOKEY_KEY');
        },
        allowedDomains: ['http://localhost:4200'],
        disallowedRoutes: ['http://localhost:4200/login', 'http://localhost:4200/register']
      }
    })
  ],
  providers: [TokenStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
