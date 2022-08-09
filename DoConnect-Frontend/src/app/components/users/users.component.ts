import { Router } from '@angular/router';
import { StompService } from './../../services/stomp.service';
import { AdminService } from './../../services/admin.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/assets/class/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,private adminService:AdminService,private stompService:StompService,private router:Router) { 
    this.refreshUsers();
  }

  users!:User[];
  ngOnInit(): void {

    this.stompService.subscribe("/topic/user",():any=>{
      this.refreshUsers();
    })
   
  }

  message:any;
  displayedColumns: any[] = ['userId','username','Name','email', 'phoneNumber','edit','delete'];

  editUser(user:any){
    this.router.navigate(["admindashboard/edituser/",user.userId]);
  }

  deleteUser(user:any){
    console.log(user.userId);
    this.adminService.deleteUserById(user.userId).subscribe(
      response=>{
        if(response){
          console.log(response);
        }
      }
    )
  }

  refreshUsers(){
    this.adminService.getUsers().subscribe(
      response=>{
        if(response!=null){
          this.users = response;
        }
      }
    )
  }

    

}
