import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest ,HttpHeaders} from '@angular/common/http';

 import { BehaviorSubject, Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { CreateSignInUserRequest } from '../Components/CreateSignInUserRequest';

// Add the RxJS Observable operators we need in this app.
//import '../../rxjs-operators';

@Injectable({
  providedIn: 'root'
})

export class UserService  {

  baseUrl: string = '';
  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();
  private loggedIn = false;


  
  private currentUserSubject: BehaviorSubject<string>;  
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    //super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = "https://localhost:44322";

    
  // this.currentUserSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('auth_token')));
    //this.currentUser = this.currentUserSubject.asObservable();
  }
 // public get currentUserValue(): any {

   // return this.currentUserSubject.value;
//}
  //   register(email: string, password: string, firstName: string, lastName: string,location: string): Observable<UserRegistration> {
  //   let body = JSON.stringify({ email, password, firstName, lastName,location });
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });

  //   return this.http.post(this.baseUrl + "/accounts", body, options)
  //     .map(res => true);
  //     //.catch(this.handleError);
  // }  

  //  login(Username, Password) {
  //     let headers = new HttpHeaders();    
  //     console.log(Username,Password,"service");
  //     headers.append('Content-Type', 'application/json');   
  //   return this.http.post(this.baseUrl+'/api/SignIn',JSON.stringify({Username,Password}),{headers})
  //   .pipe(map((response:Response)=>response.json()),
  //         map(res => {
  //           console.log(res,"service");
  //        // localStorage.setItem('auth_token', res.auth_token);
  //         this.loggedIn = true;
  //         this._authNavStatusSource.next(true);
  //         return true;})
  //   );      
  // }

  LoginMethod(createSignInUserRequest:CreateSignInUserRequest) :Observable<any>{ 
    let url="https://localhost:44322/api/SignIn/";
    
    return this.http.post<any>(url,createSignInUserRequest).
    pipe(map(res => {      
           localStorage.setItem('auth_token', res.token);
           console.log('token-',res.token);
          this.loggedIn = true;
         // this._authNavStatusSource.next(true);
          //this.currentUserSubject.next(res);
          return true;}));
  }

  logout() {
    debugger;
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}