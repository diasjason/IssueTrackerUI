import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { SprintsClient, CreateSprintRequest, GetSprintData, Sprint}from 'src/app/services/issue-tracker.service';
import { FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatSort,MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { AddEditSprintComponent } from '../add-edit-sprint/add-edit-sprint.component';
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
  
  getSprintList()  {
    this.sprint.getSprints().then(res=>{              
       this.dataSource.data = res as GetSprintData[];        
    });    
  }

  public redirectToUpdatePage(id):void{     
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(AddEditSprintComponent,{ data:{id}});    
  }
  public redirectToDetails(id):void{    
  }

  public redirectToDelete(id):void  {
    this.openCofirmationModal(id);
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();   
    this.matDialog.open(AddEditSprintComponent,{ data:{id:0}});  
  }
 
  openCofirmationModal(id) {
    const dialogConfig = new MatDialogConfig();
   // dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "150px";
    dialogConfig.width = "400px";
    dialogConfig.data = {
      name: "Delete",
      title: "Are you sure you want to Delete?",
      actionButtonText: "Delete",
      SprintId:id
    }
    const modalDialog = this.matDialog.open(ReusableModalComponent, dialogConfig);
  }
}
