import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { POSTS } from './data/data';
import { Post } from './post.interface';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(){
  }

  addPost(post: Post): Observable<Post[]> {
    POSTS.push(post);
    POSTS.sort((a, b) => Date.parse(b.datetime) - Date.parse(a.datetime))
    return of(POSTS);
  }

  getPosts(): Observable<Post[]>{
    POSTS.sort((a, b) => Date.parse(b.datetime) - Date.parse(a.datetime))
    return of(POSTS);
  }
}
