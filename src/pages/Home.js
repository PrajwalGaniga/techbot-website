import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Home.css';
import ChipScene from '../components/ChipScene';

// Images
import mentor1 from '../assets/mentor1.jpeg';
import mentor2 from '../assets/mentor2.jpeg';
import mentor3 from '../assets/mentor3.jpeg';

// Video Clips (using exact path provided)
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

  const featuredProjects = [
    {
      id: 1,
      title: "LUNA V2",
      category: "Robotics & AI",
      description: "A semi-humanoid robot with voice interaction and image recognition.",
      tech: ["Raspberry Pi", "OpenAI SDK"]
    },
    {
      id: 2,
      title: "Phylax",
      category: "Embedded Systems",
      description: "Next-gen smart locking system with biometric security.",
      tech: ["ESP32", "OLED"]
    },
    {
      id: 3,
      title: "Multi-Hazard Detector",
      category: "IoT",
      description: "Real-time disaster monitoring system using Firebase and GPS.",
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
      role: "HOD, Dept. of CS & Design, SIT",
      image: mentor2, 
      linkedin: "https://www.linkedin.com/in/shailesh-s-shetty-2b076b42/"
    },
    {
      id: 3,
      name: "Aditya R Poonja",
      role: "SWE at K-Tech Mangalore",
      image: mentor1, 
      linkedin: "https://www.linkedin.com/in/aditya-ramanath-poonja/"
    }
  ];

  return (
    <div className="home-container">
      
      {/* --- HERO SECTION --- */}
      <section className="hero">
        
        {/* VIDEO LAYER - Z-Index 0 */}
        <div className="hero-video-layer">
          <video className="hero-video-item" autoPlay muted loop playsInline>
            <source src={clip1} type="video/mp4" />
          </video>
          <video className="hero-video-item" autoPlay muted loop playsInline>
            <source src={clip2} type="video/mp4" />
          </video>
          <video className="hero-video-item" autoPlay muted loop playsInline>
            <source src={clip3} type="video/mp4" />
          </video>
        </div>
        
        {/* GRADIENT OVERLAY - Z-Index 1 */}
        <div className="hero-overlay"></div>

        {/* CONTENT - Z-Index 10 */}
        <div className="hero-content">
          <h1 className="hero-title">
            TECHBOTS<span>.</span>
          </h1>
          
          <h2 className="hero-subtitle">
            <LetterStagger text="Engineering Tomorrow’s Intelligence" />
          </h2>
          
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            The premier robotics club of Srinivas Institute of Technology, Mangalore, 
            dedicated to hardware innovation and AI integration.
          </motion.p>
          
          <motion.div 
  className="hero-btns"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.2, duration: 0.8 }}
>
  <Link to="/projects">
    <button className="btn-primary">Explore Projects</button>
  </Link>
  
  <Link to="/team">
    <button className="btn-secondary">Meet the Team</button>
  </Link>
</motion.div>
        </div>
      </section>
      {/* --- ABOUT SECTION --- */}
      <section className="about-preview">
        <div className="about-content">
          <div className="about-text">
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">
              <LetterStagger text="Driving Innovation at SIT" />
            </h2>
            <p>
              TechBots is the premier student-led robotics club at Srinivas Institute of Technology, Valachil. 
              We bridge the gap between theoretical engineering and real-world application through hands-on 
              robotics and AI integration.
            </p>
            
            <ul className="about-bullets">
              <li>
                <span className="bullet-icon">⚙️</span>
                <div>
                  <strong>Hardware Innovation</strong>
                  <p>Developing everything from specialized Line-Followers to advanced semi-humanoid robots like LUNA.</p>
                </div>
              </li>
              <li>
                <span className="bullet-icon">🧠</span>
                <div>
                  <strong>Practical Learning</strong>
                  <p>Gaining mastery in ESP32, IoT-based disaster detection, and automated security systems like Phylax.</p>
                </div>
              </li>
              <li>
                <span className="bullet-icon">🏆</span>
                <div>
                  <strong>Research & Competitions</strong>
                  <p>Winning 1st prize at Srinathon 2.0 and ranking in the Top 40 at IIT Madras.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="about-visual">
            <ChipScene />
          </div>
        </div>
      </section>

      {/* --- PROJECTS PREVIEW (STACK SHUFFLE) --- */}
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
              
              // Calculate transforms dynamically for stack effect
              const transformStyle = {
                transform: `
                  translateX(${position * 10 - 10}px) 
                  translateY(${position * -10}px) 
                  rotate(${position * 2}deg)
                  scale(${1 - position * 0.05})
                `,
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
                      {project.tech.map((tag, i) => (
                        <span key={i} className="tech-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="section-cta" style={{textAlign: 'center', marginTop: '40px'}}>
          <Link to="/projects">
            <button className="btn-secondary">View All Projects</button>
          </Link>
        </div>
      </section>

      {/* --- MENTORS SECTION --- */}
      <section className="mentors-preview">
        <div className="section-header">
          <span className="section-label">Guidance</span>
          <h2 className="section-title">Our Mentors</h2>
        </div>

        <div className="mentors-grid">
          {mentorHighlights.map((mentor) => (
            <div key={mentor.id} className="mentor-card">
              <div className="mentor-img-container">
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="mentor-img" 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300'; }}
                />
                <div className="mentor-overlay">
                   <a 
                     href={mentor.linkedin} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="view-profile-link"
                   >
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
          <Link to="/team">
            <button className="btn-secondary">Meet Full Team</button>
          </Link>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="final-cta">
        <div className="cta-content">
          <h2>Ready to Build the Future?</h2>
          <p>Join TechBots SIT and turn your innovative ideas into reality.</p>
          <div className="hero-btns">
            <button className="btn-primary">Join TechBots</button>
            <Link to="/contact">
              <button className="btn-secondary">Contact Us</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;