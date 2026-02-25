import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../config/server.js";
import toast from "react-hot-toast";

const BlogContext = createContext();

export const BlogContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // ✅ fetch all blogs
  async function fetchBlogs() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${server}/blog`);
      setBlogs(data.blogs || data); 
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // ✅ fetch single blog
  async function fetchBlog(id) {
    try {
      setLoading(true);
      const { data } = await axios.get(`${server}/blog/${id}`);
      setBlog(data.blog || data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // ✅ create blog
  async function createBlog(formData, navigate) {
    setBtnLoading(true);
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `${server}/blog`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data.message || "Blog created");
      setBtnLoading(false);
      navigate("/");
      fetchBlogs(); // refresh list
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to create blog"
      );
      setBtnLoading(false);
    }
  }

  // ✅ add comment
  async function addComment(blogId, content) {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `${server}/blog/comment/${blogId}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message || "Comment added");
      fetchBlog(blogId); // refresh blog with comments
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to add comment"
      );
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        blogs,
        blog,
        loading,
        btnLoading,
        fetchBlogs,
        fetchBlog,
        createBlog,
        addComment,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const BlogData = () => useContext(BlogContext);