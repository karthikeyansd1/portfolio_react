import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const SECTIONS = [
  { id: 'home',       label: 'Overview',   index: '01' },
  { id: 'about',      label: 'About',      index: '02' },
  { id: 'experience', label: 'Experience', index: '03' },
  { id: 'projects',   label: 'Projects',   index: '04' },
  { id: 'skills',     label: 'Skills',     index: '05' },
  { id: 'contact',    label: 'Contact',    index: '06' },
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
      {/* ── TOP AMBIENT PROGRESS BEAM ── */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-white/[0.03]">
        <motion.div
          style={{ width: progressWidth }}
          className="h-full relative"
        >
          {/* Executive Gradient Line */}
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 50%, #a855f7 100%)',
              boxShadow: '0 0 12px rgba(99, 102, 241, 0.6), 0 0 24px rgba(168, 85, 247, 0.4)',
            }}
          />
          {/* Trailing Micro Glow */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -right-1 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_16px_#818cf8]"
          />
        </motion.div>
      </div>

      {/* ── RIGHT EDGE: EXECUTIVE FLOATING RAIL ── */}
      <div className="hidden lg:flex fixed right-5 xl:right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center select-none pointer-events-auto">
        <div className="relative w-7 h-[300px] flex items-center justify-center">
          {/* Background Guide Track */}
          <div className="absolute top-0 bottom-0 w-[1px] bg-white/[0.08] rounded-full" />

          {/* Active Glowing Track */}
          <motion.div
            style={{
              height: progressWidth,
              background: 'linear-gradient(180deg, #3b82f6, #6366f1, #a855f7)',
              boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
            }}
            className="absolute top-0 w-[1.5px] rounded-full"
          />

          {/* Moving Indicator Node */}
          <motion.div
            style={{
              position: 'absolute',
              top: activeTop,
              left: '50%',
              x: '-50%',
            }}
            className="w-3.5 h-3.5 rounded-full bg-[#07090e] border border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] flex items-center justify-center z-20 pointer-events-none"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          </motion.div>

          {/* Navigation Section Points */}
          <div className="absolute inset-0 flex flex-col justify-between items-center py-2">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <div key={sec.id} className="relative flex items-center group">
                  {/* Tooltip on Hover */}
                  <div className="absolute right-7 px-3 py-1 rounded-lg bg-[#0d111a]/95 border border-white/10 backdrop-blur-md shadow-xl text-[10px] mono font-medium tracking-wider text-slate-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none -translate-x-1 group-hover:translate-x-0 flex items-center gap-2">
                    <span className="text-indigo-400">{sec.index}</span>
                    <span>{sec.label}</span>
                  </div>

                  {/* Node Button */}
                  <button
                    onClick={() => scrollToSection(sec.id)}
                    data-cursor="button"
                    data-cursor-text={sec.label.toUpperCase()}
                    title={sec.label}
                    className={`relative w-4 h-4 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isActive ? 'scale-125' : 'scale-90 hover:scale-110 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        isActive
                          ? 'bg-indigo-400 shadow-[0_0_10px_#818cf8]'
                          : 'bg-slate-600 group-hover:bg-slate-300'
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
