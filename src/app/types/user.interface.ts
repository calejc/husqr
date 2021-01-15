export interface User {
    id: number;
    displayName: string;
    username: string;
    avatar?: string;
    posts?: number[]
}