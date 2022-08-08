import { User } from './../../assets/class/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationResponse } from './../../assets/class/AuthenticationResponse';
import { LoginDto } from './../../assets/class/LoginDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  response!:AuthenticationResponse;

  tokenPayload:any;
  expirationDate: any;
  expToken:any;
  username!:any;

  constructor(private http:HttpClient,private jwtHelperService:JwtHelperService) { }
  
  _apiUrl = "http://localhost:8080/"

  authenticateUser(loginDto:LoginDto):Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(this._apiUrl+"authenticate",loginDto);
  }

  decodeToken(){
      this.expToken = localStorage.getItem("token");
      return this.tokenPayload = this.jwtHelperService.decodeToken(this.expToken);
  }

  getTokenExpirationDate() {
    this.expirationDate = this.jwtHelperService.getTokenExpirationDate(this.expToken);
  }

  isAuthenticated(): boolean {
    return !this.jwtHelperService.isTokenExpired(this.expToken);
  }

  registerUser(user:User):Observable<User>{
    return this.http.post<User>(this._apiUrl+"register",user);
  }

  registerAdmin(user: User) {
    return this.http.post(this._apiUrl+"admin/registerAdmin",user);
  }


  getUserProfile():Observable<User>{
    return this.http.get<User>(this._apiUrl+"getUserDetails");
  }

  getUserRole(){
    let payLoad = this.decodeToken();
    return payLoad.authorities;
  }
}
