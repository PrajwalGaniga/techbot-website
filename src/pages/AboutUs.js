import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/AboutUs.css';
import mentor1 from '../assets/mentor1.jpeg';
import mentor2 from '../assets/mentor2.jpeg';
import mentor3 from '../assets/mentor3.jpeg';
import srinathonImg from '../assets/srinathon.png'; 
import iitImg from '../assets/iit_madras.png';
import infosysImg from '../assets/infosys.png';
import sihImg from '../assets/achievemnets/sihImg.jpeg'
import aigniteImg from '../assets/achievemnets/aignite.jpeg'

// --- HELPER COMPONENT: LetterStagger Animation ---
// Provides the premium letter-by-letter reveal effect
const LetterStagger = ({ text }) => {
  const letters = text.split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.span
      style={{ display: "inline-block" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const AboutUs = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [achieveIdx, setAchieveIdx] = useState(0);

  const achievements = [
    {
      title: "First Prize – SRINATHON 2.0",
      event: "International Hackathon",
      desc: "Secured First Place in a 24-hour international-level hackathon, showcasing innovation and technical excellence.",
      img: srinathonImg
    },
    {
      title: "Top 40 Teams – Ideas to Impact 2.0",
      event: "IIT Madras",
      desc: "Selected among the Top 40 teams nationwide for an AI-powered smart waste management solution.",
      img: iitImg
    },
    {
      title: "Project Representation",
      event: "Infosys DK Campus",
      desc: "Represented the LUNA robot at Infosys DK Campus, demonstrating advanced robotics to industry professionals.",
      img: infosysImg
    },
    
      // 🆕 SIH 2025 Achievement
      {
        title: "Shortlisted for SIH 2025 Grand Finale",
        tag: "Smart India Hackathon",
        event: "Ministry of Fisheries, Animal Husbandry & Dairying",
        desc: "Team System Crash from Srinivas Institute of Technology was shortlisted for the SIH 2025 Grand Finale for the project 'Digital Farm Management Portal for Implementing Biosecurity Measures in Pig/Poultry'. The team demonstrated innovation in agri-tech and biosecurity solutions at a national level.",
        img: sihImg
      },
    
      // 🆕 AIGNITE 2.0
      {
        title: "Participation – AIGNITE 2.0",
        tag: "National Level Project Expo",
        event: "AIGNITE 2.0",
        desc: "Members of TechBots_SIT actively participated in the AIGNITE 2.0 National Level Project Expo, presenting innovative technical solutions and gaining exposure to competitive project evaluation and peer learning.",
        img: aigniteImg
      },
  ];
  const [showDetails, setShowDetails] = useState(false);
  // Carousel Logic
  useEffect(() => {
  // Initial delay for the very first slide's text
  const textTimer = setTimeout(() => setShowDetails(true), 3000);

  const slideTimer = setInterval(() => {
    setShowDetails(false); // 1. Hide text first
    setAchieveIdx((prev) => (prev + 1) % achievements.length); // 2. Change Image
    
    // 3. Show text again after 3 seconds of showing the new image
    setTimeout(() => setShowDetails(true), 3000);
  }, 8000); // Cycle: 3s (Image only) + 5s (Image + Text)

  return () => {
    clearInterval(slideTimer);
    clearTimeout(textTimer);
  };
}, [achievements.length]);

  const stats = [
    { label: "Students", value: "100+" },
    { label: "Projects", value: "50+" },
    { label: "Workshops", value: "15+" },
    { label: "Modules", value: "50+" },
    { label: "Work Hours", value: "100+" }
  ];

  const mentorDetails = [
    {
      id: 1,
      name: "Dr. Soorya Krishna K",
      role: "ECE VLSI Enthusiast | Ph.D. NITK",
      bio: "Ph.D. in VLSI high speed interconnects with 18 years of teaching experience. Specialist in Electronic Devices, Analog Circuits, and IoT.",
      expertise: ["VLSI Design", "IoT", "Python"],
      image: mentor3
    },
    {
      id: 2,
      name: "Shailesh S Shetty",
      role: "Assistant Professor | M.Tech NMAMIT",
      bio: "Experienced Assistant Professor with an M.Tech in Computer Engineering. Skilled in AI/ML, Blockchain, and Cyber Security.",
      expertise: ["AI / ML", "Blockchain", "CyberSec"],
      image: mentor2
    },
    {
      id: 3,
      name: "Aditya R Poonja",
      role: "Business Development Executive",
      bio: "SWE Specialist with 5+ years of Deep-Tech experience. Expertise in Robotics, AI/ML, and Startup Growth.",
      expertise: ["Deep-Tech", "Robotics", "Software"],
      image: mentor1
    }
  ];

  return (
    <div className="about-page">
      
      {/* SCENE 1: SYSTEM INITIALIZATION (HERO) */}
      <section className="about-hero">
        <motion.div 
          className="manifesto-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="center-card">
            <motion.h3 
              className="section-label"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Scene 01: The Mission
            </motion.h3>
            
            <h1 className="story-heading">
              <LetterStagger text="Engineering Tomorrow's Intelligence" />
            </h1>
            
            <motion.p 
              className="hero-text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Welcome to <strong>TechBots</strong>, where innovation meets inspiration. 
              We are a vibrant community of passionate creators and tech enthusiasts united by 
              a shared vision to push the boundaries of robotics and automation.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* SCENE 2: SYSTEM DIAGNOSTICS (SKILLS) */}
      <section className="skills-diagnostics">
        <div style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto'}}>
          <span className="section-label">System Capabilities</span>
          <h2 className="section-title">Core Competencies</h2>
        </div>
        
        <div className="skills-grid">
          {[
            { name: "Electronics & PCB", val: 100 },
            { name: "TensorFlow / AI", val: 96 },
            { name: "Python / Backend", val: 95 },
            { name: "Embedded C / Arduino", val: 85 }
          ].map((skill, i) => (
            <div key={i} className="skill-bar-container">
              <div className="skill-info">
                <span>{skill.name}</span>
                <span style={{color: 'var(--accent-primary)'}}>{skill.val}%</span>
              </div>
              <div className="progress-bg">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.val}%` }}
                  transition={{ duration: 1.5, delay: i * 0.15, ease: "easeOut" }}
                  className="progress-fill"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SCENE 3: THE BRAINS (ACES STACKED CARDS) */}
      <section className="leadership-journey">
        <div className="section-header">
          <span className="section-label">Guidance</span>
          <h2 className="section-title">The Visionaries</h2>
        </div>
        <div className="mentor-deck">
          {mentorDetails.map((mentor, index) => (
            <motion.div 
              key={mentor.id} 
              className="ace-card"
              whileHover={{ y: -15 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="card-header">
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="mentor-portrait" 
                />
                <div className="mentor-meta">
                  <h4>{mentor.name}</h4>
                  <span className="role-tag">{mentor.role}</span>
                </div>
              </div>
              <p className="mentor-bio-text">{mentor.bio}</p>
              <div className="expertise-grid">
                {mentor.expertise.map((exp, i) => (
                  <span key={i} className="skill-pill">{exp}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SCENE 4: IMPACT LOGS (STATS) */}
      <section className="impact-logs">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="impact-card"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <h2 className="impact-value">{stat.value}</h2>
              <p className="impact-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="achievements-cinema">
  <div className="section-header">
    <span className="section-label">Our Diary</span>
    <h2 className="section-title">The Golden Record</h2>
  </div>

  <div className="cinema-slider-container">
    <button className="nav-arrow left" onClick={() => setAchieveIdx(achieveIdx === 0 ? achievements.length - 1 : achieveIdx - 1)}>‹</button>
    
    <div className="cinema-track">
      {achievements.map((item, index) => (
        <div key={index} className={`cinema-slide ${index === achieveIdx ? 'active' : ''}`}>
          {/* Background Image */}
          <div 
            className="slide-bg-visible" 
            style={{ backgroundImage: `url(${item.img})` }}
          ></div>
          
          <div className="overlay-dimmer"></div>

          {/* Conditional Text Rendering based on 'showDetails' state */}
          {index === achieveIdx && showDetails && (
            <motion.div 
              className="slide-content-glass"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="victory-tag">Achievement</span>
              {/* Splitting title logic from your previous code */}
              <h4>{item.title}</h4> 
              <p className="event-meta">{item.event}</p>
              <p className="event-desc">{item.desc}</p>
            </motion.div>
          )}
        </div>
      ))}
    </div>

    <button className="nav-arrow right" onClick={() => setAchieveIdx((achieveIdx + 1) % achievements.length)}>›</button>
  </div>
</section>

      {/* FAQ SECTION */}
      <section className="faq-terminal">
        <div className="section-header">
           <span className="section-label">Database</span>
           <h2 className="section-title">Frequently Asked Questions</h2>
        </div>
        
        <div className="faq-container">
          {[
            { q: "What is the main focus?", a: "We design, build, and program robots for competitions and projects like LUNA V2 and Sumo Bots." },
            { q: "Do I need prior experience?", a: "No experience is required! We welcome all skill levels and offer mentorship." },
            { q: "What types of projects?", a: "We work on humanoid robots, autonomous drones, and custom IoT projects like LiFi modules." }
          ].map((item, i) => (
            <div key={i} className="faq-item" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
              <div className="faq-question">
                <span>{item.q}</span>
                <span className="toggle">{activeFaq === i ? '−' : '+'}</span>
              </div>
              {activeFaq === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} 
                  animate={{ height: 'auto', opacity: 1 }} 
                  className="faq-answer"
                >
                  {item.a}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;