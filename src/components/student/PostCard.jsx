import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const PostCard = ({ post, onLike, onComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    if (onLike) onLike(post.id);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (commentText.trim() && onComment) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-author">
          <div className="avatar">{post.author?.name?.charAt(0) || 'U'}</div>
          <div>
            <h4>{post.author?.name}</h4>
            <p>{post.author?.department} • {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
          </div>
        </div>
      </div>

      <div className="post-content">
        <span className="badge badge-primary">{post.type}</span>
        <p>{post.content}</p>
      </div>

      <div className="post-stats">
        <button className={`stat-btn ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
          ❤️ {likesCount}
        </button>
        <button className="stat-btn" onClick={() => setShowComments(!showComments)}>
          💬 {post.commentsCount || 0}
        </button>
        <button className="stat-btn">🔄 Share</button>
      </div>

      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {post.comments?.map((comment, index) => (
              <div key={index} className="comment">
                <div className="comment-avatar">{comment.author?.charAt(0)}</div>
                <div>
                  <strong>{comment.author}</strong>
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleComment} className="comment-form">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>
        </div>
      )}

      <style>{`
        .post-card {
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .post-header {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .post-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .post-author h4 {
          font-size: 0.875rem;
          font-weight: 600;
          color: #111827;
        }
        
        .post-author p {
          font-size: 0.75rem;
          color: #6b7280;
        }
        
        .post-content {
          padding: 1rem;
        }
        
        .post-content p {
          margin-top: 0.5rem;
          color: #1f2937;
        }
        
        .post-stats {
          display: flex;
          gap: 1.5rem;
          padding: 0.5rem 1rem;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .stat-btn {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          background: none;
          color: #6b7280;
          border-radius: 0.375rem;
          transition: all 0.15s ease;
        }
        
        .stat-btn:hover {
          background: #f3f4f6;
          color: #4f46e5;
        }
        
        .stat-btn.liked {
          color: #ef4444;
        }
        
        .comments-section {
          padding: 1rem;
          background: #f9fafb;
        }
        
        .comments-list {
          max-height: 15rem;
          overflow-y: auto;
          margin-bottom: 1rem;
        }
        
        .comment {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        
        .comment-avatar {
          width: 2rem;
          height: 2rem;
          background: #e5e7eb;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.875rem;
        }
        
        .comment strong {
          font-size: 0.75rem;
          font-weight: 600;
        }
        
        .comment p {
          font-size: 0.875rem;
          color: #374151;
        }
        
        .comment-form {
          display: flex;
          gap: 0.5rem;
        }
        
        .comment-form input {
          flex: 1;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }
        
        .comment-form input:focus {
          outline: none;
          border-color: #4f46e5;
        }
        
        .comment-form button {
          padding: 0.5rem 1rem;
          background: #4f46e5;
          color: white;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }
        
        .comment-form button:hover {
          background: #4338ca;
        }
      `}</style>
    </div>
  );
};

export default PostCard;