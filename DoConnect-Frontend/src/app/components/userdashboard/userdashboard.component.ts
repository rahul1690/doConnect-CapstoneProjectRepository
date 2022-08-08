import { AuthenticationService } from './../../services/authentication.service';
import { QuestionService } from './../../services/question.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  username: any;
  userId: any;
  constructor(private router:Router,private questionService:QuestionService,private authenticationService:AuthenticationService) { }

  footer_ = true;
  ngOnInit(): void {
    let tokenPayload =  this.authenticationService.decodeToken();
    this.username = tokenPayload.sub;
    this.authenticationService.getUserProfile().subscribe(
      response=>{
        if(response!=null){
          let user = response;
          this.userId = user.userId;
        }
      }
    );
  }

  search:any;
  askQuestion=true;

  logout(){
    this.router.navigate([""]);
    localStorage.removeItem("token");
  }

  openProfile(){
    this.askQuestion = false;
    this.router.navigate(['dashboard/profile']);
  }

  home(){this.askQuestion = true;
    this.router.navigate(['dashboard']);
  }

  askQuestionPage(){
    this.askQuestion = false;
    this.router.navigate(['dashboard/askquestion'])
  }

  searchQuestion(){
    this.footer_ = false;
    if(this.search != undefined){
    this.router.navigate(["dashboard/questions/",this.search]);
    this.askQuestion = false;
    }
  }

  questionsAsked(){
    this.footer_ = false;

    this.router.navigate(["dashboard/questionsby",this.userId]);
  }

  answersGiven(){
    this.footer_ = false;
    this.router.navigate(["dashboard/answersby",this.userId]);
  }
}
