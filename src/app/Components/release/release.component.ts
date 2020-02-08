import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { CreateReleaseRequest, GetReleaseData, Release, ReleasesClient}from 'src/app/services/issue-tracker.service';
import { FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatSort,MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { AddEditReleaseComponent } from '../add-edit-release/add-edit-release.component';
import { ReusableModalComponent } from '../reusable-modal/reusable-modal.component';

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit {

  public dataSource = new MatTableDataSource<GetReleaseData>();
  public displayedColumns = ['releaseName', 'startDate','endDate','details','update', 'delete'];
  release:ReleasesClient = new ReleasesClient();

   @ViewChild(MatSort,{static:false}) sort: MatSort;
   @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;   

  constructor(private route:ActivatedRoute,private router:Router,private matDialog:MatDialog)
   { 
   }

  ngOnInit() {   
      this.getReleaseList();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;    
    this.dataSource.paginator = this.paginator;
  }
  
  getReleaseList()
  {
    //let sprint:SprintsClient = new SprintsClient();
    this.release.getReleaseList().then(res=>{              
       this.dataSource.data = res as GetReleaseData[];        
    });
    
  }

  public redirectToUpdatePage(id):void{     
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(AddEditReleaseComponent,{ data:{id}});    
  }

  public redirectToDelete(id):void  {
    this.openCofirmationModal(id);
  }
  public redirectToDetails(id):void{}

  openModal() {
    const dialogConfig = new MatDialogConfig();   
    this.matDialog.open(AddEditReleaseComponent,{ data:{id:0}});  
  }
 
  openCofirmationModal(id) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "150px";
    dialogConfig.width = "400px";
    dialogConfig.data = {
      name: "Delete",
      title: "Are you sure you want to Delete?",
    //  description: "Pretend this is a convincing argument on why you shouldn't logout :)",
      actionButtonText: "Delete",
      ReleaseId:id
    }
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ReusableModalComponent, dialogConfig);
  }
}

