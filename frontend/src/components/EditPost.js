import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postAPI } from "../services/api";

const EditPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setFetchLoading(true);
      const response = await postAPI.getPost(id);
      const post = response.data;

      setFormData({
        title: post.title,
        content: post.content,
        author: post.author || "",
        tags: post.tags ? post.tags.join(", ") : "",
      });
    } catch (err) {
      setError("Failed to fetch post. Please try again.");
      console.error("Error fetching post:", err);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const postData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };

      await postAPI.updatePost(id, postData);
      navigate("/");
    } catch (err) {
      setError("Failed to update post. Please try again.");
      console.error("Error updating post:", err);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return <div className="loading">Loading post...</div>;
  }

  return (
    <div className="form-container">
      <h2>Edit Post</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter post title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Your name (optional)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="Write your blog post content here..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Enter tags separated by commas (e.g., tech, programming, web)"
          />
          <small style={{ color: "#666" }}>
            Separate multiple tags with commas
          </small>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Updating..." : "Update Post"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
