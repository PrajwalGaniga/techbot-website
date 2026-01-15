import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Achievements.css';

// Ensure these paths are correct based on your folder structure
import srinathonImg from '../assets/srinathon.png'; 
import iitImg from '../assets/iit_madras.png';
import infosysImg from '../assets/infosys.png';
import sihImg from '../assets/achievemnets/sihImg.jpeg';
import aigniteImg from '../assets/achievemnets/aignite.jpeg';

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

const Achievements = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  
  const data = [
    {
      title: "First Prize – SRINATHON 2.0",
      tag: "International Hackathon",
      event: "Organized by SSOSC and Nexus",
      desc: "Secured First Place in a 24-hour international-level hackathon, showcasing innovation, endurance, and technical excellence in a competitive environment.",
      img: srinathonImg
    },
    {
      title: "Top 40 Teams – Ideas to Impact 2.0",
      tag: "National Recognition",
      event: "IIT Madras",
      desc: "Selected among the Top 40 teams nationwide for an AI-powered smart waste management solution using CNNs, gaining exposure to interdisciplinary collaboration.",
      img: iitImg
    },
    {
      title: "Project Representation",
      tag: "Industry Showcase",
      event: "Infosys DK Campus",
      desc: "Proudly represented the LUNA semi-humanoid robot at the Infosys DK Campus, demonstrating advanced robotics integration to industry leaders.",
      img: infosysImg
    },
    {
      title: "Shortlisted for SIH 2025 Grand Finale",
      tag: "Smart India Hackathon",
      event: "Ministry of Fisheries, Animal Husbandry & Dairying",
      desc: "Team System Crash from Srinivas Institute of Technology was shortlisted for the SIH 2025 Grand Finale. The team demonstrated innovation in agri-tech and biosecurity solutions at a national level.",
      img: sihImg
    },
    {
      title: "Participation – AIGNITE 2.0",
      tag: "National Level Project Expo",
      event: "AIGNITE 2.0",
      desc: "Members of TechBots_SIT actively participated in the AIGNITE 2.0 National Level Project Expo, presenting innovative technical solutions and gaining exposure to competitive project evaluation.",
      img: aigniteImg
    },
  ];

  const idx = Math.abs(page % data.length);

  const paginate = useCallback((newDirection) => {
    setPage([page + newDirection, newDirection]);
  }, [page]); 

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000); 
    return () => clearInterval(timer);
  }, [paginate]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300, 
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)", 
      zIndex: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        filter: { duration: 0.4 }
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)",
      transition: {
        x: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        filter: { duration: 0.4 }
      }
    })
  };

  return (
    <div className="achieve-page">
      <section className="achieve-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="gold-label">Our Diary</h3>
          <h1>
            <LetterStagger text="The Golden Record" />
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            A history of innovation, victories, and industry recognition.
          </motion.p>
        </motion.div>
      </section>

      <section className="carousel-section">
        <div className="carousel-container">
          
          {/* Viewport for Card */}
          <div className="slide-viewport">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="achievement-card-clear"
                
                // CLICK INTERACTION
                onClick={() => paginate(1)}
                whileTap={{ scale: 0.98 }}
              >
                {/* CLEAR IMAGE SECTION */}
                <div className="clear-img-box">
                  <img src={data[idx].img} alt={data[idx].title} />
                  <div className="img-tag-badge">{data[idx].tag}</div>
                </div>

                {/* DETAILS SECTION BELOW */}
                <div className="content-box-below">
                  <h2>{data[idx].title}</h2>
                  <h4 className="event-sub">{data[idx].event}</h4>
                  <p>{data[idx].desc}</p>
                  
                  {/* Subtle Hint */}
                  <span className="tap-hint">Tap for next</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Achievements;