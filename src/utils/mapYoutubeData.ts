import { IComment, IReply } from "@/types";

export function mapYoutubeData(data: any) {
    const mappedData: IComment[] = data.items.map((item: any) => {
        const topLevelComment = mapReply(item.snippet.topLevelComment);
        const replies =
            item.replies?.comments.map((reply: any) => mapReply(reply)) ?? [];

        return { topLevelComment, replies };
    });
    return mappedData;
}

function mapReply(reply: any) {
    const { id, snippet } = reply;
    const {
        textDisplay,
        textOriginal,
        authorDisplayName,
        authorProfileImageUrl,
        authorChannelUrl,
        likeCount,
        publishedAt,
        updatedAt,
    } = snippet;

    let { authorChannelId } = snippet;
    authorChannelId = authorChannelId.value;

    const mappedReply: IReply = {
        id,
        textOriginal,
        authorDisplayName,
        authorProfileImageUrl,
        authorChannelUrl,
        authorChannelId,
        likeCount,
        publishedAt,
        updatedAt,
        userLikeStatus: 0,
    };

    return mappedReply;
}
