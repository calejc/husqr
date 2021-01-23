import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  // photoURL = this.authenticationService.userState.photoURL;
  photoURL: string;
  displayName: string;


  constructor(
    public authenticationService: AuthenticationService, 
    public firestoreService: FirestoreService) { 
    console.log(authenticationService.userState) 
  }

  ngOnInit(): void {
    console.log(this.authenticationService.userState); 
    console.log(this.authenticationService.userState.photoURL);
  }

  saveSettings(){
    let settings = {
      "displayName": this.displayName,
      "photoURL": this.photoURL
    }
    this.firestoreService.usersRef.doc(this.authenticationService.userState).update(settings);
  }

}
