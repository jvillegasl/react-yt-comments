import "./InputComment.scss";

import {
    FormEventHandler,
    InputHTMLAttributes,
    MouseEventHandler,
    useContext,
    useId,
    useState,
} from "react";
import classNames from "classnames";

import { Button } from "@/components";
import { UserContext } from "@/context";

type InputCommentProps = {
    expandOnFocus?: boolean;
    submitLabel?: string;
    cancelLabel?: string;
    onSubmit?: (comment: string) => void;
    onCancel?: () => void;
    picSize?: "sm";
    defaultValue?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onSubmit" | "defaultValue">;

export function InputComment({
    expandOnFocus = false,
    submitLabel = "Submit",
    cancelLabel = "Cancel",
    onSubmit = () => null,
    onCancel = () => null,
    picSize,
    defaultValue = "",
    ...inputProps
}: InputCommentProps) {
    const user = useContext(UserContext)!;
    const formId = useId();
    const [comment, setComment] = useState(defaultValue);
    const [isExpanded, setIsExpanded] = useState(!expandOnFocus);

    const handleCancel = function () {
        if (expandOnFocus) setIsExpanded(false);
        setComment("");
        onCancel();
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = function (event) {
        event.preventDefault();
        setComment("");
        onSubmit(comment);
    };

    return (
        <div className="c-input">
            <div className="c-input__author">
                <img
                    className={classNames("c-input__pic", {
                        [`c-input__pic--${picSize}`]: picSize,
                    })}
                    src={user.profileImageUrl}
                />
            </div>

            <div className="c-input__main">
                <div className="c-input__body">
                    <form id={formId} action="" onSubmit={handleSubmit}>
                        <input
                            className="c-input__field"
                            type="text"
                            placeholder="Añade un comentario..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            onFocus={() => expandOnFocus && setIsExpanded(true)}
                            {...inputProps}
                        />
                    </form>
                </div>

                {isExpanded && (
                    <div className="c-input__footer">
                        <div className="c-input__buttons">
                            <Button
                                className="c-input__cancel"
                                variant="secondary"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>

                            <Button
                                className="c-input__submit"
                                variant="primary"
                                type="submit"
                                form={formId}
                                disabled={comment === ""}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
