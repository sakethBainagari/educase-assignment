import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import '../styles/Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <motion.div 
        className="welcome-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="welcome-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Welcome to <span className="highlight">PopX</span>
        </motion.h1>
        <motion.p 
          className="welcome-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </motion.p>
      </motion.div>
      
      <motion.div 
        className="welcome-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Link to="/create-account" className="button-link">
          <motion.button 
            className="primary-button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaUserPlus className="button-icon" />
            Create Account
          </motion.button>
        </Link>
        <Link to="/login" className="button-link">
          <motion.button 
            className="secondary-button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaSignInAlt className="button-icon" />
            Already Registered? Login
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Welcome;
