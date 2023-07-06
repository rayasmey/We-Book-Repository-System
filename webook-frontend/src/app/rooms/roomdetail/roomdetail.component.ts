import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IRoom, RoomService } from '../room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IState, StateService, initial_state } from 'app/state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-roomdetail',
  templateUrl: './roomdetail.component.html',
  styleUrls: ['./roomdetail.component.css']
})
export class RoomdetailComponent implements OnInit, OnDestroy {
  roomService = inject(RoomService);
  activedRouter = inject(ActivatedRoute);
  router = inject(Router);
  state!: IState;
  stateService = inject(StateService);
  private notification = inject(ToastrService)
  subscription!: Subscription;
  room!: IRoom;
  selectedImage!: File
  roomId!: string;

  ngOnInit(): void {
    this.roomId = this.activedRouter.snapshot.params['room_id'];
    this.subscription = this.roomService.getRoomById(this.roomId).subscribe(res=>{
      this.room = res.data
    });
     this.stateService.getState().subscribe(state=> {this.state = state});
  }

  deleteRoom(){
    this.subscription = this.roomService.deleteRoom(this.roomId).subscribe((res)=>{
      if(res.success){
        this.notification.success('Room deleted successfully');
        this.router.navigate(['', 'rooms']);
      }
    }, (error)=>{
      this.notification.error(error.error.error);
    })
  }

  onFileSelection(event: any){
    this.selectedImage = event.target.files[0];
  }
  gotToRoomUpdate(){
    this.router.navigate(['rooms', 'update', this.room._id]);
  }
  addPicture(){  
    this.subscription = this.roomService.addPictureToRoom(this.selectedImage, this.roomId).subscribe((res)=>{
      if(res.success){
        this.notification.success('Picture added successfully');
      }
    }, (error)=>{
      this.notification.error(error.error.error);
    })
  }
  goToAddReservation(){
     this.router.navigate(['/reservations/add/' + this.roomId]);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
