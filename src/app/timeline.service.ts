import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { POSTS } from './data/data';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  getPosts(): Observable<any[]>{
    return of(POSTS);
  }
  // constructor() { }
}
