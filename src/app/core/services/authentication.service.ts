import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import auth from 'firebase/app';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  // userData: Observable<firebase.User>;

  // constructor(private angularFireAuth: AngularFireAuth) {
    // this.userData = angularFireAuth.authState;
  // }

  userState: any;

  constructor(private afAuth: AngularFireAuth, private router: Router) { 
    // this.userState = afAuth.authState }   
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userState = user;
        this.redirect();
        localStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Auth provider
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((res) => {
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })
  }  

  // Login with Google
  loginWithGoogle() {
    // return this.AuthLogin(new auth.auth.GoogleAuthProvider());
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // const credential = result.credential as firebase.auth.OAuthCredential;
      // const token = credential.accessToken;
      const user = result.user;
      this.userState = user;
    });
  }  

  loginWithGithub() {
    // return this.AuthLogin(new auth.auth.GoogleAuthProvider());
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // const credential = result.credential as firebase.auth.OAuthCredential;
      // const token = credential.accessToken;
      const user = result.user;
      this.userState = user;
    });
  }  

  // Signin with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
    })
  }

  login() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.signOut();
  }


  // /* Sign up */
  SignUp(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });    
  }

  // /* Sign in */
  signInWithEmail(email: string, password: string) {
    console.log("EMAIL: " + email);
    console.log("PASS: " + password);
    // this.afAuth
    //   .signInWithEmailAndPassword(email, password)
    //   .then(res => {
    //     console.log('Successfully signed in!');
    //   })
    //   .catch(err => {
    //     console.log('Something is wrong:',err.message);
    //   });
  }

  redirect(): void{
    this.router.navigate(['/'])
  }

}