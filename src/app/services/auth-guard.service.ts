import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { reject } from 'q';
import * as firebase from 'firebase'
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  path
  route
  constructor(
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          user =>{
            if(user) {
              resolve(true)
            }else {
              resolve(false)
              this.router.navigate(['/auth', 'signin'])
            }
          }
        )
      }
    )
  }
}
