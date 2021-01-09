import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { POSTS } from './data/data';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  addPost(post): Observable<any[]> {
    return POSTS + post;
  }

  getPosts(): Observable<any[]>{
    return of(POSTS);
  }
}
