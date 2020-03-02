import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { IssuesClient, GetIssueData, GetSprintData } from 'src/app/services/issue-tracker.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit{
   
  baseurl="https://localhost:44322";
  issues:IssuesClient = new IssuesClient(this.http,this.baseurl); 
  public issueList;  
  public TodoList:GetIssueData[]=[];
  public InProgressList:GetIssueData[]=[];
  public CompletedList:GetIssueData[]=[];

  constructor(private route:ActivatedRoute,private router:Router,
    private matDialog:MatDialog,private _snackBar:MatSnackBar,
    private http:HttpClient) { }

  ngOnInit() {
      this.getIssuesist();
  }

  getIssuesist()  {
    this.issues.getIssueList().subscribe(res=>{  
      this.issueList=res as GetIssueData[];  
      this.SortIssues(this.issueList);  
    });    
  }

  SortIssues(issueList)
  {
    var i:number;
    var count=issueList.length;
    for(i=0;i<count;i++)
    {
      if(issueList[i].statusName=="TODO"){        
        this.TodoList.push(issueList[i]);
      }else if(issueList[i].statusName=="IN PROGRESS"){        
        this.InProgressList.push(issueList[i]);
      }else if(issueList[i].statusName=="COMPLETED"){        
        this.CompletedList.push(issueList[i]);
      }
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    const id=event.container.id;
    console.log(id);

//event.container.data[event.currentIndex]['id'];
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    console.log(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);   
      const y=event.container.data.length;
      const index=event.currentIndex;   
        if(index>=y/2)
        {
          console.log(y/2);
        }else{
          console.log(index,id);
        }  
    }
  }

  

}
