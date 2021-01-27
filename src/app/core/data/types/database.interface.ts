import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user.interface';
import { Post } from './post.interface';


export interface Database {
    '_User': BehaviorSubject<User>,
    '_Users': BehaviorSubject<User[]>;
    '_AllPosts': BehaviorSubject<Post[]>;
    '_ParentPosts': BehaviorSubject<Post[]>;
    '_PostsByUser': BehaviorSubject<Post[]>;
    [x: string]: any;
  }
  
  export interface ObservableDatabase {
    'User$': Observable<User>,
    'Users$': Observable<User[]>;
    'AllPosts$': Observable<Post[]>;
    'ParentPosts$': Observable<Post[]>;
    'PostsByUser$': Observable<Post[]>;
    [x: string]: any;
  }
