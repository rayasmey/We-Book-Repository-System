import { Component, OnDestroy, inject } from '@angular/core';
import { IRoom, RoomService, initial_room } from '../room.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnDestroy{
  roomService = inject(RoomService);
  router = inject(Router);
  subscription!:Subscription
  private notification = inject(ToastrService);
  createdRoom = initial_room;

  addRoomForm = inject(FormBuilder).nonNullable.group({
    type: ['', Validators.required],
    price_per_day: ['', Validators.required],
    hotel_name: ['', Validators.required],
    longitude: ['', Validators.required],
    latitude: ['', Validators.required],
  });


  addNow() {
    const formValue = this.addRoomForm.value;
    const room: any = {
      type: formValue.type,
      price_per_day: formValue.price_per_day,
      hotel_name: formValue.hotel_name,
      location: [formValue.longitude, formValue.latitude]
    }
    this.subscription = this.roomService.addNewRoom(room).subscribe((res)=>{
      if(res.success){
        this.createdRoom = res.data;
        this.notification.success('Room added successfully!');
      }
    }, (error)=>{
      console.log(error.error.error)
      this.notification.error(error.error.error);
    });
  }

  goBackToList(){
    this.router.navigate(['', 'rooms']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
