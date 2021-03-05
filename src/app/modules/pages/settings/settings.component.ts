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
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  preview: string | ArrayBuffer;
  selectedImage: any;
  profilePicture: File;
  photoURL: string;
  fileUpload: File;
  displayName: string;
  user: any;
  id: string;
  bio: string;
  settingsForm: FormGroup;


  constructor(
    public authenticationService: AuthenticationService, 
    public firestoreService: FirestoreService,
    public afStorage: AngularFireStorage,
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
        profilePicture: new FormControl(),
        // photoURL: new FormControl(this.photoURL, [Validators.minLength(6)]),
        displayName: new FormControl(this.displayName, [Validators.required, Validators.minLength(3)]),
        bio: new FormControl(this.bio, [Validators.maxLength(150)])
      });
    });

    // console.log("this.photoURL", this.user.photoURL);

    
    
  }

  fileSelect($event){
    const reader = new FileReader()
    reader.onload = (loadEvent) => (this.preview = loadEvent.target.result);
    console.log("preview", this.preview);
    reader.readAsDataURL($event.target.files[0])
    this.selectedImage = $event.target.files[0]
  }

  saveSettings(){
    console.log(this.settingsForm.controls)
    // let fileToUpload = reader.readAsDataURL(this.settingsForm.get("profilePicture").value)
    let fileToUpload = this.selectedImage;
    // console.log("uploadFile: ", fileToUpload);
    // console.log("type", typeof(fileToUpload));
    let path = `${this.user.uid}_${Date.now()}`
    this.afStorage.upload(path, fileToUpload).snapshotChanges().subscribe((s) => {
      console.log(s.state);
      console.log(s.bytesTransferred);
      console.log(s.ref.getDownloadURL())
    })
    
    // .pipe((s) => {
      // this.afStorage.ref(path).getDownloadURL()
    // })

    // let settings = {
    //   "displayName": this.displayName ? this.displayName : '',
    //   // "photoURL": this.photoURL ? this.photoURL : '',
    //   "bio": this.bio ? this.bio : ''
    // }
    // if (this.settingsForm.valid) {
    //   let settings = {
    //     // "photoURL": this.settingsForm.controls.photoURL.value ? this.settingsForm.controls.photoURL.value : '', 
    //     "displayName": this.settingsForm.controls.displayName.value ? this.settingsForm.controls.displayName.value : '', 
    //     "bio": this.settingsForm.controls.bio.value ? this.settingsForm.controls.bio.value : ''
    //   }
    //   this.firestoreService.updateUserSettings({items: settings, ref: this.firestoreService.collectionRefs.usersRef, docId: this.id});
    // }
  }

  thisFileUpload() {
    document.getElementById("file").click();
  };


}
