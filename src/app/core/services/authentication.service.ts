import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, of } from 'rxjs';
import firebase from 'firebase/app';
import auth from 'firebase/app';
import { Router } from '@angular/router';
import { FirestoreService } from './firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { User } from '../data/types/user.interface';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  // userState: Observable<User | null | undefined>;
  user$: any;
  userState: any;

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private angularFirestore: AngularFirestore,
    private firestoreService: FirestoreService) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  getUser(){
    // return this.userState;
  }


  loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      const user = result.user;
      this.userState = user;
    });
  }  

  loginWithGithub() {
    var provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      const user = result.user;
      this.userState = user;
    });
  }  


  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
    })
  }

  saveUserDataToCollection(user, username){
    const userRef = this.angularFirestore.doc(`users/${username}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      username: username,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // TODO: create custom authGuard service using isLoggedIn bool
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }


  register(email: string, password: string, username: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {

        // Send verification email here
        // this.sendVerificationEmail();

        this.saveUserDataToCollection(res.user, username);
        console.log('Successfully signed up!', res);
        this.redirect('/settings')
      }).catch(error => {
        console.log('Something is wrong:', error.message);
      });    
  }

  async sendVerificationEmail() {
    return (await this.afAuth.currentUser).sendEmailVerification().then(() => {
      console.log("email sent");
      this.router.navigate(['verify-email'])
    })
  }

  // /* Sign in */
  signInWithEmail(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!');
        // this.userState = res.user;
        // this.saveUserDataToCollection(res.user);
        this.redirect('/');
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
  }

  redirect(path: string): void{
    this.router.navigate([path])
  }

}