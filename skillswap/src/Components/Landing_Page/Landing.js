import React, { useState, useEffect } from "react";
import "./style.css";
import user2Image from "./resources/user2.png";
import user1Image from "./resources/user1.png";
import user3Image from "./resources/user3.png";
import pic1 from "./resources/pic1.jpg";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";

function Landing() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [totalCards]);

  return (
    <div>
      <Nav />

      <main>
        <section className="hero">
          <h1>Welcome to SkillSwap</h1>
          <p>Connect, collaborate, and grow with us!</p>
          <div className="cta-buttons">
            <button>Sign Up</button>
            <button>Learn More</button>
          </div>
        </section>

        <section className="image-section">
          <img src={pic1} alt="Hero Image" className="hero-image" />
        </section>
        <br/>
        <section class="info-section">
      <div class="info">
        <p>University Skill Exchange Platform</p>
      </div>
      <div class="features">
        <div class="feature-item">
          <h3>Key Features</h3>
          <p>Connect with peers, share knowledge, and enhance your skills. Whether you're teaching or learning, our platform helps you grow academically and professionally.</p>
        </div>
        <div class="feature-item">
          <h3>Benefits</h3>
          <p>Join our University Skill Exchange platform to learn, teach, and collaborate with peers. Access flexible, personalized learning opportunities to grow academically.</p>
        </div>
      </div>
    </section>

        <section className="feedback-section">
          <h2>User Feedback</h2>
          <div className="swap-cards" style={{ transform: `translateX(-${currentIndex * 240}px)` }}>
            <div className="swap-card active">
              <img src={user1Image} alt="User Image" />
              <h3>Harsha Madushanka</h3>
              <p>"This platform is amazing! I've learned so much from the community."</p>
            </div>
            <div className="swap-card">
              <img src={user2Image} alt="User Image" />
              <h3>Sasini Savindi</h3>
              <p>"SkillSwap has completely changed the way I approach learning and collaboration."</p>
            </div>
            <div className="swap-card">
              <img src={user3Image} alt="User Image" />
              <h3>Hiruni Sadupama</h3>
              <p>"SkillSwap has completely changed the way I approach learning and collaboration."</p>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
     
    </div>
  );
}

export default Landing;
