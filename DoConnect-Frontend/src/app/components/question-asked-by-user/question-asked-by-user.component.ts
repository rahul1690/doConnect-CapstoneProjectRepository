import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/assets/class/Question';

@Component({
  selector: 'app-question-asked-by-user',
  templateUrl: './question-asked-by-user.component.html',
  styleUrls: ['./question-asked-by-user.component.css']
})
export class QuestionAskedByUserComponent implements OnInit {
  userId: any;
  questions!:Question[];
  message!: string;

  constructor(private questionService:QuestionService,private route:ActivatedRoute,private router:Router,private authenticationService:AuthenticationService) { }

  displayedColumns: any[] = ['questionId', 'topic', 'question','askedDateAndTime', 'answer'];
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params=>{
        this.userId = params.get("userId");

        if(this.userId){
          this.questionService.getQuestionsAskedByUser(this.userId).subscribe(
            response=>{
              if(response!=null)
              this.questions = response;
              if(this.questions.length == 0){
                this.message = "You have not asked anything";
              }
            }
          )
        }
      }
    )
    
  }
  getAnswer(element:any){
    let authority = this.authenticationService.getUserRole();
    if(authority == "[ROLE_ADMIN]")
    this.router.navigate(["admindashboard/answersby/"+element.questionId+"/"+this.userId]);
    else
    this.router.navigate(["dashboard/answersby/"+element.questionId+"/"+this.userId]);
  }

}
