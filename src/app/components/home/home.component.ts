import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../../timeline.service';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Post } from '../../post.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HusqFormComponent } from '../husq-form/husq-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  b: boolean = true;
  newHusqForm: FormGroup;
  constructor(private service: TimelineService, fb: FormBuilder, public dialog: MatDialog) { 
    this.b = true;
    this.newHusqForm = fb.group({
      displayName: '',
      username: '',
      datetime: '',
      post: ''
    })
  }

  ngOnInit(): void {
  }

  newHusq(){
    // this.b = false;
    const config = new MatDialogConfig();
    config.autoFocus = true;
    config.data = {post: ''}
    const dr = this.dialog.open(HusqFormComponent, config);
    dr.afterClosed().subscribe(result => {
      let post: Post = {
        displayName: "Cale",
        username: "cjcortney",
        datetime: new Date().toLocaleString(),
        post: result.post,
      }
      this.service.addPost(post);
      this.b = true;
    });
  }

}
