import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import auth from 'firebase/app';
import { Router } from '@angular/router';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  userState: any;

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private firestoreService: FirestoreService) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userState = user;
        // this.redirect('/');
        localStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user'));
      } else {
        this.userState = null;
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
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


  register(email: string, password: string, username: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
        let data = {
          
          "displayName": res.user.displayName,
          "email": res.user.email,
          "photoURL": res.user.photoURL,
          "uid": res.user.uid,
          "username": username
        }
        console.log(data)
        this.firestoreService.usersRef.doc(username).set(data)
        this.redirect('/settings')
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

  redirect(path: string): void{
    this.router.navigate([path])
  }

}