import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaFileDownload, FaArrowRight } from 'react-icons/fa';

const navItems = [
  { label: 'Overview', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Overview');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-3 sm:pt-4">
        <motion.div
          animate={
            scrolled
              ? {
                  background: 'rgba(7, 9, 14, 0.82)',
                  backdropFilter: 'blur(20px)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
                }
              : {
                  background: 'rgba(13, 17, 26, 0.5)',
                  backdropFilter: 'blur(12px)',
                  borderColor: 'rgba(255, 255, 255, 0.06)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                }
          }
          className="flex justify-between items-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl border transition-all duration-300"
        >
          {/* Brand Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            data-cursor="button"
            data-cursor-text="HOME"
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)' }}
            >
              KS
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-100 tracking-tight group-hover:text-white transition-colors">
                Karthikeyan <span className="text-indigo-400 font-mono text-xs">.dev</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
                Full Stack Developer
              </span>
            </div>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.05]">
            {navItems.map((item) => {
              const isCurrent = activeItem === item.label;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveItem(item.label)}
                  whileHover={{ color: '#ffffff' }}
                  data-cursor="hover"
                  data-cursor-text={item.label.toUpperCase()}
                  className={`relative px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 rounded-lg cursor-pointer ${
                    isCurrent ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isCurrent && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white/[0.08] rounded-lg border border-white/[0.08]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </motion.a>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Resume Button */}
            <motion.a
              href="/resume.pdf"
              download="Karthikeyan_S_Resume.pdf"
              whileHover={{ scale: 1.04, borderColor: 'rgba(99, 102, 241, 0.4)' }}
              whileTap={{ scale: 0.96 }}
              data-cursor="button"
              data-cursor-text="RESUME"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] border border-white/[0.08] transition-all cursor-pointer"
            >
              <FaFileDownload size={11} className="text-indigo-400" />
              <span>Resume</span>
            </motion.a>

            {/* Contact / Hire CTA */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, boxShadow: '0 0 25px rgba(99, 102, 241, 0.45)' }}
              whileTap={{ scale: 0.96 }}
              data-cursor="button"
              data-cursor-text="TALK"
              className="inline-flex items-center gap-1.5 px-4 sm:px-4.5 py-2 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer transition-all"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' }}
            >
              <span>Get in Touch</span>
              <FaArrowRight size={10} className="hidden sm:inline-block" />
            </motion.a>

            {/* Mobile Hamburger Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen(!isOpen)}
              data-cursor="button"
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-slate-300 hover:text-white transition-colors bg-white/[0.05] border border-white/[0.08]"
              aria-label="Toggle Navigation Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <HiX size={18} className="text-indigo-400" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="m"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <HiMenu size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 rounded-2xl p-3 space-y-1 bg-[#090d15]/95 border border-white/10 backdrop-blur-2xl shadow-2xl"
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 border-t border-white/[0.08] flex gap-2">
                <a
                  href="/resume.pdf"
                  download="Karthikeyan_S_Resume.pdf"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.06] border border-white/10"
                >
                  Resume
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600"
                >
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;