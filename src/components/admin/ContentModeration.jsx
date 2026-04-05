import React, { useState } from 'react';
import { FiCheck, FiX, FiFlag, FiEye, FiTrash2 } from 'react-icons/fi';

const ContentModeration = () => {
  const [reportedContent, setReportedContent] = useState([
    { id: 1, type: 'post', title: 'Research Discussion', author: 'Ahmed Raza', reports: 3, status: 'pending', content: 'This is a research post about AI...', date: '2024-03-28' },
    { id: 2, type: 'comment', title: 'Comment on AI Post', author: 'Ali Hassan', reports: 2, status: 'pending', content: 'This comment contains...', date: '2024-03-27' },
    { id: 3, type: 'post', title: 'Project Share', author: 'Fatima Zafar', reports: 1, status: 'reviewed', content: 'My final year project on...', date: '2024-03-26' },
  ]);

  const [filter, setFilter] = useState('pending');

  const handleApprove = (id) => {
    setReportedContent(reportedContent.map(content =>
      content.id === id ? { ...content, status: 'approved' } : content
    ));
  };

  const handleReject = (id) => {
    setReportedContent(reportedContent.map(content =>
      content.id === id ? { ...content, status: 'rejected' } : content
    ));
  };

  const filteredContent = reportedContent.filter(c => filter === 'all' || c.status === filter);

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h2>📝 Content Moderation</h2>
      </div>

      <div className="admin-tabs">
        <button className={`tab ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>
          Pending ({reportedContent.filter(c => c.status === 'pending').length})
        </button>
        <button className={`tab ${filter === 'reviewed' ? 'active' : ''}`} onClick={() => setFilter('reviewed')}>
          Reviewed
        </button>
        <button className={`tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
          All
        </button>
      </div>

      <div className="content-list">
        {filteredContent.map((content) => (
          <div key={content.id} className="content-card">
            <div className="content-header">
              <div className="content-type">
                <FiFlag />
                <span className={`type-badge type-${content.type}`}>{content.type}</span>
              </div>
              <div className="content-reports">
                <FiEye /> {content.reports} report{content.reports !== 1 ? 's' : ''}
              </div>
            </div>
            <h3>{content.title}</h3>
            <p className="content-author">By {content.author} • {new Date(content.date).toLocaleDateString()}</p>
            <p className="content-text">{content.content}</p>
            {content.status === 'pending' && (
              <div className="content-actions">
                <button className="btn-approve" onClick={() => handleApprove(content.id)}>
                  <FiCheck /> Approve
                </button>
                <button className="btn-reject" onClick={() => handleReject(content.id)}>
                  <FiX /> Reject
                </button>
                <button className="btn-delete">
                  <FiTrash2 /> Delete
                </button>
              </div>
            )}
            {content.status !== 'pending' && (
              <div className={`content-status status-${content.status}`}>
                {content.status === 'approved' ? <FiCheck /> : <FiX />}
                {content.status.toUpperCase()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentModeration;