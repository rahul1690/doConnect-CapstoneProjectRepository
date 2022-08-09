import { Answer } from 'src/assets/class/Answer';
import { Question } from 'src/assets/class/Question';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerService } from 'src/app/services/answer.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-approve-answers',
  templateUrl: './approve-answers.component.html',
  styleUrls: ['./approve-answers.component.css']
})
export class ApproveAnswersComponent implements OnInit {

  message:any;
  response:any;
  question!:Question;

  constructor(private fb:FormBuilder,private route:ActivatedRoute,private router:Router,private questionService:QuestionService,private answerService:AnswerService,private authenticationService:AuthenticationService,private adminService:AdminService) { }
  answers!:Answer[];
  questionId:any;
  currentUser:any;
  displayedColumns: any[] = ['question','topic','askedAt','askedBy','answer','answeredDateAndTime','answeredBy','approve','delete'];

  ngOnInit(): void {
        this.adminService.getAnswersForApproval().subscribe(
          response=>{
            if(response != null){
            this.answers = response;
            }
            if(this.answers.length == 0){
              this.message="No Answers Available!";
            }
            else{
              console.log(this.answers);
              this.question = this.answers[0].question;
            }
          }
        )

    this.authenticationService.getUserProfile().subscribe(
      response=>{
        if(response!=null){
          this.currentUser = response;
        }
      }
    )
  }

  approveAnswer(element:any){
    this.adminService.approveAnswerById(element.answerId).subscribe(
      response=>{
        if(response!=null){
          console.log("Answer approved!");
        }
      }
    )
  }


  deleteAnswer(answer:any){
    this.adminService.deleteAnswerById(answer.answerId).subscribe(
      response=>{
        if(response){
          console.log("Deleted Answer");
        }
      }
    )
  }


}
