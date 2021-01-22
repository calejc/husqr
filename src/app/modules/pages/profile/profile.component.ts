import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TimelineService } from 'src/app/core/services/timeline.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Post } from 'src/app/core/data/types/post.interface';
// import { USERS } from 'src/app/core/data/data';
import { User } from 'src/app/core/data/types/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: number;
  sub: any;
  user: User;
  userPost$: Observable<any[]>;

  constructor(private route: ActivatedRoute, public timelineService: TimelineService, private usersService: UsersService) {  }

  ngOnInit(): void {
    // this.sub = this.route.params.subscribe(params => {
    //   this.id = +params['id'];
    // });
    // this.user = this.usersService.getUserById(this.id);
    // this.userPost$ = this.timelineService.getPostsByUser(this.id);
    // console.log(this.id);
    // console.log(this.sub);
    // console.log(this.userPost$);
  }

}
