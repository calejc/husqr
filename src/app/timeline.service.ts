import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { POSTS } from './data/data';
import { Post } from './post.interface';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  private posts = POSTS;
  // private INITIAL_STATE = POSTS;

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

  // private readonly postSubject = new BehaviorSubject<Post[]>(this.INITIAL_STATE)
  // readonly post$ = this.postSubject.asObservable();

  // get posts(): Post[] {
  //   return this.postSubject.getValue();
  // }


  // set posts(post: Post[]){
  //   this.postSubject.next(post);
  // }

  // addPost(post: Post): void {
  //   this.posts = [
  //     ... this.posts,
  //     post
  //   ]
  // }

  removePost(id: number): void{
    this.posts = this.posts.filter((post) => post.id === id);
  }



}
