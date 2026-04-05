import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import logo from '../../assets/EchoVerse.PNG';
import { FiBell, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Left */}
        <div className="navbar-left">
          {/* <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="menu-btn"
          >
            {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button> */}
         <Link to="/" className="logo">
          <img src={logo} alt="logo" />
          </Link>
        </div>

        {/* Right */}
        <div className="navbar-right">

          <button className="bell-btn">
            <FiBell size={20} />
            <span className="notification-badge">3</span>
          </button>

          <div className="profile">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="profile-btn"
            >
              <div className="avatar">
                {user?.name?.charAt(0) || 'U'}
              </div>
              {/* <span className="username">{user?.name}</span> */}
            </button>

            {isProfileOpen && (
              <div className="dropdown">
                <Link
                  to={`/${user?.role}/profile`}
                  className="dropdown-item"
                >
                  <FiUser size={14} /> Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="dropdown-item logout"
                >
                  <FiLogOut size={14} /> Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;