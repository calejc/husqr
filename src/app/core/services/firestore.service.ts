import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { User } from '../data/types/user.interface';
import { Post } from '../data/types/post.interface';
import { AuthenticationService } from './authentication.service';

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

  // createPost(post){


  createPost(post: Post): any {
    return this.postsRef.add({ ...post }).then(function(documentRef) {
      // this.postId = documentRef.id
      console.log(post);
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


}