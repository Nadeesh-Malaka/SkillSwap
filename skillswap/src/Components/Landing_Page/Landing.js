import React from "react";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";
import "./style.css";
import heroImg from "./resources/pic1.jpg";
import { Link } from "react-router-dom";
import { ShieldCheck, Rocket, BookOpen, Star } from "lucide-react";

function Landing() {
  return (
    <div className="landing-page">
      <Nav />
      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-content">
            <span className="badge">Welcome to SkillSwap</span>
            <h1 className="hero-title">
              Exchange Knowledge.<br />
              <span>Elevate Your Future.</span>
            </h1>
            <p className="hero-description">
              Connect with university peers to learn new skills and share your expertise. 
              The ultimate collaborative learning platform designed for students.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary">Get Started</Link>
              <Link to="/about" className="btn btn-secondary">Learn More</Link>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <div className="hero-image-backdrop"></div>
            <img src={heroImg} alt="Students collaborating" className="hero-image" />
          </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="stats-strip">
          <div className="stats-inner">
            <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Active Students</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">120+</div>
            <div className="stat-label">Skills Offered</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">300+</div>
            <div className="stat-label">Successful Swaps</div>
          </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="section-header">
            <h2>Why Choose SkillSwap?</h2>
            <p>Everything you need to grow your skillset and build your network.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><Rocket size={28} /></div>
              <h3>Fast & Easy Connection</h3>
              <p>Find students who know exactly what you want to learn, and connect instantly through our platform.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><BookOpen size={28} /></div>
              <h3>Diverse Skill Sets</h3>
              <p>From programming to photography, language learning to mathematics, discover a wide range of skills.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><ShieldCheck size={28} /></div>
              <h3>Safe & Secure</h3>
              <p>Verified university student profiles and a secure messaging system keep your learning environment safe.</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials-section">
          <div className="section-header">
            <h2>What Students Say</h2>
            <p>Real stories from our collaborative community.</p>
          </div>
          <div className="testimonials-track">
            <div className="testimonial-card">
              <div className="stars"><Star size={16} fill="#F59E0B" color="#F59E0B" /><Star size={16} fill="#F59E0B" color="#F59E0B" /><Star size={16} fill="#F59E0B" color="#F59E0B" /><Star size={16} fill="#F59E0B" color="#F59E0B" /><Star size={16} fill="#F59E0B" color="#F59E0B" /></div>
              <p className="quote">"I learned Python by teaching Spanish. It's an amazing way to pick up new skills without spending a dime!"</p>
              <div className="author">- Sarah, CompSci Major</div>
            </div>
            <div className="testimonial-card">
              <div className="stars"><Star size={16} fill="#F59E0B" color="#F59E0B" /><Star size={16} fill="#F59E0B" color="#F59E0B" /><Star size={16} fill="#F59E0B" color="#F59E0B" /><Star size={16} fill="#F59E0B" color="#F59E0B" /><Star size={16} fill="#F59E0B" color="#F59E0B" /></div>
              <p className="quote">"SkillSwap helped me find an awesome design mentor right here on campus."</p>
              <div className="author">- John, Marketing Student</div>
            </div>
            <div className="testimonial-card">
              <div className="stars"><Star size={16} fill="#F59E0B" color="#F59E0B" /><Star size={16} fill="#F59E0B" color="#F59E0B" /><Star size={16} fill="#F59E0B" color="#F59E0B" /><Star size={16} fill="#F59E0B" color="#F59E0B" /><Star size={16} fill="#F59E0B" color="#F59E0B" /></div>
              <p className="quote">"The best platform for peer-to-peer learning. Highly recommend to all students."</p>
              <div className="author">- Emily, Engineering</div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Landing;
