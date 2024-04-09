interface UserID {
    userId: string,
}

export interface PostProps {
    postId: number;
    User: any;
    title: string;
    content: string;
    createdAt: Date;
    Images: any,
    Hearts: UserID[],
    Comments: UserID[],
    _count: {
        Hearts: number,
        Reposts: number,
        Comments: number,
    }
}