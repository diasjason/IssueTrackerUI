import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { SprintsClient, CreateSprintRequest, GetSprintData, Sprint}from 'src/app/services/issue-tracker.service';
import { FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatSort,MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { AddEditSprintComponent } from '../add-edit-sprint/add-edit-sprint.component';
import { ReusableModalComponent } from '../reusable-modal/reusable-modal.component';
import { UserService } from 'src/app/services/user.service';
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
  public displayedColumns = ['sprintName','sprintPoints', 'startDate','endDate','details','update', 'delete'];
  

   @ViewChild(MatSort,{static:false}) sort: MatSort;
   @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;     
   sprint:SprintsClient = new SprintsClient(this.http,""); 

  constructor(private route:ActivatedRoute,private router:Router,private matDialog:MatDialog,private userService:UserService,private http:HttpClient)
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
    console.log("sprint");
    this.sprint.getSprints().pipe(map(res=>{              
       this.dataSource.data = res as GetSprintData[];   
            
    }));    
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

  LogOut()
  {this.userService.logout();
  }
}
