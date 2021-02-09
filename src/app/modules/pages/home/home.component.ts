import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Post } from 'src/app/core/data/types/post.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HusqFormComponent } from 'src/app/modules/components/husq-form/husq-form.component';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore'
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  // newHusqForm: FormGroup;
  users: any;
  posts: any;
  user: any;

  constructor(
    public dialog: MatDialog, 
    public auth: AuthenticationService, 
    public firestoreService: FirestoreService) { 
  }

  ngOnInit(): void {
    this.firestoreService.observableDatabase.ParentPosts$.subscribe((data: Post[]) => {
      this.posts = data;
    });
    this.firestoreService.observableDatabase.User$.subscribe((data: any) => {
      this.user = data;
    })
  }

  newHusq(){
    const config = new MatDialogConfig();
    config.autoFocus = true;
    config.disableClose = false;
    config.minWidth = 300;
    config.minHeight = 250;
    const dr = this.dialog.open(HusqFormComponent, config);
    dr.afterClosed().subscribe(result => {
      let post: Post = {
        postId: null,
        uid: this.user.uid,
        datetime: new Date().toLocaleString(),
        post: result.post,
        likes: [],
        parentHusq: null,
      }
      this.firestoreService.create({item: post, ref: this.firestoreService.collectionRefs.postsRef});
    });
  }

}
