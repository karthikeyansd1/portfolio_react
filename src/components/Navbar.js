import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const navItems = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'];

const Navbar = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      {/* Pill navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-4 sm:pt-5">
        <motion.div
          className="flex justify-between items-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl transition-all duration-500"
          animate={
            scrolled
              ? {
                  background: 'rgba(5,5,15,0.92)',
                  backdropFilter: 'blur(24px)',
                  borderColor: 'rgba(239,68,68,0.3)',
                  boxShadow: '0 4px 40px rgba(0,0,0,0.7), 0 0 20px rgba(239,68,68,0.12)',
                }
              : {
                  background: 'rgba(5,5,15,0.4)',
                  backdropFilter: 'blur(12px)',
                  borderColor: 'rgba(239,68,68,0.15)',
                  boxShadow: 'none',
                }
          }
          style={{ border: '1px solid transparent' }}
        >
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="button"
            className="flex items-center gap-2.5 cursor-pointer"
          >
            {/* Spider Logo mark */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white shadow-lg shadow-red-500/25"
              style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)' }}
            >
              🕷️
            </div>
            <span className="text-sm font-bold text-slate-200 tracking-wide mono">
              karthikeyan<span className="text-red-400">.spidey</span>
            </span>
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
                whileHover={{ color: '#fff', scale: 1.05 }}
                data-cursor="hover"
                data-cursor-text={item.toUpperCase()}
                className="relative px-4 py-2 text-sm text-slate-300 hover:text-red-300 font-medium transition-colors duration-200 rounded-xl group cursor-pointer"
              >
                {item}
                {/* Spider-Man underline */}
                <motion.span
                  className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-px rounded-full"
                  style={{ background: 'linear-gradient(90deg,#ef4444,#38bdf8)' }}
                  initial={{ width: 0 }}
                  whileHover={{ width: '60%' }}
                  transition={{ duration: 0.25 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Hire Spidey + hamburger */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.06, boxShadow: '0 0 35px rgba(239,68,68,0.7), 0 0 15px rgba(14,165,233,0.4)' }}
              whileTap={{ scale: 0.95 }}
              data-cursor="button"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-md cursor-pointer"
              style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)' }}
            >
              Hire Spidey 🕸️
            </motion.a>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              data-cursor="button"
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-slate-300 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span key="x"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <HiX size={18} className="text-red-400" />
                  </motion.span>
                ) : (
                  <motion.span key="m"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <HiMenu size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 mx-1 rounded-2xl p-3 space-y-1"
              style={{
                background: 'rgba(5,5,15,0.96)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(239,68,68,0.25)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.7)',
              }}
            >
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  data-cursor="hover"
                  className="block px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  <span className="text-red-400 mr-2">🕸️</span>
                  {item}
                </a>
              ))}
              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  data-cursor="button"
                  className="block text-center w-full py-2.5 rounded-xl text-sm font-bold text-white shadow-md"
                  style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)' }}
                >
                  Hire Spidey 🕸️
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