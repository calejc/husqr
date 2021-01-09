import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { TimelineService } from '../../timeline.service';
import { Post } from '../../post.interface';

@Component({
  selector: 'app-husq-form',
  templateUrl: './husq-form.component.html',
  styleUrls: ['./husq-form.component.css']
})
export class HusqFormComponent implements OnInit {

  newHusqForm: FormGroup;
  constructor(private service: TimelineService, fb: FormBuilder) {
    this.newHusqForm = fb.group({
      displayName: '',
      username: '',
      datetime: '',
      post: ''
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let post: Post = {
      displayName: this.newHusqForm.get("displayName").value,
      username: this.newHusqForm.get("username").value,
      datetime: this.newHusqForm.get("datetime").value,
      post: this.newHusqForm.get("post").value,
    }
    this.service.addPost(post);
  }

}
