import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaPhone, FaEnvelope, FaLock, FaBuilding, FaArrowLeft, FaUserPlus } from 'react-icons/fa';
import '../styles/CreateAccount.css';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: 'yes'
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          error = 'Full name is required';
        } else if (value.trim().length < 2) {
          error = 'Full name must be at least 2 characters';
        }
        break;
      case 'phoneNumber':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^[0-9]{10}$/.test(value.trim())) {
          error = 'Please enter a valid 10-digit phone number';
        }
        break;
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
    Object.keys(formData).forEach(key => {
      if (key === 'fullName' || key === 'phoneNumber' || key === 'email' || key === 'password') {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (touched[name] || isSubmitted) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validateField(name, formData[name]);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleRadioChange = (value) => {
    setFormData({
      ...formData,
      isAgency: value
    });
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
        staggerChildren: 0.08,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <div className="create-account-container">
      <Link to="/" className="back-link">
        <motion.div 
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft /> Back
        </motion.div>
      </Link>

      <motion.div 
        className="create-account-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="create-account-header" variants={itemVariants}>
          <h1 className="create-account-title">Create your <span className="highlight">PopX</span> account</h1>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="create-account-form"
          variants={containerVariants}
        >
          <motion.div className="form-group" variants={itemVariants}>
            <label htmlFor="fullName" className="form-label required">Full Name*</label>
            <div className="input-container">
              <FaUser className="input-icon" />
              <input 
                type="text" 
                id="fullName" 
                name="fullName"
                placeholder="Marry Doe" 
                value={formData.fullName} 
                onChange={handleChange} 
                onBlur={handleBlur}
                required 
              />
            </div>
            {errors.fullName && (touched.fullName || isSubmitted) && (
              <p className="error-message">{errors.fullName}</p>
            )}
          </motion.div>

          <motion.div className="form-group" variants={itemVariants}>
            <label htmlFor="phoneNumber" className="form-label required">Phone number*</label>
            <div className="input-container">
              <FaPhone className="input-icon" />
              <input 
                type="tel" 
                id="phoneNumber" 
                name="phoneNumber"
                placeholder="Enter your phone number" 
                value={formData.phoneNumber} 
                onChange={handleChange} 
                onBlur={handleBlur}
                required 
              />
            </div>
            {errors.phoneNumber && (touched.phoneNumber || isSubmitted) && (
              <p className="error-message">{errors.phoneNumber}</p>
            )}
          </motion.div>

          <motion.div className="form-group" variants={itemVariants}>
            <label htmlFor="email" className="form-label required">Email address*</label>
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input 
                type="email" 
                id="email" 
                name="email"
                placeholder="Marry Doe" 
                value={formData.email} 
                onChange={handleChange} 
                onBlur={handleBlur}
                required 
              />
            </div>
            {errors.email && (touched.email || isSubmitted) && (
              <p className="error-message">{errors.email}</p>
            )}
          </motion.div>

          <motion.div className="form-group" variants={itemVariants}>
            <label htmlFor="password" className="form-label required">Password*</label>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input 
                type="password" 
                id="password" 
                name="password"
                placeholder="Create a password" 
                value={formData.password} 
                onChange={handleChange} 
                onBlur={handleBlur}
                required 
              />
            </div>
            {errors.password && (touched.password || isSubmitted) && (
              <p className="error-message">{errors.password}</p>
            )}
          </motion.div>

          <motion.div className="form-group" variants={itemVariants}>
            <label htmlFor="companyName" className="form-label">Company name</label>
            <div className="input-container">
              <FaBuilding className="input-icon" />
              <input 
                type="text" 
                id="companyName" 
                name="companyName"
                placeholder="Marry Doe" 
                value={formData.companyName} 
                onChange={handleChange} 
              />
            </div>
          </motion.div>

          <motion.div className="form-group" variants={itemVariants}>
            <p className="form-label required">Are you an Agency?*</p>
            <div className="radio-group">
              <div className={`radio-option ${formData.isAgency === 'yes' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  id="agency-yes" 
                  name="isAgency" 
                  checked={formData.isAgency === 'yes'} 
                  onChange={() => handleRadioChange('yes')} 
                />
                <label htmlFor="agency-yes">Yes</label>
              </div>
              <div className={`radio-option ${formData.isAgency === 'no' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  id="agency-no" 
                  name="isAgency" 
                  checked={formData.isAgency === 'no'} 
                  onChange={() => handleRadioChange('no')} 
                />
                <label htmlFor="agency-no">No</label>
              </div>
            </div>
          </motion.div>

          <motion.button 
            type="submit" 
            className={`create-account-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              <>
                <FaUserPlus className="button-icon" />
                Create Account
              </>
            )}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default CreateAccount;
