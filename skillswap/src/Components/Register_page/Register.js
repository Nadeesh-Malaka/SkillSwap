import React, { useState } from 'react';
import './Register.css';
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [university, setUniversity] = useState('');
  const [teachSkills, setTeachSkills] = useState('');
  const [learnSkills, setLearnSkills] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleHamburgerClick = () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!termsAccepted) {
      alert("You must agree to the Terms and Conditions.");
      return;
    }

    // Additional form validation (optional)
    if (!fullName || !email || !contactNumber) {
      alert("Please fill in all required fields.");
      return;
    }

    alert("Registration successful!");
  };

  return (

 
    <div>
        <Nav/>
      <div className="registration-container">
        <h2>Registration Form</h2>
        <form id="registration-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-left">
              <div className="form-group">
                <label htmlFor="full-name">Full Name:</label>
                <input
                  type="text"
                  id="full-name"
                  name="full-name"
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
                  name="email"
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
                  name="password"
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
                  name="contact-number"
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
                  name="university"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="teach-skills">Skills (Skills You Can Teach):</label>
            <textarea
              id="teach-skills"
              name="teach-skills"
              rows="4"
              value={teachSkills}
              onChange={(e) => setTeachSkills(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="learn-skills">Skills (Skills You Want to Learn):</label>
            <textarea
              id="learn-skills"
              name="learn-skills"
              rows="4"
              value={learnSkills}
              onChange={(e) => setLearnSkills(e.target.value)}
            />
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

          <p className="login-link" style={{ textAlign: 'center' }}>
            Already have an account? <a href="#">Log in</a>
          </p>
        </form>
      </div>

      <Footer/>
    </div>
  );
};

export default Register;
