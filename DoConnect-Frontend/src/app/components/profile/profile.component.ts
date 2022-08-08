import { AuthenticationService } from './../../services/authentication.service';
import { User } from './../../../assets/class/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService) { }

  user!:User;

  ngOnInit(): void {
    this.authenticationService.getUserProfile().subscribe(
      response=>{
        if(response!=null){
          this.user =response;
        }
      }
    )
  }

}
