import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler){
    let newReq=req;
    let token = localStorage.getItem("token");
    
    if(token!=null){
      newReq=newReq.clone({setHeaders:{Authorization:`Bearer ${token}`}});
    }   
    return next.handle(newReq);
  }
  
}
