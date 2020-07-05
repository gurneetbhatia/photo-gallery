import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../shared/photo';
import { DataService } from '../shared/data.service';

@Component({
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  id: number;
  photo: Photo;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  getPhoto() {
    this.dataService.getPhoto(this.id).subscribe(
      (photo) => this.photo = photo,
      (err) => console.log(err)
    );
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    if (isNaN(id)) {
      // let the user know that it is an invalid id
    }
    else {
      this.id = id;
      // now fetch the appropriate photo object
      this.getPhoto();
    }
  }

}
