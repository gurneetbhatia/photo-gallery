import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Photo } from './photo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>('http://jsonplaceholder.typicode.com/photos');
  }
}
