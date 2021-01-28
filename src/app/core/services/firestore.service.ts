import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { User } from '../data/types/user.interface';
import { Post } from '../data/types/post.interface';
import { AuthenticationService } from './authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Database, ObservableDatabase } from '../data/types/database.interface';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app'
import { filter } from 'minimatch';
import { post } from 'selenium-webdriver/http';

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
    _ParentPosts: new BehaviorSubject([]),
    _PostsByUser: new BehaviorSubject([])
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
        PostsByUser$: this.database._PostsByUser.asObservable()
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
        console.log('firestoreService: initDatabase: user: ', user);
        if (user) {
          // If logged in, update user and fetch data 
          this.database._User.next(user);
          this.userData = this.getUserData(user.uid)
          this.getAllPosts()
          this.getOnlyParentPosts()
          this.getUsers()
        } 
      })
  }





  // ========================= //
  // -- Firestore functions -- //
  // ========================= //

  // Fetch a collection from firestore
  fetchCollection(ref: AngularFirestoreCollection<any>): any {
    return ref.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((snap) => {
          const obj = snap.payload.doc.data();
          obj.id = snap.payload.doc.id;
          return obj;
        });
      }));
  }

  fetchCollectionWithFilter(options: {
    ref: string, 
    field: string,
    operator: any,
    value: any
  }){
    return this.firestore.collection(options.ref, o => o.where(options.field, options.operator, options.value))
      .snapshotChanges().pipe(
        map((changes) => {
          return changes.map((snap: any) => {
            const obj = snap.payload.doc.data();
            obj.id = snap.payload.doc.id;
            return obj
          })
        })
      )
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

  getOnlyParentPosts(){
    let options = {
      ref: 'husqs', 
      field: 'parentHusq', 
      operator: '==', 
      value: null
    }
    this.fetchCollectionWithFilter(options).subscribe((res: Post[]) => {
      this.database._ParentPosts.next(res)
      this.sortPosts();
    })
  }

  // Fetch all posts by uid
  getAllPostsByUid(uid){
    return this.firestore.collection('husqs', ref => ref.where('uid', '==', uid)).valueChanges();
  }

  getPostReplies(pid){
    // this.firestore.collection('husqs', ref => ref.where('parentHusq', '==', pid)).valueChanges().subscribe((data) => {
      // console.log(data)
    // })
    return this.firestore.collection('husqs', ref => ref.where('parentHusq', '==', pid)).valueChanges();
  }

//   filterBy(categoriaToFilter: string) {
//     this.avisos = this.afs.collection('avisos', ref => ref.where('categoria','==', categoriaToFilter )).valueChanges()


  // ==================== //
  // -- CRUD Functions -- //
  // ==================== //
  update(option: { item: any, ref: AngularFirestoreCollection<any>, docId: string }) {
    const promise = new Promise((resolve, reject) => {

      if (option.item) {
        option.ref.doc(option.docId)
          .update(option.item)
          .then(() => {
            console.log('firestoreService: update success');
            resolve(option.docId);
          }).catch((err) => {
            console.error('firestoreService: update: error: ', err);
            reject(err);
          });
      } else {
        console.log('firestoreService: update: wrong option! option: ', option);
        reject();
      }

    });

    return promise;
  }

  updateArray(option: { arrayKey: any, arrayValue: any, ref: AngularFirestoreCollection<any>, docId: string }) {
    const promise = new Promise((resolve, reject) => {

      if (option) {
        let key: string = option.arrayKey
        option.ref.doc(option.docId)
          .update({key: firebase.firestore.FieldValue.arrayUnion(option.arrayValue)})
          .then(() => {
            console.log('firestoreService: update success');
            resolve(option.docId);
          }).catch((err) => {
            console.error('firestoreService: update: error: ', err);
            reject(err);
          });
      } else {
        console.log('firestoreService: update: wrong option! option: ', option);
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
            console.log('firestoreService: create success: res: ', res);
            resolve(res);
          }).catch((err) => {
            console.error('firestoreService: create: error: ', err);
            reject(err);
          });
      } else {
        console.log('firestoreService: create: wrong option! option: ', option);
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
            console.log('firestoreService: delete: success', options.item);
            resolve(res);
          }).catch((err) => {
            console.error('firestoreService: delete: error: ', err);
            reject(err);
          });
      } else {
        console.log('firestoreService: delete: wrong options! options: ', options);
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
    this.database._AllPosts.value.sort((a, b) => Date.parse(b.datetime) - Date.parse(a.datetime));
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

  getUserData(uid: string){
    // this.firestoreService.getUserById(this.userState.uid);
    return this.database._Users.value.find((user) => user.uid === uid)
    // console.log(uid);
  }


}