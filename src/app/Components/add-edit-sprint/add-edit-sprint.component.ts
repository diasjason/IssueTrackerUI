import { Component, OnInit, Inject, Optional } from '@angular/core';
import { SprintsClient, CreateSprintRequest, GetSprintData}from 'src/app/services/issue-tracker.service';
import { FormGroup,FormControl, Validators ,FormBuilder} from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'add-edit-sprint',
  templateUrl: './add-edit-sprint.component.html',
  styleUrls: ['./add-edit-sprint.component.scss']
})
export class AddEditSprintComponent implements OnInit {

  sprintForm:FormGroup;

  constructor(private location: Location,private fb:FormBuilder,
            public dialogRef: MatDialogRef<AddEditSprintComponent>,
             @Inject(MAT_DIALOG_DATA)public data:any) 
    {console.log(data,"ee"); }


  ngOnInit() {   
  console.log("sf");
    this.sprintForm=this.fb.group({
      sprintName:['',[Validators.required,Validators.minLength(5)]],
      sprintPoints:['',Validators.required],
      startDate:'',
      endDate:'',
      createdBy:''
    }); 

    let sprint:SprintsClient = new SprintsClient();
    let sprintdata:GetSprintData;
      sprint.getSprint(this.data.id).then(res=>{
      console.log(res,"resed"); 
       this.sprintForm.setValue(res);
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.sprintForm.controls[controlName].hasError(errorName);
  }
 
  public onCancel = () => {
   // this.location.back();
  } 
  closeDialog(){ 
    this.dialogRef.close(); 
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
         },error=>{
           console.log(error);
         }
       );
   }

}
