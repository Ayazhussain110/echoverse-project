import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreatePost from './CreatePost';
import PostCard from './PostCard';
import { fetchPosts } from '../../redux/slices/postSlice';

const Feed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || post.type === filter;
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div className="feed-container">
      <CreatePost />
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search posts..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Posts</option>
          <option value="academic">Academic</option>
          <option value="project">Projects</option>
          <option value="research">Research</option>
        </select>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading posts...</p>
        </div>
      ) : (
        <div className="posts-list">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          
          {filteredPosts.length === 0 && (
            <div className="empty-state">
              <p>No posts found. Be the first to share something!</p>
            </div>
          )}
        </div>
      )}

      <style>{`
        .feed-container {
          max-width: 48rem;
          margin: 0 auto;
        }
        
        .search-bar {
          background: white;
          border-radius: 0.5rem;
          padding: 1rem;
          margin-top: 1.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          display: flex;
          gap: 1rem;
        }
        
        .search-input {
          flex: 1;
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        
        .filter-select {
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          background: white;
          cursor: pointer;
        }
        
        .filter-select:focus {
          outline: none;
          border-color: #4f46e5;
        }
        
        .posts-list {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .empty-state {
          text-align: center;
          padding: 2rem;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default Feed;