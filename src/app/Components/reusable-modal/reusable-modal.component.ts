import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SprintsClient } from 'src/app/services/issue-tracker.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reusable-modal',
  templateUrl: './reusable-modal.component.html',
  styleUrls: ['./reusable-modal.component.scss']
})
export class ReusableModalComponent implements OnInit {
  sprintId:number=0;
  http:HttpClient;
  sprint:SprintsClient = new SprintsClient(this.http,"");
  
  constructor(  public dialogRef: MatDialogRef<ReusableModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any
    ) { }

  ngOnInit() {
    this.sprintId=this.modalData.SprintId;
  }

  actionFunction() {    
    this.sprint.deleteSprint(this.sprintId);
    this.closeModal();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
