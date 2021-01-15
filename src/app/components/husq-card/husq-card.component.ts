import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Post } from 'src/app/types/post.interface';
import { TimelineService } from '../../services/timeline.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HusqFormComponent } from '../husq-form/husq-form.component';

@Component({
  selector: 'app-husq-card',
  templateUrl: './husq-card.component.html',
  styleUrls: ['./husq-card.component.scss']
})
export class HusqCardComponent implements OnInit {

  @Input() post: Post;

  newHusqReply(parentHusq: number){
    const config = new MatDialogConfig();
    config.autoFocus = true;
    const dr = this.dialog.open(HusqFormComponent, config);
    dr.afterClosed().subscribe(result => {
      let post: Post = {
        postId: 101,
        userId: 3212,
        displayName: "Cale",
        username: "cjcortney",
        avatar: "",
        datetime: new Date().toLocaleString(),
        post: result.post,
        likes: 5,
        parentHusq: parentHusq,
        isReply: true
      }
      this.service.addPost(post);
    });
  }

  constructor(private service: TimelineService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addLikes(): void{
    this.post.likes++;
  }


}
