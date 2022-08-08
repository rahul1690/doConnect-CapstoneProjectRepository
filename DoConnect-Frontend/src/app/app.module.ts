import { InterceptorService } from './services/interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ErrorComponent } from './components/error/error.component';
import { QuestionComponent } from './components/question/question.component';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { AnswerComponent } from './components/answer/answer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { ProfileComponent } from './components/profile/profile.component';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import {MatTableModule} from '@angular/material/table';
import { UsersComponent } from './components/users/users.component';
import { QuestionAskedByUserComponent } from './components/question-asked-by-user/question-asked-by-user.component';
import { AnswerGivenByUserComponent } from './components/answer-given-by-user/answer-given-by-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    QuestionComponent,
    UserdashboardComponent,
    AdmindashboardComponent,
    AnswerComponent,
    ProfileComponent,
    AskQuestionComponent,
    UsersComponent,
    QuestionAskedByUserComponent,
    AnswerGivenByUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
