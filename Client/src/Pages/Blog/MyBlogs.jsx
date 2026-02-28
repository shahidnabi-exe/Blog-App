import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../config/server";
import { UserData } from "../../Context/authContext";
import { Link } from "react-router-dom";
import './myblog.css'

export default function MyBlogs() {
  const { user } = UserData();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${server}/api/blog`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const mine = res.data.filter(
          (b) => b.createdBy._id.toString() === user._id.toString()
        );
        setBlogs(mine);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${server}/api/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };
if (loading) return <div className="myblogs-loading">Loading...</div>;

return (
  <div className="myblogs-page">
    <div className="myblogs-header">
      <h1>My Blogs</h1>
      <Link to="/blog/new" className="myblogs-create-btn">+ Create Blog</Link>
    </div>

    {blogs.length === 0 && (
      <div className="myblogs-empty">
        <p>You haven't written any blogs yet.</p>
        <Link to="/blog/new">Create one</Link>
      </div>
    )}

    <div className="myblogs-grid">
      {blogs.map((b) => (
        <div key={b._id} className="myblog-card">
          {b.coverImageURL
            ? <img src={`http://localhost:8000/${b.coverImageURL}`} alt={b.title} className="myblog-cover" />
            : <div className="myblog-cover-placeholder">📝</div>
          }
          <div className="myblog-body">
            <p className="myblog-date">{new Date(b.createdAt).toDateString()}</p>
            <h2 className="myblog-title">{b.title}</h2>
            <p className="myblog-excerpt">{b.body.slice(0, 100)}...</p>
            <div className="myblog-actions">
              <Link to={`/blog/edit/${b._id}`} className="myblog-edit-btn">Edit</Link>
              <button onClick={() => handleDelete(b._id)} className="myblog-delete-btn">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}