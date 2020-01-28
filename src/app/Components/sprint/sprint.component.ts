import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { SprintsClient, CreateSprintRequest, GetSprintData, Sprint}from 'src/app/services/issue-tracker.service';
import { FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnInit ,AfterViewInit{

   sprints:GetSprintData[];
   
  public dataSource = new MatTableDataSource<GetSprintData>();
  public displayedColumns = ['sprintName','sprintPoints', 'startDate','endDate','details','update', 'delete'];

   @ViewChild(MatSort,{static:false}) sort: MatSort;

  constructor(private route:ActivatedRoute,private router:Router)
   { 
     this.sprints=[];
   }

  ngOnInit() {   
      this.getSprintList();
      //this.dataSource.sort=this.sort;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  
  getSprintList()
  {
    let sprint:SprintsClient = new SprintsClient();
    sprint.getSprints().then(res=>{
        console.log(res);  
        this.sprints=res;      
       this.dataSource.data = res as GetSprintData[];        
    });
  }
  
}
