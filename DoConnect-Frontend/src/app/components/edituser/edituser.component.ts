import { AdminService } from './../../services/admin.service';
import { User } from 'src/assets/class/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  constructor(private adminService:AdminService) { }

  user!:User

  ngOnInit(): void {
    
  }

}
