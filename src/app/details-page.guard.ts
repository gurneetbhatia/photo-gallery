import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { DataService } from './shared/data.service';
import { Photo } from './shared/Photo';
import { NotificationService } from './shared/notification.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsPageGuard implements CanActivate {

  constructor(private dataService: DataService,
              private router: Router, 
              private notificationService: NotificationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const id = +next.params['id'];
      if (isNaN(id)) {
        this.notificationService.error("Invalid Photo ID!");
        this.router.navigate(['/gallery']);
        return false;
      }
      // now check if the id exists on the api
      return this.dataService.getPhoto(id)
        .toPromise()
        .then((photo: Photo) => {
          return true;
        })
        .catch((error) => {
          this.notificationService.error("Invalid Photo ID!");
          this.router.navigate(['/gallery']);
          return false;
        })
  }
  
}
