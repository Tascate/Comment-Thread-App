import { useState } from "react";

export function DraftEditor({
  loading,
  error,
  onSubmit,
  author = "",
  initalText = "",
  initalImage = "",
}) {
  const [text, setText] = useState(initalText);
  const image = initalImage;
  //const [image, setImage] = useState(initalImage);

  function submit(e) {
    e.preventDefault();
    onSubmit({ author, image, text }).then(() => {
      setText("");
    });
  }

  return (
    <form onSubmit={submit}>
      <div className="draft-editor">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="draft-text"
        />
        {/* <textarea
          value={image}
          onChange={(e) => setText(e.target.value)}
          className="draft-image"
        /> */}
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        <div className="error-text">{error}</div>
      </div>
    </form>
  );
}
