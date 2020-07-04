import { Component, OnInit } from '@angular/core';

import { DataService } from '../shared/data.service';
import { Photo } from '../shared/photo';


@Component({
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.css']
})
export class GalleryViewComponent implements OnInit {

  photos: Photo[];

  constructor(private dataService: DataService) {  }

  ngOnInit(): void {
    this.photos = this.dataService.getPhotos();
  }

}
