import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IReservation, ReservationService } from '../reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit, OnDestroy{
  reservationId!: string;
  reservationService = inject(ReservationService);
  activedRouter = inject(ActivatedRoute);
  subscription!: Subscription;
  router = inject(Router);
  reservation!: IReservation;
  notification = inject(ToastrService);
  
  


  ngOnInit(): void{
    this.reservationId = this.activedRouter.snapshot.params['reservation_id'];
    this.subscription = this.reservationService.getOneReservationForUser(this.reservationId).subscribe(res=>{
      this.reservation = res.data;
    });
  }

  goToUpdate(){
    return this.router.navigate(['reservations', 'update', this.reservationId]);
  }

  deleteReservation(){
    this.subscription = this.reservationService.deleteReservation(this.reservationId).subscribe((res)=>{
       if(res.success){
        this.notification.success('Reservation cancelled successfully');
        this.router.navigate(['/reservations']);
       }
    }, (error)=>{
      this.notification.error(error.error.error);
    })
  
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
