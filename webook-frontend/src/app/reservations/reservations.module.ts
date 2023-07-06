import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { ListReservationsComponent } from './list-reservations/list-reservations.component';
import { UpdateReservationComponent } from './update-reservation/update-reservation.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddReservationComponent,
    ListReservationsComponent,
    UpdateReservationComponent,
    ReservationDetailComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: ListReservationsComponent},
      {path: 'add/:room_id', component: AddReservationComponent},
      {path: 'update/:reservation_id', component: UpdateReservationComponent},
      {path: ':reservation_id', component: ReservationDetailComponent}
    ])
  ]
})
export class ReservationsModule { }
