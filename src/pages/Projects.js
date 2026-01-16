import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Projects.css';

// Import images
import lunaImg from '../assets/projects/luna.png';
import phylaxImg from '../assets/projects/phylax.png';
import sniproboImg from '../assets/projects/snipRobo.jpeg';
import soccerbotImg from '../assets/projects/soccerbot.png';
import linefollowerImg from '../assets/projects/linefollower.jpeg';
import multihazardImg from '../assets/projects/multihazard.png';
import robovitaImg from '../assets/projects/robovita1.png';
import lunaV2 from '../assets/projects/lunav2.png';
import loraWaterImg from '../assets/projects/loraWaterImg.jpeg';
import retroConsoleImg from '../assets/projects/retroConsoleImg.jpeg';

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

// --- UPDATED DATA: Multidisciplinary Focus ---
const projectData = [
  { 
    id: 1, 
    title: "LUNA V1", 
    tag: "Integrated Robotics", 
    desc: "A complete semi-humanoid system. Combines a custom 3D-printed mechanical chassis, Raspberry Pi computing core, and OpenAI-based LLM integration for natural voice interaction.", 
    tech: ["Mechanical Design", "Python", "LLMs", "Raspberry Pi"], 
    img: lunaImg 
  },
  { 
    id: 2, 
    title: "Phylax", 
    tag: "IoT & Mobile Dev", 
    desc: "End-to-end security ecosystem. Integrates hardware biometric sensors (fingerprint) with a custom cross-platform mobile application for remote access control and logging.", 
    tech: ["Embedded C", "Flutter App", "ESP32", "Biometrics"], 
    img: phylaxImg 
  },
  { 
    id: 3, 
    title: "Multi-Hazard Monitor", 
    tag: "Full-Stack IoT", 
    desc: "Real-time disaster management system. Hardware sensor nodes transmit critical data to a cloud-hosted React dashboard for instant visualization and alerts.", 
    tech: ["Cloud IoT", "React.js", "Firebase", "Sensors"], 
    img: multihazardImg 
  },
  { 
    id: 4, 
    title: "RoboVita", 
    tag: "Environmental Tech", 
    desc: "Autonomous environmental rover. Maps hazardous gas levels using sensor arrays and transmits geospatial data to a remote monitoring web interface.", 
    tech: ["Data Viz", "Web Sockets", "Arduino", "Sensors"], 
    img: robovitaImg 
  },
  { 
    id: 5, 
    title: "SNIP ROBO", 
    tag: "Mechatronics", 
    desc: "Automated ceremonial system. Features precision mechanical linkages driven by custom servo firmware to perform automated tasks with high reliability.", 
    tech: ["Mechanism Design", "Firmware", "C++"], 
    img: sniproboImg 
  },
  { 
    id: 6, 
    title: "Soccer & Terrain Bot", 
    tag: "Mobile Robotics", 
    desc: "Rugged mobile units focused on drivetrain mechanics. Features custom traction systems and low-latency wireless communication protocols for agile navigation.", 
    tech: ["Fabrication", "RF Comm", "Motor Drivers"], 
    img: soccerbotImg 
  },
  { 
    id: 7, 
    title: "Autonomous Nav", 
    tag: "Control Systems", 
    desc: "Precision navigation robot utilizing PID control algorithms and sensor fusion to autonomously traverse complex paths with high accuracy.", 
    tech: ["Control Theory", "Sensor Fusion", "Embedded C"], 
    img: linefollowerImg 
  },
  { 
    id: 8, 
    title: "LUNA V2", 
    tag: "Integrated Robotics", 
    desc: "Next-generation semi-humanoid system. Enhances LUNA V1 with improved mechanical design, optimized AI interaction, and better onboard processing.", 
    tech: ["Mechanical Design", "Python", "LLMs", "Raspberry Pi"], 
    img: lunaV2 
  },
  { 
    id: 9, 
    title: "LoRa Water-Zone Monitor", 
    tag: "Low-Power IoT", 
    desc: "End-to-end LoRa-based remote water-zone monitoring system. Integrates ESP8266 nodes, environmental sensors, and SOS alerts with a real-time cloud dashboard for reliable long-range, low-power communication without GSM or internet dependency.", 
    tech: ["LoRa", "ESP8266", "Cloud Dashboard", "Environmental Sensors"], 
    img: loraWaterImg 
  },
  { 
    id: 10, 
    title: "Retro Gaming Console", 
    tag: "Embedded Systems", 
    desc: "A compact, menu-driven retro gaming console built on an ESP32 with an OLED display. Features multiple classic games controlled via physical buttons and a buzzer-based audio system.", 
    tech: ["ESP32", "OLED Display", "Embedded C", "Game Logic"], 
    img: retroConsoleImg 
  }
];


const Projects = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hasInteracted, setHasInteracted] = useState(false); // Track user interaction
  const scrollRef = useRef(null);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- AUTO-SCROLL HINT (Mobile Only) ---
  useEffect(() => {
    if (!isMobile) return;

    const timer = setTimeout(() => {
      // If user hasn't touched it yet, scroll to the next card to show functionality
      if (!hasInteracted && scrollRef.current) {
        const container = scrollRef.current;
        const cardWidth = container.offsetWidth * 0.85; // Based on CSS 85vw
        const gap = 20; // CSS gap
        
        // Smooth scroll to the second item (Index 1)
        container.scrollTo({
          left: cardWidth + gap,
          behavior: 'smooth'
        });
      }
    }, 2500); // Wait 2.5 seconds before hinting

    return () => clearTimeout(timer);
  }, [isMobile, hasInteracted]);

  // Handle Scroll Snap Detection (Active State)
  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    // User is scrolling, so disable the auto-hint
    if (!hasInteracted) setHasInteracted(true);

    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth * 0.85; // 85vw roughly
    
    // Calculate index based on scroll position
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
            Explore our end-to-end engineering solutions, from embedded intelligence to full-stack cloud integration.
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