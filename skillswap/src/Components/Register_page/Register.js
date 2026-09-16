import React, { useState } from 'react';
import './Register.css';
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [university, setUniversity] = useState('');
  const [teachSkills, setTeachSkills] = useState([]);
  const [learnSkills, setLearnSkills] = useState([]);
  const [teachInput, setTeachInput] = useState('');
  const [learnInput, setLearnInput] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSkillAdd = (setSkills, skillList, skill, setInput) => {
    if (skill.trim() && !skillList.includes(skill.trim())) {
      setSkills([...skillList, skill.trim()]);
    }
    setInput('');
  };

  const handleSkillRemove = (setSkills, skillList, skill) => {
    setSkills(skillList.filter(s => s !== skill));
  };

  const handleKeyPress = (event, setSkills, skillList, input, setInput) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSkillAdd(setSkills, skillList, input, setInput);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    if (password !== confirmPassword) { setErrorMessage('Passwords do not match!'); return; }
    if (!termsAccepted) { setErrorMessage('You must agree to the Terms and Conditions.'); return; }
    if (!fullName || !email || !contactNumber) { setErrorMessage('Please fill in all required fields.'); return; }

    const userData = { fullName, email, password, contact_Num: contactNumber, uni_Name: university, sk_Teach: teachSkills, sk_Learn: learnSkills };

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', userData);
      if (response.data) { alert('Registration successful! Redirecting to login page...'); navigate('/login'); }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred during registration. Please try again.');
    }
  };

  return (
    <div>
      <Nav />
      <div className="register-page">
        <div className="register-page-header">
          <h1>Create Your Account</h1>
          <p>Join the SkillSwap community and start exchanging skills today.</p>
        </div>

        <div className="register-form-card">
          {errorMessage && <div className="auth-error">{errorMessage}</div>}

          <form id="registration-form" onSubmit={handleSubmit}>
            <div className="register-form-grid">
              <div className="form-group">
                <label htmlFor="full-name">Full Name *</label>
                <input type="text" id="full-name" placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-number">Contact Number *</label>
                <input type="tel" id="contact-number" placeholder="Your phone number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="university">University / Institution</label>
                <input type="text" id="university" placeholder="Your university name" value={university} onChange={(e) => setUniversity(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input type="password" id="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password *</label>
                <input type="password" id="confirm-password" placeholder="Repeat your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
            </div>

            <div className="register-section-label">Skills You Can Teach</div>
            <div className="skills-input-wrapper">
              {teachSkills.map((s, i) => (
                <span key={i} className="skill-chip">{s}<button type="button" onClick={() => handleSkillRemove(setTeachSkills, teachSkills, s)}><X size={14} /></button></span>
              ))}
              <input
                type="text"
                placeholder="Type a skill and press Enter..."
                value={teachInput}
                onChange={(e) => setTeachInput(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, setTeachSkills, teachSkills, teachInput, setTeachInput)}
              />
            </div>
            <p className="skills-hint">Press Enter to add each skill.</p>

            <div className="register-section-label" style={{marginTop: 20}}>Skills You Want to Learn</div>
            <div className="skills-input-wrapper">
              {learnSkills.map((s, i) => (
                <span key={i} className="skill-chip">{s}<button type="button" onClick={() => handleSkillRemove(setLearnSkills, learnSkills, s)}><X size={14} /></button></span>
              ))}
              <input
                type="text"
                placeholder="Type a skill and press Enter..."
                value={learnInput}
                onChange={(e) => setLearnInput(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, setLearnSkills, learnSkills, learnInput, setLearnInput)}
              />
            </div>
            <p className="skills-hint">Press Enter to add each skill.</p>

            <div className="register-terms-row">
              <input type="checkbox" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
              <label htmlFor="terms">I agree to the <a href="/terms">Terms and Conditions</a> and <a href="/terms">Privacy Policy</a>.</label>
            </div>

            <button type="submit" className="register-submit-btn">Create Account</button>
            <div className="register-login-link">
              Already have an account? <a href="/login">Sign In</a>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
