import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { UsersService } from 'src/app/core/services/users.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  // photoURL = this.authenticationService.userState.photoURL;
  photoURL: string;
  displayName: string;
  user: any;
  id: string;


  constructor(
    public authenticationService: AuthenticationService, 
    public firestoreService: FirestoreService, 
    public usersService: UsersService) {
      this.id = JSON.parse(localStorage.getItem("user")).uid
  }

  getUser(){
    console.log(this.authenticationService.userData);
    this.user = this.usersService.getUserById(this.id)
    this.firestoreService.getAllUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.user = data.find((user) => user.uid === this.id);
    });
  }


  ngOnInit(): void {
    this.getUser()
  }

  saveSettings(){
    // console.log(this.photoURL)
    let settings = {
      "displayName": this.displayName ? this.displayName : '',
      "photoURL": this.photoURL ? this.photoURL : ''
    }
    // console.log(settings)
    this.firestoreService.usersRef.doc(this.id).update(settings);
  }

}
