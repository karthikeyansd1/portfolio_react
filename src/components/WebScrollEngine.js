import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const SECTIONS = [
  { id: 'home',       label: 'HOME',       icon: '⚡' },
  { id: 'about',      label: 'ABOUT',      icon: '👤' },
  { id: 'experience', label: 'EXPERIENCE', icon: '💻' },
  { id: 'projects',   label: 'PROJECTS',   icon: '🚀' },
  { id: 'skills',     label: 'SKILLS',     icon: '🔧' },
  { id: 'contact',    label: 'CONTACT',    icon: '📬' },
];

const WebScrollEngine = () => {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scroll progress spring
  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 220, mass: 0.5 });
  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const activeTop = useTransform(smoothProgress, [0, 1], ['0%', '88%']);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollPos = currentY + window.innerHeight * 0.35;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          if (activeSection !== SECTIONS[i].id) {
            setActiveSection(SECTIONS[i].id);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ── SLEEK TOP NEON SCROLL PROGRESS BAR ── */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-black/40">
        <motion.div
          style={{ width: progressWidth }}
          className="h-full relative"
        >
          {/* Glowing Cyber Gradient Line */}
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(90deg, #ef4444, #dc2626, #38bdf8, #ffffff)',
              boxShadow: '0 0 12px #ef4444, 0 0 24px #38bdf8',
            }}
          />
          {/* Trailing Laser Spark */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -right-1 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#fff,0_0_20px_#ef4444]"
          />
        </motion.div>
      </div>

      {/* ── RIGHT EDGE: MINIMALIST NEON SCROLL RAIL ── */}
      <div className="hidden md:flex fixed right-3 lg:right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center select-none pointer-events-auto">
        <div className="relative w-8 h-[320px] flex items-center justify-center">
          {/* Base Guide Track */}
          <div className="absolute top-0 bottom-0 w-[1.5px] bg-white/10 rounded-full" />

          {/* Active Glowing Neon Track */}
          <motion.div
            style={{
              height: progressWidth,
              background: 'linear-gradient(180deg, #ef4444, #38bdf8)',
              boxShadow: '0 0 10px rgba(239,68,68,0.8), 0 0 20px rgba(56,189,248,0.5)',
            }}
            className="absolute top-0 w-[2px] rounded-full"
          />

          {/* Moving Indicator Node */}
          <motion.div
            style={{
              position: 'absolute',
              top: activeTop,
              left: '50%',
              x: '-50%',
            }}
            className="w-4 h-4 rounded-full bg-black/90 border border-red-500 shadow-[0_0_12px_#ef4444] flex items-center justify-center z-20 pointer-events-none"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
          </motion.div>

          {/* Section Navigation Nodes */}
          <div className="absolute inset-0 flex flex-col justify-between items-center py-2">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <div key={sec.id} className="relative flex items-center group">
                  {/* Tooltip on Hover */}
                  <div className="absolute right-8 px-2.5 py-1 rounded-lg bg-black/95 border border-red-500/50 backdrop-blur-md shadow-xl text-[10px] mono font-bold tracking-wider text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none -translate-x-2 group-hover:translate-x-0">
                    <span className="text-red-400 mr-1.5">{sec.icon}</span>
                    {sec.label}
                  </div>

                  {/* Node Button */}
                  <button
                    onClick={() => scrollToSection(sec.id)}
                    data-cursor="button"
                    title={sec.label}
                    className={`relative w-4 h-4 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isActive ? 'scale-125' : 'scale-90 hover:scale-110 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full transition-all ${
                        isActive
                          ? 'bg-red-500 shadow-[0_0_12px_#ef4444,0_0_24px_#38bdf8]'
                          : 'bg-slate-600 group-hover:bg-red-400'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default WebScrollEngine;
