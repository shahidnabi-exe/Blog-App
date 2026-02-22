import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../services/api";
import CommentSection from "../components/blog/CommentSection";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`/blog/${id}`).then(res => setBlog(res.data));
  }, [id]);

  if (!blog) return null;

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-serif mb-4">{blog.title}</h1>

      <img
        src={`http://localhost:8000/${blog.coverImageURL}`}
        className="rounded mb-6"
      />

      <p className="whitespace-pre-wrap mb-8">
        {blog.body}
      </p>

      <CommentSection blogId={id} />
    </div>
  );
}