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
    public firestoreService: FirestoreService) {
  }

  ngOnInit(): void {
    // this.getUser()
    this.authenticationService.getUser().subscribe((user) => {
      this.user = user;
      this.id = user.uid;
      this.displayName = user.displayName;
      this.photoURL = user.photoURL;
    })
    
  }

  saveSettings(){
    // console.log(this.photoURL)
    let settings = {
      "displayName": this.displayName ? this.displayName : '',
      "photoURL": this.photoURL ? this.photoURL : ''
    }
    // console.log(settings)
    this.firestoreService.collectionRefs.usersRef.doc(this.id).update(settings);
  }

}

// https://i.pinimg.com/originals/45/18/03/4518036ebbfb58a31cac156cdc8f0d9c.jpg