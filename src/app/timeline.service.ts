import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { POSTS } from './data/data';
import { Post } from './post.interface';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  private posts = POSTS;

  constructor(){
    this.posts.sort((a, b) => Date.parse(b.datetime) - Date.parse(a.datetime))
  }

  addPost(post: Post): Observable<Post[]> {
    POSTS.unshift(post);
    // POSTS.sort((a, b) => Date.parse(b.datetime) - Date.parse(a.datetime))
    return of(this.posts);
  }

  getPosts(): Observable<Post[]>{
    return of(this.posts);
  }
}
