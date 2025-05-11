import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if(token){
      const authRequest = request.clone({
        setHeaders:{
          'Authorization':`Bearer ${token}`
        }
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}