import React, { useState } from "react";
import axios from "axios";
import Navbar from "../NavFooter/nav";
import Footer from "../NavFooter/footer";
import "./ContactUs.css";
import { Mail, Phone, Briefcase } from "lucide-react";

import { API_BASE_URL } from "../../config";
const ContactUs = () => {
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;
    try {
      const response = await axios.post(`${API_BASE_URL}/api/contact`, { name, email, message });
      if (response.data.success) {
        setConfirmationMessage("Thank you for your feedback! We'\''ll get back to you soon.");
        setErrorMessage("");
        e.target.reset();
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setErrorMessage("Failed to submit feedback. Please try again later.");
      setConfirmationMessage("");
    }
  };

  return (
    <div className="contact-us-page">
      <Navbar />

      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>Have a question or feedback? We are here to help.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <div className="contact-info-item">
            <div className="contact-info-icon"><Mail size={20} /></div>
            <div>
              <div className="contact-info-label">Customer Support</div>
              <div className="contact-info-value"><a href="mailto:support@skillswap.com">support@skillswap.com</a></div>
            </div>
          </div>
          <div className="contact-info-item">
            <div className="contact-info-icon"><Phone size={20} /></div>
            <div>
              <div className="contact-info-label">Phone</div>
              <div className="contact-info-value">+94 774 902 773</div>
            </div>
          </div>
          <div className="contact-info-item">
            <div className="contact-info-icon"><Briefcase size={20} /></div>
            <div>
              <div className="contact-info-label">Business Inquiries</div>
              <div className="contact-info-value"><a href="mailto:business@skillswap.com">business@skillswap.com</a></div>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleFormSubmit}>
            <div style={{marginBottom: 16}}>
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" required placeholder="Enter your name" />
            </div>
            <div style={{marginBottom: 16}}>
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" name="email" required placeholder="Enter your email" />
            </div>
            <div style={{marginBottom: 16}}>
              <label htmlFor="message">Your Message</label>
              <textarea id="message" name="message" required placeholder="Enter your message"></textarea>
            </div>
            <button type="submit" className="contact-submit-btn">Send Message</button>
          </form>

          {confirmationMessage && <div id="confirmationMessage" className="confirmation">{confirmationMessage}</div>}
          {errorMessage && <div id="errorMessage" className="error">{errorMessage}</div>}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;




