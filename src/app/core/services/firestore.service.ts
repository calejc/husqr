import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn } from '@angular/fire/firestore';
import { User } from '../data/types/user.interface';
import { Post } from '../data/types/post.interface';
import { AuthenticationService } from './authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Database, ObservableDatabase } from '../data/types/database.interface';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


// Inspired from the below example. Only one service to store the data state and expose instead of distinct services for users and posts. Refactored to fit our needs.
// https://github.com/bgpedersen/ng5firestore/blob/master/src/app/core/services/data.service.ts
export class FirestoreService {


  public readonly observableDatabase: ObservableDatabase;
  public userData: any;

  // Firestore collection references
  public collectionRefs = {
    usersRef: this.firestore.collection<User>('users'),
    postsRef: this.firestore.collection<Post>('husqs')
  };


  // Store the date to be exposed as observables
  private database: Database = {
    _User: new BehaviorSubject(null),
    _Users: new BehaviorSubject([]),
    _AllPosts: new BehaviorSubject([]),
    _ParentPosts: new BehaviorSubject([])
  }
  

  // Data exposed as observables
  constructor(
    public firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private auth: AuthenticationService) {
      this.observableDatabase = {
        User$: this.database._User.asObservable(),
        Users$: this.database._Users.asObservable(),
        AllPosts$: this.database._AllPosts.asObservable(),
        ParentPosts$: this.database._ParentPosts.asObservable(),
      };
      this.initDatabase();
      // this.getAllPosts();
      // this.getUsers();
  }


  // Only subscribes to firestore if user is logged in
  initDatabase() {
    this.auth.user$
    // this.auth.userState
      .subscribe((user) => {
        console.log('dataService: initDatabase: user: ', user);
        if (user) {
          // If logged in, update user and fetch data 
          this.database._User.next(user);
          this.getAllPosts()
          this.getUsers()
          
          // get user's data from firestore here
          this.userData = this.fetchDocument(this.collectionRefs.usersRef.doc(user.uid));      
        } 
      })
  }



  // ------------------- //
  // Union Array Example //
  // ------------------- //

  // getHusqsById(userId: number): (Post | User)[] {
  //   this.database._AllPosts.pipe(
  //     filter(husq => husq.userId === userId)
  //     .map(husq => {
  //       const user = this.userStoreService.getById(husq.userId)
  //       return {
  //         ...user, ...husq
  //     }
  //   }))
  // }


  // ========================= //
  // -- Firestore functions -- //
  // ========================= //

  // Fetch a collection from firestore
  fetchCollection(ref: AngularFirestoreCollection<any>) {
    return ref.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((snap) => {
          const obj = snap.payload.doc.data();
          obj.id = snap.payload.doc.id;
          return obj;
        });
      }));
  }

  // Fetch a document from firestore
  fetchDocument(ref: AngularFirestoreDocument<any>) {
    return ref
      .snapshotChanges().pipe(
      map((snap) => {
        const obj = snap.payload.data();
        obj.id = snap.payload.id;
        return obj;
      }));
  }

  // Fetch all users from the 'users' collection
  getUsers(){
    this.fetchCollection(this.collectionRefs.usersRef)
      .subscribe((res: User[]) => {
        this.database._Users.next(res);
      });
  }

  // Fetch all posts from the 'posts' collection
  getAllPosts(){
    this.fetchCollection(this.collectionRefs.postsRef)
      .subscribe((res: Post[]) => {
        this.database._AllPosts.next(res);
        this.sortPosts();
      });
  }
  


  // ==================== //
  // -- CRUD Functions -- //
  // ==================== //
  update(option: { item: any, ref: AngularFirestoreCollection<any> }) {
    const promise = new Promise((resolve, reject) => {

      if (option.item) {
        option.ref.doc(option.item.id)
          .update(option.item)
          .then(() => {
            console.log('dataService: update success');
            resolve(option.item.id);
          }).catch((err) => {
            console.error('dataService: update: error: ', err);
            reject(err);
          });
      } else {
        console.log('dataService: update: wrong option! option: ', option);
        reject();
      }

    });

    return promise;
  }

  create(option: { item: any, ref: AngularFirestoreCollection<any> }) {
    const promise = new Promise((resolve, reject) => {

      if (option.item) {
        option.ref.ref.add(option.item)
          .then((res) => {
            console.log('dataService: create success: res: ', res);
            resolve(res);
          }).catch((err) => {
            console.error('dataService: create: error: ', err);
            reject(err);
          });
      } else {
        console.log('dataService: create: wrong option! option: ', option);
        reject();
      }
    });

    return promise;
  }

  delete(options: { item: any, ref: AngularFirestoreCollection<any> }) {
    const promise = new Promise((resolve, reject) => {

      if (options.item) {
        options.ref.doc(options.item.id)
          .delete()
          .then((res) => {
            console.log('dataService: delete: success', options.item);
            resolve(res);
          }).catch((err) => {
            console.error('dataService: delete: error: ', err);
            reject(err);
          });
      } else {
        console.log('dataService: delete: wrong options! options: ', options);
        reject();
      }

    });

    return promise;
  }



  // =============== //
  // -- Misc/Util -- //
  // =============== //

  // Sort posts by datetime
  sortPosts(): void {
    this.database._Posts.value.sort((a, b) => Date.parse(b.datetime) - Date.parse(a.datetime));
  }

  // Timeline will not display 'replies' in the scrolling timeline container.
  // Replies only appear under their parent post. 
  // Filter out any replies, setting observable to be used in the timeline
  filterParentPosts(){
    this.observableDatabase.AllPosts$.pipe(
      map((posts: Post[]) => posts.filter(post => post.parentHusq)),
    ).subscribe(data => {
      this.observableDatabase.ParentPosts$ = of(data);
    })
  }


}