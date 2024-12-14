import React, { useState } from 'react';
import "./style.css";
import Navbar from "../NavFooter/nav"; // Import Navbar component
import Footer from "../NavFooter/footer"; // Import Footer component

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is SkillSwap?",
      answer: "SkillSwap is a platform where university students can exchange skills by offering and requesting assistance from their peers."
    },
    {
      question: "Who can use SkillSwap?",
      answer: "The platform is designed for university students to foster a collaborative learning environment."
    },
    {
      question: "How does SkillSwap work?",
      answer: "Users can register, list the skills they offer, and request skills they want to learn. An intelligent matching mechanism pairs users for skill exchanges."
    },
    {
      question: "Is the platform free?",
      answer: "Yes, SkillSwap is free to use for university students."
    },
    {
      question: "What features does SkillSwap offer?",
      answer: "Features include user registration, skill listings, real-time chat, peer reviews, feedback mechanisms, and admin controls for moderation."
    },
    {
      question: "How can I provide feedback?",
      answer: "After completing a skill exchange session, you can rate and review your experience directly on the platform."
    }
  ];

  return (
    <div>
      <Navbar />
      <main>
        <section className="faq-section">
          <h1>Frequently Asked Questions</h1>
          <div className="faq">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                <h2 className="faq-question" onClick={() => toggleFAQ(index)}>{faq.question}</h2>
                {activeIndex === index && <p className="faq-answer">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;