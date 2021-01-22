export interface Post {
    postId: number;
    uid: number;
    datetime: string;
    post: string;
    likes: number;
    parentHusq?: number; 
    // replies: number[];
}


