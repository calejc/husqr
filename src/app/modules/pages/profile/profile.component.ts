import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, public firestoreService: FirestoreService, public authenticationService: AuthenticationService) {  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['uid'];
      console.log(this.id);
      this.user = this.firestoreService.getUserData(this.id);
      this.userPost$ = this.firestoreService.getAllPostsByUid(this.id);
    });
    this.authenticationService.getUser().subscribe((user) => {
      this.currentUser = user;
    })
    // console.log("this.id: ", this.id);
    
    // console.log(this.user);
    
  }

  addFollowing(){
    let data = {
      arrayValue: this.user.uid, 
      ref: this.firestoreService.collectionRefs.usersRef,
      docId: this.currentUser.uid
    }
    this.firestoreService.updateFollowing(data);
    this.firestoreService.updateFollowers(data);
  }

}
