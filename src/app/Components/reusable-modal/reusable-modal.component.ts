import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SprintsClient, ReleasesClient, SuccessResponse } from 'src/app/services/issue-tracker.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reusable-modal',
  templateUrl: './reusable-modal.component.html',
  styleUrls: ['./reusable-modal.component.scss']
})
export class ReusableModalComponent implements OnInit {
  Id:number=0;
  sprint:SprintsClient = new SprintsClient(this.http,"");
  release:ReleasesClient=new ReleasesClient(this.http,"");
  message:string;
  constructor(  public dialogRef: MatDialogRef<ReusableModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,private userService:UserService,private http:HttpClient)
     { }

  ngOnInit() {
    this.Id=this.modalData.Id;
  }

  actionFunction() {   
    if(this.modalData.Id==0){
      this.userService.logout();
    }
    else if(this.modalData.name=="Sprint"){
      this.sprint.deleteSprint(this.Id).subscribe(res=>{
        this.message=res.message;
        console.log(res);
      });
    }
    else if(this.modalData.name=="Release") {
      this.release.deleteRelease(this.Id).subscribe(res=>{
        console.log(res);
      });
    }    
    this.closeModal();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
