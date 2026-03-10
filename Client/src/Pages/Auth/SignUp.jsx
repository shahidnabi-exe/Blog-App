import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../Context/authContext';
import './Auth.css'

function SignUp() {
    const navigate = useNavigate();
    const { btnLoading, registerUser } = UserData();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Name is required";
        } else if (name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = "Password must contain at least one uppercase letter";
        } else if (!/[0-9]/.test(password)) {
            newErrors.password = "Password must contain at least one number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        await registerUser(name, email, password, navigate);
    };

    return (
        <div className="auth-page">
            <div className="auth-form">
                <h2>Register</h2>

                <form onSubmit={submitHandler}>

                    {/* Name */}
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                        }}
                        placeholder="Enter your full name"
                    />
                    {errors.name && <span className="auth-error">{errors.name}</span>}

                    {/* Email */}
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                        }}
                        placeholder="Enter your email"
                    />
                    {errors.email && <span className="auth-error">{errors.email}</span>}

                    {/* Password */}
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                        }}
                        placeholder="Enter your password"
                    />
                    {errors.password && <span className="auth-error">{errors.password}</span>}
                   

                    <button
                        type="submit"
                        disabled={btnLoading}
                        className="common-btn"
                    >
                        {btnLoading ? "Please Wait..." : "Register"}
                    </button>

                </form>

                <p>
                    Already have an Account? <Link to='/signin'>Login</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;