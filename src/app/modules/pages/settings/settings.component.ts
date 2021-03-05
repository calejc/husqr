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
import { updateLanguageServiceSourceFile } from 'typescript';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  preview: string | ArrayBuffer;
  selectedImage: any;
  photoURL: string;
  displayName: string;
  user: any;
  id: string;
  bio: string;
  settingsForm: FormGroup;
  submitted = false;
  uploadProgress$: any;

  constructor(
    public authenticationService: AuthenticationService, 
    public firestoreService: FirestoreService,
    public afStorage: AngularFireStorage,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.authenticationService.getUser().subscribe((user) => {
      this.user = user;
      this.id = user.uid;
      this.displayName = user.displayName;
      this.photoURL= user.photoURL;
      this.bio = user.bio ?  user.bio : '';

      this.settingsForm = this.fb.group({
        displayName: new FormControl(this.displayName, [Validators.required, Validators.minLength(3)]),
        bio: new FormControl(this.bio, [Validators.maxLength(150)])
      });
    });
  }

  fileSelect($event){
    const reader = new FileReader()
    reader.onload = (loadEvent) => (this.preview = loadEvent.target.result);
    console.log("preview", this.preview);
    reader.readAsDataURL($event.target.files[0])
    this.selectedImage = $event.target.files[0]
  }

  saveSettings(){
    if (this.settingsForm.valid){
      this.submitted = true;
      this.uploadProgress$ = of(0);

      let settings = {
        "photoURL": this.photoURL,
        "displayName": this.settingsForm.controls.displayName.value ? this.settingsForm.controls.displayName.value : '', 
        "bio": this.settingsForm.controls.bio.value ? this.settingsForm.controls.bio.value : ''
      }
      
      if (this.selectedImage){
        let path = `${this.user.uid}_${Date.now()}`
        let task = this.afStorage.upload(path, this.selectedImage)
        this.uploadProgress$ = task.percentageChanges()
        task.snapshotChanges().subscribe((s) => {
          console.log(s.bytesTransferred);
          console.log(s.ref.getDownloadURL())
          s.ref.getDownloadURL().then((url) => {
            settings.photoURL = url;
            this.updateSettings(settings);
          })
        })
      } else {
        this.updateSettings(settings);
      }
    }

  }

  updateSettings(settings: any){
    this.firestoreService.updateUserSettings({items: settings, ref: this.firestoreService.collectionRefs.usersRef, docId: this.id}).finally(() => {
      this.uploadProgress$ = of(100); 
      this.submitted = false;
    });
  }

  thisFileUpload() {
    document.getElementById("file").click();
  };


}
