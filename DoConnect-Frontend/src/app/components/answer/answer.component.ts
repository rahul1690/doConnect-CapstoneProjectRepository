import { AuthenticationService } from './../../services/authentication.service';
import { Answer } from './../../../assets/class/Answer';
import { AnswerService } from './../../services/answer.service';
import { FormBuilder, Validators } from '@angular/forms';
import { QuestionService } from './../../services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  message:any;
  response:any;
  question:any;

  constructor(private fb:FormBuilder,private route:ActivatedRoute,private router:Router,private questionService:QuestionService,private answerService:AnswerService,private authenticationService:AuthenticationService) { }
  answers:any;
  questionId:any;
  searched:any;
  currentUser:any;
  displayedColumns: any[] = [ 'answer','answeredDateAndTime','answeredBy'];
  answerForm = this.fb.group({
    answer : ['',[Validators.required]],
  })

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      param => {
        this.questionId = param.getAll('questionId');
        this.searched = param.get('search');
        this.questionService.getAnswersByQuestionId(this.questionId).subscribe(
          response=>{
            if(response != null){
            console.log(response);
            this.answers = response;
            }
            if(this.answers.length == 0){
              this.message="No Answers Available!";
            }
            else{
              this.question = this.answers[0].question;
              console.log(this.question);
            }
          }
        )
      }
    )
    this.authenticationService.getUserProfile().subscribe(
      response=>{
        if(response!=null){
          console.log(response);
          this.currentUser = response;
          
        }
      }
    )
  }

  onSubmit(answerForm:any){

    if(this.answerForm.valid){
      this.answerService.submitAnswer(answerForm,this.currentUser.userId,this.questionId).subscribe(
        response=>{
          console.log(response);
          this.response = "submitted!"
        }
      )
    }
  }

  goBack(){
    let role = this.authenticationService.getUserRole();
    if(role == "[ROLE_USER]")
    this.router.navigate(["dashboard/questions/",this.searched]);
    else
    this.router.navigate(["admindashboard/questions/",this.searched]);
  }

  get answer(){
    return this.answerForm.get('answer');
  }

}
