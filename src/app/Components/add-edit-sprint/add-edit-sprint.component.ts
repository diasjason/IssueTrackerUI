import { Component, OnInit } from '@angular/core';
import { SprintsClient, CreateSprintRequest}from 'src/app/services/issue-tracker.service';
import { FormGroup, Validators ,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-add-edit-sprint',
  templateUrl: './add-edit-sprint.component.html',
  styleUrls: ['./add-edit-sprint.component.scss']
})
export class AddEditSprintComponent implements OnInit {

  sprintForm:FormGroup;
  constructor(private fb:FormBuilder) { }

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
       
       let newSprint: CreateSprintRequest = new CreateSprintRequest();
       newSprint.sprintName = formvalues.sprintName;
       newSprint.sprintPoints = formvalues.sprintPoints;
       newSprint.startDate = new Date();
       newSprint.endDate = new Date();
       sprint.postSprint(newSprint);
   }
}
