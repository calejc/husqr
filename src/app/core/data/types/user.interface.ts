export interface User {
    uid?: string;
    email?: string;
    displayName?: string;
    username?: string;
    photoURL?: string;
    posts?: number[];
    emailVerified?: boolean;
    following?: string[];
    followers?: string[];
    bio?: string;

}