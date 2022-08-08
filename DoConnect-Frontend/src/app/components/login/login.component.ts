import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { LoginDto } from './../../../assets/class/LoginDto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any;

  constructor(private fb:FormBuilder,private AuthenticationService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  }

  message:any="";

  loginForm = this.fb.group({
    username:['',[Validators.required]],
    password:['',[Validators.required]]
  })

  onSubmit(loginForm:any){
    if(this.loginForm.valid){
      let loginDto: LoginDto ={
        "username": loginForm.username,
        "password": loginForm.password
      } 
      this.AuthenticationService.authenticateUser(loginDto).subscribe(
        response=>{
          if(response != null){
            let token = response;
            localStorage.setItem("token",token.token);
            let tokenPayload = this.AuthenticationService.decodeToken();
            if(tokenPayload.authorities == "[ROLE_ADMIN]")
            this.router.navigate(['admindashboard']);
            else
            this.router.navigate(['dashboard']);
          }
          else{
            this.message="Bad Response!";
          }
        }
      ,error=>{
        this.message="Bad Credentials!";
        console.log(this.error);
      })
    }
  }

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

}
