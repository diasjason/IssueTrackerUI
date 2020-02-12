import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest ,HttpHeaders} from '@angular/common/http';

 import { BehaviorSubject } from 'rxjs'; 
import { map } from 'rxjs/operators';

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

  constructor(private http: HttpClient) {
    //super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = "https://localhost:44322";
  }

  //   register(email: string, password: string, firstName: string, lastName: string,location: string): Observable<UserRegistration> {
  //   let body = JSON.stringify({ email, password, firstName, lastName,location });
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });

  //   return this.http.post(this.baseUrl + "/accounts", body, options)
  //     .map(res => true);
  //     //.catch(this.handleError);
  // }  

   login(userName, password) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.baseUrl+'/api/SignIn',JSON.stringify({userName,password}),{headers})
    .pipe(map((response:Response)=>response.json()),
          map(res => {
            console.log(res,"service");
         // localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
          this._authNavStatusSource.next(true);
          return true;})
    );
    // return this.http
    //   .post(
    //   this.baseUrl + '/api/SignIn',
    //   JSON.stringify({ userName, password }),{ headers }
    //   )
    //   .map(res => res.json())
    //   .map(res => {
    //     localStorage.setItem('auth_token', res.auth_token);
    //     this.loggedIn = true;
    //     this._authNavStatusSource.next(true);
    //     return true;
    //   });
      //.catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}