import { Time } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { TimelineService } from '../../timeline.service';
import { Post } from '../../post.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-husq-form',
  templateUrl: './husq-form.component.html',
  styleUrls: ['./husq-form.component.css']
})
export class HusqFormComponent implements OnInit {

  newHusqForm: FormGroup;
  constructor(private service: TimelineService, fb: FormBuilder, private dr: MatDialogRef<HusqFormComponent>, @Inject(MAT_DIALOG_DATA) data ) {
    this.newHusqForm = fb.group({
      displayName: '',
      username: '',
      datetime: '',
      post: ''
    })
  }

  ngOnInit(): void {
  }

  save(): void{
      this.dr.close(this.newHusqForm.value);
  }

  close(): void{
      this.dr.close();
  }

  onNoClick(): void {
    this.dr.close();
  }

}
