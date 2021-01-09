import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../../timeline.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  b: boolean = true;
  constructor(private service: TimelineService) { this.b = true;}

  ngOnInit(): void {
  }

  onNewHusq(){
    this.b = false;
  }


}
