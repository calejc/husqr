export interface Post {
    postId: string;
    uid: string;
    datetime: string;
    post: string;
    likes: number;
    parentHusq?: number; 
    // replies: number[];
}


