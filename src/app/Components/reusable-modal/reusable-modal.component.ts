import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SprintsClient } from 'src/app/services/issue-tracker.service';

@Component({
  selector: 'app-reusable-modal',
  templateUrl: './reusable-modal.component.html',
  styleUrls: ['./reusable-modal.component.scss']
})
export class ReusableModalComponent implements OnInit {
  sprintId:number=0;
  sprint:SprintsClient = new SprintsClient();
  
  constructor(  public dialogRef: MatDialogRef<ReusableModalComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: any
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
