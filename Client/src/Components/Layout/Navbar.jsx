import { Link } from "react-router-dom";
import { UserData } from "../../Context/authContext";
import './navbar.css';

export default function Navbar() {
  const { user, logout } = UserData();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Blogify</Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to="/blog/new">Create Blog</Link>
            <Link to="/my-blogs">My Blogs</Link>

            <div className="navbar-user">
              <div className="nav-avatar">
                {user.name[0]}
              </div>
              <button onClick={logout} className="nav-btn-logout">Logout</button>
            </div>
          </>
        ) : (
          <>
            <Link to="/signup">Create Account</Link>
            <Link to="/signin">Sign In</Link>
          </>
        )}
      </div>
    </nav>
  );
}