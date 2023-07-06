import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IRoom, RoomService } from 'app/rooms/room.service';
import { IState, StateService } from 'app/state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy{

  private stateService = inject(StateService);
  private router = inject(Router);
  subscription!:Subscription;
  private roomService = inject(RoomService);
  state!: IState;
  latitude!: number;
  longitude!: number;
  rooms!: IRoom[];

  ngOnInit(): void {
    this.subscription = this.stateService.getState().subscribe(state=>{this.state = state}); 
    if(!this.state._id){
      this.router.navigate(['', '']);
    }else{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          const ob = {
            location: [this.longitude, this.latitude]
          }
          this.subscription = this.roomService.getNearByRooms(ob).subscribe(res=>{this.rooms = res.data});
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}


}
