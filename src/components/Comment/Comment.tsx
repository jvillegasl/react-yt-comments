import "./Comment.scss";

import {
    FaEllipsisV as EllipsisV,
    FaThumbsDown as Dislike,
    FaThumbsUp as Like,
    FaRegThumbsUp as RegLike,
    FaRegThumbsDown as RegDislike,
} from "react-icons/fa";
import { BsFlag as Flag } from "react-icons/bs";
import { Button, IconButton, InputComment, ToggleButton } from "@/components";
import { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { IReply } from "@/types";
import { getTimeDiff } from "@/utils";
import { CommentsContext } from "@/context";

type CommentProps = {
    parentId?: string;
    comment: IReply;
    size?: "sm";
};

type LikeDislikeProps = {
    commentId: string;
    likeCount: number;
    likeStatus: -1 | 0 | 1;
};

type ActionMenuProps = {
    className?: string;
};

export function Comment({ parentId, comment, size }: CommentProps) {
    const [, , addReply] = useContext(CommentsContext)!;
    const textRef = useRef<HTMLParagraphElement>(null);
    const [newReply, setNewReply] = useState(false);
    const [showMore, setShowMore] = useState(false);

    function toggleShowMore() {
        setShowMore((prev) => !prev);
    }

    function handleSubmitReply(text: string) {
        setNewReply(false);

        if (!parentId) {
            addReply(comment.id, text);
        } else {
            addReply(parentId, text);
        }
    }

    return (
        <div
            className={classNames("c-comment", {
                [`c-comment--${size}`]: size,
            })}
        >
            <div className="c-comment__side--left">
                <img
                    className="c-comment__pic"
                    src={comment.authorProfileImageUrl}
                />
            </div>

            <div className="c-comment__main">
                <div className="c-comment__header">
                    <h3 className="c-comment__author">
                        <a href={comment.authorChannelUrl}>
                            @{comment.authorDisplayName}
                        </a>
                    </h3>

                    <span className="c-comment__date">
                        <a href="">{getTimeDiff(comment.publishedAt)} ago</a>
                    </span>
                </div>

                <div className="c-comment__body">
                    <p
                        ref={textRef}
                        className={classNames("c-comment__text", {
                            [`c-comment__text--ellipsis`]: !showMore,
                        })}
                    >
                        {comment.textOriginal}
                    </p>

                    {textRef.current && textRef.current.offsetHeight > 80 && (
                        <button
                            className="c-comment__show-more"
                            onClick={toggleShowMore}
                        >
                            {!showMore ? "Read more" : "Show less"}
                        </button>
                    )}
                </div>

                <div className="c-comment__footer">
                    <div className="c-comment__toolbar">
                        <LikeDislike
                            commentId={comment.id}
                            likeCount={comment.likeCount}
                            likeStatus={comment.userLikeStatus}
                        />

                        <Button
                            size="sm"
                            variant="secondary"
                            style={{ color: "#525252" }}
                            onClick={() => setNewReply(true)}
                        >
                            Reply
                        </Button>
                    </div>

                    {newReply && (
                        <InputComment
                            picSize="sm"
                            onCancel={() => setNewReply(false)}
                            onSubmit={handleSubmitReply}
                            defaultValue={`@${comment.authorDisplayName} `}
                            autoFocus
                        />
                    )}
                </div>
            </div>

            <div className="c-comment__side--right">
                <ActionMenu />
            </div>
        </div>
    );
}

function LikeDislike({ commentId, likeCount, likeStatus }: LikeDislikeProps) {
    const [, , , setLikeStatus] = useContext(CommentsContext)!;

    function handleLike() {
        const newLikeStatus = likeStatus > 0 ? 0 : 1;

        setLikeStatus(commentId, newLikeStatus);
    }

    function handleDislike() {
        const newLikeStatus = likeStatus < 0 ? 0 : -1;

        setLikeStatus(commentId, newLikeStatus);
    }

    return (
        <>
            <ToggleButton
                tooltipLabel="Like"
                iconOff={<RegLike />}
                iconOn={<Like />}
                value={likeStatus > 0}
                onToggle={handleLike}
            />
            {likeCount > 0 && (
                <span className="c-comment__likes-count">{likeCount}</span>
            )}
            <ToggleButton
                tooltipLabel="Dislike"
                iconOff={<RegDislike />}
                iconOn={<Dislike />}
                value={likeStatus < 0}
                onToggle={handleDislike}
            />
        </>
    );
}

function ActionMenu({ className }: ActionMenuProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showActionMenu, setShowActionMenu] = useState(false);

    useEffect(() => {
        if (!showActionMenu) return;

        const containerElement = containerRef.current;

        if (!containerElement) return;

        const handleClickOutside = function (e: MouseEvent) {
            if (!(e.target instanceof Element)) return;

            if (containerElement.contains(e.target)) return;

            setShowActionMenu(false);
        };

        document.addEventListener("click", handleClickOutside);

        return () => document.removeEventListener("click", handleClickOutside);
    }, [showActionMenu]);

    function toogleActionMenu() {
        setShowActionMenu((prev) => !prev);
    }

    return (
        <div
            ref={containerRef}
            className={classNames("c-comment-action-menu", className)}
        >
            <IconButton
                className="c-comment-action-menu__trigger"
                onClick={toogleActionMenu}
            >
                <EllipsisV />
            </IconButton>

            {showActionMenu && (
                <div className="c-comment-action-menu__wrapper">
                    <ul className="c-comment-action-menu__items">
                        <li className="c-comment-action-menu__item">
                            <button className="c-comment-action-menu__action">
                                <Flag className="c-comment-action-menu__icon" />
                                <span>Report</span>
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
