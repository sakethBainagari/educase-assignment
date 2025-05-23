import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCog, FaEdit, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Account.css';
import placeholderAvatar from '../assets/placeholder-avatar.svg';

const Account = () => {
  useEffect(() => {
    // Add a class to the body when the account page is mounted
    document.body.classList.add('account-page-active');
    
    // Clean up the class when the component unmounts
    return () => {
      document.body.classList.remove('account-page-active');
    };
  }, []);

  return (
    <div className="account-container">
      <Link to="/" className="back-link">
        <motion.div 
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft /> Back
        </motion.div>
      </Link>
      
      <motion.div 
        className="account-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2>Account Settings</h2>
        <FaCog className="settings-icon" />
      </motion.div>
      
      <motion.div 
        className="account-profile"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.div 
          className="profile-info"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4, type: 'spring' }}
        >
          <div className="profile-text">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              Marry Doe
            </motion.h3>
            <motion.p 
              className="profile-email"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              Marry@Gmail.Com
            </motion.p>
          </div>
          <motion.div 
            className="profile-image-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="profile-image-overlay">
              <FaEdit className="edit-icon" />
            </div>
            <div className="profile-image">
              <img src={placeholderAvatar} alt="Profile" />
            </div>
            <motion.div 
              className="profile-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.3, type: 'spring', stiffness: 300 }}
            >
              P
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.p 
          className="profile-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
        </motion.p>

        <motion.div 
          className="account-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <motion.button 
            className="logout-button"
            whileHover={{ scale: 1.03, backgroundColor: '#f44336' }}
            whileTap={{ scale: 0.98 }}
          >
            <FaSignOutAlt /> Sign Out
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Account;
