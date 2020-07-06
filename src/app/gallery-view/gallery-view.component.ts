import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
        }
        this.photos = <Photo[]>resp.body;
      },
      err => this.notificationService.error("There was a problem fetching the photos at this point. Please try again later.")
    )
  }

  previousPage() {
    this.currentPage -= 1;
    this.loadPage();
  }

  nextPage() {
    this.currentPage += 1;
    this.loadPage();
  }

  pageButtonClicked(page: number) {
    this.currentPage = page;
    this.loadPage();
  }

  refreshPage(form: NgForm) {
    if (form.valid && !(this.checkNaN(this.currentPage) || this.checkNaN(this.pageSize)) ) {
      this.pageSize = this.pageSize <= 0 ? 1 : this.pageSize;
      this.maxPage = Math.ceil(this.dataService.maxId/this.pageSize);
      this.currentPage = this.currentPage < 0 ? 0 : this.currentPage;
      this.currentPage = this.currentPage > this.maxPage ? this.maxPage : this.currentPage;
      this.pages = Array(this.maxPage).fill(0).map((x,i)=>i+1);
      this.loadPage();
    }
  }

  checkNaN(num: number): boolean {
    return !Number.isInteger(+num)
  }

  ngOnInit(): void {
    this.loadPage(true)
  }

}
