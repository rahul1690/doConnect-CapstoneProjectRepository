import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { User } from 'src/assets/class/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  constructor(private adminService:AdminService,private route:ActivatedRoute,private router:Router,private fb:FormBuilder) { }

  user!:User
  userId!:any;
  message!:any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params=>{
        this.userId = params.get('userId');
        this.adminService.getUserById(this.userId).subscribe(
          response=>{
            this.user = response;
            console.log(this.user);
          }
        )
      }
    )
    
  }


  onSubmit(){
    this.adminService.updateUserDetails(this.user,this.userId).subscribe(
      response=>{
        if(response)
        this.router.navigate(["admindashboard/users"]);
      }
    )
  }
  



}
