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
  currentPage: number = 1;
  pageSize: number = 100;
  maxPage: number = 1;
  pages: number[] = [];

  constructor(private dataService: DataService,
              private notificationService: NotificationService) {  }

  loadPage(isInitial: boolean = false) {
    this.dataService.getPhotosPage(this.currentPage, this.pageSize).subscribe(
      (resp) => {
        if (isInitial) {
          this.dataService.maxId = +resp.headers.get('X-Total-Count');
          this.maxPage = this.dataService.maxId/this.pageSize;
          this.pages = Array(this.maxPage).fill(0).map((x,i)=>i+1);
          console.log(this.maxPage === this.currentPage);
        }
        this.photos = <Photo[]>resp.body;
      },
      err => this.notificationService.error("There was a problem fetching the photos at this point. Please try again later.")
    )
  }

  ngOnInit(): void {
    this.loadPage(true)
  }

}
