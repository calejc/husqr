import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Post } from 'src/app/core/data/types/post.interface';
import { FirestoreService } from './firestore.service';
import { map } from 'rxjs/operators';
import { User } from '../data/types/user.interface';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  // Initial state change to read in whatever firestore state is
  private INITIAL_STATE = [];
  // (Husq | User)[] 
  users: any;
  posts: any;

  data: (Post | User)[];

  constructor(private firestoreService: FirestoreService){
    // this.setData()
  }

}
