import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Photo } from './photo';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: Photo[];

  constructor(private http: HttpClient,
              private notificationService: NotificationService) { }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>('http://jsonplaceholder.typicode.com/photos');
  }

  getPhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(`http://jsonplaceholder.typicode.com/photos/${id}`);
  }

  updatePhoto(photo: Photo): Observable<Photo> {
    return this.http.patch<Photo>(`http://jsonplaceholder.typicode.com/photos/${photo.id}`, photo);
  }

  createPhoto(photo: Photo): Observable<Photo> {
    return this.http.patch<Photo>(`http://jsonplaceholder.typicode.com/photos/${photo.id}`, photo);
  }

  deletePhoto(id: number): Observable<any> {
    return this.http.delete(`http://jsonplaceholder.typicode.com/photos/${id}`);
  }

  getNewId(): number {
    if (this.data) {
      return this.data[this.data.length - 1].id + 1;
    }
    else {
      return 0;
    }
  }
}
