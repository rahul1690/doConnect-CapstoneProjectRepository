import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/assets/class/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StompService } from './../../services/stomp.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages!:any;
  userId:any;
  user!:User;

  messageForm = this.fb.group({
    message:['',[Validators.required]]
  })

  constructor(private fb:FormBuilder,private messageService:MessageService, private stompService:StompService,private authenticationService:AuthenticationService) {
    this.refreshMessages();
   }

  
  ngOnInit(): void {
    this.stompService.subscribe("/topic/message",():any=>{
      this.refreshMessages();
    })
    this.authenticationService.getUserProfile().subscribe(
      response=>{
        this.user = response;
      }
    )

  }

  onSubmit(message:any){
    if(this.messageForm.valid){
    this.messageService.addMessage(message,this.user.userId).subscribe(
      response=>{
        console.log(response);
        
      }
    )
    }
  }

  refreshMessages() {
    this.messageService.getMessages().subscribe(
      response=>{
        console.log(response);
        this.messages = response;
      }
    )
  }
  get message(){
    return this.messageForm.get('message');
  }

  getColor(){
    return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
  }

}
