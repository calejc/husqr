export interface IUser {
    uid: number;
    email: string;
    displayName: string;
    username?: string;
    photoURL?: string;
    posts?: number[]

    phoneNumber?: any;
    providerId?: string;
    


}