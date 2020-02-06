
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { SprintsClient, CreateSprintRequest, EditSprintRequest, GetSprintStatusData}from 'src/app/services/issue-tracker.service';
import { FormGroup,FormControl, Validators ,FormBuilder} from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-aesprint',
  templateUrl: './add-edit-sprint.component.html',
  styleUrls: ['./add-edit-sprint.component.scss']
})
export class AddEditSprintComponent implements OnInit {
  sprintId:string='';
  editMode = false;
  //pageTitle: string;
  //buttonText: string;
  sprintForm:FormGroup;
  AddButton=true;
  sprint:SprintsClient = new SprintsClient(); 
  public SprintStatus;

  constructor(private location: Location,private fb:FormBuilder,
            public dialogRef: MatDialogRef<AddEditSprintComponent>,
             @Inject(MAT_DIALOG_DATA)public data:any,private route:ActivatedRoute)  { }


  ngOnInit() {   
    this.createForm();
    this.sprintId=this.data.id?this.data.id:''
    this.editMode=this.data.id!=0;
    this.initForm();
    //this.pageTitle=this.editMode?'Edit Sprint':'Add Sprint';  
  }

  //dynamically bind sprint status dropdown here
  sprintStatuslist= this.sprint.getSprintStatusList().then(res=>{
    this.SprintStatus=res as GetSprintStatusData[];   
  });

  createForm()
  {
    this.sprintForm=this.fb.group({      
      sprintId:this.sprintId?this.sprintId:'',
      sprintName:['',[Validators.required,Validators.minLength(5)]],
      sprintPoints:['',Validators.required],
      startDate:'',
      endDate:'',
      createdBy:'',
      sprintStatusId:['']
    });     
  }
  private initForm()
  {
    if(this.editMode){  
       this.sprint.getSprint(this.data.id).then(res=>{   
         this.sprintForm.setValue(res);
      });
      this.AddButton=false;
   }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.sprintForm.controls[controlName].hasError(errorName);
  }
  
  closeDialog(){ 
    this.dialogRef.close(); 
  }
  
  onSubmit(){
    if(this.sprintForm.valid){
      if(!this.editMode){   
        console.log(this.sprintForm.value);     
        this.createSprint(this.sprintForm.value);
      }else{
        this.updateSprint(this.sprintForm.value);
      } 
    }
   }
 
   createSprint(formvalues){    
       let newSprint: CreateSprintRequest = new CreateSprintRequest();
       newSprint.sprintName = formvalues.sprintName;
       newSprint.sprintPoints = formvalues.sprintPoints;
       newSprint.startDate =formvalues.startDate;
       newSprint.endDate = formvalues.endDate;
       newSprint.sprintStatusId=formvalues.sprintStatusId;
       this.sprint.postSprint(newSprint).then(res=>{
           console.log(res);
         },error=>{
           console.log(error);
         }
       );
       this.dialogRef.close();
       this.ngOnInit();
   }

   updateSprint(formvalues)
   {
      console.log(formvalues,"update");
      
      let updateSprint: EditSprintRequest = new EditSprintRequest();      
      updateSprint.sprintName = formvalues.sprintName;
      updateSprint.sprintPoints = formvalues.sprintPoints;
      updateSprint.startDate = formvalues.startDate;
      updateSprint.endDate = formvalues.endDate;
      updateSprint.sprintId=parseInt(this.sprintId);
      updateSprint.sprintStatusId=formvalues.sprintStatusId;

      this.sprint.putSprint(updateSprint).then(res=>{
          console.log(res);
        },error=>{
          console.log(error);
        }
      );
      this.dialogRef.close();
   }

   
}
