import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/slices/postSlice';
import { toast } from 'react-hot-toast';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('academic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error('Please enter some content');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await dispatch(createPost({ content, type: postType })).unwrap();
      setContent('');
      toast.success('Post created successfully!');
    } catch (error) {
      toast.error('Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="create-post-card">
      <form onSubmit={handleSubmit}>
        <textarea
          className="post-textarea"
          rows="3"
          placeholder="Share your academic thoughts, projects, or research ideas..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        
        <div className="post-actions">
          <div className="post-type-selector">
            <select value={postType} onChange={(e) => setPostType(e.target.value)}>
              <option value="academic">Academic</option>
              <option value="project">Project</option>
              <option value="research">Research</option>
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>

      <style>{`
        .create-post-card {
          background: white;
          border-radius: 0.5rem;
          padding: 1rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }
        
        .post-textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-family: inherit;
          resize: vertical;
        }
        
        .post-textarea:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        
        .post-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.75rem;
        }
        
        .post-type-selector select {
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          background: white;
          font-size: 0.875rem;
          cursor: pointer;
        }
        
        .post-type-selector select:focus {
          outline: none;
          border-color: #4f46e5;
        }
      `}</style>
    </div>
  );
};

export default CreatePost;