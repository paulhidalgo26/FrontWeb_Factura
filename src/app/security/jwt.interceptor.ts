import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiAuthClientService } from "../services/apiAuth/api-auth-client.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    constructor( private apiAuthService: ApiAuthClientService ){ }

    intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>>{
        const user = this.apiAuthService.userData;
        if(user){
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                }
            });
        }
        return next.handle(request);
    }
}