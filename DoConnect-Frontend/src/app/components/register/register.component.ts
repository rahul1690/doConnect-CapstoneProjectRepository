import { Router } from '@angular/router';
import { User } from './../../../assets/class/User';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private fb:FormBuilder,private authenticationService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  }

  registerForm = this.fb.group({
    firstName:['',[Validators.required,Validators.maxLength(25)]],
    lastName:['',[Validators.required,Validators.maxLength(25)]],
    email:['',[Validators.required,Validators.email]],
    username:['',[Validators.required]],
    password:['',[Validators.required]],
    phoneNumber:['',[Validators.required]]
  })

  onSubmit(registerForm:any){
    if(this.registerForm.valid){
      let user = new User(registerForm.firstName,registerForm.lastName,registerForm.email,registerForm.username,registerForm.password,registerForm.phoneNumber);
      console.log(user);
      let tokenPayload = this.authenticationService.decodeToken();
      if(tokenPayload!=null && tokenPayload.authorities =="[ROLE_ADMIN]")
      {
        this.authenticationService.registerAdmin(user).subscribe(
          response=>{
            if(response!=null){
              this.router.navigate(['admindashboard']);
            }
          }
        )
      }
      else{
        this.authenticationService.registerUser(user).subscribe(
          response=>{
            if(response != null){
              this.router.navigate(['']);
            }
          }
        )
      }

    }
  }


  get firstName(){
    return this.registerForm.get('firstName');
  }

  get lastName(){
    return this.registerForm.get('lastName');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get username(){
    return this.registerForm.get('username');
  }

  get password(){
    return this.registerForm.get('password');
  }

  get phoneNumber(){
    return this.registerForm.get('phoneNumber');
  }

}
