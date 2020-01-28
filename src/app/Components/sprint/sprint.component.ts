import { Component, OnInit } from '@angular/core';
import { SprintsClient, CreateSprintRequest}from 'src/app/services/issue-tracker.service';
import { FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnInit {

  sprintForm:FormGroup;
  constructor(private route:ActivatedRoute,private router:Router,private fb:FormBuilder)
   { }

  ngOnInit() {
    
      this.sprintForm=this.fb.group({
        sprintName:['',[Validators.required,Validators.minLength(5)]],
        sprintPoints:['',Validators.required],
        startDate:'2020/04/02',
        EndDate:'2020/05/03',
        createdBy:'placi'
      });  
  }

  onSubmit(){
    this.CreateSprint(this.sprintForm.value);
   }
 
   CreateSprint(formvalues){
       let sprint:SprintsClient = new SprintsClient();
       
       let newSprint: CreateSprintRequest = new CreateSprintRequest();;
       newSprint.sprintName = formvalues.sprintName;
       newSprint.sprintPoints = formvalues.sprintPoints;
       newSprint.startDate = new Date();
       newSprint.endDate = new Date();
       sprint.postSprint(newSprint);
   }
}
