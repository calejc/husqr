import { Component, OnInit } from '@angular/core';
import { TimelineService } from 'src/app/core/services/timeline.service'
import { FormGroup } from '@angular/forms';
import { Post } from 'src/app/core/data/types/post.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HusqFormComponent } from 'src/app/modules/components/husq-form/husq-form.component';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newHusqForm: FormGroup;
  post$: Observable<Post[]>;
  constructor(public service: TimelineService, public dialog: MatDialog) { 
  }

  ngOnInit(): void {
  }

  

  newHusq(){
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
        isReply: false,
        replies: []
      }
      this.service.addPost(post);
    });
  }

}
