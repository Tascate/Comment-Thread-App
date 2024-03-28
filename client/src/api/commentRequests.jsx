import { callAPI } from "./callApi";

export function getComments() {
  return callAPI("/comments");
}

export function addComment({ author, text, image }) {
  return callAPI(`/comments/`, {
    method: "POST",
    data: { author, text, image },
  });
}

export function editComment({ id, text, image }) {
  console.log(text);
  return callAPI(`/comments/${id}`, {
    method: "PUT",
    data: { text, image },
  });
}

export function deleteComment({ id }) {
  return callAPI(`/comments/${id}`, {
    method: "DELETE",
  });
}
