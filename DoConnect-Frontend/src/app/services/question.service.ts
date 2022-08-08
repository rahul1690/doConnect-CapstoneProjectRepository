import { Question } from './../../assets/class/Question';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  _apiUrl = "http://localhost:8080/question/";

  askQuestion(question:Question,userId:any){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("userId",userId);
    return this.http.post(this._apiUrl+"addQuestion",question,{params:queryParams});
  }

  searchQuestion(search:any):Observable<Question[]>{ 
    let queryParam = new HttpParams();
    queryParam =  queryParam.append("words",search);
    return this.http.get<Question[]>(this._apiUrl+"getQuestionWithTheseWords",{params:queryParam});
  }

  getAnswersByQuestionId(questionId:any){
    return this.http.get(this._apiUrl+"findAnswersByQuestionId/"+questionId);
  }

  uploadFile(file:File, id:number){
    const data:FormData = new FormData();
    data.append('file',file);
    return this.http.post(this._apiUrl+"fileUpload/"+id,data);
  }

  api="http://localhost:8080/user/"
  getQuestionsAskedByUser(id:any):Observable<Question[]>{
   return this.http.get<Question[]>(this.api+"getQuestionsAskedByUser/"+id);
  }
}

