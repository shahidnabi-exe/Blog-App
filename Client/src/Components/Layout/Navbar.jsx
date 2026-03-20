import { useState } from "react";
import { Link } from "react-router-dom";
import { UserData } from "../../Context/AuthContext";
import './navbar.css';

export default function Navbar() {
  const { user, logout } = UserData();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand" onClick={closeMenu}>Blogify</Link>

      {/* Hamburger button */}
      <button className="navbar-hamburger" onClick={() => setMenuOpen(prev => !prev)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Links */}
      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>

        {user ? (
          <>
            <Link to="/blog/new" onClick={closeMenu}>Create Blog</Link>
            <Link to="/my-blogs" onClick={closeMenu}>My Blogs</Link>
            <div className="nav-avatar">{user.name[0]}</div>
            <button onClick={() => { logout(); closeMenu(); }} className="nav-btn-logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup" onClick={closeMenu}>Create Account</Link>
            <Link to="/signin" onClick={closeMenu}>Sign In</Link>
          </>
        )}
      </div>
    </nav>
  );
}