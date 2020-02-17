import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';
import { map,catchError} from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(private userService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const re='/SignIn';
        const token=localStorage.getItem('auth_token');
       debugger;
       // let currentUser = this.userService.currentUserValue;
        // if(request.url.search(re)===-1){
        // //if (currentUser && currentUser.token) {
        //     debugger;
        //     request = request.clone({
        //         setHeaders: {
        //             Authorization: `${token}` }
        //     });
        // //}
        // }
        if(token){
            request = request.clone({ 
                headers: request.headers.set('Authorization',"Bearer "+token) 
            });
        }
        return next.handle(request).
        pipe(map((event:HttpEvent<any>)=>{
            if(event instanceof HttpResponse){
                console.log('event',event);
            }
            return event;
        })) ;
    }
}

// export class TokenInterceptor
// {

// }
