import { Injectable, OnDestroy, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { StateService } from './state.service';

@Injectable()
export class AddtokenInterceptor implements HttpInterceptor {
  private stateService = inject(StateService);
  private subscription!: Subscription;
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    const token = this.stateService.getToken();
      if(token){
        const clone = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + token)
        })
        return next.handle(clone);
      }
      else{
        return next.handle(request);
      }
    }
}

