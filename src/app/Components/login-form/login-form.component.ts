import { Component, OnInit } from '@angular/core';
import{Subscription} from 'rxjs';
import {Router,ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
// import 'rxjs/add/operator/finally';
import { finalize } from 'rxjs/operators';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CreateSignInUserRequest } from '../CreateSignInUserRequest';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  private subscription: Subscription;

  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  credentials:CreateSignInUserRequest= { Username: '', Password: ''};
  token:string;
  expiration:Date;

  constructor(private userService:UserService,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.subscription=this.activatedRoute.queryParams.subscribe(
      (param:any)=>{
        this.brandNew=param['brandNew'],
        this.credentials.Username=param['userName']
      });
  }

  login({ value, valid }: { value: CreateSignInUserRequest, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    if (valid) {
      this.userService.LoginMethod(value)
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe(result => {  
            if (result) {
              this.router.navigate(['/Sprints']);             
             }
            },error =>
            this.errors = error);
    }
  }

}





// export interface CreateSignInUserRequest{
//   Username:string;
//   Password:string;
// }