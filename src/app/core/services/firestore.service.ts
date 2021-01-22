import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { User } from '../data/types/user.interface';
import { Post } from '../data/types/post.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  usersRef: AngularFirestoreCollection<User>
  postsRef: AngularFirestoreCollection<Post>

  constructor(private firestore: AngularFirestore) {
    this.usersRef = firestore.collection("users")
    this.postsRef = firestore.collection("husqs")
  }

  getAllUsers(): AngularFirestoreCollection<User> {
    return this.usersRef;
    // return this.firestore.collection("users", QueryFn<User>)
  }

  getAllPosts(): AngularFirestoreCollection<Post> {
    return this.postsRef;
  }

  getUserById(uid: string): any{
    console.log(uid);
    console.log(this.usersRef.doc(uid).ref.get())
    return this.usersRef.doc(uid).ref.get();
  }

  createUser(user: User): any {
    return this.usersRef.add({ ...user });
  }

  createPost(post: Post): any {
    return this.postsRef.add({ ...post }).then(function(documentRef) {
      // this.set(postId) = documentRef.id;
      this.postId = documentRef.id
      console.log(post);
      // console.log(this.postsRef);
      // this.postsRef.doc(documentRef.id).update({"postId": documentRef.id});
      // console.log(documentRef.id)

      // p
  });
    // then(function(docRef) {
    //   docRef.get().then(function(doc) {
    //     console.log(doc.data().timestamp.toString());
    //   });
    // })
    // .catch(function(error) {
    //   console.error(error);
    // });

    // .then(function(documentRef) {
    //     documentId = documentRef.id;
    // });
  }

  updateUser(id: string, data: any): Promise<void> {
    return this.usersRef.doc(id).update(data);
  }

  deleteUser(id: string): Promise<void> {
    return this.usersRef.doc(id).delete();
  }

  addPost(): void{

  }

  // addPostsToFirebase(): void{
  //   POSTS.forEach((post) => this.postsRef.add(post));
  //   console.log(USERS);
  //   USERS.forEach((user) => this.usersRef.add(user));
  // }


}

// import { Inject } from "@angular/core";
// import { AngularFirestore, QueryFn } from "@angular/fire/firestore";
// import { Observable } from "rxjs";
// import { tap } from "rxjs/operators";
// import { environment } from "src/environments/environment";

//     export abstract class FirestoreService<T> {

//     protected abstract basePath: string;

//     constructor(
//         @Inject(AngularFirestore) protected firestore: AngularFirestore,
//     ) {

//     }

//     doc$(id: string): Observable<T> {
//         return this.firestore.doc<T>(`${this.basePath}/${id}`).valueChanges().pipe(
//             tap(r => {
//                 if (!environment.production) {
//                     console.groupCollapsed(`Firestore Streaming [${this.basePath}] [doc$] ${id}`)
//                     console.log(r)
//                     console.groupEnd()
//                 }
//             }),
//         );
//     }

//     collection$(queryFn?: QueryFn): Observable<T[]> {
//         return this.firestore.collection<T>(`${this.basePath}`, queryFn).valueChanges().pipe(
//             tap(r => {
//                 if (!environment.production) {
//                     console.groupCollapsed(`Firestore Streaming [${this.basePath}] [collection$]`)
//                     console.table(r)
//                     console.groupEnd()
//                 }
//             }),
//         );
//     }

//     create(value: T) {
//         const id = this.firestore.createId();
//         return this.collection.doc(id).set(Object.assign({}, { id }, value)).then(_ => {
//             if (!environment.production) {
//                 console.groupCollapsed(`Firestore Service [${this.basePath}] [create]`)
//                 console.log('[Id]', id, value)
//                 console.groupEnd()
//             }
//         })
//     }

//     delete(id: string) {
//         return this.collection.doc(id).delete().then(_ => {
//             if (!environment.production) {
//                 console.groupCollapsed(`Firestore Service [${this.basePath}] [delete]`)
//                 console.log('[Id]', id)
//                 console.groupEnd()
//             }
//         })
//     }

//     private get collection() {
//         return this.firestore.collection(`${this.basePath}`);
//     }
// }