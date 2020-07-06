import { Component, OnInit } from '@angular/core';

import { DataService } from '../shared/data.service';
import { Photo } from '../shared/photo';
import { NotificationService } from '../shared/notification.service';


@Component({
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.css']
})
export class GalleryViewComponent implements OnInit {

  photos: Photo[];

  constructor(private dataService: DataService,
              private notificationService: NotificationService) {  }

  ngOnInit(): void {
    this.dataService.getPhotos().subscribe(
      resp => this.photos = resp,
      err => this.notificationService.error("There was a problem fetching the photos at this point. Please try again later.")
    );
  }

}
