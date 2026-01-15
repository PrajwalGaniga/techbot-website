import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/AboutUs.css';

// Assets
import mentor1 from '../assets/mentor1.jpeg';
import mentor2 from '../assets/mentor2.jpeg';
import mentor3 from '../assets/mentor3.jpeg';
import srinathonImg from '../assets/srinathon.png'; 
import iitImg from '../assets/iit_madras.png';
import infosysImg from '../assets/infosys.png';
import sihImg from '../assets/achievemnets/sihImg.jpeg';
import aigniteImg from '../assets/achievemnets/aignite.jpeg';

// --- HELPER COMPONENT: LetterStagger Animation ---
// Provides the premium letter-by-letter reveal effect
const LetterStagger = ({ text }) => {
  const letters = text.split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200 } },
    hidden: { opacity: 0, y: 15 },
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
  const [showDetails, setShowDetails] = useState(false);

  // --- DATA ---
  const techStack = [
  { 
    title: "Microcontrollers", 
    items: ["ESP32", "STM32", "RISC-V", "Raspberry Pi"], 
    icon: "⚡" 
  },
  { 
    title: "Software & Web", 
    items: ["React", "Dashboards", "REST APIs", "Cloud IoT"], 
    icon: "🌐" 
  },
  { 
    title: "AI & Intelligence", 
    items: ["CNNs", "Computer Vision", "Edge AI", "LLMs"], 
    icon: "🧠" 
  },
  { 
    title: "Mechanical", 
    items: ["3D Printing", "CAD Design", "Fabrication", "Motion Control"], 
    icon: "⚙️" 
  },

  // ✅ Added from Safwan's data (Filtered)
  { 
    title: "IDEs & Development Tools", 
    items: [
      "Arduino IDE",
      "VS Code",
      "PlatformIO",
      "ESP-IDF",
      "STM32CubeIDE",
      "STM32CubeProgrammer"
    ], 
    icon: "🛠️" 
  },
  { 
    title: "Simulation & PCB Design", 
    items: [
      "ROS",
      "Gazebo",
      "Wokwi",
      "Tinkercad",
      "Cirkit Designer",
      "LTspice",
      "EasyEDA",
      "KiCad"
    ], 
    icon: "📐" 
  },
];


  const processSteps = [
    { id: 1, title: "Problem Definition", desc: "Identifying real-world constraints and defining system requirements." },
    { id: 2, title: "System Design", desc: "Architecting the hardware, mechanical, and software layers simultaneously." },
    { id: 3, title: "Build & Firmware", desc: "Fabricating the chassis, assembling PCBs, and writing embedded logic." },
    { id: 4, title: "Integration & Web", desc: "Connecting the physical device to web dashboards and cloud APIs." },
    { id: 5, title: "Deployment", desc: "Testing under real conditions, iterating, and finalizing the solution." },
  ];

  const achievements = [
    { title: "First Prize – SRINATHON 2.0", tag: "International Hackathon", event: "Organized by SSOSC and Nexus", desc: "Secured First Place in a 24-hour international-level hackathon.", img: srinathonImg },
    { title: "Top 40 Teams – Ideas to Impact 2.0", tag: "National Recognition", event: "IIT Madras", desc: "Selected among the Top 40 teams nationwide for an AI-powered smart waste management solution.", img: iitImg },
    { title: "Project Representation", tag: "Industry Showcase", event: "Infosys DK Campus", desc: "Proudly represented the LUNA semi-humanoid robot at Infosys.", img: infosysImg },
    { title: "Shortlisted for SIH 2025", tag: "Smart India Hackathon", event: "Ministry of Fisheries", desc: "Shortlisted for the SIH 2025 Grand Finale for 'Digital Farm Management Portal'.", img: sihImg },
    { title: "Participation – AIGNITE 2.0", tag: "National Project Expo", event: "AIGNITE 2.0", desc: "Presented innovative technical solutions and gained competitive exposure.", img: aigniteImg },
  ];

  const faqs = [
    { q: "How do I join TechBots?", a: "We hold recruitment drives at the start of every academic year. It's open to all departments and years. Watch out for our announcements!" },
    { q: "Do I need prior experience?", a: "Not at all. We value passion and consistency over current skills. We teach everything from scratch through our mentorship program." },
    { q: "What domains can I work in?", a: "You can work in Electronics, Web Development, AI/ML, Mechanical Design, or a mix of all. We encourage cross-domain learning." },
    { q: "What is the time commitment?", a: "We are an active working space. While hours are flexible, consistent participation in projects and weekly meets is expected for growth." },
    { q: "Do we participate in hackathons?", a: "Yes! We actively participate in and win National-level hackathons like SIH, Srinathon, and various project expos." }
  ];

  // --- CAROUSEL LOGIC ---
  useEffect(() => {
    const textTimer = setTimeout(() => setShowDetails(true), 3000);
    const slideTimer = setInterval(() => {
      setShowDetails(false);
      setAchieveIdx((prev) => (prev + 1) % achievements.length);
      setTimeout(() => setShowDetails(true), 3000);
    }, 8000);
    return () => { clearInterval(slideTimer); clearTimeout(textTimer); };
  }, [achievements.length]);

  const mentorDetails = [
    { id: 1, name: "Dr. Soorya Krishna K", role: "ECE VLSI Enthusiast | Ph.D. NITK", bio: "Ph.D. in VLSI high speed interconnects. Specialist in Electronic Devices and IoT.", expertise: ["VLSI", "IoT"], image: mentor3 },
    { id: 2, name: "Shailesh S Shetty", role: "Assistant Professor | M.Tech", bio: "Skilled in AI/ML, Blockchain, and Cyber Security. HOD of CS & Business Systems.", expertise: ["AI/ML", "Blockchain"], image: mentor2 },
    { id: 3, name: "Aditya R Poonja", role: "Industry Mentor", bio: "SWE Specialist with Deep-Tech experience. Expertise in Robotics, AI, and Startup Growth.", expertise: ["Deep-Tech", "Robotics"], image: mentor1 }
  ];

  return (
    <div className="about-page">
      
      {/* 1. HERO: VISION & MISSION */}
      <section className="about-hero">
        <div className="manifesto-container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="section-label">Our Purpose</span>
            
            {/* FIX 1: Using LetterStagger Here */}
            <h1 className="story-heading">
              <LetterStagger text="To Build a Strong Multidisciplinary Engineering Community" />
            </h1>
            
            <div className="mission-box">
              <p className="mission-text">
                <strong>MISSION:</strong> To provide a hands-on learning environment where members work across electronics, mechanical design, software development, AI, IoT, and robotics to build integrated systems. Through projects, mentorship, and continuous practice, we bridge the gap between academic learning and real engineering experience.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TECH STACK (Formerly Skills) */}
      <section className="skills-diagnostics">
        <div className="section-header">
          <span className="section-label">Capabilities</span>
          <h2 className="section-title">Our Tech Stack</h2>
        </div>
        
        <div className="tech-stack-grid">
          {techStack.map((tech, i) => (
            <motion.div 
              key={i} 
              className="tech-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="tech-icon">{tech.icon}</span>
              <h3>{tech.title}</h3>
              <div className="tech-tags">
                {tech.items.map((item, j) => (
                  <span key={j} className="t-tag">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. ENGINEERING APPROACH (New Section) */}
      <section className="approach-section">
        <div className="section-header">
          <span className="section-label">Methodology</span>
          <h2 className="section-title">How We Engineer</h2>
        </div>

        <div className="timeline-container">
          {processSteps.map((step, i) => (
            <motion.div 
              key={step.id} 
              className="process-step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="step-number">{step.id}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. MENTORS & CULTURE */}
      <section className="leadership-journey">
        <div className="section-header">
          <span className="section-label">Culture</span>
          <h2 className="section-title">Mentorship & Guidance</h2>
          <p style={{color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto'}}>
            A structured senior-to-junior mentorship system fostering cross-domain teamwork and knowledge sharing.
          </p>
        </div>
        <div className="mentor-deck">
          {mentorDetails.map((mentor, index) => (
            <div key={mentor.id} className="ace-card">
              <div className="card-header">
                <img src={mentor.image} alt={mentor.name} className="mentor-portrait" />
                <div className="mentor-meta">
                  <h4>{mentor.name}</h4>
                  <span className="role-tag">{mentor.role}</span>
                </div>
              </div>
              <p className="mentor-bio-text">{mentor.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ACHIEVEMENTS CINEMA (Restored Layout) */}
      <section className="achievements-cinema">
        <div className="section-header">
          <span className="section-label">Our Diary</span>
          <h2 className="section-title">The Golden Record</h2>
        </div>

        <div className="cinema-slider-container">
          <div className="cinema-track">
            {achievements.map((item, index) => (
              <div key={index} className={`cinema-slide ${index === achieveIdx ? 'active' : ''}`}>
                <div className="slide-bg-visible" style={{ backgroundImage: `url(${item.img})` }}></div>
                <div className="overlay-dimmer"></div>
                {index === achieveIdx && showDetails && (
                  <motion.div 
                    className="slide-content-glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="victory-tag">{item.tag}</span>
                    <h4>{item.title}</h4> 
                    <p className="event-meta">{item.event}</p>
                    <p className="event-desc">{item.desc}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION (General Questions) */}
      <section className="faq-terminal">
        <div className="section-header">
           <span className="section-label">Database</span>
           <h2 className="section-title">Common Questions</h2>
        </div>
        
        <div className="faq-container">
          {faqs.map((item, i) => (
            <div key={i} className="faq-item" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
              <div className="faq-question">
                <span>{item.q}</span>
                <span className="toggle">{activeFaq === i ? '−' : '+'}</span>
              </div>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    className="faq-answer"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;