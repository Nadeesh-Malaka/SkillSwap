import React, { useState } from "react";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";
import "./style.css";

const faqs = [
  { q: "What is SkillSwap?", a: "SkillSwap is a university-focused platform that allows students to exchange skills with their peers. You can teach what you know and learn what you need." },
  { q: "Who can use SkillSwap?", a: "SkillSwap is designed primarily for university students. Anyone with a university email can sign up and start exchanging skills." },
  { q: "How do I sign up?", a: "Click the 'Register' button in the navigation bar. Fill in your details, list the skills you can teach and the skills you want to learn, and submit." },
  { q: "Is SkillSwap free to use?", a: "Yes! SkillSwap is completely free. Our mission is to promote knowledge exchange among students without any financial barriers." },
  { q: "How does the skill exchange process work?", a: "Browse available skills on the Home page, find someone whose skill you want, and send a request. Once accepted, you both get access to the chat and can start exchanging." },
  { q: "Is my personal information safe?", a: "We take data privacy seriously. Your information is stored securely and never shared with third parties without your consent." },
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <div>
      <Nav />
      <main className="faq-page">
        <div className="faq-hero">
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about SkillSwap.</p>
        </div>

        <section className="faq-section">
          <div className="faq">
            {faqs.map((item, i) => (
              <div key={i} className={`faq-item ${activeIndex === i ? "active" : ""}`} onClick={() => toggle(i)}>
                <h3 className="faq-question">
                  {item.q}
                  <span className="faq-icon">{activeIndex === i ? "-" : "+"}</span>
                </h3>
                <p className="faq-answer">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default FAQ;
