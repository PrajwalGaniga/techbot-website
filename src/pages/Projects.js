import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Projects.css';

// Import images
import lunaImg from '../assets/luna.png';
import phylaxImg from '../assets/phylax.png';
import sniproboImg from '../assets/sniprobo.png';
import soccerbotImg from '../assets/soccerbot.png';
import linefollowerImg from '../assets/linefollower.jpeg';
import multihazardImg from '../assets/multihazard.png';
import robovitaImg from '../assets/robovita1.png';

// --- HELPER COMPONENT: LetterStagger ---
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
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 200 } },
    hidden: { opacity: 0, y: 20, transition: { type: "spring", damping: 12, stiffness: 200 } },
  };
  return (
    <motion.span style={{ display: "inline-block" }} variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>{letter}</motion.span>
      ))}
    </motion.span>
  );
};

const projectData = [
  { id: 1, title: "LUNA & LUNA V2", tag: "Semi-Humanoid Robotics", desc: "A flagship project integrating LLMs, AI, voice interaction, and computer vision.", tech: ["Raspberry Pi", "OpenAI SDK", "Arduino"], img: lunaImg },
  { id: 2, title: "Phylax", tag: "IoT Security", desc: "Next-gen biometric locking system using ESP32, featuring fingerprint authentication.", tech: ["ESP32", "OLED Display", "Biometrics"], img: phylaxImg },
  { id: 3, title: "SNIP ROBO", tag: "Event Automation", desc: "Innovative robotic system designed for automated ceremonial ribbon cutting.", tech: ["Servo Control", "Automation", "Embedded C"], img: sniproboImg },
  { id: 4, title: "Multi-Hazard Detector", tag: "Disaster Management", desc: "Real-time monitoring system using MPU6050 and GPS to alert users of hazards.", tech: ["MPU6050", "NEO-6M GPS", "Firebase"], img: multihazardImg },
  { id: 5, title: "Soccer & Terrain Bots", tag: "Mobile Robotics", desc: "Dual-bot system addressing challenges in agility for soccer and stable navigation.", tech: ["Drivetrain", "Traction Systems"], img: soccerbotImg },
  { id: 6, title: "Line-Following Robot", tag: "Autonomous Systems", desc: "Precision navigation robot using real-time sensor data to follow predefined paths.", tech: ["Sensor Fusion", "Motor Control"], img: linefollowerImg },
  { id: 7, title: "RoboVita", tag: "Environmental Safety", desc: "IoT-based gas sensing and mapping robot designed for detecting hazardous conditions.", tech: ["Gas Sensors", "IoT", "Real-time Monitoring"], img: robovitaImg }
];

const Projects = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const scrollRef = useRef(null);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle Scroll Snap Detection (Active State)
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth * 0.85; // 85vw roughly
    // Calculate index based on scroll position + padding offset
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIdx(index);
  };

  return (
    <div className="projects-page">
      <section className="projects-hero">
        <motion.div className="hero-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <span className="section-label">Our Portfolio</span>
          <h1><LetterStagger text="Engineering the Impossible" /></h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            Explore the full spectrum of innovation at TechBots SIT.
          </motion.p>
        </motion.div>
      </section>

      {/* --- DESKTOP: STANDARD GRID --- */}
      {!isMobile && (
        <section className="desktop-grid-container">
          {projectData.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card-standard"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="card-img-standard">
                <img src={project.img} alt={project.title} />
              </div>
              <div className="card-info">
                <span className="p-tag">{project.tag}</span>
                <h2>{project.title}</h2>
                <p>{project.desc}</p>
                <div className="tech-row">
                  {project.tech.map((t, i) => <span key={i} className="tech-pill">{t}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </section>
      )}

      {/* --- MOBILE: SCROLL SNAP CAROUSEL --- */}
      {isMobile && (
        <section 
          className="mobile-scroll-container" 
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {projectData.map((project, index) => {
            const isActive = index === activeIdx;
            return (
              <div 
                key={project.id} 
                className={`mobile-card-wrapper ${isActive ? 'active' : ''}`}
              >
                <div className="project-card-mobile">
                  <div className="card-img-mobile">
                    <img src={project.img} alt={project.title} />
                  </div>
                  <div className="card-info">
                    <span className="p-tag">{project.tag}</span>
                    <h2>{project.title}</h2>
                    <p>{project.desc}</p>
                    <div className="tech-row">
                      {project.tech.map((t, i) => <span key={i} className="tech-pill">{t}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default Projects;