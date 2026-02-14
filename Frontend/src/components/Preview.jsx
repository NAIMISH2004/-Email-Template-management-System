import API from "../services/api";
import { useState } from "react";

export default function Preview({ id }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const preview = async () => {
    try {
      setError("");

      const res = await API.post(`/${id}/render`, {
        email: "test@gmail.com"
      });

      setSubject(res.data.subject);
      setBody(res.data.body);

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Preview failed"
      );
    }
  };

  return (
    <div>

      <button onClick={preview}>
        Preview
      </button>

      {error && (
        <p className="error">{error}</p>
      )}

      {subject && (
        <h3>
          <b>Subject:</b> {subject}
        </h3>
      )}

      {body && (
        <div
          className="preview-box"
          style={{ whiteSpace: "pre-line" }}
        >
          <b>Body:</b>
          <p>{body}</p>
        </div>
      )}

    </div>
  );
}
