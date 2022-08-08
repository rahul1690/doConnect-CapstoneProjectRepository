import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/assets/class/User';

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
}
