import { UserContext } from "@/context";
import { COMMENTS } from "@/data";
import { IComment, IReply } from "@/types";
import { rampFunction } from "@/utils";
import { useContext, useEffect, useState } from "react";

export function useComments() {
    const user = useContext(UserContext)!;
    const [comments, setCommets] = useState<IComment[]>([]);

    useEffect(() => {
        const storedComments = localStorage.getItem("comments");
        if (!storedComments) {
            localStorage.setItem("comments", JSON.stringify(COMMENTS));
            setCommets(COMMENTS);
            return;
        }

        setCommets(JSON.parse(storedComments));
    }, []);

    function addComment(text: string) {
        const newCommet: IComment = {
            topLevelComment: getNewReply(text),
            replies: [],
        };

        setCommets((prev) => {
            const newComments = [newCommet, ...prev];
            localStorage.setItem("comments", JSON.stringify(newComments));
            return newComments;
        });
    }

    function addReply(commentId: string, text: string) {
        const newReply = getNewReply(text);

        setCommets((prevComments) => {
            let newComments = [...prevComments];

            const index = newComments.findIndex(
                (comment) => comment.topLevelComment.id === commentId
            );
            newComments[index].replies.push(newReply);

            localStorage.setItem("comments", JSON.stringify(newComments));
            return newComments;
        });
    }

    function setLikeStatus(commentId: string, likeStatus: -1 | 0 | 1) {
        console.log("test");

        setCommets((prevComments) => {
            let newComments = [...prevComments];

            const index = newComments.findIndex(
                (comment) => comment.topLevelComment.id === commentId
            );

            if (index !== -1) {
                const prevLikeStatus =
                    newComments[index].topLevelComment.userLikeStatus;

                const diffLikeStatus =
                    rampFunction(likeStatus) - rampFunction(prevLikeStatus);

                newComments[index].topLevelComment.likeCount += diffLikeStatus;
                newComments[index].topLevelComment.userLikeStatus = likeStatus;
            } else {
                newComments.forEach((comment, i) => {
                    const subIndex = comment.replies.findIndex(
                        (reply) => reply.id === commentId
                    );

                    if (subIndex === -1) return;

                    const prevLikeStatus =
                        newComments[i].replies[subIndex].userLikeStatus;

                    const diffLikeStatus =
                        rampFunction(likeStatus) - rampFunction(prevLikeStatus);

                    newComments[i].replies[subIndex].likeCount +=
                        diffLikeStatus;
                    newComments[i].replies[subIndex].userLikeStatus =
                        likeStatus;
                });
            }

            localStorage.setItem("comments", JSON.stringify(newComments));
            return newComments;
        });
    }

    function getNewReply(text: string): IReply {
        return {
            id: new Date().valueOf().toString(),
            authorChannelUrl: user.channelUrl,
            authorDisplayName: user.displayName,
            authorProfileImageUrl: user.profileImageUrl,
            authorChannelId: user.channelId,
            likeCount: 0,
            publishedAt: new Date().toISOString().split(".")[0] + "Z",
            updatedAt: new Date().toISOString().split(".")[0] + "Z",
            textOriginal: text,
            userLikeStatus: 0,
        };
    }

    return [comments, addComment, addReply, setLikeStatus] as const;
}
