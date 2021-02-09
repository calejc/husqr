import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-husq-form',
  templateUrl: './husq-form.component.html',
  styleUrls: ['./husq-form.component.scss']
})
export class HusqFormComponent implements OnInit {

  post: string;

  newHusqForm: FormGroup;
  constructor(fb: FormBuilder, private dr: MatDialogRef<HusqFormComponent>) {
    this.newHusqForm = fb.group({
      postId: null,
      userId: null,
      displayName: '',
      username: '',
      datetime: '',
      post: this.post
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
