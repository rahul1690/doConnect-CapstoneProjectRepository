import { AdminauthguardService } from './services/adminauthguard.service';
import { AuthguardService } from './services/authguard.service';
import { AnswerGivenByUserComponent } from './components/answer-given-by-user/answer-given-by-user.component';
import { QuestionAskedByUserComponent } from './components/question-asked-by-user/question-asked-by-user.component';
import { UsersComponent } from './components/users/users.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AnswerComponent } from './components/answer/answer.component';
import { QuestionComponent } from './components/question/question.component';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  { path :'login',component:LoginComponent },
  { path:'register', component:RegisterComponent},
  { path:'',redirectTo:'login',pathMatch:'full'},


  { path:'dashboard',component:UserdashboardComponent,
  children:[
    { path:'questions/:search',component:QuestionComponent},
    { path:'answer/:questionId/:search',component:AnswerComponent},
    { path:'profile',component:ProfileComponent},
    { path:'askquestion',component:AskQuestionComponent},
    { path:'questionsby/:userId',component:QuestionAskedByUserComponent},
    { path:'answersby/:questionId/:userId',component:AnswerGivenByUserComponent}
  ],canActivate:[AuthguardService]},


  { path:'admindashboard',component:AdmindashboardComponent,children:[
    { path:'askquestion',component:AskQuestionComponent},
    { path:'questions/:search',component:QuestionComponent},
    { path:'answer/:questionId/:search',component:AnswerComponent},
    { path:'profile',component:ProfileComponent},
    { path:'register',component:RegisterComponent},
    { path:'users',component:UsersComponent},
    { path:'questionsby/:userId',component:QuestionAskedByUserComponent},
    { path:'answersby/:userId',component:AnswerGivenByUserComponent}
  ],canActivate:[AdminauthguardService]},


  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
