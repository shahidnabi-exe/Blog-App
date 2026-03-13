import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import CommentSection from "../../Components/Blog/CommentSection";
import { server } from "../../config/server";
import './blogdetails.css';

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${server}/api/blog/${id}`)
      .then(res => {
        setBlog(res.data.blog);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch blog:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="blog-details-loading">Loading...</div>;
  if (!blog) return <div className="blog-details-error">Blog not found.</div>;

  return (
    <div className="blog-details-page">
      <div className="blog-details-container">

        {/* Title only at top */}
        <h1 className="blog-details-title">{blog.title}</h1>

        <hr className="blog-details-divider" />

        {/* Cover image */}
        {blog.coverImageURL && (
          <img
            src={blog.coverImageURL}
            alt={blog.title}
            className="blog-details-cover"
          />
        )}

        {/* Blog body */}
        <p className="blog-details-body">{blog.body}</p>

        {/* Meta moved here — above comments */}
        <div className="blog-details-meta">
          <div className="blog-details-avatar">
            {blog.createdBy?.name?.[0] || "U"}
          </div>
          <div className="blog-details-meta-info">
            <span className="blog-details-author">
              {blog.createdBy?.name || "Unknown"}
            </span>
            <span className="blog-details-date">
              {new Date(blog.createdAt).toDateString()}
            </span>
          </div>
        </div>

        <hr className="blog-details-divider" />

        {/* Comments */}
        <div className="blog-details-comments">
          <CommentSection blogId={id} />
        </div>

      </div>
    </div>
  );
}