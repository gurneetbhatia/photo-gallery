import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Photo } from '../shared/photo';
import { DataService } from '../shared/data.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.css']
})
export class EditPhotoComponent implements OnInit {

  id: number;
  photo: Photo;
  
  invalidID: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService,
              private notificationService: NotificationService) { }

  submitForm(formValues) {
    const updatedPhoto: Photo = {
      albumId: formValues.albumId,
      id: formValues.photoId,
      title: formValues.photoTitle,
      url: formValues.photoUrl,
      thumbnailUrl: formValues.photoThumbnail
    }
    // if the id has been modified, the photo with the previous id needs to be deleted
    if(updatedPhoto.id != this.id) {
      this.dataService.deletePhoto(this.id).subscribe();
    }
    this.dataService.updatePhoto(updatedPhoto).subscribe(
      (resp) => { 
        this.notificationService.success("Photo updated successfully!");
        this.router.navigate(['/gallery']);
      },
      (err) => this.notificationService.error(err)
    );
  }

  onCancel(form: NgForm) {
    if (form.pristine) {
      // none of the values have been modified so we can just navigate to the details page
      this.notificationService.info("No changes were made to the photo.");
      this.router.navigate(['/gallery', this.id]);
    }
    else if(confirm("Are you sure you want to navigate away without saving your changes?")) {
      this.notificationService.info("No changes were made to the photo.");
      this.router.navigate(['/gallery', this.id]);
    }
  }

  onSubmit(form: NgForm) {
    if(form.pristine) {
      // the form has not been modified in any manner, so the user can be returned to the main page
      this.notificationService.info("No changes were made to the photo.");
      this.router.navigate(['/gallery']);
    }
    else {
      // the form has been modified.
      // check if the id has changed and if it has already been assigned or not.
      // also check if the id input is numeric or not
      const values = form.value;
      const id = +values.photoId;
      if(id != this.id) {
        // the id has been changed
        if(isNaN(id)) {
          this.invalidID = true;
        }
        else {
          this.dataService.getPhoto(id).toPromise()
                              .then((photo: Photo) => {
                                // there already exists a photo with this id
                                this.invalidID = true;
                              })
                              .catch((error) => {
                                if (error.status === 404) {
                                  // unique id
                                  this.invalidID =  false;
                                  // submitForm
                                  this.submitForm(values)
                                }
                              })
        }
      }
      else {
        this.submitForm(values);
      }
    }
  }

  getPhoto() {
    this.dataService.getPhoto(this.id).subscribe(
      (photo) => this.photo = photo,
      (err) => { this.notificationService.error(err) }
    );
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getPhoto();
  }

}
