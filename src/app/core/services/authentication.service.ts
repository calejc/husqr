import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import auth from 'firebase/app';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  // userData: Observable<firebase.User>;

  // constructor(private angularFireAuth: AngularFireAuth) {
    // this.userData = angularFireAuth.authState;
  // }

  userState: any;

  constructor(
    public afAuth: AngularFireAuth
  ) {    
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
  // GoogleAuth() {
  //   // return this.AuthLogin(new auth.auth.GoogleAuthProvider());
  //   var provider = new firebase.auth.GoogleAuthProvider();
  //   provider.addScope('profile');
  //   provider.addScope('email');
  //   firebase.auth().signInWithPopup(provider).then(function(result) {
  //     const credential = result.credential as firebase.auth.OAuthCredential;
  //     const token = credential.accessToken;
  //     const user = result.user;
  //     // localStorage.setItem("user", user);
  //   });
  // }  

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
  // SignIn(email: string, password: string) {
  //   this.angularFireAuth
  //     .signInWithEmailAndPassword(email, password)
  //     .then(res => {
  //       console.log('Successfully signed in!');
  //     })
  //     .catch(err => {
  //       console.log('Something is wrong:',err.message);
  //     });
  // }

  // /* Sign out */
  // SignOut() {
  //   this.angularFireAuth
  //     .signOut();
  // }  

}