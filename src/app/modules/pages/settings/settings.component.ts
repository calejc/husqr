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


  constructor(
    public authenticationService: AuthenticationService, 
    public firestoreService: FirestoreService, 
    public usersService: UsersService) {
  }

  getUser(){
    let id = JSON.parse(localStorage.getItem("user")).uid
    this.user = this.usersService.getUserById(id)
    this.firestoreService.getAllUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.user = data.find((user) => user.uid === id);
    });
  }


  ngOnInit(): void {
    this.getUser()
  }

  saveSettings(){
    let settings = {
      "displayName": this.displayName,
      "photoURL": this.photoURL
    }
    // this.firestoreService.usersRef.doc(this.authenticationService.userState).update(settings);
  }

}
