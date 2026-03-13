import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { server } from "../config/server";
import './Home.css';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/blog")
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.blogs || [];
        setBlogs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch blogs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-page">

      {/* Hero */}
      <div className="home-hero">
        <h1>Latest <span>Posts</span></h1>
        <p>Discover stories, ideas, and insights</p>
      </div>

      {/* Content */}
      <div className="home-content">
        {loading && <div className="home-loading">Loading blogs...</div>}

        {!loading && blogs.length === 0 && (
          <div className="home-empty">No blogs yet. Be the first to write one!</div>
        )}

        <div className="home-grid">
          {blogs.map(b => (
            <div key={b._id} className="blog-card">

              {/* Clickable cover image */}
              <Link to={`/blog/${b._id}`} className="blog-card-img-link">
                {b.coverImageURL
                  ? <img
                      src={`${server}/${b.coverImageURL}`}
                      alt={b.title}
                      className="blog-card-cover"
                    />
                  : <div className="blog-card-cover-placeholder">📝</div>
                }
              </Link>

              {/* Body */}
              <div className="blog-card-body">
                <p className="blog-card-date">
                  {new Date(b.createdAt).toDateString()}
                </p>

                {/* Clickable title */}
                <Link to={`/blog/${b._id}`} className="blog-card-title-link">
                  <h2 className="blog-card-title">{b.title}</h2>
                </Link>

                {b.createdBy && (
                  <div className="blog-card-author">
                    <div className="blog-card-author-avatar">
                      {b.createdBy.name?.[0] || "U"}
                    </div>
                    {b.createdBy.name}
                  </div>
                )}

                <Link to={`/blog/${b._id}`} className="blog-card-link">
                  Read more →
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}