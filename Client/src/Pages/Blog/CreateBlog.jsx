import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { UserData } from '../../Context/AuthContext';
import toast from 'react-hot-toast';
import './CreateBlog.css'
import { server } from '../../config/server';

function CreateBlog() {
  const navigate = useNavigate();
  const { user } = UserData();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
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
      formData.append('body', content);
      if (image) formData.append('coverImage', image);

      const token = localStorage.getItem('token');

      const { data } = await axios.post(`${server}/api/blog`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(data.message || 'Blog created successfully');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to create blog');
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="create-blog-page">
      <div className="create-blog-card">

        <div className="create-blog-header">
          <h2>Write a New Blog</h2>
          <p>Share your thoughts, ideas, and stories with the world</p>
        </div>

        <form onSubmit={submitHandler} className="create-blog-form">

          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your blog a compelling title..."
              required
            />
          </div>

          {/* Content */}
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              rows={10}
              required
            />
            <span className="char-count">{content.length} characters</span>
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label>Cover Image <span className="optional">(optional)</span></label>

            {!preview ? (
              <label className="upload-area" htmlFor="cover-image">
                <div className="upload-icon">📷</div>
                <p className="upload-text">Click to upload a cover image</p>
                <p className="upload-hint">PNG, JPG, WEBP supported</p>
                <input
                  id="cover-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </label>
            ) : (
              <div className="image-preview-wrapper">
                <img src={preview} alt="Cover preview" className="image-preview" />
                <button type="button" className="remove-image-btn" onClick={removeImage}>
                  ✕ Remove
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={btnLoading}
              className="submit-btn"
            >
              {btnLoading ? (
                <span className="btn-loading">
                  <span className="spinner" /> Publishing...
                </span>
              ) : (
                'Publish Blog'
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
export default CreateBlog;