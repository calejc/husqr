import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { HusqFormComponent } from '../husq-form/husq-form.component';
import { TimelineService } from 'src/app/core/services/timeline.service';
import { Post } from 'src/app/core/data/types/post.interface';
// import { User } from 'src/app/core/data/types/user.interface';

@Component({
  selector: 'app-husq-card',
  templateUrl: './husq-card.component.html',
  styleUrls: ['./husq-card.component.scss']
})
export class HusqCardComponent implements OnInit {

  liked: boolean = false;
  constructor(private service: TimelineService, public dialog: MatDialog) { }

  @Input() post: Post;
  @Input() replie$: Observable<any[]>;

  newHusqReply(parentHusqId: number){
    var replyId = this.service.generateNextId();
    const config = new MatDialogConfig();
    config.autoFocus = true;
    const dr = this.dialog.open(HusqFormComponent, config);
    dr.afterClosed().subscribe(result => {
      let post: Post = {
        postId: replyId,
        userId: 3212,
        displayName: "Cale",
        username: "cjcortney",
        avatar: "",
        datetime: new Date().toLocaleString(),
        post: result.post,
        likes: 0,
        parentHusq: parentHusqId,
        isReply: true,
        replies: []
      }
      this.service.addPost(post);
      this.addReplyToParent(parentHusqId, replyId)
    });
  }

  addReplyToParent(parent: number, reply: number): void{
    let replies = this.service.getPostByPostId(parent).replies;
    replies = [
      ... replies,
      reply
    ]
    this.service.getPostByPostId(parent).replies = replies;
    this.replie$ = this.service.getReplies(this.post.postId);
  }

  getReplies(){
    this.replie$ = this.service.getReplies(this.post.postId);
  }

  ngOnInit(): void {
    this.getReplies();
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
