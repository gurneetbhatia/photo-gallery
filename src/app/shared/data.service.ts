import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Photo } from './photo';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>('http://jsonplaceholder.typicode.com/photos');
  }

  getPhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(`http://jsonplaceholder.typicode.com/photos/${id}`);
  }

  deletePhoto(id: number): Observable<any> {
    return this.http.delete(`http://jsonplaceholder.typicode.com/photos/${id}`);
  }
}
