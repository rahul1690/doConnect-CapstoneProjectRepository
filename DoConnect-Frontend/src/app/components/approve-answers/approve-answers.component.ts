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
  question:any;

  constructor(private fb:FormBuilder,private route:ActivatedRoute,private router:Router,private questionService:QuestionService,private answerService:AnswerService,private authenticationService:AuthenticationService,private adminService:AdminService) { }
  answers:any;
  questionId:any;
  currentUser:any;
  displayedColumns: any[] = [ 'answer','answeredDateAndTime','answeredBy','approve'];
  answerForm = this.fb.group({
    answer : ['',[Validators.required]],
  })

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      param => {
        this.questionId = param.getAll('questionId');
        this.questionService.getAnswersByQuestionId(this.questionId).subscribe(
          response=>{
            if(response != null){
            this.answers = response;
            }
            if(this.answers.length == 0){
              this.message="No Answers Available!";
            }
            else{
              this.question = this.answers[0].question;
            }
          }
        )
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

  onSubmit(answerForm:any){

    if(this.answerForm.valid){
      this.answerService.submitAnswer(answerForm,this.currentUser.userId,this.questionId).subscribe(
        response=>{
          this.response = "Your Response has been recorded!"
        }
      )
    }
  }



  get answer(){
    return this.answerForm.get('answer');
  }

}
