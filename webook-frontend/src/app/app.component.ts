import { Component, OnDestroy, inject } from '@angular/core';
import { IState, StateService, initial_state } from './state.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy{
  state!: IState;
  subscription!: Subscription;
  private stateService = inject(StateService);
  private router = inject(Router);

  constructor() {
    this.subscription = this.stateService.getState().subscribe((state) => {
      this.state = state;
    });
  }

  goToSignIn() {
    this.router.navigate(['', 'signin']);
  }

  goToSignUp() {
    this.router.navigate(['', 'signup']);
  }

  signOut() {
    this.stateService.setState(initial_state);
    localStorage.clear();
    this.router.navigate(['', 'signin']);
  }
  goToReservations(){
    this.router.navigate(['/reservations']);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
