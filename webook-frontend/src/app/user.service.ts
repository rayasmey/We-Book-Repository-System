import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  signin(data: IUser) {
    return this.http.post<{ success: true; data: any }>(environment.HTTP_SERVER + '/users/login', data);
  }

  signup(user: IUser) {
    return this.http.post<{ success: true; data: any }>(environment.HTTP_SERVER + '/users/signup', user);
  }
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  password: string;
}
export interface IPayload{
  _doc: {
    _id: string;
    name: string;
    email: string;
    role: string;
    password: string;
  }
}