import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../../timeline.service';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Post } from '../../post.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HusqFormComponent } from '../husq-form/husq-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newHusqForm: FormGroup;
  constructor(private service: TimelineService, public dialog: MatDialog) { 
  }

  ngOnInit(): void {
  }

  newHusq(){
    const config = new MatDialogConfig();
    config.autoFocus = true;
    config.data = {post: ''}
    const dr = this.dialog.open(HusqFormComponent, config);
    dr.afterClosed().subscribe(result => {
      let post: Post = {
        displayName: "Cale",
        username: "cjcortney",
        avatar: "",
        datetime: new Date().toLocaleString(),
        post: result.post,
      }
      this.service.addPost(post);
    });
  }

}
