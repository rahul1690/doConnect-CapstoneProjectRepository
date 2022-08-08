import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/assets/class/Question';

@Component({
  selector: 'app-approve-questions',
  templateUrl: './approve-questions.component.html',
  styleUrls: ['./approve-questions.component.css']
})
export class ApproveQuestionsComponent implements OnInit {

  questions!:Question[];
  message!: string;
  isApproved!:boolean;

  constructor(private questionService:QuestionService,private router:Router,private authenticationService:AuthenticationService,private adminService:AdminService) { }

  displayedColumns: any[] = ['questionId', 'topic', 'question','askedDateAndTime', 'approve'];
  ngOnInit(): void {
          this.adminService.getQuestionsForApproval().subscribe(
            response=>{
              console.log(response)
              if(response!=null)
              this.questions = response;
              if(this.questions.length == 0){
                this.message = "No questions for approval";
              }
            }
          )
        }

approve(question:any){
  this.adminService.approveQuestionById(question.questionId).subscribe(
    response=>{
      console.log(response);
      if(response!=null){
        this.isApproved = true;
      }
    }
  )
}
}
