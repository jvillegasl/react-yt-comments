import "./CommentThread.scss";

import { GoTriangleDown as Down, GoTriangleUp as Up } from "react-icons/go";
import { Comment } from "@/components";
import { useState } from "react";
import { IReply, IComment } from "@/types";

type CommentThreadProps = {
    comment: IComment;
};

export function CommentThread({ comment }: CommentThreadProps) {
    const [showReplies, setShowReplies] = useState(false);

    function toggleShowReplies() {
        setShowReplies((prev) => !prev);
    }

    return (
        <div className="c-comment-thread">
            <Comment comment={comment.topLevelComment} />

            {comment.replies && comment.replies.length > 0 && (
                <div className="c-comment-thread__replies">
                    <button
                        className="c-comment-thread__expand"
                        onClick={() => toggleShowReplies()}
                    >
                        {showReplies ? <Up /> : <Down />}

                        <span>
                            {comment.replies.length}{" "}
                            {comment.replies.length > 1 ? "replies" : "reply"}
                        </span>
                    </button>

                    {showReplies &&
                        comment.replies.map((reply, i) => {
                            return (
                                <Comment
                                    key={i}
                                    parentId={comment.topLevelComment.id}
                                    comment={reply}
                                    size="sm"
                                />
                            );
                        })}
                </div>
            )}
        </div>
    );
}
