import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { SprintsClient, CreateSprintRequest, GetSprintData, Sprint}from 'src/app/services/issue-tracker.service';
import { FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatSort,MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { AddEditSprintComponent } from '../add-edit-sprint/add-edit-sprint.component';
// import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnInit ,AfterViewInit{
   
  public dataSource = new MatTableDataSource<GetSprintData>();
  public displayedColumns = ['sprintName','sprintPoints', 'startDate','endDate','details','update', 'delete'];

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
    let sprint:SprintsClient = new SprintsClient();
    sprint.getSprints().then(res=>{
        console.log(res);       
       this.dataSource.data = res as GetSprintData[];        
    });
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    //dialogConfig.disableClose = true;
    dialogConfig.id = "add-edit-sprint";
    dialogConfig.height = "400px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview

    const modalDialog = this.matDialog.open(AddEditSprintComponent, dialogConfig);
  }
}
