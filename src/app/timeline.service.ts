import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { POSTS } from './data/data';
import { Post } from './post.interface';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  addPost(post: Post): Observable<Post[]> {
    POSTS.push(post);
    return of(POSTS);
  }

  getPosts(): Observable<Post[]>{
    return of(POSTS);
  }
}
