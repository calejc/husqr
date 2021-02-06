import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/core/data/types/post.interface';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

// import { USERS } from 'src/app/core/data/data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: string;
  user: any;
  currentUser: any;
  userPost$: Observable<any[]>;
  following: boolean = false;

  constructor(private route: ActivatedRoute, 
    public firestoreService: FirestoreService, 
    public authenticationService: AuthenticationService, 
    private router: Router) {  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['uid'];
      console.log(this.id);
      this.user = this.firestoreService.getUserData(this.id);
      this.userPost$ = this.firestoreService.getAllPostsByUid(this.id);
    });
    this.authenticationService.getUser().subscribe((user) => {
      this.currentUser = user;
      this.firestoreService.fetchDocument(this.firestoreService.collectionRefs.usersRef.doc(this.id)).subscribe((obj) => {
        this.following = obj.followers ? obj.followers.some(follow => user.uid) : false;
      })
    })
  }

  toggleFollow(){
    let data = {
      arrayValue: this.user.uid, 
      ref: this.firestoreService.collectionRefs.usersRef,
      docId: this.currentUser.uid
    }
    this.following ? this.unfollow(data) : this.follow(data)

  }

  follow(data: any) {
    this.firestoreService.addFollowing(data);
    this.firestoreService.addFollowers(data);
  }

  unfollow(data: any) {
    this.firestoreService.removeFollowers(data);
    this.firestoreService.removeFollowing(data);
  }
}
