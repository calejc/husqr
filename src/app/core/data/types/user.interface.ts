export interface User {
    uid: string;
    email: string;
    displayName: string;
    username?: string;
    photoURL?: string;
    posts?: number[]

    phoneNumber?: any;
    providerId?: string;
    


}