import "./CommentsSection.scss";

import { MdSort as Sort } from "react-icons/md";
import { CommentThread, InputComment, Dropdown } from "@/components";
import { useComments } from "@/hooks";
import { CommentsContext } from "@/context";

export function CommentsSection() {
    const commentsState = useComments();
    const [comments, addComment] = commentsState;

    function handleSubmitNewComment(text: string) {
        addComment(text);
    }

    return (
        <CommentsContext.Provider value={commentsState}>
            <section className="c-comments-section">
                <div className="c-comments-section__header">
                    <div className="c-comments-section__toolbar">
                        <span className="c-comments-section__count">
                            {comments.length} Comments
                        </span>
                        <Dropdown>
                            <Sort />
                            <span>Sort by</span>
                        </Dropdown>
                    </div>

                    <InputComment
                        expandOnFocus={true}
                        onSubmit={handleSubmitNewComment}
                    />
                </div>

                <div className="c-comments-section__body">
                    <ul className="c-comments-section__items">
                        {comments.map((comment, i) => {
                            return (
                                <li
                                    key={i}
                                    className="c-comments-section__item"
                                >
                                    <CommentThread key={i} comment={comment} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>
        </CommentsContext.Provider>
    );
}
