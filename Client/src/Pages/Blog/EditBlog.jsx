import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../config/server";
import toast from "react-hot-toast";
import './CreateBlog.css';

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    axios.get(`${server}/api/blog/${id}`)
      .then(res => {
        setTitle(res.data.blog.title);
        setContent(res.data.blog.body);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load blog");
        setLoading(false);
      });
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !content) return toast.error("Title and content are required");

    setBtnLoading(true);
    try {
      const token = localStorage.getItem("token");

      await axios.put(`${server}/api/blog/${id}`, 
        { title, body: content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Blog updated successfully");
      navigate("/my-blogs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update blog");
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading) return <div className="create-blog-page">Loading...</div>;

  return (
    <div className="create-blog-page">
      <div className="create-blog-card">
        <div className="create-blog-header">
          <h2>Edit Blog</h2>
          <p>Update your blog post</p>
        </div>

        <form onSubmit={submitHandler} className="create-blog-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog title"
              required
            />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              placeholder="Blog content"
              required
            />
            <span className="char-count">{content.length} characters</span>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate("/my-blogs")}>
              Cancel
            </button>
            <button type="submit" disabled={btnLoading} className="submit-btn">
              {btnLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}