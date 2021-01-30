export interface Post {
    postId?: string;
    uid: string;
    datetime: string;
    post: string;
    // likes: number;
    likes: string[];
    parentHusq?: string; 
    replies?: string[];
}


