import { Answer } from './../../assets/class/Answer';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http:HttpClient) { }
  apiUrl = "http://localhost:8080/answer/"

  submitAnswer(answer:any,answeredUserId:string,answerdQuestionId:string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append( "answeredQuestionId",answerdQuestionId);
    queryParams = queryParams.append("answeredUserId",answeredUserId);
    return this.http.post(this.apiUrl+"addAnswer",answer,{params:queryParams});
  }
  
}
