import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('bearer-token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const decodedToken = decode(token);

    if (decodedToken['auth'] === 'ROLE_CUSTOMER') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
