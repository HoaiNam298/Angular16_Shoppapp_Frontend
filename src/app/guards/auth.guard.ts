import { inject, Injectable } from '@angular/core';
import { TokenService } from '../service/token.service';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { elementAt } from 'rxjs';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(
    private tokenService: TokenService,
    private router: Router
    ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isTokenExpired = this.tokenService.isTokenExpired();
    const isUserIdValid = this.tokenService.getUserId() > 0;
    debugger
    if(!isTokenExpired && isUserIdValid) {
        return true;
    } else {
        this.router.navigate(['/login']);
        return false;
    }
  }
}

export const AuthGuardFn: CanActivateFn = (
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean => {
    debugger
    return inject(AuthGuard).canActivate(next, state);
}
