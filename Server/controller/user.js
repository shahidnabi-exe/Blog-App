import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const SignUp = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // ── Presence check ──────────────────────────────────────────
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ── Name validation ──────────────────────────────────────────
    if (name.trim().length < 2) {
      return res.status(400).json({ message: "Name must be at least 2 characters" });
    }

    // ── Email format ─────────────────────────────────────────────
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // ── Password strength ────────────────────────────────────────
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({ message: "Password must contain an uppercase letter" });
    }
    if (!/[0-9]/.test(password)) {
      return res.status(400).json({ message: "Password must contain a number" });
    }

    // ── Duplicate check ──────────────────────────────────────────
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // ── Hash password ────────────────────────────────────────────
    const hashedPassword = await bcrypt.hash(password, 10);

    // ── Create user ──────────────────────────────────────────────
    user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    // ── Generate token ───────────────────────────────────────────
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user,
    });

  } catch (error) {
    console.error("Registration Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};


export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ── Presence check ───────────────────────────────────────────
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // ── Email format ─────────────────────────────────────────────
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // ── Find user ────────────────────────────────────────────────
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No account found with this email" });
    }

    // ── Check password ───────────────────────────────────────────
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // ── Generate token ───────────────────────────────────────────
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    res.json({
      message: `Welcome back, ${user.name}!`,
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'lax'
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Logout failed" });
  }
};


export const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user" });
  }
};