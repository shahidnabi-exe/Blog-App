import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function BlogForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("coverImage", image);

    await axios.post("/blog", formData);
    nav("/");
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <input
        className="w-full border rounded p-3"
        placeholder="Enter blog title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border rounded p-3 h-40"
        placeholder="Write your blog content..."
        value={body}
        onChange={e => setBody(e.target.value)}
      />

      <label className="border-2 border-dashed rounded p-10 flex flex-col items-center cursor-pointer">
        <input
          type="file"
          hidden
          onChange={e => setImage(e.target.files[0])}
        />
        Click to upload cover image
      </label>

      <button className="bg-blue-600 text-white px-6 py-2 rounded">
        Publish Blog
      </button>
    </form>
  );
}