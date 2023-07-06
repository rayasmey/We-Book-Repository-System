import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy, inject } from '@angular/core';
import { IState, StateService, initial_state } from '../state.service';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RoomService implements OnDestroy{
  private http = inject(HttpClient);
  private stateService = inject(StateService);
  private state!: IState;
  private subscription!: Subscription;
  
  constructor() {
    this.subscription =  this.stateService.getState().subscribe(res=>{this.state = res});
  }

  updateRoom(roomId: string, updated: IRoom){
    return this.http.put<{success: true, data: any}>(`${environment.HTTP_SERVER}/rooms/${roomId}`, updated);
  }

  deleteRoom(roomId: string){
    return this.http.delete<{success: true, data: any}>(`${environment.HTTP_SERVER}/rooms/${roomId}`);
  }

  addNewRoom(newRoom: IRoom){
    return this.http.post<{success: true, data: any}>(`${environment.HTTP_SERVER}/rooms`, newRoom);
  }
  addPictureToRoom(file: File, roomId: string){
    const formData: FormData = new FormData();
    formData.append('pictureName', file, file.name);
    return this.http.post<{success: true, data: any}>(`${environment.HTTP_SERVER}/rooms/${roomId}/pictures`, formData);
  }
  getRoomById(id: any){
    return this.http.get<{success: true, data: any}>(`${environment.HTTP_SERVER}/rooms/${id}`);
  }

  getNearByRooms(ob: any): Observable<any>{
    return this.http.post<{ success: true, data: IRoom[] }>(`${environment.HTTP_SERVER}/rooms/nearby`, ob);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}

export interface IRoom {
  _id: string;
  type: string;
  price_per_day: number;
  available: string;
  hotel_name: string;
  location: number[];
  pictures: { pictureName: string }[];
  reservations: {
    user_id: string;
    user_name: string;
    user_email: string;
    guest: {
      name: string;
      phone: string;
    };
    checkInDate: Date;
    checkOutDate: Date;
    hotel_name: string;
    room_type: string;
  }[];
}

export const initial_room = {
  _id: '',
  type: '',
  price_per_day: '',
  available: '',
  hotel_name: '',
  location: [],
  pictures: [],
  reservations: []
}