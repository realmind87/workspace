


interface UserID {
    userId: string,
}

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

export type CommentsProps = {
    commentId: number,
    postId: number,
    userInfo: string,
    content: string,
    createdAt: Date
}

export interface PostProps {
    postId: number;
    User: any;
    title: string;
    content: string;
    createdAt: Date;
    Images: any,
    Hearts: UserID[],
    Comments: CommentsProps[]
}


export type SearchParamsProps = {
    searchParams: { q: string, f?: string, pf?: string };
}