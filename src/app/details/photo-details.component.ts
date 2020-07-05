import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';

import { Photo } from '../shared/photo';
import { DataService } from '../shared/data.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  id: number;
  photo: Photo;

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private notificationService: NotificationService) { }

  getPhoto() {
    // implement the error function too
    this.dataService.getPhoto(this.id).subscribe(
      (photo) => this.photo = photo,
      (err) => { console.log(err) }
    );
  }

  deletePhoto() {
    const confirmation = confirm("Are you sure you wish to delete this photo? This step cannot be reversed");
    if (confirmation) {
      // delete the image using the data service
      this.dataService.deletePhoto(this.id).subscribe(
        (resp) => {
          this.notificationService.success("Photo deleted successfully!");
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
