import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Photo } from './photo';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  maxId: number = -1;

  constructor(private http: HttpClient,
              private notificationService: NotificationService) { }

  
  getPhotosPage(page: number, limit: number): Observable<HttpResponse<Object>> {
    return this.http.get<HttpResponse<Object>>(`http://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`, {observe: 'response'})
  }

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
    this.maxId += 1;
    return this.maxId;
  }
}
