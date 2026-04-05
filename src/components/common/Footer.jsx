import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">EchoVerse</h3>
          <p className="footer-description">
            A unified academic networking platform connecting students and faculty 
            across universities. Share research, find mentors, and earn rewards.
          </p>
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Twitter">
              <FiTwitter />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href="#" className="social-link" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href="#" className="social-link" aria-label="Email">
              <FiMail />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>For Students</h4>
          <ul className="footer-links">
            <li><Link to="/student/feed">Feed</Link></li>
            <li><Link to="/student/mentorship">Mentorship</Link></li>
            <li><Link to="/student/appointments">Appointments</Link></li>
            <li><Link to="/student/rewards">Rewards</Link></li>
            <li><Link to="/student/leaderboard">Leaderboard</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>For Faculty</h4>
          <ul className="footer-links">
            <li><Link to="/faculty/dashboard">Dashboard</Link></li>
            <li><Link to="/faculty/appointments">Manage Appointments</Link></li>
            <li><Link to="/faculty/announcements">Announcements</Link></li>
            <li><Link to="/faculty/profile">Profile</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul className="footer-contact">
            <li>📧 support@echoverse.com</li>
            <li>📞 +1 (555) 123-4567</li>
            <li>📍 123 University Ave, Suite 100</li>
            <li>Academic City, AC 12345</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} EchoVerse. All rights reserved.</p>
        <p className="footer-made-with">
          Made with <FiHeart className="heart-icon" /> for the academic community
        </p>
      </div>
    </footer>
  );
};

export default Footer;