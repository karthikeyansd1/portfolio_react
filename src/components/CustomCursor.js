import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════
   DETAILED SPIDER WEB SVG COMPONENT
   — Real geometric spider web with 8 radial silk spokes & concentric arcs
═══════════════════════════════════════════════════════════ */
const SpiderWebIcon = ({ size = 48, isHovered = false, isClicking = false, color = '#ef4444' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="overflow-visible pointer-events-none"
      style={{
        filter: isHovered
          ? `drop-shadow(0 0 12px ${color}) drop-shadow(0 0 24px #38bdf8)`
          : `drop-shadow(0 0 8px ${color})`,
        transition: 'filter 0.3s ease',
      }}
    >
      {/* 8 Radial Web Spokes */}
      <line x1="50" y1="50" x2="50" y2="2" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
      <line x1="50" y1="50" x2="50" y2="98" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
      <line x1="50" y1="50" x2="2" y2="50" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
      <line x1="50" y1="50" x2="98" y2="50" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
      <line x1="50" y1="50" x2="16" y2="16" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
      <line x1="50" y1="50" x2="84" y2="16" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
      <line x1="50" y1="50" x2="16" y2="84" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
      <line x1="50" y1="50" x2="84" y2="84" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />

      {/* Outer Web Ring (Polygon curves) */}
      <path
        d="M 50 12 Q 76 24 88 50 Q 76 76 50 88 Q 24 76 12 50 Q 24 24 50 12 Z"
        fill="none"
        stroke={isHovered ? '#38bdf8' : color}
        strokeWidth="1.4"
        strokeDasharray="2 1"
        opacity="0.8"
      />

      {/* Middle Web Ring */}
      <path
        d="M 50 25 Q 68 32 75 50 Q 68 68 50 75 Q 32 68 25 50 Q 32 32 50 25 Z"
        fill={isHovered ? 'rgba(239,68,68,0.18)' : 'rgba(239,68,68,0.06)'}
        stroke={color}
        strokeWidth="1.3"
        opacity="0.9"
      />

      {/* Inner Web Ring */}
      <path
        d="M 50 38 Q 58 42 62 50 Q 58 58 50 62 Q 42 58 38 50 Q 42 42 50 38 Z"
        fill="rgba(56,189,248,0.15)"
        stroke="#38bdf8"
        strokeWidth="1.2"
        opacity="0.95"
      />

      {/* Center Web Hub Dot */}
      <circle cx="50" cy="50" r="3.5" fill="#ffffff" stroke={color} strokeWidth="1.5" />

      {/* Glowing Spider Silhouette in Center */}
      <path
        d="M 50 46 C 48 46 47 48 47 50 C 47 52 48 54 50 54 C 52 54 53 52 53 50 C 53 48 52 46 50 46 Z"
        fill="#ffffff"
      />
      {/* Spider Legs */}
      <path
        d="M 47 48 Q 43 45 42 43 M 47 50 Q 42 50 40 51 M 47 52 Q 43 55 42 57
           M 53 48 Q 57 45 58 43 M 53 50 Q 58 50 60 51 M 53 52 Q 57 55 58 57"
        stroke="#ffffff"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
};

const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isClicking, setIsClicking] = useState(false);
  const [webBursts, setWebBursts] = useState([]);
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);

  // Check mobile
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

  // Springs for smooth movement
  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const webSpin = useSpring(0, { damping: 20, stiffness: 180 });

  // Web Trail Canvas Animation
  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = performance.now();
      // Keep recent trail points
      pointsRef.current = pointsRef.current.filter((p) => now - p.time < 650);

      const pts = pointsRef.current;
      if (pts.length > 2) {
        // Draw Main Spider Silk Line
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);

        for (let i = 1; i < pts.length; i++) {
          const xc = (pts[i].x + pts[i - 1].x) / 2;
          const yc = (pts[i].y + pts[i - 1].y) / 2;
          ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, xc, yc);
        }

        ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 10;
        ctx.stroke();

        // Inner glowing white core
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          const xc = (pts[i].x + pts[i - 1].x) / 2;
          const yc = (pts[i].y + pts[i - 1].y) / 2;
          ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, xc, yc);
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 0.9;
        ctx.shadowBlur = 0;
        ctx.stroke();

        // Spider Web Strands bridging between trail points
        for (let i = 2; i < pts.length; i += 2) {
          const p1 = pts[i];
          const p2 = pts[i - 2];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 140 && dist > 15) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / 140) * 0.5})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    let lastX = 0;
    let angle = 0;

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      cursorX.set(x);
      cursorY.set(y);

      // Rotate web slightly as mouse moves
      const deltaX = x - lastX;
      angle += deltaX * 0.4;
      webSpin.set(angle);
      lastX = x;

      // Record web point
      pointsRef.current.push({ x, y, time: performance.now() });
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      // Spawn "THWIP! 🕸️" Spider-Man Web Blast
      setWebBursts((prev) => [
        ...prev.slice(-4),
        {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
        },
      ]);
    };

    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      const interactiveEl = target.closest('a, button, [data-cursor], .cursor-pointer, input, textarea');

      if (interactiveEl) {
        const customText = interactiveEl.getAttribute('data-cursor-text');
        const customType = interactiveEl.getAttribute('data-cursor') || 'hover';

        if (customText) {
          setCursorText(`🕸️ ${customText}`);
          setCursorVariant('text');
        } else if (interactiveEl.tagName === 'A' || interactiveEl.tagName === 'BUTTON') {
          setCursorVariant('button');
          setCursorText('THWIP!');
        } else if (customType === '3d') {
          setCursorVariant('3d');
          setCursorText('SPIDER-3D');
        } else {
          setCursorVariant('hover');
          setCursorText('⚡ SENSE');
        }
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile, cursorX, cursorY, webSpin]);

  // Clean bursts
  useEffect(() => {
    if (webBursts.length === 0) return;
    const t = setTimeout(() => setWebBursts((b) => b.slice(1)), 800);
    return () => clearTimeout(t);
  }, [webBursts]);

  if (isMobile) return null;

  const isHovered = cursorVariant !== 'default';

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Real-time Spider Web Silk Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Spider-Man Click Web Bursts (THWIP!) */}
      <AnimatePresence>
        {webBursts.map((burst) => (
          <React.Fragment key={burst.id}>
            {/* Radial Expanding Spider Web Blast */}
            <motion.div
              initial={{ scale: 0.2, opacity: 1, rotate: 0 }}
              animate={{ scale: 2.8, opacity: 0, rotate: 45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: burst.x,
                top: burst.y,
                x: '-50%',
                y: '-50%',
                width: 140,
                height: 140,
                backgroundImage: `
                  radial-gradient(circle, transparent 20%, rgba(239,68,68,0.5) 22%, transparent 24%, rgba(56,189,248,0.5) 45%, transparent 47%, rgba(255,255,255,0.7) 70%, transparent 72%)
                `,
                borderRadius: '50%',
                border: '1.5px dashed rgba(239,68,68,0.85)',
              }}
            />

            {/* Comic "THWIP! 🕸️" Popup */}
            <motion.div
              initial={{ scale: 0.4, y: 0, opacity: 1 }}
              animate={{ scale: 1.15, y: -50, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: burst.x + 20,
                top: burst.y - 20,
                transform: 'translate(-50%, -50%)',
              }}
              className="mono text-sm font-black tracking-widest text-red-400 drop-shadow-[0_0_15px_#ef4444] uppercase"
            >
              THWIP! 🕸️
            </motion.div>
          </React.Fragment>
        ))}
      </AnimatePresence>

      {/* ── THE SPIDER WEB CURSOR ── */}
      <motion.div
        style={{
          position: 'absolute',
          left: cursorX,
          top: cursorY,
          x: '-50%',
          y: '-50%',
          rotate: webSpin,
        }}
        animate={{
          scale: isClicking ? 0.85 : isHovered ? 1.35 : 1,
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
        className="flex items-center justify-center relative pointer-events-none"
      >
        {/* The Detailed Spider Web SVG */}
        <SpiderWebIcon
          size={isHovered ? 56 : 42}
          isHovered={isHovered}
          isClicking={isClicking}
          color={isHovered ? '#ef4444' : '#f87171'}
        />

        {/* Hover Text Badge ("⚡ SENSE" / "THWIP!") */}
        {cursorText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md bg-black/80 border border-red-500/50 backdrop-blur-md shadow-lg shadow-red-500/30"
          >
            <span className="mono text-[9px] font-black tracking-wider text-red-200 uppercase">
              {cursorText}
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CustomCursor;
