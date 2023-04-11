export interface IComment {
    topLevelComment: IReply;
    replies: IReply[];
}

export interface IReply {
    id: string;
    // textDisplay: string;
    textOriginal: string;
    authorDisplayName: string;
    authorProfileImageUrl: string;
    authorChannelUrl: string;
    authorChannelId: string;
    likeCount: number;
    publishedAt: string;
    updatedAt: string;
    userLikeStatus: -1 | 0 | 1;
}
