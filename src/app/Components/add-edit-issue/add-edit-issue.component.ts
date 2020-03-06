import { Component, OnInit,Inject} from '@angular/core';
import { IssuesClient,IssueStatusClient, CreateIssueRequest, EditIssueRequest, GetIssueData, GetIssueStatusData}from 'src/app/services/issue-tracker.service';
import { FormGroup,FormControl, Validators ,FormBuilder} from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-add-edit-issue',
  templateUrl: './add-edit-issue.component.html',
  styleUrls: ['./add-edit-issue.component.scss']
})
export class AddEditIssueComponent implements OnInit {

  issueId:number=0;
  editMode = false;
  pageTitle: string;
  issueForm:FormGroup;
  AddButton=true;
  issue:IssuesClient = new IssuesClient(this.http,""); 
  issueStatus:IssueStatusClient= new  IssueStatusClient(this.http,"");
  public issueStatusList;

  constructor(private http:HttpClient,private fb:FormBuilder,private dialogRef:MatDialogRef<AddEditIssueComponent>,
    private route:ActivatedRoute,private _snackBar:MatSnackBar,@Inject(MAT_DIALOG_DATA)public data:any) { }

  ngOnInit() {    
    this.createForm();
    this.issueId=this.data.id?this.data.id:'';
    this.editMode=this.data.id!=0;
    this.initForm();    
    this.pageTitle=this.editMode?'Edit Issue':'Add Issue';  
  }

  issues=this.issueStatus.getStatusList().subscribe(res=>{
    this.issueStatusList=res as GetIssueStatusData[];
  });

  createForm() {
    this.issueForm=this.fb.group({      
      issueId:this.issueId?this.issueId:'',
      subject:['',[Validators.required,Validators.minLength(5)]],     
      description:'',
      assignedTo:'',
      tags:'',
      issueStatusId:[''],
      statusName:'',
      createdBy:'',
      order:''
    });     
  }

  private initForm()  {
    if(this.editMode){  
       this.issue.getIssue(this.data.id).subscribe(res=>{
         this.issueForm.setValue(res);
      });
      this.AddButton=false;
   }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.issueForm.controls[controlName].hasError(errorName);
  }
  
  closeDialog(){ 
    this.dialogRef.close(); 
  }
  
  onSubmit(){
    if(this.issueForm.valid){
      if(!this.editMode){       
        this.createIssue(this.issueForm.value);
      }else{
        this.updateIssue(this.issueForm.value);
      } 
    }
   }
 
   createIssue(formvalues){   
       let newIssue: CreateIssueRequest = new CreateIssueRequest();
       newIssue.subject = formvalues.subject;
       newIssue.description =formvalues.description;
       newIssue.assignedTo = formvalues.assignedTo;
       newIssue.tags = formvalues.tags;
       newIssue.issueStatusId=formvalues.issueStatusId;
       this.issue.postIssue(newIssue).subscribe(res=>{           
           this._snackBar.open(res.message,"OK",{
             duration:2000,
           });
         },error=>{
          this._snackBar.open(error.message,"OK",{
            duration:2000,
          });
         }
       );
       this.dialogRef.close();
   }

   updateIssue(formvalues) {      
      let updateIssue: EditIssueRequest = new EditIssueRequest();      
      updateIssue.subject = formvalues.subject;
      updateIssue.description = formvalues.description;
      updateIssue.assignedTo = formvalues.assignedTo;      
      updateIssue.tags = formvalues.tags;
      updateIssue.issueId=this.issueId;
      updateIssue.issueStatusId=formvalues.issueStatusId;

      this.issue.putIssue(updateIssue).subscribe(res=>{
          this._snackBar.open(res.message,"OK",{
            duration:2000,
          });
        },error=>{this._snackBar.open(error.message,"OK",{
          duration:2000,
        });
        }
      );
      this.dialogRef.close();
   }
}
