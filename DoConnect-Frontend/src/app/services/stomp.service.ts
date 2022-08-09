import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class StompService {

  constructor(private http:HttpClient) { }


  socket = new SockJS('http://localhost:8080/sb-websocket');
  stompClient = Stomp.over(this.socket);

  subscribe(topic:string, callback:any){
    const connected : boolean = this.stompClient.connected;

    if(connected){
      this.subscribeToTopic(topic, callback);
    }

    //if stompclient is not connected connect and subscribe to topic
    this.stompClient.connect({}, ():any =>{
      this.subscribeToTopic(topic, callback);
    })
  }
  subscribeToTopic(topic: string, callback: any) {
    this.stompClient.subscribe(topic, ():any =>{
      callback();
    });
  }

}
