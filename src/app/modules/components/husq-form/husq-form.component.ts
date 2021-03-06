import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-husq-form',
  templateUrl: './husq-form.component.html',
  styleUrls: ['./husq-form.component.scss']
})
export class HusqFormComponent implements OnInit {

  post: string = '';

  newHusqForm: FormGroup;
  constructor(fb: FormBuilder, private dr: MatDialogRef<HusqFormComponent>) {
    this.newHusqForm = fb.group({
      postId: null,
      userId: null,
      displayName: '',
      username: '',
      datetime: '',
      post: new FormControl('', [Validators.maxLength(255), Validators.required])
    })
  }

  ngOnInit(): void {
  }

  save(): void{
    // console.log(this.newHusqForm.valid)
    if(this.newHusqForm.valid) {
      this.dr.close(this.newHusqForm.value);
    }
  }

  close(): void{
    this.dr.close();
  }

  onNoClick(): void {
    this.dr.close();
  }

}
