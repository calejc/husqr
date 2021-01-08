import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-husq-card',
  templateUrl: './husq-card.component.html',
  styleUrls: ['./husq-card.component.css']
})
export class HusqCardComponent implements OnInit {

  @Input()
  name: string;
  @Input()
  datetime: string;
  @Input()
  content: string;


  constructor() { }

  ngOnInit(): void {
  }

}
