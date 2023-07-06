import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IReservation, ReservationService, initial_reservation } from '../reservation.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css'],
})
export class AddReservationComponent implements OnInit, OnDestroy{
  reservationService = inject(ReservationService);
  activedRouter = inject(ActivatedRoute);
  subscription!: Subscription;
  router = inject(Router);
  roomId!: string;
  private notification = inject(ToastrService);
  createdReservation = initial_reservation

  reservationForm = inject(FormBuilder).nonNullable.group({
    guest_name: ['', Validators.required],
    guest_phone: ['', Validators.required],
    checkInDate: ['', Validators.required],
    checkOutDate: ['', Validators.required],
  });


  ngOnInit(): void {
    this.roomId = this.activedRouter.snapshot.params['room_id'];
  }

  bookNow() {
    const formValue = this.reservationForm.value;
    const reservation: any = {
      guest: {
        name: formValue.guest_name,
        phone: formValue.guest_phone
      },
      checkInDate: formValue.checkInDate,
      checkOutDate: formValue.checkOutDate
    }
    this.subscription = this.reservationService.addNewReservation(this.roomId, reservation).subscribe((res)=>{
      if(res.success){
        this.createdReservation = res.data;
        this.notification.success('Room booked successfully!');
      }
    }, (error)=>{
      this.notification.error(error.error.error);
    });
  }

  goBackToList(){
    this.router.navigate(['', 'rooms']);
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }
}
