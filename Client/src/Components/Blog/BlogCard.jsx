import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <div className="rounded-xl shadow hover:shadow-lg overflow-hidden bg-white">
      <img
        src={`http://localhost:8000/${blog.coverImageURL}`}
        className="h-40 w-full object-cover"
      />

      <div className="p-4">
        <p className="text-gray-400 text-sm">
          {new Date(blog.createdAt).toDateString()}
        </p>

        <h2 className="font-semibold text-lg mb-3">
          {blog.title}
        </h2>

        <Link
          to={`/blog/${blog._id}`}
          className="text-blue-600 font-medium"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}