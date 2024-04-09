

export type UserInfo = {
    avatar: File | string,
    username: string, 
    password: string,
    passwordCompleted: string
}

export type Credentials = {
    avatar?: File | string
    username: string;
    password: string;
}