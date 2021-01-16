import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { USERS } from '../data/data';
import { User } from '../types/user.model';
import { Post } from '../types/post.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private USERS = USERS;
  
  constructor() { }

  private readonly userSubject = new BehaviorSubject<User[]>(this.USERS);
  private user$ = this.userSubject.asObservable();


  get users(): User[]{
    return this.userSubject.getValue();
  }

  set users(user: User[]){
    this.userSubject.next(user);
  }

  getUserById(id: number){
    return this.users.filter((user) => user.id === id)[0];
  }

}
