import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiAward, FiCalendar, FiMessageCircle, FiTrendingUp, FiBookOpen } from 'react-icons/fi';

const Home = () => {
  return (
    
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to <span className="highlight">EchoVerse</span></h1>
          <p className="hero-subtitle">Connect, Learn, and Grow with Your Academic Community</p>
          <p className="hero-description">
            EchoVerse is a unified academic networking platform connecting students and faculty 
            across universities. Share research, find mentors, and earn rewards for your academic contributions.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary btn-large">Get Started</Link>
            <Link to="/login" className="btn btn-outline btn-large">Sign In</Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <FiUsers className="stat-icon" />
            <span className="stat-number">10,000+</span>
            <span className="stat-label">Active Students</span>
          </div>
          <div className="stat-item">
            <FiBookOpen className="stat-icon" />
            <span className="stat-number">500+</span>
            <span className="stat-label">Universities</span>
          </div>
          <div className="stat-item">
            <FiTrendingUp className="stat-icon" />
            <span className="stat-number">50,000+</span>
            <span className="stat-label">Posts Shared</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose EchoVerse?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Verified Academic Community</h3>
            <p>Register with your official university email to join a trusted academic network.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Faculty Mentorship</h3>
            <p>Connect with faculty members, request appointments, and get guidance for your academic journey.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Rewards & Internships</h3>
            <p>Earn points for your activity and unlock exclusive internship opportunities.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Share & Discover</h3>
            <p>Share your projects, research ideas, and connect with like-minded peers.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>University Theming</h3>
            <p>Each university has its own unique theme, colors, and branding.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Leaderboards & Analytics</h3>
            <p>Track your progress and see how you rank among your peers.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Register with University Email</h3>
            <p>Sign up using your official university email address for verification.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Complete Your Profile</h3>
            <p>Add your bio, skills, interests, and enrolled courses.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Connect & Engage</h3>
            <p>Follow peers, share posts, and engage with academic content.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Earn Rewards</h3>
            <p>Get points for activity and qualify for internship opportunities.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"EchoVerse helped me connect with a mentor who guided my research project. The platform is amazing!"</p>
            <div className="testimonial-author">
              <strong>Sarah Ahmed</strong>
              <span>Computer Science Student</span>
            </div>
          </div>
          <div className="testimonial-card">
            <p>"As a faculty member, I love how easy it is to schedule appointments and share resources with students."</p>
            <div className="testimonial-author">
              <strong>Dr. Muhammad Khan</strong>
              <span>Professor, Engineering</span>
            </div>
          </div>
          <div className="testimonial-card">
            <p>"The reward system motivates me to stay active and share my academic work. Highly recommended!"</p>
            <div className="testimonial-author">
              <strong>Ali Raza</strong>
              <span>Research Scholar</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Join EchoVerse?</h2>
        <p>Join thousands of students and faculty in building a stronger academic community.</p>
        <Link to="/register" className="btn btn-primary btn-large">Create Your Account</Link>
      </section>
    </div>
  );
};

export default Home;