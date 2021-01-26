import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { HusqFormComponent } from '../husq-form/husq-form.component';
import { TimelineService } from 'src/app/core/services/timeline.service';
import { Post } from 'src/app/core/data/types/post.interface';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { User } from 'src/app/core/data/types/user.interface';
import { UsersService } from 'src/app/core/services/users.service';
// import { User } from 'src/app/core/data/types/user.interface';

@Component({
  selector: 'app-husq-card',
  templateUrl: './husq-card.component.html',
  styleUrls: ['./husq-card.component.scss']
})
export class HusqCardComponent implements OnInit {

  liked: boolean = false;
  users: any;


  constructor(
    private timelineService: TimelineService, 
    public dialog: MatDialog, 
    public firestoreService: FirestoreService,
    public usersService: UsersService) {
    }

  @Input() post: Post;
  @Input() user: User;
  @Input() replie$: Observable<any[]>;

  newHusqReply(parentHusqId: string, post: Post){
    // const uid = JSON.parse(localStorage.getItem("user")).uid
    // const config = new MatDialogConfig();
    // config.autoFocus = true;
    // const dr = this.dialog.open(HusqFormComponent, config);
    // dr.afterClosed().subscribe(result => {
    //   let post: Post = {
    //     uid: uid,
    //     datetime: new Date().toLocaleString(),
    //     post: result.post,
    //     likes: 0,
    //     parentHusq: parentHusqId,
    //     // replies: []
    //   }
    //   this.firestoreService.createPost(post).then((docRef) => {
    //     console.log(docRef.id);
    //     let data = {
    //       replies: [parentHusqId]
    //     }
    //     this.firestoreService.postsRef.doc(parentHusqId).update(data);
    //   })
    // });
  }

  getUser(){
    this.user = this.usersService.getUserById(this.post.uid)
  }


  ngOnInit(): void {
    this.getUser()
  }

  addLikes(): void{
    this.liked ? this.post.likes-- : this.post.likes++;
    // Update firestore here, setting new 'likes' total
  }

  likeButtonClicked(){
    this.addLikes()
    this.toggleClass()
  }

  toggleClass(){
    this.liked = !this.liked;
  }

  replyButtonClicked(postId: string, post: Post){
    console.log(postId)

    this.newHusqReply(postId, post);
  }


}
