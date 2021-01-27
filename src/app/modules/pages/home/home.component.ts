import { Component, OnInit } from '@angular/core';
import { TimelineService } from 'src/app/core/services/timeline.service'
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
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/core/data/types/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  // newHusqForm: FormGroup;
  users: any;
  posts: any;

  constructor(
    public dialog: MatDialog, 
    public auth: AuthenticationService, 
    public firestoreService: FirestoreService) { 
  }

  ngOnInit(): void {
    this.posts = this.firestoreService.observableDatabase.AllPosts$.subscribe((data: Post[]) => {
      this.posts = data;
    })
    // this.firestoreService.observableDatabase.User$.subscribe((c) => {
      // console.log(c.username)
    // })
  }

  newHusq(){
    
    const config = new MatDialogConfig();
    config.autoFocus = true;
    const dr = this.dialog.open(HusqFormComponent, config);
    dr.afterClosed().subscribe(result => {
      let post: Post = {
        postId: null,
        uid: this.auth.userState.uid,
        datetime: new Date().toLocaleString(),
        post: result.post,
        likes: 0,
      }
      this.firestoreService.create({item: post, ref: this.firestoreService.collectionRefs.postsRef});
    });
  }

}
