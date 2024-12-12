import React, { useState } from "react";
import Navbar from "../NavFooter/nav"; // Import Navbar component
import Footer from "../NavFooter/footer"; // Import Footer component
 import "./ContactUs.css"; // Import external CSS file

const ContactUs = () => {
  const [confirmationMessage, setConfirmationMessage] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setConfirmationMessage(true);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Contact Us Content */}
      <section id="contact-info">
        <h1>Contact Us</h1>
        <p>
          Welcome to our contact page! We're always here to assist you. If you have
          any questions, feedback, or suggestions, please feel free to reach out.
          Below are all the details you need to get in touch with us:
        </p>

        <h2>Our Office Location</h2>
        <address>
          123 Business Street, Suite 500, <br />
          Cityville, State 12345, <br />
          Country.
        </address>

        <h2>Customer Support</h2>
        <ul>
          <li>Email: <a href="mailto:support@skillswap.com">support@skillswap.com</a></li>
          <li>Phone: +123-456-7890</li>
          <li>Fax: +123-456-7891</li>
        </ul>

        <h2>Business Inquiries</h2>
        <ul>
          <li>Email: <a href="mailto:business@skillswap.com">business@skillswap.com</a></li>
          <li>Phone: +123-456-7892</li>
        </ul>
      </section>

      {/* Feedback Form */}
      <section id="feedback-form">
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
            Thank you for your feedback! We'll get back to you soon.
          </div>
        )}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;
