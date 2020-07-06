import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Photo } from '../shared/photo';
import { DataService } from '../shared/data.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent implements OnInit {

  photo: Photo = new Photo();

  constructor(private router: Router,
              private dataService: DataService,
              private notificationService: NotificationService) { }

  onSubmit(photoForm: NgForm) {
    if (photoForm.valid && !this.checkNaN(photoForm.value.albumId)) {
      const values = photoForm.value;
      // the form has been validated, otherwise the apt error is being displayed throught the template
      this.photo = {
        id: this.dataService.getNewId(),
        albumId: values.albumId,
        title: values.title,
        url: values.photoUrl,
        thumbnailUrl: values.photoThumbnail
      };
      this.dataService.createPhoto(this.photo).subscribe(
        (resp) => {
          this.notificationService.success("Photo was created succesfully!");
          this.router.navigate(['/gallery']);
        },
        (err) => {
          this.notificationService.error("There was an error posting your picture. Please try again later.");
          this.router.navigate(['/gallery']);
        }
      )
    }
  }

  onCancel(form: NgForm) {
    if (form.pristine) {
      // none of the values have been modified so we can just navigate to the details page
      this.notificationService.info("Photo creation was cancelled.");
      this.router.navigate(['/gallery']);
    }
    else if(confirm("Are you sure you want to navigate away without saving your changes?")) {
      this.notificationService.info("Photo creation was cancelled.");
      this.router.navigate(['/gallery']);
    }
  }

  checkNaN(num: number): boolean {
    return !Number.isInteger(+num);
  }

  ngOnInit(): void {
  }

}
