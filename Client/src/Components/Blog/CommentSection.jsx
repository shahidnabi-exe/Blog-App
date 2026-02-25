import { useState, useEffect } from "react";
import axios from "../../Services/api";
import { UserData } from "../../Context/authContext";
import toast from "react-hot-toast";

const CommentSection = ({ blogId }) => {
  const { user, isAuth } = UserData();

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ fetch comments
  async function fetchComments() {
    try {
      const { data } = await axios.get(`/api/comment/${blogId}`);
      setComments(data.comments || []);
    } catch (error) {
      console.error(error);
    }
  }

  // ✅ add comment
  async function handleAddComment(e) {
    e.preventDefault();

    if (!text.trim()) return toast.error("Write something");

    setLoading(true);

    try {
      const { data } = await axios.post(`/api/comment/add/${blogId}`, {
        text,
      });

      toast.success(data.message || "Comment added");
      setText("");
      fetchComments();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add comment"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      {/* Add comment */}
      {isAuth && (
        <form
          onSubmit={handleAddComment}
          className="flex gap-3 mb-6"
        >
          <input
            type="text"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      )}

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-gray-500">No comments yet</p>
        )}

        {comments.map((c) => (
          <div
            key={c._id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-800">
                {c.user?.name || "User"}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="text-gray-700">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;