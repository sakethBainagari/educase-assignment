import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaSignInAlt, FaArrowLeft } from 'react-icons/fa';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'email':
        if (!value.trim()) {
          error = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    const emailError = validateField('email', email);
    const passwordError = validateField('password', password);
    
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    
    if (touched.email || isSubmitted) {
      const error = validateField('email', value);
      setErrors(prev => ({
        ...prev,
        email: error
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    
    if (touched.password || isSubmitted) {
      const error = validateField('password', value);
      setErrors(prev => ({
        ...prev,
        password: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    let error = '';
    if (name === 'email') {
      error = validateField('email', email);
    } else if (name === 'password') {
      error = validateField('password', password);
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call with a timeout
      setTimeout(() => {
        setIsLoading(false);
        navigate('/account');
      }, 1500);
    } else {
      // If validation fails, focus on the first field with an error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="login-container">
      <Link to="/" className="back-link">
        <motion.div 
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft /> Back
        </motion.div>
      </Link>

      <motion.div 
        className="login-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="login-header" variants={itemVariants}>
          <h1 className="login-title">Sign in to your <span className="highlight">PopX</span> account</h1>
          <p className="login-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="login-form"
          variants={containerVariants}
        >
          <motion.div className="form-group" variants={itemVariants}>
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input 
                type="email" 
                id="email" 
                name="email"
                placeholder="Enter email address" 
                value={email} 
                onChange={handleEmailChange} 
                onBlur={handleBlur}
                required 
              />
            </div>
            {errors.email && (touched.email || isSubmitted) && (
              <p className="error-message">{errors.email}</p>
            )}
          </motion.div>

          <motion.div className="form-group" variants={itemVariants}>
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input 
                type="password" 
                id="password" 
                name="password"
                placeholder="Enter password" 
                value={password} 
                onChange={handlePasswordChange} 
                onBlur={handleBlur}
                required 
              />
            </div>
            {errors.password && (touched.password || isSubmitted) && (
              <p className="error-message">{errors.password}</p>
            )}
          </motion.div>

          <motion.button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              <>
                <FaSignInAlt className="button-icon" />
                Login
              </>
            )}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
