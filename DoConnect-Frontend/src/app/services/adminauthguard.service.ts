import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminauthguardService implements CanActivate{
  router: any;

  constructor(private authenticationService:AuthenticationService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let tokenPayload = this.authenticationService.decodeToken();
    if(!tokenPayload || tokenPayload.authorities!="[ROLE_ADMIN]"){
      alert('Invalid User!');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  }
