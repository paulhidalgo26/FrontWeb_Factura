import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { ApiAuthAdminService } from "../services/apiAuth/api-auth-admin.service";
import { ApiAuthClientService } from "../services/apiAuth/api-auth-client.service";


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    constructor(
        private router: Router,
        private apiAuthClientService: ApiAuthClientService,
        private apiAuthAdminService: ApiAuthAdminService
    ){}

    canActivate(route: ActivatedRouteSnapshot){
        const user = this.apiAuthClientService.userData;
        const userAdmin = this.apiAuthAdminService.userData;
        if(user || userAdmin){
            return true;
        }
        this.router.navigate(['./login']);
        return false;
    }
}