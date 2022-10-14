import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardAccessService implements CanActivate {

  constructor(private service : UserService, private router:Router) { }

  canActivate(): boolean | Observable<boolean> {
    return this.service.isAuthenticated.pipe(map(
      data => {
        if(data == "admin"){
          return true
        }
        this.router.navigate(['movies']);
        return false;
      }
       
    ))
  }
}
