import React from "react";
import "./style.css";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";
import { Users, TrendingUp, School } from "lucide-react";

const values = [
  { icon: <Users size={28} />, title: "Peer Learning", desc: "Connect students who can teach what others want to learn. Knowledge flows both ways." },
  { icon: <TrendingUp size={28} />, title: "Skill Growth", desc: "Continuously grow your skill set by engaging with university peers from diverse backgrounds." },
  { icon: <School size={28} />, title: "Community", desc: "Build a stronger academic community where collaboration thrives over competition." },
];

function AboutUs() {
  return (
    <div>
      <Nav />
      <main className="about-main">
        <div className="about-hero">
          <h1>About <span>SkillSwap</span></h1>
          <p className="tagline">Empowering students through knowledge exchange.</p>
        </div>

        <div className="about-content">
          <p>At <strong>SkillSwap</strong>, we believe in empowering university students by providing a collaborative platform to exchange knowledge and skills.</p>
          <p>Founded with the mission of fostering peer-to-peer learning, our platform allows students to offer their expertise in one skill while learning another in return.</p>
          <p>By creating an environment where knowledge knows no bounds, SkillSwap promotes personal growth, enhanced employability, and stronger academic communities.</p>
          <p>Join us in building a network of lifelong learners and creators who are ready to shape the future together.</p>
        </div>

        <section className="about-values">
          <div className="container">
            <div className="about-values-header">
              <h2>Our Core Values</h2>
              <p>What drives everything we do at SkillSwap.</p>
            </div>
            <div className="about-values-grid">
              {values.map((v, i) => (
                <div className="about-value-card" key={i}>
                  <div className="about-value-icon">{v.icon}</div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-cta">
          <h2>Ready to Start?</h2>
          <p>Join hundreds of university students already exchanging skills on SkillSwap.</p>
          <a href="/register" className="cta-button">Join Us Today</a>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AboutUs;
