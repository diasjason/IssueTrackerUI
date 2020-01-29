import { Component, OnInit } from '@angular/core';
import { SprintsClient, CreateSprintRequest}from 'src/app/services/issue-tracker.service';
import { FormGroup,FormControl, Validators ,FormBuilder} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'add-edit-sprint',
  templateUrl: './add-edit-sprint.component.html',
  styleUrls: ['./add-edit-sprint.component.scss']
})
export class AddEditSprintComponent implements OnInit {

  sprintForm:FormGroup;
  constructor(private location: Location,private fb:FormBuilder) { }

  ngOnInit() {

    this.sprintForm=this.fb.group({
      sprintName:['',[Validators.required,Validators.minLength(5)]],
      sprintPoints:['',Validators.required],
      startDate:'',
      EndDate:[''],
      createdBy:'placi'
    }); 
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.sprintForm.controls[controlName].hasError(errorName);
  }
 
  public onCancel = () => {
    this.location.back();
  } 
  
  onSubmit(){
    if(this.sprintForm.valid){
        this.CreateSprint(this.sprintForm.value);
    }
   }
 
   CreateSprint(formvalues){
       let sprint:SprintsClient = new SprintsClient();
       
       let newSprint: CreateSprintRequest = new CreateSprintRequest();
       newSprint.sprintName = formvalues.sprintName;
       newSprint.sprintPoints = formvalues.sprintPoints;
       newSprint.startDate = new Date();
       newSprint.endDate = new Date();
       sprint.postSprint(newSprint).then(res=>{
           console.log(res);
         },err=>{
           console.log(err);
         }
       );
   }

}
