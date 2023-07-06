import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IReservation, ReservationService } from '../reservation.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.css']
})
export class ListReservationsComponent implements OnInit, OnDestroy {

  reservationService = inject(ReservationService);
  reservations!: IReservation[];
  subscription!: Subscription;
  router = inject(Router);


  ngOnInit(): void{
    this.subscription =  this.reservationService.getAllReservationsForUser().subscribe(res=>{
      if(res.success){
        this.reservations = res.data;
      }
    })
  }
  
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
