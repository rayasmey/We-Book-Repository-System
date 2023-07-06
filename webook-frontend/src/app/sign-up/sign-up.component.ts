import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from 'app/state.service';
import { IPayload, IUser, UserService } from 'app/user.service';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnDestroy{
  private userService = inject(UserService);
  private router = inject(Router);
  private notification = inject(ToastrService);
  private stateService = inject(StateService);
  private subscription!: Subscription;

  mySignUpForm = inject(FormBuilder).nonNullable.group({
    name: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required] 
  })

  signup(event: Event){
    this.subscription = this.userService.signup(this.mySignUpForm.value as IUser)
    .subscribe((res)=>{
      if(res.success){
        this.notification.success('Signed up successfully');
        const encrypted_token = res.data;
        const decoded_token = jwt_decode(encrypted_token) as IPayload;
          this.stateService.setState({
            ...decoded_token._doc,
            jwt: encrypted_token});
          
        this.router.navigate(['', 'user']);
      }
    }, (error)=>{
      this.notification.error(error.error.error);
    })
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
