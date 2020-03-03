import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { SprintsClient, CreateSprintRequest, GetSprintData, Sprint}from 'src/app/services/issue-tracker.service';
import { FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatSort,MatPaginator, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { AddEditSprintComponent } from '../add-edit-sprint/add-edit-sprint.component';
import { ReusableModalComponent } from '../reusable-modal/reusable-modal.component';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnInit ,AfterViewInit{
  
  public dataSource = new MatTableDataSource<GetSprintData>();
 // private  http:HttpClient;
  public displayedColumns = ['sprintName','sprintPoints', 'startDate','endDate','sprintStatusName','update', 'delete'];
  baseurl="https://localhost:44322";

   @ViewChild(MatSort,{static:false}) sort: MatSort;
   @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;     
   sprint:SprintsClient = new SprintsClient(this.http,this.baseurl); 

  constructor(private route:ActivatedRoute,private router:Router,private matDialog:MatDialog,
    private _snackBar:MatSnackBar,private http:HttpClient)
   { 
   }
  ngOnInit() {   
      this.getSprintList();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;    
    this.dataSource.paginator = this.paginator;    
    this.getSprintList();
  }
  
  getSprintList()  {
    this.sprint.getSprints().subscribe(res=>{   
       this.dataSource.data = res as GetSprintData[];             
    });    
  }

  public redirectToUpdatePage(id):void{     
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(AddEditSprintComponent,{ data:{id}});  
  }
  // public redirectToDetails(id):void{    
  // }

  public redirectToDelete(id):void  {
    this.openCofirmationModal(id);
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();   
    let model= this.matDialog.open(AddEditSprintComponent,{ data:{id:0}});
    model.afterClosed().subscribe(res=>{
     this.getSprintList();
    });  
  }
 
  openCofirmationModal(id) {
    const dialogConfig = new MatDialogConfig();
   // dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "150px";
    dialogConfig.width = "400px";
    dialogConfig.data = {
      name: "Sprint",
      title: "Are you sure you want to Delete?",
      actionButtonText: "Delete",
      Id:id
    }
    const modalDialog = this.matDialog.open(ReusableModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(res=>{      
      this.getSprintList();      
    });
  }

  LogOut()
  {
    this.openLogOutModal();
    //this.userService.logout();
  }

  
  openLogOutModal() {
    const dialogConfig = new MatDialogConfig();
   // dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "150px";
    dialogConfig.width = "400px";
    dialogConfig.data = {
      name: "Logout",
      title: "Are you sure you want to Logout?",
      actionButtonText: "LogOut",
      Id:0
    }
    const modalDialog = this.matDialog.open(ReusableModalComponent, dialogConfig);
  }

}
