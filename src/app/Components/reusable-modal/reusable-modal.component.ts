import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { SprintsClient, ReleasesClient, SuccessResponse, IssuesClient } from 'src/app/services/issue-tracker.service';
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
  issue:IssuesClient=new IssuesClient(this.http,"");
  
  constructor(  public dialogRef: MatDialogRef<ReusableModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,private userService:UserService,private _snackBar:MatSnackBar,private http:HttpClient)
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
        this._snackBar.open(res.message,"OK",{
          duration:2000,
        });
      });
    }
    else if(this.modalData.name=="Release") {
      this.release.deleteRelease(this.Id).subscribe(res=>{
        this._snackBar.open(res.message,"OK",{
          duration:2000,
        });
      });
    } 
   else if(this.modalData.name=="Issue") {
     debugger;
      this.issue.deleteIssue(this.Id).subscribe(res=>{
        this._snackBar.open(res.message,"OK",{
          duration:2000,
        });
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
