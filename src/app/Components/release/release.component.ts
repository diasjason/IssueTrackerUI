import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { CreateReleaseRequest, GetReleaseData, Release, ReleasesClient}from 'src/app/services/issue-tracker.service';
import { FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatSort,MatPaginator, MatDialogConfig, MatDialog} from '@angular/material';
import { AddEditReleaseComponent } from '../add-edit-release/add-edit-release.component';
import { ReusableModalComponent } from '../reusable-modal/reusable-modal.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit {

  public dataSource = new MatTableDataSource<GetReleaseData>();
  
  public displayedColumns = ['releaseName', 'startDate','endDate','sprintStatusName','update','delete'];
  release:ReleasesClient = new ReleasesClient(this.http,"");

   @ViewChild(MatSort,{static:false}) sort: MatSort;
   @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;   

  constructor(private route:ActivatedRoute,private router:Router,private matDialog:MatDialog,private http:HttpClient)
   {    }

  ngOnInit() {   
      this.getReleaseList();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;    
    this.dataSource.paginator = this.paginator;
  }
  
  getReleaseList() {
    this.release.getReleaseList().subscribe(res=>{     
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
  // public redirectToDetails(id):void{}

  openModal() {
    const dialogConfig = new MatDialogConfig();   
    let model=this.matDialog.open(AddEditReleaseComponent,{ data:{id:0}});  
    model.afterClosed().subscribe(res=>{
      this.getReleaseList();
    });
  }
 
  openCofirmationModal(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "Release-component";
    dialogConfig.height = "150px";
    dialogConfig.width = "400px";
    dialogConfig.data = {
      name: "Release",
      title: "Are you sure you want to Delete?",
      actionButtonText: "Delete",
      Id:id
    }
    const modalDialog = this.matDialog.open(ReusableModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(res=>{      
      this.getReleaseList();
    });
  }
}

