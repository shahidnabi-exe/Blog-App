import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../Context/authContext';

function Login() {
  const navigate = useNavigate();
  const { loginUser, btnLoading: userLoading } = UserData();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate);
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Login</h2>

        <form onSubmit={submitHandler}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="common-btn"
            disabled={userLoading}
          >
            {userLoading ? "Please wait..." : "Login"}
          </button>
        </form>

        <p>
          Don’t have an account? <Link to="/signup">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;