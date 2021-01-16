import { Optional } from '@angular/core';
import { IUser } from './user.interface';

class User implements IUser{
    id: number;
    displayName: string;
    username: string;
    avatar: string;
    posts: number[];
    constructor(id: number, displayName: string, username: string, avatar: string){
        this.id = id;
        this.displayName = displayName;
        this.username = username;
        this.avatar = avatar;
    }
}

export { User }