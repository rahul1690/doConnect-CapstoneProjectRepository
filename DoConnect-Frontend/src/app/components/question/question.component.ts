import { Answer } from './../../../assets/class/Answer';
import { AdminService } from './../../services/admin.service';
import { AuthenticationService } from './../../services/authentication.service';
import { QuestionService } from './../../services/question.service';
import { Question } from './../../../assets/class/Question';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private questionService:QuestionService,private route:ActivatedRoute,private router:Router,private authenticationService:AuthenticationService,private adminService:AdminService) { }


  questions:Question[]=[];
  message:any;
  search:any="";
  displayedColumns: any[] = ['questionId', 'topic', 'question','askedDateAndTime','askedBy', 'answer'];

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params=>{
        this.search = params.get("search");
       
        if(this.search){
          this.questionService.searchQuestion(this.search).subscribe(
            response=>{
              if(response != null){
                this.questions = response;
                this.message = "";
                if(this.questions.length == 0){
                  this.message = "No Matches Found!";
                }
              }
            }
          )
        }
        else{
          this.adminService.getAnswersForApproval().subscribe(
            response=>{
              let arr = response;
              if(arr.length != 0){
                let answers:Answer[] = response;
                let questions:Set<Question> = new Set();
                answers.map(a=> questions.add(a.question));
                console.log(answers);
                questions.forEach(q=> this.questions.push(q));
              }
              else{
                this.message = "Not Answers for approval";
                console.log("Not present");
              }
            }
          )
        }
      }
    )
  }
  getAnswer(element:any){
    if(this.search){
      let authority = this.authenticationService.getUserRole();
    if(authority == "[ROLE_ADMIN]")
    this.router.navigate(["admindashboard/answer/"+element.questionId+"/"+this.search]);
    else
    this.router.navigate(["dashboard/answer/"+element.questionId+"/"+this.search]);
    }
  else{
    console.log(element.questionId);
    this.router.navigate(["admindashboard/approveanswers/"+element.questionId]);
  }
}


}
