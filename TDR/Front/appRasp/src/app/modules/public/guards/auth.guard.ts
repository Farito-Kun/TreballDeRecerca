import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

//Service
import { LoginService } from '../../../services/login.service';

//Router
import { Router } from '@angular/router';

//Alerts
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: LoginService,
    private router: Router,
    private toast: ToastrService,
  ){}

  canActivate(
    next:ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      if (this.auth.autentificado) return true;
      this.toast.error('Acceso denegado.', 'Error...', {
        timeOut: 3000,
      });

      this.router.navigate(['login'])
      return false;
  }
  
}
