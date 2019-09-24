import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(public localStr: LocalStorageService ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const fnd = this.localStr.retrieve('mcqz');
    if (fnd) {
      return true;
    } else {
      window.alert('Not allowed');
      return false;
    }

  }

}
