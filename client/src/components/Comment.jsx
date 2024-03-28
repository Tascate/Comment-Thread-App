import { useContext, useState } from "react";
import { deleteComment, editComment } from "../api/commentRequests";
import { DraftEditor } from "./DraftEditor";
import { CommentsContext } from "./CommentsContext";
import { useAPICall } from "../api/useAPICall";
const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export function Comment({ id, author, text, date, likes, image }) {
  const [isEditing, setIsEditing] = useState(false);
  const { editLocalComment, deleteLocalComment } = useContext(CommentsContext);
  const callDeleteComment = useAPICall(deleteComment);
  const callEditComment = useAPICall(editComment);
  function onCommentDelete() {
    return callDeleteComment.request({ id }).then(() => deleteLocalComment(id));
  }
  function onCommentEdit({ text }) {
    setIsEditing(false);
    return callEditComment.request({ id, text }).then((result) => {
      editLocalComment(result.comment.id, result.comment.text);
    });
  }
  return (
    <div className="comment">
      <hr />
      <div className="header">
        <span className="author">{author}</span>
        <span className="date">{dateFormatter.format(Date.parse(date))}</span>
      </div>
      {isEditing ? (
        <DraftEditor
          loading={callEditComment.loading}
          error={callEditComment.error}
          author={author}
          initalText={text}
          onSubmit={onCommentEdit}
        />
      ) : (
        <div className="comment-content">
          <p>{text}</p>
          {image != "" ? (
            <div className="comment-image-container">
              <img src={image} />
            </div>
          ) : null}
        </div>
      )}

      <div className="footer">
        <span className="likes">{`${likes} likes`}</span>
        <div className="footer-buttons">
          <button
            aria-label={isEditing ? "Cancel Edit" : "Edit"}
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? "Cancel Edit" : "Edit"}
          </button>
          <button aria-label="Delete" onClick={onCommentDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
