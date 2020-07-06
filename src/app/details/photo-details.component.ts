import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Photo } from '../shared/photo';
import { DataService } from '../shared/data.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit, OnDestroy {

  id: number;
  photo: Photo;
  private ngUnsubscribe = new Subject();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService,
              private notificationService: NotificationService) { }
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getPhoto() {
    // implement the error function too
    this.dataService.getPhoto(this.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
      (photo) => this.photo = photo,
      (err) => { this.notificationService.error(err) }
    );
  }

  deletePhoto() {
    const confirmation = confirm("Are you sure you wish to delete this photo? This step cannot be reversed");
    if (confirmation) {
      // delete the image using the data service
      this.dataService.deletePhoto(this.id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
        (resp) => {
          this.notificationService.success("Photo deleted successfully!");
          this.router.navigate(['/gallery']);
        },
        (err) => this.notificationService.error("There was an error trying to delete the picture. Please try again later.")
      )
    }
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.id = id;
    // now fetch the appropriate photo object
    this.getPhoto();
  }

}
