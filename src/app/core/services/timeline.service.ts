import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Post } from 'src/app/core/data/types/post.interface';
import { FirestoreService } from './firestore.service';
import { map } from 'rxjs/operators';
import { User } from '../data/types/user.interface';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  // Initial state change to read in whatever firestore state is
  private INITIAL_STATE = [];
  // (Husq | User)[] 
  users: any;
  posts: any;

  data: (Post | User)[];

  constructor(private firestoreService: FirestoreService){
    this.getPosts()
    this.getUsers()
    // this.setData()
    // this.firestoreService.getAllPosts().snapshotChanges().pipe(
    //   map(changes => changes.map(c =>
    //       ({ id: c.payload.doc.id, ...c.payload.doc.data() })
    //     )
    //   )
    // ).subscribe(data => {
    //   this.posts = data;
    // });
  }

  sortPosts(): void {
    this.posts.sort((a, b) => Date.parse(b.datetime) - Date.parse(a.datetime))
  }




  removePost(id: number): void{
    // this.posts = this.posts.filter((post) => post.postId === id);
  }

  // public readonly postSubject = new BehaviorSubject<Post[]>(this.INITIAL_STATE)
  // readonly post$ = this.postSubject.asObservable();

  // get posts(): Post[] {
  //   return this.postSubject.getValue();
  // }

  // set posts(post: Post[]){
  //   this.postSubject.next(post);
  // }

  addPost(post: Post): void {
    this.posts = [
      ... this.posts,
      post
    ]
  }

  getUsers(): void{
    this.firestoreService.getAllUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.users = data;
    });
  }

  getPosts(): void{
    this.firestoreService.getAllPosts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.posts = data;
      this.sortPosts();
    });
  }

  // getPostByPostId(id: number){
  //   // return this.posts.find((post) => post.postId === id);
  // }

  // generateNextId(): number{
  //   return Math.max.apply(Math, this.posts.map(function(post){return post.postId + 1}));
  // }

  // getReplies(parentId: number): Observable<any[]>{
  //   return of(this.posts.filter((post) => post.parentHusq === parentId));
  // }


}
