import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/core/data/types/post.interface';
import { FirestoreService } from 'src/app/core/services/firestore.service';

// import { USERS } from 'src/app/core/data/data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: string;
  user: any;
  userPost$: Observable<any[]>;

  constructor(private route: ActivatedRoute, public firestoreService: FirestoreService) {  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['uid'];
      this.user = this.firestoreService.getUserData(this.id);
      this.userPost$ = this.firestoreService.getAllPostsByUid(this.id);
    });
    // console.log("this.id: ", this.id);
    
    // console.log(this.user);
    
  }

}
