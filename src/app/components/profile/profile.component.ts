import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TimelineService } from 'src/app/services/timeline.service';
import { Post } from '../../types/post.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: number;
  sub: any;
  userPost$: Observable<any[]>;

  constructor(private route: ActivatedRoute, public timelineService: TimelineService) {  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.userPost$ = this.timelineService.getPostsByUser(this.id);
    console.log(this.id);
    console.log(this.sub);
    console.log(this.userPost$);
  }

}
