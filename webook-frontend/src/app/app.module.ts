import { APP_INITIALIZER, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StateService } from './state.service';
import { AddtokenInterceptor } from './addtoken.interceptor';

function bootstrap(stateService: StateService) {
  return () => {
    const persisted_state = localStorage.getItem('APP_STATE');
    if (persisted_state) {
      stateService.setState(JSON.parse(persisted_state));
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'signin'}, 
      { path: 'signin', component: SignInComponent}, 
      { path: 'signup', component: SignUpComponent}, 
      { 
        path: 'rooms', 
        loadChildren: () => import('./rooms/rooms.module').then(module => module.RoomsModule),
        canActivate: [() => inject(StateService).isLoggedIn()]
      },{ 
        path: 'reservations', 
        loadChildren: () => import('./reservations/reservations.module').then(module => module.ReservationsModule),
        canActivate: [() => inject(StateService).isLoggedIn()]
      },               
      { path: '**', redirectTo: 'signin'}, 
    ]),
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: bootstrap, deps: [StateService], multi:true},
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: AddtokenInterceptor}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


