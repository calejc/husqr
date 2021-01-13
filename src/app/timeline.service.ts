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
    this.sortPosts();
  }

  addPost(post: Post): Observable<Post[]> {
    this.posts.unshift(post);
    this.sortPosts();
    return of(this.posts);
  }

  getPosts(): Observable<Post[]>{
    return of(this.posts);
  }

  sortPosts(): void {
    this.posts.sort((a, b) => Date.parse(b.datetime) - Date.parse(a.datetime))
  }

}
