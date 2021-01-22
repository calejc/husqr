import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
// import { USERS } from 'src/app/core/data/data';
import { User } from 'src/app/core/data/types/user.model';
import { Post } from 'src/app/core/data/types/post.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // private USERS = USERS;
  
  constructor() { }

  // private readonly userSubject = new BehaviorSubject<User[]>(this.USERS);
  // private user$ = this.userSubject.asObservable();


  // get users(): User[]{
  //   return this.userSubject.getValue();
  // }

  // set users(user: User[]){
  //   this.userSubject.next(user);
  // }

  // getUserById(id: number){
  //   return this.users.find((user) => user.id === id);
  // }

  
}
