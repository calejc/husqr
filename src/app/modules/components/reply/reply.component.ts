import { Component, Input, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {


  @Input() reply: any;
  user: any;

  constructor(public firestoreService: FirestoreService) { 
  }

  ngOnInit(): void {
    this.user = this.firestoreService.getUserData(this.reply.uid)
  }

}
