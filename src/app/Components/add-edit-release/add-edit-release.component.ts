import { Component, OnInit,Inject } from '@angular/core';
import { ReleasesClient,SprintsClient, CreateReleaseRequest, EditReleaseRequest, GetSprintStatusData}from 'src/app/services/issue-tracker.service';
import { FormGroup,FormControl, Validators ,FormBuilder} from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-release',
  templateUrl: './add-edit-release.component.html',
  styleUrls: ['./add-edit-release.component.scss']
})
export class AddEditReleaseComponent implements OnInit {
  
  releaseId:number=0;
  minDate:Date;
  minEndDate:Date;
  maxDate:Date;
  editMode = false;
  pageTitle: string;
  releaseForm:FormGroup;
  AddButton=true;
  release:ReleasesClient = new ReleasesClient(this.http,""); 
  sprint:SprintsClient= new  SprintsClient(this.http,"");
  public SprintStatus;

  constructor(private location: Location,private fb:FormBuilder,
            public dialogRef: MatDialogRef<AddEditReleaseComponent>,
             @Inject(MAT_DIALOG_DATA)public data:any,private route:ActivatedRoute,private http:HttpClient)
  {
    const currentYear = new Date().getFullYear();
      const today=new Date().getDate();
      const month=new Date().getMonth();
      this.minDate = new Date(currentYear , month, today);
      this.maxDate = new Date(currentYear + 1, 11, 31);
      this.minEndDate=new Date(currentYear , month, today);
  }

  ngOnInit() {     
    this.createForm();
    this.releaseId=this.data.id?this.data.id:''
    this.editMode=this.data.id!=0;
    this.initForm();    
    this.pageTitle=this.editMode?'Edit Release':'Add Release';  
  }

  sprintStatuslist= this.sprint.getSprintStatusList().subscribe(res=>{
    this.SprintStatus=res as GetSprintStatusData[];   
  });

  createForm() {
    this.releaseForm=this.fb.group({      
      releaseId:this.releaseId?this.releaseId:'',
      releaseName:['',[Validators.required,Validators.minLength(5)]],     
      startDate:'',
      endDate:'',
      createdBy:'',
      sprintStatusId:['']
    });     
  }

  private initForm()  {
    if(this.editMode){  
       this.release.getRelease(this.data.id).subscribe(res=>{
         this.releaseForm.setValue(res);
      });
      this.AddButton=false;
   }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.releaseForm.controls[controlName].hasError(errorName);
  }
  
  closeDialog(){ 
    this.dialogRef.close(); 
  }
  
  addEvent(event: MatDatepickerInputEvent<Date>) {
    const startDate=event.value.getDate();
    const curentyear=event.value.getFullYear();
    const currentMonth=event.value.getMonth();
    this.minEndDate=new Date(curentyear,currentMonth,startDate+1);    
  }
    
  onSubmit(){
    if(this.releaseForm.valid){
      if(!this.editMode){   
        console.log(this.releaseForm.value);     
        this.createRelease(this.releaseForm.value);
      }else{
        this.updateRelease(this.releaseForm.value);
      } 
    }
   }
 
   createRelease(formvalues){   
      
       let newRelease: CreateReleaseRequest = new CreateReleaseRequest();
       newRelease.releaseName = formvalues.releaseName;
       newRelease.startDate =formvalues.startDate;
       newRelease.endDate = formvalues.endDate;
      // newSprint.sprintStatusId=formvalues.sprintStatusId;
       this.release.postRelease(newRelease).subscribe(res=>{
           console.log(res);
         },error=>{
           console.log(error);
         }
       );
       this.dialogRef.close();
   }

   updateRelease(formvalues) {      
      let updateRelease: EditReleaseRequest = new EditReleaseRequest();      
      updateRelease.releaseName = formvalues.releaseName;
      updateRelease.startDate = formvalues.startDate;
      updateRelease.endDate = formvalues.endDate;
      updateRelease.releaseId=this.releaseId;
      updateRelease.sprintStatusId=formvalues.sprintStatusId;

      this.release.putRelease(updateRelease).subscribe(res=>{
          console.log(res);
        },error=>{
          console.log(error);
        }
      );
      this.dialogRef.close();
   }
}
