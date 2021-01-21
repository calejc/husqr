import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../data/types/user.model';
import { Post } from '../data/types/post.interface';
import { POSTS } from 'src/app/core/data/data';
import { USERS } from 'src/app/core/data/data';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  usersRef: AngularFirestoreCollection<User>
  postsRef: AngularFirestoreCollection<Post>

  constructor(private firestore: AngularFirestore) {
    this.usersRef = firestore.collection("users")
    this.postsRef = firestore.collection("posts")
  }

  getAllUsers(): AngularFirestoreCollection<User> {
    return this.usersRef;
    // return this.firestore.collection("users", QueryFn<User>)
  }

  createUser(user: User): any {
    return this.usersRef.add({ ...user });
  }

  updateUser(id: string, data: any): Promise<void> {
    return this.usersRef.doc(id).update(data);
  }

  deleteUser(id: string): Promise<void> {
    return this.usersRef.doc(id).delete();
  }

  addPostsToFirebase(): void{
    POSTS.forEach((post) => this.postsRef.add(post));
    console.log(USERS);
    USERS.forEach((user) => this.usersRef.add(user));
  }


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