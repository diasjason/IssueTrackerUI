import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';
import { map,catchError} from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(private userService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     
        //const re='/SignIn';
        const token=localStorage.getItem('auth_token');
    
        if(token){
            request = request.clone({ 
                headers: request.headers.set('Authorization',"Bearer "+token) 
            });
        }
        return next.handle(request);
    }
}
