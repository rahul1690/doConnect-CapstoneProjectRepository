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

  constructor(private authenticationService:AuthenticationService,private adminService:AdminService) { }

  users!:User[];
  ngOnInit(): void {

    this.adminService.getUsers().subscribe(
      response=>{
        if(response!=null){
          this.users = response;
        }
      }
    )
  }

  message:any;
  displayedColumns: any[] = ['userId','username','Name','email', 'phoneNumber','edit','delete'];

  editUser(user:any){

  }

  deleteUser(user:any){

  }

    

}
