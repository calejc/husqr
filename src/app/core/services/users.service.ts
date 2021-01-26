import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirestoreService } from './firestore.service';
// import { USERS } from 'src/app/core/data/data';
import { User } from 'src/app/core/data/types/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // private INITIAL_STATE = this.firestoreService.getAllUsers().valueChanges();
  private INITIAL_STATE = []
  
  constructor(private firestoreService: FirestoreService) { 
  }

  public readonly userSubject = new BehaviorSubject(this.INITIAL_STATE);
  readonly user$ = this.userSubject.asObservable();


  get users(): User[]{
    return this.userSubject.getValue();
  }

  set users(user: User[]){
    this.userSubject.next(user);
  }

  getUserById(id: string){
    return this.users.find((user) => user.uid === id);
  }

  
}

