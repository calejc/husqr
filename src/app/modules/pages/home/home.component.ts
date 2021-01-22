import { Component, OnInit } from '@angular/core';
import { TimelineService } from 'src/app/core/services/timeline.service'
import { FormGroup } from '@angular/forms';
import { Post } from 'src/app/core/data/types/post.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HusqFormComponent } from 'src/app/modules/components/husq-form/husq-form.component';
import { Observable} from 'rxjs';
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
  newHusqForm: FormGroup;
  // post$: Observable<Post[]>;
  // husqs: Post[];
  husqs: Observable<Post[]>

  constructor(public timelineService: TimelineService, public dialog: MatDialog, public auth: AuthenticationService, public firestore: AngularFirestore, public firestoreService: FirestoreService) { 

  

    // this.firestoreService.getAllPosts().snapshotChanges().pipe(
    //   map(changes => changes.map(c =>
    //       ({ id: c.payload.doc.id, ...c.payload.doc.data() })
    //     )
    //   )
    // )
    // .subscribe(data => {
    //   console.log(data)
    //   this.husqs = of(data);
    //   console.log(this.husqs);
    // });

  }

  ngOnInit(): void {
    // this.firestoreService.addPostsToFirebase();
    // https://github.com/bezkoder/angular-11-firestore-crud/blob/master/src/app/components/tutorials-list/tutorials-list.component.ts
    // this.firestoreService.getAllUsers().snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c =>
    //       ({ id: c.payload.doc.id, ...c.payload.doc.data() })
    //     )
    //   )
    // ).subscribe(data => {
    //   console.log(data)
    // });
    // console.log(this.firestoreService.getAllUsers())
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
      // this.service.addPost(post);
      this.firestoreService.createPost(post);
    });
  }

  // temp() {
  //   this.firestore.collection("users").doc(this.auth.userState.uid).update({
      
  //     "replies": [1,2,3]
  //   })
  // }

  // query() {
  //   this.firestore.collection('users', ref => 
  //     ref.where("uid", "==", this.auth.userState.uid)).get().subscribe(ss => { 
  //       if (ss.docs.length === 0) {
  //         console.log("not found")
  //       } else {
  //         ss.docs.forEach(doc => 
  //           {console.log(doc.data())})
  //         }
  //       })
  // }

}
