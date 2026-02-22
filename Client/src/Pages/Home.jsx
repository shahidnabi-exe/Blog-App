import { useEffect, useState } from "react";
import axios from "../services/api";
import BlogCard from "../components/blog/BlogCard";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("/blog").then(res => setBlogs(res.data));
  }, []);

  return (
    <div className="px-10 py-8">
      <h1 className="text-4xl font-serif text-center mb-2">
        Latest Posts
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Discover stories, ideas, and insights
      </p>

      <div className="grid grid-cols-4 gap-6">
        {blogs.map(b => (
          <BlogCard key={b._id} blog={b} />
        ))}
      </div>
    </div>
  );
}