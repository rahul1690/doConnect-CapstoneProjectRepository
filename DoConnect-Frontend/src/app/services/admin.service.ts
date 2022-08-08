import { Question } from './../../assets/class/Question';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/assets/class/User';
import { Answer } from 'src/assets/class/Answer';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  

  constructor(private http:HttpClient) { }

  apiUrl = "http://localhost:8080/admin/"

  registerAdmin(user:User){
    this.http.post(this.apiUrl+"register",user);
  }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl+"getUsers");
  }

  getQuestionsForApproval():Observable<Question[]>{
    return this.http.get<Question[]>(this.apiUrl+"getQuestionsForApproval");
  }

  approveQuestionById(questionId: any){
    return this.http.get(this.apiUrl+"approveQuestionById/"+questionId);
  }


  getAnswersForApproval():Observable<Answer[]> {
    return this.http.get<Answer[]>(this.apiUrl+"getAnswersForApproval");
  }

  approveAnswerById(answerId: any){
    return this.http.get(this.apiUrl+"approveAnswerById/"+answerId);
  }
}
