import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { SprintsClient, CreateSprintRequest, GetSprintData, Sprint}from 'src/app/services/issue-tracker.service';
import { FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatSort,MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { AddEditSprintComponent } from '../add-edit-sprint/add-edit-sprint.component';
import { AESprintComponent } from '../aesprint/aesprint.component';
import { ReusableModalComponent } from '../reusable-modal/reusable-modal.component';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnInit ,AfterViewInit{
  
  public dataSource = new MatTableDataSource<GetSprintData>();
  public displayedColumns = ['sprintName','sprintPoints', 'startDate','endDate','details','update', 'delete'];
  sprint:SprintsClient = new SprintsClient();

   @ViewChild(MatSort,{static:false}) sort: MatSort;
   @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;   

  constructor(private route:ActivatedRoute,private router:Router,private matDialog:MatDialog)
   { 
   }

  ngOnInit() {   
      this.getSprintList();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;    
    this.dataSource.paginator = this.paginator;
  }
  
  getSprintList()
  {
    //let sprint:SprintsClient = new SprintsClient();
    this.sprint.getSprints().then(res=>{              
       this.dataSource.data = res as GetSprintData[];        
    });
    
  }

  public redirectToUpdatePage(id):void{     
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(AESprintComponent,{ data:{id}});    
  }

  public redirectToDelete(id):void  {
    this.openCofirmationModal(id);
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();   
    this.matDialog.open(AESprintComponent,{ data:{id:0}});  
  }
 
  openCofirmationModal(id) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      name: "Delete",
      title: "Are you sure you want to Delete?",
    //  description: "Pretend this is a convincing argument on why you shouldn't logout :)",
      actionButtonText: "Delete",
      SprintId:id
    }
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ReusableModalComponent, dialogConfig);
  }
}
