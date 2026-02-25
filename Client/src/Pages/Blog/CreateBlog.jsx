import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../../Services/api";
import { UserData } from '../../Context/authContext';
import toast from 'react-hot-toast';

function CreateBlog() {
  const navigate = useNavigate();
  const { user } = UserData();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      return toast.error('Title and content are required');
    }

    setBtnLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) formData.append('image', image);

      const token = localStorage.getItem('token');

      const { data } = await axios.post('/api/blog/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(data.message || 'Blog created successfully');
      setTitle('');
      setContent('');
      setImage(null);
      navigate('/'); // redirect to homepage or blogs list
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to create blog');
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Create Blog</h2>

      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter blog title"
          />
        </label>

        <label>
          Content
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={8}
            placeholder="Write your blog content here..."
          />
        </label>

        <label>
          Image (optional)
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1"
          />
        </label>

        <button
          type="submit"
          disabled={btnLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {btnLoading ? 'Posting...' : 'Create Blog'}
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;