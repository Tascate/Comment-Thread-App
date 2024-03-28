import { Comment } from "./Comment";

export function Comments({ comments }) {
  return (
    <div className="comments">
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
}
