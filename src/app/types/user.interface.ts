export interface IUser {
    id: number;
    displayName: string;
    username: string;
    avatar?: string;
    posts?: number[]
}