import { Component, Input, OnInit } from '@angular/core';
import { TimelineService } from '../../timeline.service';

@Component({
  selector: 'app-husq-card',
  templateUrl: './husq-card.component.html',
  styleUrls: ['./husq-card.component.css']
})
export class HusqCardComponent implements OnInit {

  // @Input()
  // name: string;
  // @Input()
  // datetime: string;
  // @Input()
  // content: string;
  posts$ = this.service.getPosts();


  constructor(private service: TimelineService) { }

  ngOnInit(): void {
  }

}
