import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
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
  bio: string;
  settingsForm: FormGroup;


  constructor(
    public authenticationService: AuthenticationService, 
    public firestoreService: FirestoreService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // this.getUser()
    this.authenticationService.getUser().subscribe((user) => {
      this.user = user;
      this.id = user.uid;
      this.displayName = user.displayName;
      this.photoURL= user.photoURL;
      this.bio = user.bio ?  user.bio : '';

      this.settingsForm = this.fb.group({
        photoURL: new FormControl(this.photoURL,[Validators.required, Validators.minLength(6)]),
        displayName: new FormControl(this.displayName, [Validators.required, Validators.minLength(3)]),
        bio: new FormControl(this.bio, [Validators.maxLength(150)])
      });
    });

    // console.log("this.photoURL", this.user.photoURL);

    
    
  }

  

  saveSettings(){
    let settings = {
      "displayName": this.displayName ? this.displayName : '',
      "photoURL": this.photoURL ? this.photoURL : '',
      "bio": this.bio ? this.bio : ''
    }
  //   this.firestoreService.collectionRefs.usersRef.doc(this.id).update(settings);
  // }
  
    if (this.settingsForm.valid) {
      let settings = {
        "photoURL": this.settingsForm.controls.photoURL.value ? this.settingsForm.controls.photoURL.value : '', 
        "displayName": this.settingsForm.controls.displayName.value ? this.settingsForm.controls.displayName.value : '', 
        "bio": this.settingsForm.controls.bio.value ? this.settingsForm.controls.bio.value : ''
      }
      this.firestoreService.updateUserSettings({items: settings, ref: this.firestoreService.collectionRefs.usersRef, docId: this.id});
    }
  }

}
