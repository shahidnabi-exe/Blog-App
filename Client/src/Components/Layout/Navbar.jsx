import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-slate-800 text-white px-8 py-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">Blogify</Link>

      <div className="flex items-center gap-6">
        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to="/blog/new">Add Blog</Link>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                {user.fullname[0]}
              </div>
              <button onClick={logout}>Logout</button>
            </div>
          </>
        ) : (
          <>
            <Link to="/signup">Create Account</Link>
            <Link to="/signin" className="bg-blue-600 px-3 py-1 rounded">
              Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

