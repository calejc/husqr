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
    let settings = {
      "displayName": this.displayName ? this.displayName : '',
      "photoURL": this.photoURL ? this.photoURL : ''
    }
    this.firestoreService.collectionRefs.usersRef.doc(this.id).update(settings);
  }

}
