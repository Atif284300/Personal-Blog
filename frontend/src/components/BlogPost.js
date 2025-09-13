import React from "react";
import { Link } from "react-router-dom";

const BlogPost = ({ post, onDelete }) => {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <article className="blog-post">
      <h2>{post.title}</h2>

      <div className="blog-meta">
        <span>By {post.author} • </span>
        <span>Created: {formatDate(post.createdAt)}</span>
        {post.updatedAt !== post.createdAt && (
          <span> • Last Updated: {formatDate(post.updatedAt)}</span>
        )}
      </div>

      <div className="blog-content">
        {post.content.length > 300
          ? `${post.content.substring(0, 300)}...`
          : post.content}
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="blog-tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="blog-actions">
        <Link to={`/edit/${post._id}`} className="btn btn-secondary">
          Edit
        </Link>
        <button onClick={() => onDelete(post._id)} className="btn btn-danger">
          Delete
        </button>
      </div>
    </article>
  );
};

export default BlogPost;
