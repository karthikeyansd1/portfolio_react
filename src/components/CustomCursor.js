import React, { useEffect, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for cursor position
  const mouseX = useSpring(0, { damping: 25, stiffness: 400 });
  const mouseY = useSpring(0, { damping: 25, stiffness: 400 });

  const trailingX = useSpring(0, { damping: 30, stiffness: 220 });
  const trailingY = useSpring(0, { damping: 30, stiffness: 220 });

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        typeof window === 'undefined' ||
        window.innerWidth < 768 ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      trailingX.set(e.clientX);
      trailingY.set(e.clientY);

      // Check cursor data targets
      const target = e.target.closest('[data-cursor], a, button, input, textarea');
      if (target) {
        setIsHovered(true);
        const text = target.getAttribute('data-cursor-text') || '';
        setCursorText(text);
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isMobile, isVisible, mouseX, mouseY, trailingX, trailingY]);

  if (isMobile || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* ── Outer Trailing Aura Ring ── */}
      <motion.div
        style={{
          x: trailingX,
          y: trailingY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovered ? (cursorText ? 1.6 : 1.35) : 1,
          borderColor: isHovered ? 'rgba(99, 102, 241, 0.8)' : 'rgba(255, 255, 255, 0.25)',
          backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255, 255, 255, 0.02)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="w-10 h-10 rounded-full border border-white/30 backdrop-blur-[1px] flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.15)]"
      >
        {/* Context Text Tooltip */}
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              className="mono text-[8px] font-bold text-white tracking-wider uppercase select-none px-1"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Precision Center Dot ── */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
      />
    </div>
  );
};

export default CustomCursor;
