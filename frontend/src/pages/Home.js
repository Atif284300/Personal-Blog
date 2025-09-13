import React, { useState, useEffect } from "react";
import BlogPost from "../../../frontend/src/components/BlogPost";
import { postAPI } from "../services/api";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postAPI.getAllPosts();
      setPosts(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch posts. Please try again later.");
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await postAPI.deletePost(postId);
        setPosts(posts.filter((post) => post._id !== postId));
      } catch (err) {
        setError("Failed to delete post. Please try again.");
        console.error("Error deleting post:", err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1>Hi, I’m Atif 👋 Welcome to my personal blog!</h1>
        <p>Sharing thoughts, ideas, and experiences</p>
      </div>

      {error && <div className="error">{error}</div>}

      {posts.length === 0 ? (
        <div className="no-posts">
          <h3>No posts yet</h3>
          
        </div>
      ) : (
        <div className="posts-container">
          {posts.map((post) => (
            <BlogPost key={post._id} post={post} onDelete={handleDeletePost} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
