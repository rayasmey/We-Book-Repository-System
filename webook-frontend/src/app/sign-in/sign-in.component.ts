import { Component, OnDestroy, inject } from '@angular/core';
import { IPayload, IUser, UserService } from '../user.service';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnDestroy {
  private userService = inject(UserService);
  private stateService = inject(StateService);
  private subscription!: Subscription; 
  private router = inject(Router);
  private notification = inject(ToastrService);

  mySignInForm = inject(FormBuilder).nonNullable.group({
     email: ['', Validators.required],
     password: ['', Validators.required],
  });

  constructor(){
    this.subscription = this.stateService.getState().subscribe(state=>{
      if(state._id){
        this.router.navigate(['', 'rooms']);
      }
    })
  }

  signin() {
    this.subscription = this.userService.signin(this.mySignInForm.value as IUser).subscribe(
      (response) => {
        if(response.success){
          this.notification.success('Successfully logged in.');
          const encrypted_token = response.data;
          const decoded_token = jwt_decode(encrypted_token) as IPayload;
          const state = {
            ...decoded_token._doc,
            jwt: encrypted_token
          };
          this.stateService.setState(state);
          localStorage.setItem('APP_STATE', JSON.stringify(state));
          this.router.navigate(['', 'rooms']);
        }
      }, (err=>{
        this.notification.error(err.error.error);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


