import React, { useState } from 'react';
import './Register.css';
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [university, setUniversity] = useState('');
  const [teachSkills, setTeachSkills] = useState([]);
  const [learnSkills, setLearnSkills] = useState([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSkillAdd = (setSkills, skillList, skill) => {
    if (skill.trim() && !skillList.includes(skill.trim())) {
      setSkills([...skillList, skill.trim()]);
    }
  };

  const handleKeyPress = (event, setSkills, skillList) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSkillAdd(setSkills, skillList, event.target.value);
      event.target.value = '';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    const handleLoginRedirect = () => {
      navigate('/login');
    };
  

    if (!termsAccepted) {
      setErrorMessage('You must agree to the Terms and Conditions.');
      return;
    }

    if (!fullName || !email || !contactNumber) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const userData = {
      fullName,
      email,
      password,
      contact_Num: contactNumber,
      uni_Name: university,
      sk_Teach: teachSkills,
      sk_Learn: learnSkills,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', userData);
      if (response.data) {
        alert('Registration successful! Redirecting to login page...');
        navigate('/login');
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'An error occurred during registration. Please try again.'
      );
    }
  };

  return (
    <div>
      <Nav />
      <div className="registration-container">
        <h2>Registration Form</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form id="registration-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-left">
              <div className="form-group">
                <label htmlFor="full-name">Full Name:</label>
                <input
                  type="text"
                  id="full-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-right">
              <div className="form-group">
                <label htmlFor="contact-number">Contact Number:</label>
                <input
                  type="tel"
                  id="contact-number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="university">University/Institution Name:</label>
                <input
                  type="text"
                  id="university"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Skills You Can Teach:</label>
            <div className="skills-input">
              <input
                type="text"
                placeholder="Add a skill and press Enter"
                onKeyPress={(e) => handleKeyPress(e, setTeachSkills, teachSkills)}
              />
              <ul className="skills-list">
                {teachSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="form-group">
            <label>Skills You Want to Learn:</label>
            <div className="skills-input">
              <input
                type="text"
                placeholder="Add a skill and press Enter"
                onKeyPress={(e) => handleKeyPress(e, setLearnSkills, learnSkills)}
              />
              <ul className="skills-list">
                {learnSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="terms">
              I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.
            </label>
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
          </div>

          <button type="submit" className="register-button">Register</button>
          <div className="divider">
            <span>or</span>
          </div>
          <button type="button" className="register-button"><a href="/login">Already have an account? Log in</a></button>
        


          
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
