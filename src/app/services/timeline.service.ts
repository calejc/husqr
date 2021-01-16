import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { POSTS } from '../data/data';
import { Post } from '../types/post.interface';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  private INITIAL_STATE = POSTS;

  constructor(){
    console.log(this.INITIAL_STATE);
    this.sortPosts();
  }

  sortPosts(): void {
    this.posts.sort((a, b) => Date.parse(b.datetime) - Date.parse(a.datetime))
  }
  
  removePost(id: number): void{
    this.posts = this.posts.filter((post) => post.postId === id);
  }

  private readonly postSubject = new BehaviorSubject<Post[]>(this.INITIAL_STATE)
  readonly post$ = this.postSubject.asObservable();

  get posts(): Post[] {
    return this.postSubject.getValue();
  }

  set posts(post: Post[]){
    this.sortPosts();
    this.postSubject.next(post);
  }

  addPost(post: Post): void {
    this.posts = [
      ... this.posts,
      post
    ]
    this.sortPosts();
  }

  getPostsByUser(id: number): Observable<any[]>{
    return of(this.posts.filter((post) => post.userId === id));
  }

  getPostByPostId(id: number){
    return this.posts.find((post) => post.postId === id);
  }

  generateNextId(): number{
    return Math.max.apply(Math, this.posts.map(function(post){return post.postId + 1}));
  }

  getReplies(parentId: number): Observable<any[]>{
    return of(this.posts.filter((post) => post.parentHusq === parentId));
  }


}
