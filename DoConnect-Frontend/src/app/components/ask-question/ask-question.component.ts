import { AuthenticationService } from './../../services/authentication.service';
import { QuestionService } from './../../services/question.service';
import { Question } from './../../../assets/class/Question';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {
  selectQuestionImg: any;
  questionObj:any;
  constructor(private fb:FormBuilder,private questionService:QuestionService,private authenticationService:AuthenticationService) { }


  selectedQuestionImg:any=null;
  user:any;

  ngOnInit(): void {
    this.authenticationService.getUserProfile().subscribe(
      response=>{
        this.user =response;
      }
    )
  }
  message:string = "";

  questionForm = this.fb.group({
    topic : ['',[Validators.required]],
    question :['',[Validators.required]],
    questionImg:['']
  })

  get topic(){
    return this.questionForm.get('topic');
  }

  get question(){
    return this.questionForm.get('question');
  }

  onSubmit(questionForm:any){
    console.log(questionForm.topic);
    let question = new Question(questionForm.topic,questionForm.question);
    if(this.questionForm.valid){
      this.questionService.askQuestion(question,this.user.userId).subscribe(
        response=>{
          if(response != null){
            console.log(response);
            this.questionObj = response;
            if(this.selectQuestionImg){
            this.questionService.uploadFile(this.selectQuestionImg,this.questionObj.questionId).subscribe(response=>{
  
            })}
            this.message = "Question submitted successfully";
            
          }
          else{
            this.message="Sorry could not save your response!"
          }
        }
      )
    }

  }

  onFileSelected(event:any){
    if(event){
      this.selectedQuestionImg = "";
       this.selectQuestionImg = event.target.files.item(0);
    }
    console.log(this.selectQuestionImg);
  }

}
