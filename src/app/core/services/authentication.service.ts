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

  user$: Observable<User | null | undefined>;
  userState: any;
  userData: any;

  constructor(
    public angularFirestore: AngularFirestore,
    private afAuth: AngularFireAuth, 
    private router: Router,) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.angularFirestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }));
  }


  getUser(){
    return this.user$;
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
    const userRef = this.angularFirestore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL ? user.photoURL : 'assets/images/default-img.png',
      username: username,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  saveUsername(username: string){
    const data = {
      active: true
    }
    const usernamesRef = this.angularFirestore.doc(`usernames/${username}`).set(data);
  }

  // TODO: create custom authGuard service using isLoggedIn bool
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }


  register(options: {email: string, password: string, username: string}) {
    return this.afAuth
      .createUserWithEmailAndPassword(options.email, options.password)
      .then(res => {


        // Send verification email here
        // this.sendVerificationEmail()

        this.saveUserDataToCollection(res.user, options.username);
        this.saveUsername(options.username)
        console.log('Successfully signed up!', res);
        this.redirect('/settings')
      }).catch(error => {
        return error.code
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
        this.redirect('/');
      })
      .catch(err => {
        return err.code
      });
  }

  redirect(path: string): void{
    this.router.navigate([path])
  }

}