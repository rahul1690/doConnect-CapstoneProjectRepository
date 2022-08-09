import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }

  apiUrl = "http://localhost:8080/message/"

  addMessage(message:any,userId:any){
    return this.http.post(this.apiUrl+"addMessage/"+userId,message);
  }

  getMessages(){
    return this.http.get(this.apiUrl+"getMessages");
  }
}
