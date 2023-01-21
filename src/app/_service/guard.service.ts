import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router,
    private jwtHelper: JwtHelperService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (!this.loginService.esLogeado) {
      this.loginService.cerrarSesion();
      return false;
    }

    

    let url = state.url;

    if (url === '/inicio' || url === '/') {
      return true;
    }
    
    this.router.navigate(['not-403']);
    return false;

  }

}

