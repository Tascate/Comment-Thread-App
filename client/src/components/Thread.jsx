import { useEffect, useState } from "react";
import { Comments } from "./Comments";
import { useAPICall } from "../api/useAPICall";
import { addComment, getComments } from "../api/commentRequests";
import { CommentsContext } from "./CommentsContext";
import { DraftEditor } from "./DraftEditor";

export function Thread() {
  const [comments, setComments] = useState([]);
  const { request, loading, error } = useAPICall(getComments);
  const callAddComment = useAPICall(addComment);
  const currentUser = "Admin";

  useEffect(() => {
    request().then((result) => {
      setComments(result.comments);
    });
  }, [request]);

  function onCommentAdd({ author, text, image }) {
    return callAddComment.request({ author, text, image }).then((result) => {
      addLocalComment(result.comment);
    });
  }

  function addLocalComment(newComment) {
    setComments((comments) => {
      return [newComment, ...comments];
    });
  }

  function editLocalComment(id, text) {
    setComments((comments) => {
      console.log("looking for " + id);
      return comments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, text };
        } else {
          return comment;
        }
      });
    });
  }

  function deleteLocalComment(id) {
    setComments((comments) => {
      return comments.filter((comment) => comment.id !== id);
    });
  }

  return (
    <article className="main-content">
      <h1 className="thread-title">
        What&apos;s your go-to frontend and backend stack?
      </h1>
      <section className="comment-section">
        <DraftEditor
          loading={callAddComment.loading}
          error={callAddComment.error}
          author={currentUser}
          onSubmit={onCommentAdd}
        />
        <CommentsContext.Provider
          value={{ addLocalComment, editLocalComment, deleteLocalComment }}
        >
          {loading ? (
            <h1>loading</h1>
          ) : error ? (
            <h1>error</h1>
          ) : (
            comments && comments.length >= 0 && <Comments comments={comments} />
          )}
        </CommentsContext.Provider>
      </section>
    </article>
  );
}
