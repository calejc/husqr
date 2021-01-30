import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Observable, of } from 'rxjs';

import { HusqFormComponent } from '../husq-form/husq-form.component';
import { Post } from 'src/app/core/data/types/post.interface';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { User } from 'src/app/core/data/types/user.interface';
import { ReplyComponent } from '../reply/reply.component';
import { WeekDay } from '@angular/common';
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
    public dialog: MatDialog, 
    public firestoreService: FirestoreService) {
    }

  @Input() post: any;
  user: User;
  postReplies: Post[];

  newHusqReply(parentHusqId: string, post: Post){
    const uid = this.user.uid
    const config = new MatDialogConfig();
    config.autoFocus = true;
    const dr = this.dialog.open(HusqFormComponent, config);
    dr.afterClosed().subscribe(result => {
      let post: Post = {
        uid: uid,
        datetime: new Date().toLocaleString(),
        post: result.post,
        likes: [],
        parentHusq: parentHusqId,
      }
      this.firestoreService.create({item: post, ref: this.firestoreService.collectionRefs.postsRef}).then((docRef: any) => {
        let options = {
          arrayKey: "replies",
          arrayValue: docRef.id,
          docId: parentHusqId, 
          ref: this.firestoreService.collectionRefs.postsRef
        }
        this.firestoreService.updateArray(options)
      })
    });
  }

  ngOnInit(): void {
    this.user = this.firestoreService.getUserData(this.post.uid)
    // console.log("PID: ", this.post.id)
    // console.log("post: ", this.post.post)
    // if (this.post.replies && this.post.replies.length > 0){
    //   this.firestoreService.getPostReplies(this.post.id).subscribe((data: Post[]) => {
    //     console.log("DATA", data)      
    //     this.postReplies = data;
    //   })
    // }

    this.getTimeSincePost();
  }

  addLikes(): void{
    this.liked ? this.post.likes-- : this.post.likes++;
    // Update firestore here, setting new 'likes' total

    let data = {
      likes: this.post.likes
    }
    let options = {
      item: data,
      ref: this.firestoreService.collectionRefs.postsRef,
      docId: this.post.id
    }
    this.firestoreService.update(options)
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

  // function to grab min since tweet (date - today)
  getTimeSincePost() {
    let diffTime =  Date.now() - Date.parse(this.post.datetime);
    let diffTimeMin = Math.abs(Math.floor(diffTime / (1000 * 60)));
    if (diffTimeMin >= 60) {
      return Math.floor((diffTimeMin / 60)).toString() + "h";
    } else if (diffTimeMin >= 1440) {
      return Math.floor((diffTimeMin / 1440)).toString() + "d";
    } else if (diffTimeMin >= 10080) {
      return Math.floor((diffTimeMin / 10080)).toString() + "w";
    } else {
      return diffTimeMin.toString() + "m";
    }
  }

}
