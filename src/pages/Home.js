import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Home.css';
import ChipScene from '../components/ChipScene';

// Images
import mentor1 from '../assets/mentor1.jpeg';
import mentor2 from '../assets/mentor2.jpeg';
import mentor3 from '../assets/mentor3.jpeg';

// Video Clips
import clip1 from '../assets/vedio-clips/clip1.mp4';
import clip2 from '../assets/vedio-clips/clip2.mp4';
import clip3 from '../assets/vedio-clips/clip3.mp4';

// --- HELPER COMPONENT: LetterStagger Animation ---
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

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Data for the NEW Domains Section
  const domains = [
    {
      title: "Electronics & Embedded",
      desc: "Microcontroller development with ESP32, STM32, and RISC-V platforms.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 10h2V8H4zm0 6h2v-2H4zm14-6h2V8h-2zm0 6h2v-2h-2zM8 4h2V2H8zm6 0h2V2h-2zM8 20h2v-2H8zm6 0h2v-2h-2z"/><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
      )
    },
    {
      title: "Mechanical Design",
      desc: "Structural design, 3D modeling, and fabrication for integrated systems.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/></svg>
      )
    },
    {
      title: "Robotics",
      desc: "Motion control, sensing, and autonomous interaction systems.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
      )
    },
    {
      title: "Software & Web",
      desc: "Full-stack dashboards, applications, and control interfaces.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" y1="2" x2="12" y2="22"/></svg>
      )
    },
    {
      title: "AI & Machine Learning",
      desc: "Computer vision, CNNs, and LLMs for intelligent decision making.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M8 16v.01"/><path d="M16 8v.01"/></svg>
      )
    },
    {
      title: "IoT & Communication",
      desc: "Cloud platforms, mesh networking, and wireless APIs.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
      )
    }
  ];

  const featuredProjects = [
    {
      id: 1,
      title: "LUNA V2",
      category: "Robotics & AI",
      description: "A semi-humanoid robot combining mechanical chassis design, Python-based AI, and LLM voice interaction.",
      tech: ["Raspberry Pi", "OpenAI SDK"]
    },
    {
      id: 2,
      title: "Phylax",
      category: "Embedded Systems",
      description: "Next-gen smart locking system integrating hardware biometrics with a secure mobile app interface.",
      tech: ["ESP32", "OLED"]
    },
    {
      id: 3,
      title: "Multi-Hazard Detector",
      category: "IoT",
      description: "End-to-end disaster monitoring system sending real-time sensor data to a cloud dashboard.",
      tech: ["ESP8266", "Firebase"]
    }
  ];

  const handleShuffle = () => {
    setActiveIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const mentorHighlights = [
    {
      id: 1,
      name: "Dr. Soorya Krishna K",
      role: "HOD, Dept. of ECE, SIT",
      image: mentor3, 
      linkedin: "https://www.linkedin.com/in/ksooryakrishna1/" 
    },
    {
      id: 2,
      name: "Shailesh S Shetty",
      role: "HOD, Dept. of CS & Business System, SIT",
      image: mentor2, 
      linkedin: "https://www.linkedin.com/in/shailesh-s-shetty-2b076b42/"
    },
    {
      id: 3,
      name: "Aditya R Poonja",
      role: "BDE, AIC Nitte Incubation Centre",
      image: mentor1, 
      linkedin: "https://www.linkedin.com/in/aditya-ramanath-poonja/"
    }
  ];

  return (
    <div className="home-container">
      
      {/* --- HERO SECTION --- */}
      <section className="hero">
        <div className="hero-video-layer">
          <video className="hero-video-item" autoPlay muted loop playsInline><source src={clip1} type="video/mp4" /></video>
          <video className="hero-video-item" autoPlay muted loop playsInline><source src={clip2} type="video/mp4" /></video>
          <video className="hero-video-item" autoPlay muted loop playsInline><source src={clip3} type="video/mp4" /></video>
        </div>
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">TECHBOTS<span>.</span></h1>
          
          <h2 className="hero-subtitle">
            <LetterStagger text="Building Complete Real-World Systems" />
          </h2>
          
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            TechBots-SIT is a multidisciplinary engineering community where hardware and software come together. 
            We design electronics, embedded systems, AI, and web interfaces to build end-to-end solutions.
          </motion.p>
          
          <motion.div 
            className="hero-btns"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Link to="/projects"><button className="btn-primary">Explore Projects</button></Link>
            <Link to="/team"><button className="btn-secondary">Meet the Team</button></Link>
          </motion.div>
        </div>
      </section>

      {/* --- ABOUT PREVIEW --- */}
      <section className="about-preview">
        <div className="about-content">
          <div className="about-text">
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">
              <LetterStagger text="Engineering Complete Systems" />
            </h2>
            <p>
              Rather than working in isolated domains, TechBots-SIT approaches engineering at the system level. 
              Projects are treated as end-to-end solutions, where hardware, firmware, software, intelligence, 
              and communication layers are developed together.
            </p>
            
            <ul className="about-bullets">
              <li>
                <span className="bullet-icon">⚙️</span>
                <div>
                  <strong>Hardware & Mechanics</strong>
                  <p>Design and fabrication, from 3D printed chassis to custom PCBs.</p>
                </div>
              </li>
              <li>
                <span className="bullet-icon">🧠</span>
                <div>
                  <strong>Embedded Intelligence</strong>
                  <p>Mastering microcontrollers, sensors, and firmware logic.</p>
                </div>
              </li>
              <li>
                <span className="bullet-icon">💻</span>
                <div>
                  <strong>Full-Stack Software</strong>
                  <p>Building web dashboards, mobile apps, and cloud integration.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="about-visual">
            <ChipScene />
          </div>
        </div>
      </section>

      {/* --- NEW DOMAINS SECTION --- */}
      <section className="domains-preview">
        <div className="section-header">
          <span className="section-label">Our Expertise</span>
          <h2 className="section-title">Multidisciplinary Domains</h2>
          <p style={{color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto'}}>
            We work across the entire technology stack to bring complex ideas to life.
          </p>
        </div>

        <div className="domains-grid">
          {domains.map((domain, index) => (
            <motion.div 
              key={index} 
              className="domain-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="domain-icon-wrapper">{domain.icon}</div>
              <h3>{domain.title}</h3>
              <p>{domain.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- PROJECTS PREVIEW --- */}
      <section className="projects-preview">
        <div className="section-header">
          <span className="section-label">Innovation</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="mobile-hint" style={{color: 'var(--accent-primary)', opacity: 0.7}}>Tap stack to shuffle</p>
        </div>

        <div className="deck-container">
          <div className="card-stack" onClick={handleShuffle}>
            {featuredProjects.map((project, index) => {
              const position = (index - activeIndex + featuredProjects.length) % featuredProjects.length;
              const isTop = position === 0;
              const transformStyle = {
                transform: `translateX(${position * 10 - 10}px) translateY(${position * -10}px) rotate(${position * 2}deg) scale(${1 - position * 0.05})`,
                zIndex: featuredProjects.length - position,
                opacity: 1 - position * 0.2
              };

              return (
                <div 
                  key={project.id} 
                  className={`project-card-deck ${isTop ? 'top-card' : ''}`}
                  style={transformStyle}
                >
                  <div className="project-info">
                    <span className="project-cat">{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tech-tags">
                      {project.tech.map((tag, i) => <span key={i} className="tech-tag">{tag}</span>)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="section-cta" style={{textAlign: 'center', marginTop: '40px'}}>
          <Link to="/projects"><button className="btn-secondary">View All Projects</button></Link>
        </div>
      </section>

      {/* --- MENTORS & CTA --- */}
      <section className="mentors-preview">
        <div className="section-header">
          <span className="section-label">Guidance</span>
          <h2 className="section-title">Our Mentors</h2>
        </div>
        <div className="mentors-grid">
          {mentorHighlights.map((mentor) => (
            <div key={mentor.id} className="mentor-card">
              <div className="mentor-img-container">
                <img src={mentor.image} alt={mentor.name} className="mentor-img" onError={(e) => { e.target.src = 'https://via.placeholder.com/300'; }} />
                <div className="mentor-overlay">
                   <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer" className="view-profile-link">
                     <button className="view-profile-btn">View Profile</button>
                   </a>
                </div>
              </div>
              <div className="mentor-info">
                <h3>{mentor.name}</h3>
                <p>{mentor.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="section-cta" style={{textAlign: 'center'}}>
          <Link to="/team"><button className="btn-secondary">Meet Full Team</button></Link>
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-content">
          <h2>Ready to Build the Future?</h2>
          <p>Join TechBots SIT and turn your innovative ideas into reality.</p>
          <div className="hero-btns">
            <Link to="/contact"><button className="btn-primary">Join TechBots</button></Link>
            <Link to="/contact"><button className="btn-secondary">Contact Us</button></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;