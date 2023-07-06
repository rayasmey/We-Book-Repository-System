import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { RouterModule } from '@angular/router';
import { RoomdetailComponent } from './roomdetail/roomdetail.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    UpdateComponent,
    RoomdetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        {path: '', component: ListComponent},
        {path: 'add', component: AddComponent},
        {path: 'update/:room_id', component: UpdateComponent},
        {path: ':room_id', component: RoomdetailComponent},
    ])
  ]
})
export class RoomsModule { }
