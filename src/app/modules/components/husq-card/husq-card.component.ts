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
      console.log(this.usersService.users);
    }

  @Input() post: Post;
  @Input() user: User;
  @Input() replie$: Observable<any[]>;

  newHusqReply(parentHusqId: number){
    // var replyId = this.timelineService.generateNextId();
    const config = new MatDialogConfig();
    config.autoFocus = true;
    const dr = this.dialog.open(HusqFormComponent, config);
    // dr.afterClosed().subscribe(result => {
    //   let post: Post = {
    //     postId: replyId,
    //     userId: 3212,
    //     displayName: "Cale",
    //     username: "cjcortney",
    //     avatar: "",
    //     datetime: new Date().toLocaleString(),
    //     post: result.post,
    //     likes: 0,
    //     parentHusq: parentHusqId,
    //     isReply: true,
    //     replies: []
    //   }
    //   this.service.addPost(post);
    //   this.addReplyToParent(parentHusqId, replyId)
    // });
  }

  getUser(){
    // console.log(this.post);
    // console.log(this.usersService.getUserById(this.post.username))
    this.user = this.usersService.getUserById(this.post.username)

    // if (this.post){
      // console.log("POST: ", this.post, "USER: ", this.user);
    // }
  }


  ngOnInit(): void {
    this.getUser()
  }

  addLikes(): void{
    this.liked ? this.post.likes-- : this.post.likes++;
  }

  likeButtonClicked(){
    this.addLikes()
    this.toggleClass()
  }

  toggleClass(){
    this.liked = !this.liked;
  }

  replyButtonClicked(parentHusqId: number){
    this.newHusqReply(parentHusqId);
  }


}
