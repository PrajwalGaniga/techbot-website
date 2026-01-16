import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Workshops.css';

// Image Imports
import outreachImg from '../assets/workshops/outreach.png';
import esp32Img from '../assets/workshops/esp32_workshop.png';
import orientationImg from '../assets/workshops/orientation.png';
import openDayImg from '../assets/workshops/openDayImg.jpeg';

// --- Helper Component for Alphabet Animation ---
// This handles the visual effect without altering the logic structure
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
      style={{ display: "inline-block" }} // Ensures word wrap works roughly well or keeps blocks together
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

const Workshops = () => {
  const workshopData = [
    {
      id: 1,
      title: "TechBots Open Day",
      location: "Srinivas Institute of Technology",
      desc: "Showcased hands-on innovation through live project demonstrations. Visitors interacted with robotics, embedded systems, IoT, and software solutions. The event highlighted practical learning, collaboration, and real technical capability.",
      impact: "Innovation Showcase",
      image: openDayImg
    },
    {
      id: 2,
      title: "AI & Robotics Outreach",
      location: "GHS School, Nada, Belthangady",
      desc: "Introduced AI tools and robotics to students of classes 8–10. Activities featured line-following robots and Bluetooth-based LED control.",
      impact: "STEM Mentorship",
      image: outreachImg
    },
    {
      id: 3,
      title: "ESP32 & ESP-IDF Hands-On",
      location: "AIC NITTE Incubation Centre",
      desc: "Intensive training on ESP32 development using ESP-IDF, strengthening skills in embedded programming and IoT.",
      impact: "Industry Skill-up",
      image: esp32Img
    },
    {
      id: 4,
      title: "First-Year Orientation",
      location: "ECE Department, SIT",
      desc: "A workshop introducing first-year students to the club with live demos of object-following and humanoid robots.",
      impact: "Community Growth",
      image: orientationImg
    }
  ];




  // Animation variants for the Grid
  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="workshops-page">
      <section className="workshops-hero">
        <div className="hero-content">
          <motion.h3 
            className="section-label"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Knowledge Transfer
          </motion.h3>
          
          {/* Alphabet Animation Implementation */}
          <h1>
            <LetterStagger text="Workshops & Outreach" />
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Empowering the next generation of engineers through hands-on technical sessions and community mentorship.
          </motion.p>
        </div>
      </section>

      <section className="workshops-grid-container">
        <motion.div 
          className="workshops-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {workshopData.map((item) => (
            <motion.div 
              key={item.id}
              className="workshop-card"
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
              }}
            >
              <div className="w-img-box">
                <img src={item.image} alt={item.title} className="w-photo" />
                <div className="w-badge">{item.impact}</div>
              </div>
              <div className="w-details">
                <span className="w-loc">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {item.location}
                </span>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Workshops;