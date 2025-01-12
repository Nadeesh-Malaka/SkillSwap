import React, { useState } from "react";
import "./style.css";
import user1Image from "./resources/web.jpg";
import user2Image from "./resources/grapic.png";
import user3Image from "./resources/photo.png";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = 3;

  const handleRequestClick = (button) => {
    button.textContent = "Request Sent";
    button.disabled = true;
    alert("Open chat page");
  };

  return (
    <div>
      <Nav />

      <main>
        <section id="home">
          <h1>Welcome to SkillSwap</h1>
          <p>Exchange your skills and knowledge with university peers in a collaborative learning environment.</p>
          <div className="cta-buttons">
            <a href="#skills" className="cta">Get Started</a>
            <a href="#about" className="cta secondary">Learn More</a>
          </div>
        </section>

        <section id="skills">
          <h2>Explore Skills</h2>
          <div className="search-section">
            <input type="text" id="searchInput" placeholder="Search categories or skills..." />
            <button id="searchBtn">Search</button>
          </div>
          <div className="skills-section">
            <div className="profile-card">
              <img src={user1Image} alt="Profile Picture" className="profile-pic" />
              <h3 className="profile-name">John Doe</h3>
              <p className="profile-skill">Skill: Web Development</p>
              <p className="profile-description">Experienced in building responsive websites using HTML, CSS, and JavaScript.</p>
              <button className="request-btn" onClick={(e) => handleRequestClick(e.target)}>Send Request</button>
            </div>

            <div className="profile-card">
              <img src={user2Image} alt="Profile Picture" className="profile-pic" />
              <h3 className="profile-name">Emily Smith</h3>
              <p className="profile-skill">Skill: Graphic Design</p>
              <p className="profile-description">Specializes in creating stunning visual designs and brand identities.</p>
              <button className="request-btn" onClick={(e) => handleRequestClick(e.target)}>Send Request</button>
            </div>

            <div className="profile-card">
              <img src={user3Image} alt="Profile Picture" className="profile-pic" />
              <h3 className="profile-name">Michael Brown</h3>
              <p className="profile-skill">Skill: Photography</p>
              <p className="profile-description">Professional photographer with expertise in portraits and event photography.</p>
              <button className="request-btn" onClick={(e) => handleRequestClick(e.target)}>Send Request</button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
