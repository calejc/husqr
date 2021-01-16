import { User } from './user.model';
export interface Post {
    postId: number;
    userId: number;
    displayName: string;
    username: string;
    avatar: string;
    datetime: string;
    post: string;
    likes: number;
    isReply: boolean;
    parentHusq?: number; 
    replies: number[];
}


