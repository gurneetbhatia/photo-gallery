import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../shared/photo';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.css']
})
export class PhotoCardComponent implements OnInit {

  @Input() photo: Photo;

  constructor() { }

  ngOnInit(): void {
    console.log(this.photo);
  }

}
