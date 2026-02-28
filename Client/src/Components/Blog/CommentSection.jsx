import { useState, useEffect } from "react";
import axios from "axios";
import { UserData } from "../../Context/authContext";
import { server } from "../../config/server";
import toast from "react-hot-toast";
import '../../Pages/Blog/blogdetails.css';

const CommentSection = ({ blogId }) => {
  const { user, isAuth } = UserData();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchComments() {
    try {
      const { data } = await axios.get(`${server}/api/blog/comment/${blogId}`);
      setComments(data.comments || []);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  }

  async function handleAddComment(e) {
    e.preventDefault();

    if (!text.trim()) return toast.error("Write something");

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `${server}/api/blog/comment/${blogId}`,
        { content: text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message || "Comment added");
      setText("");
      fetchComments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add comment");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  return (
    <div>
      <h3>Comments</h3>

      {/* Add comment — only shown when logged in */}
      {isAuth ? (
        <form onSubmit={handleAddComment} className="comment-form">
          <input
            type="text"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="comment-input"
          />
          <button disabled={loading} className="comment-submit-btn">
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      ) : (
        <p className="comment-empty">Please sign in to add a comment.</p>
      )}

      {/* Comments list */}
      <div className="comment-list">
        {comments.length === 0 && (
          <p className="comment-empty">No comments yet. Be the first!</p>
        )}

        {comments.map((c) => (
          <div key={c._id} className="comment-item">
            <div className="comment-item-header">
              <div className="comment-item-author">
                <div className="comment-author-avatar">
                  {c.createdBy?.name?.[0] || "U"}
                </div>
                <span className="comment-author-name">
                  {c.createdBy?.name || "User"}
                </span>
              </div>
              <span className="comment-item-date">
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="comment-item-text">{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;