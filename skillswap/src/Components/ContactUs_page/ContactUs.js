import React, { useState } from "react";
import axios from "axios";
import Navbar from "../NavFooter/nav";
import Footer from "../NavFooter/footer";
import "./ContactUs.css";

const ContactUs = () => {
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    try {
      const response = await axios.post("http://localhost:5000/api/contact", {
        name,
        email,
        message,
      });

      if (response.data.success) {
        setConfirmationMessage("Thank you for your feedback! We'll get back to you soon.");
        setErrorMessage("");
        e.target.reset(); // Clear the form
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setErrorMessage("Failed to submit feedback. Please try again later.");
      setConfirmationMessage("");
    }
  };

  return (
    <div className="contact-us-page">
      {/* Navbar */}
      <Navbar />

      {/* Contact Us Content */}
      <section id="contact-info" className="contact-info">
        <h1>Contact Us</h1>
        <p>
          Welcome to our contact page! We're always here to assist you. If you have
          any questions, feedback, or suggestions, please feel free to reach out.
          Below are all the details you need to get in touch with us:
        </p>

        <div className="contact-details">
          <div>
            <h2>Customer Support</h2>
            <ul>
              <li>
                Email:{" "}
                <a href="mailto:support@skillswap.com">support@skillswap.com</a>
              </li>
              <li>Phone: +94 774902773</li>
              <li>Fax: +94 774902773</li>
            </ul>
          </div>

          <div>
            <h2>Business Inquiries</h2>
            <ul>
              <li>
                Email:{" "}
                <a href="mailto:business@skillswap.com">business@skillswap.com</a>
              </li>
              <li>Phone: +94 774902773</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section id="feedback-form" className="feedback-form">
        <h2>We'd Love to Hear From You!</h2>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Enter your name"
          />

          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
          />

          <label htmlFor="message">Your Message:</label>
          <textarea
            id="message"
            name="message"
            required
            placeholder="Enter your message"
          ></textarea>

          <button type="submit">Submit Feedback</button>
        </form>

        {confirmationMessage && (
          <div id="confirmationMessage" className="confirmation">
            {confirmationMessage}
          </div>
        )}
        {errorMessage && (
          <div id="errorMessage" className="error">
            {errorMessage}
          </div>
        )}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;
