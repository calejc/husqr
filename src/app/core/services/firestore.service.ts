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


export class FirestoreService {


  public readonly observableDatabase: ObservableDatabase;
  public userData: any;

  // Firestore collection references
  public collectionRefs = {
    usersRef: this.firestore.collection<User>('users'),
    postsRef: this.firestore.collection<Post>('husqs'),
    usernamesRef: this.firestore.collection<String>('usernames')
  };


  // Store the date to be exposed as observables
  private database: Database = {
    _User: new BehaviorSubject(null),
    _Users: new BehaviorSubject([]),
    _AllPosts: new BehaviorSubject([]),
    _ReplyPosts: new BehaviorSubject([]),
    _ParentPosts: new BehaviorSubject([]),
    _PostsByUser: new BehaviorSubject([]),
    _Usernames: new BehaviorSubject([])
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
        ReplyPosts$: this.database._AllPosts.asObservable(),
        ParentPosts$: this.database._ParentPosts.asObservable(),
        PostsByUser$: this.database._PostsByUser.asObservable(),
      };
      this.initDatabase();
  }


  initDatabase() {
    // Call usernames collection in order to verify available username during registration
    // Subscribe to the rest of the database upon user logging in
    this.getUsernames()
    this.auth.user$
      .subscribe((user) => {
        console.log('firestoreService: initDatabase: user: ', user);
        if (user) {
          // If logged in, update user and fetch data 
          this.database._User.next(user);
          this.userData = this.getUserData(user.uid)
          this.getParentPosts()
          this.getReplyPosts()
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

  getUsernames(){
    this.fetchCollection(this.collectionRefs.usernamesRef).subscribe((res: any[]) => {
      this.database._Usernames.next(res)
    })
  }

  getParentPosts(){
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

  getReplyPosts(){
    let options = {
      ref: 'husqs', 
      field: 'parentHusq', 
      operator: '>', 
      value: ''
    }
    this.fetchCollectionWithFilter(options).subscribe((res: Post[]) => {
      this.database._ReplyPosts.next(res)
      this.sortPosts();
    })
  }

  // Fetch all posts by uid
  getAllPostsByUid(uid){
    return this.firestore.collection(
      "husqs", o => o.where("uid", "==", uid).where("parentHusq", "==", null))
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

  getPostReplies(pid){
    return this.firestore.collection('husqs', ref => ref.where('parentHusq', '==', pid)).valueChanges();
  }



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

  updateReplies(options: {arrayValue: any, ref: AngularFirestoreCollection<any>, docId: string}) {
    const promise = new Promise((resolve, reject) => {

      if (options) {
        options.ref.doc(options.docId)
          .update({replies: firebase.firestore.FieldValue.arrayUnion(options.arrayValue)})
          .then(() => {
            console.log('firestoreService: update success');
            resolve(options.docId);
          }).catch((err) => {
            console.error('firestoreService: update: error: ', err);
            reject(err);
          });
      } else {
        console.log('firestoreService: update: wrong option! option: ', options);
        reject();
      }

    });

    return promise;
  }

  updateLikes(options: {arrayValue: any, ref: AngularFirestoreCollection<any>, docId: string}) {
    const promise = new Promise((resolve, reject) => {

      if (options) {
        options.ref.doc(options.docId)
          .update({likes: firebase.firestore.FieldValue.arrayUnion(options.arrayValue)})
          .then(() => {
            console.log('firestoreService: update success');
            resolve(options.docId);
          }).catch((err) => {
            console.error('firestoreService: update: error: ', err);
            reject(err);
          });
      } else {
        console.log('firestoreService: update: wrong option! option: ', options);
        reject();
      }

    });

    return promise;
  }

  // updateFollowing(options: {arrayValue: any, ref: AngularFirestoreCollection<any>, docId: string}) {
  //   const promise = new Promise((resolve, reject) => {

  //     if (options) {
  //       options.ref.doc(options.docId)
  //         .update({following: firebase.firestore.FieldValue.arrayUnion(options.arrayValue)})
  //         .then(() => {
  //           resolve(() => {
  //             options.ref.doc(options.arrayValue)
  //               .update({followers: firebase.firestore.FieldValue.arrayUnion(options.docId)})
  //               .then(() => {
  //                 console.log('firestoreService: udpate success');
  //                 resolve(options.docId);
  //               }).catch((err) => {
  //                 console.error('firestoreService: update: error ', err);
  //                 reject(err);
  //               });
  //           });
  //         }).catch((err) => {
  //           console.error('firestoreService: update: error: ', err);
  //           reject(err);
  //         });
  //     } else {
  //       console.log('firestoreService: update: wrong option! option: ', options);
  //       reject();
  //     }
  //   });
  //   return promise; 
  // }

  updateFollowing(options: {arrayValue: any, ref: AngularFirestoreCollection<any>, docId: string}) {
    const promise = new Promise((resolve, reject) => {

      if (options) {
        options.ref.doc(options.docId)
          .update({following: firebase.firestore.FieldValue.arrayUnion(options.arrayValue)})
          .then(() => {
            console.log('firestoreService: udpate success');
            resolve(() => {
              console.log('firestoreService: update success');
              resolve(options.docId);
            });
          }).catch((err) => {
            console.error('firestoreService: update: error: ', err);
            reject(err);
          });
      } else {
        console.log('firestoreService: update: wrong option! option: ', options);
        reject();
      }
    });
    return promise;
  }

  updateFollowers(options: {arrayValue: any, ref: AngularFirestoreCollection<any>, docId: string}) {
    const promise = new Promise((resolve, reject) => {

      if (options) {
        options.ref.doc(options.arrayValue)
          .update({followers: firebase.firestore.FieldValue.arrayUnion(options.docId)})
          .then(() => {
            console.log('firestoreService: udpate success');
            resolve(() => {
              console.log('firestoreService: update success');
              resolve(options.arrayValue);
            });
          }).catch((err) => {
            console.error('firestoreService: update: error: ', err);
            reject(err);
          });
      } else {
        console.log('firestoreService: update: wrong option! option: ', options);
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
    this.database._ParentPosts.value.sort((a, b) => Date.parse(b.datetime) - Date.parse(a.datetime));
    this.database._ReplyPosts.value.sort((a, b) => Date.parse(b.datetime) - Date.parse(a.datetime));
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
    return this.database._Users.value.find((user) => user.uid === uid)
  }

  checkUsername(username: string){
    return this.database._Usernames.value.find((user) => user.id === username) ? true : false
  }


}