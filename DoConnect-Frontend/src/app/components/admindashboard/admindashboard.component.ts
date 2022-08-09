import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  constructor(private router:Router,private questionService:QuestionService,private authenticationService:AuthenticationService) { }

  footer_ = true;
  ngOnInit(): void {
    let tokenPayload =  this.authenticationService.decodeToken();
    this.username = tokenPayload.sub;
  }
  username:any;

  search:any;
  askQuestion=true;

  logout(){
    this.router.navigate([""]);
    localStorage.removeItem("token");
  }

  openProfile(){
    this.askQuestion = false;
    this.router.navigate(['admindashboard/profile']);
  }

  home(){this.askQuestion = true;
    this.router.navigate(['admindashboard']);
  }

  askQuestionPage(){
    this.askQuestion = false;
    this.router.navigate(['admindashboard/askquestion'])
  }

  searchQuestion(){
    this.footer_ = false;
    if(this.search != undefined){
    this.router.navigate(["admindashboard/questions/",this.search]);
    this.askQuestion = false;
    }
  }

  getUsers()
  {
    this.footer_ = false;
    this.askQuestion = false;
    this.router.navigate(["admindashboard/users"]);
  }

  registerAdmin(){
    this.askQuestion = false;
    this.footer_ = false;
    this.router.navigate(['admindashboard/register']);
  }

  approveQuestions(){
    this.askQuestion= false;
    this.footer_ = false;
    this.router.navigate(["admindashboard/approvequestions"])
  }

  approveAnswers(){
    this.askQuestion= false;
    this.footer_ = false;
    this.router.navigate(["admindashboard/questions"])
  }

  getChat(){
    this.footer_ = false;
    this.askQuestion = false
    this.router.navigate(["admindashboard/message"]);
  }

}
