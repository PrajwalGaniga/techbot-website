import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Team.css';

// Mentor Imports
import mentor1 from '../assets/mentor1.jpeg';
import mentor2 from '../assets/mentor2.jpeg';
import mentor3 from '../assets/mentor3.jpeg';

// Student Imports
import safwanImg from '../assets/students/safwan.png';
import shreeyaImg from '../assets/students/shreeya.png';
import poojaImg from '../assets/students/pooja.png';
import muktaImg from '../assets/students/mukta.png';
import abhishekImg from '../assets/students/abhishek.png';
import gangothriImg from '../assets/students/gangothri.png';
import mohithImg from '../assets/students/mohith.png';
import bhavanaImg from '../assets/students/bhavana.png';
import ashwinImg from '../assets/students/ashwin.png';
import likhithaImg from '../assets/students/likhitha.png';

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

const Team = () => {
  const mentors = [
    { name: "Dr. Soorya Krishna K", role: "Faculty Mentor", title: "HOD, Dept. of ECE, SIT", info: "Ph.D. with 18 years of teaching experience; specialist in VLSI and IoT.", image: mentor3 },
    { name: "Shailesh S Shetty", role: "Faculty Mentor", title: "HOD, Dept. of CS & Design, SIT", info: "M.Tech in Computer Engineering; expert in ML, AI, and Blockchain.", image: mentor2 },
    { name: "Aditya R Poonja", role: "Industry Mentor", title: "SWE, K-Tech Mangalore", info: "5+ years of Deep-Tech experience; focused on Startup Growth and AI/ML.", image: mentor1 }
  ];

  const executive = [
    { name: "Mahammad Safwan T", role: "President", focus: "Strategic Planning", image: safwanImg },
    { name: "Shreeya S Shetty", role: "Joint Secretary", focus: "Administrative Coordination", image: shreeyaImg },
    { name: "Pooja", role: "Joint Secretary", focus: "Club Operations", image: poojaImg }
  ];

  const techLeads = [
    { name: "Muktha", role: "Software Lead", dept: "AI & Embedded Systems", image: muktaImg },
    { name: "Abhishek", role: "Electronics Lead", dept: "Hardware Design", image: abhishekImg },
    { name: "Gangothri", role: "Software Co-Lead", dept: "Implementation", image: gangothriImg },
    { name: "Mohith K U", role: "Documentation Lead", dept: "Technical Records", image: mohithImg },
    { name: "Bhavana", role: "Documentation Co-Lead", dept: "Content Design", image: bhavanaImg },
    { name: "Ashwin Bhat", role: "Workshop Coordinator", dept: "Hands-on Sessions", image: ashwinImg },
    { name: "Likhitha S", role: "Event Coordinator", dept: "Logistics", image: likhithaImg }
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 50, damping: 20 } 
    }
  };

  return (
    <div className="team-container">
      {/* HERO */}
      <section className="team-hero">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.h3 
            className="gold-label"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            The Architects
          </motion.h3>
          
          <h1>
            <LetterStagger text="Meet the Core Team" />
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            The collective intelligence driving innovation at Srinivas Institute of Technology.
          </motion.p>
        </div>
      </section>

      {/* MENTOR CARDS */}
      <section className="team-tier">
        <h2 className="tier-title">Visionary Mentors</h2>
        <motion.div 
          className="mentor-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {mentors.map((m, i) => (
            <motion.div key={i} className="mentor-card" variants={cardVariants}>
              <img src={m.image} alt={m.name} className="profile-photo" />
              <div className="m-text">
                <span className="m-tag">{m.role}</span>
                <h4>{m.name}</h4>
                <h5>{m.title}</h5>
                <p>{m.info}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* STUDENT CORE TEAM */}
      <section className="team-tier alt-dark">
        {/* Inner wrapper for centering content on wide screens */}
        <div className="tier-inner-wrap">
          <h2 className="tier-title">Executive Leadership</h2>
          <motion.div 
            className="student-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {executive.map((s, i) => (
              <motion.div key={i} className="student-card tier-2" variants={cardVariants}>
                <img src={s.image} alt={s.name} className="profile-photo-sq" />
                <h4>{s.name}</h4>
                <span className="s-role">{s.role}</span>
                <p className="s-focus">{s.focus}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TECHNICAL LEADS */}
      <section className="team-tier">
        <h2 className="tier-title">Technical & Coordination Leads</h2>
        <motion.div 
          className="leads-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {techLeads.map((l, i) => (
            <motion.div key={i} className="student-card tier-3" variants={cardVariants}>
              <img src={l.image} alt={l.name} className="profile-photo-sm" />
              <h4>{l.name}</h4>
              <span className="s-role">{l.role}</span>
              <span className="s-dept">{l.dept}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Team;