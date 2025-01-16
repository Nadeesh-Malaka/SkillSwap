import React from "react";
import "./style.css";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";

function AboutUs() {
  return (
    <div>
      <Nav />

      <main className="about-main">
        <div className="about-header">
          <h1>About Us</h1>
          <p className="tagline">Empowering students through knowledge exchange.</p>
        </div>

        <section className="about-content">
          <p>
            At <strong>SkillSwap</strong>, we believe in empowering university students by providing a collaborative platform to exchange knowledge and skills.
          </p>
          <p>
            Founded with the mission of fostering peer-to-peer learning, our platform allows students to offer their expertise in one skill while learning another in return.
          </p>
          <p>
            By creating an environment where knowledge knows no bounds, SkillSwap promotes personal growth, enhanced employability, and stronger academic communities.
          </p>
          <p>
            Join us in building a network of lifelong learners and creators who are ready to shape the future together.
          </p>
          <div className="cta-section">
            <a href="#join" className="cta-button">Join Us Today</a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AboutUs;
