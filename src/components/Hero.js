import React, {
  useEffect, useState, useRef, useCallback, useMemo,
} from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaReact, FaGithub, FaLinkedin, FaPython, FaArrowRight } from 'react-icons/fa';
import {
  SiTypescript, SiTailwindcss, SiDjango, SiPostgresql, SiVuedotjs, SiDocker
} from 'react-icons/si';

/* ═══════════════════════════════════════════════════════════
   EXECUTIVE CONSTELLATION & MESH PARTICLE CANVAS
   — Interactive geometric physics with soft luminescence
═══════════════════════════════════════════════════════════ */
const ExecutiveMeshCanvas = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -2000, y: -2000, radius: 180, isHovering: false });
  const ripplesRef = useRef([]);

  useEffect(() => {
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

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isHovering = true;
      mouseRef.current.radius = window.innerWidth < 768 ? 120 : 190;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -2000;
      mouseRef.current.y = -2000;
      mouseRef.current.isHovering = false;
    };

    const handleClick = (e) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: window.innerWidth < 768 ? 180 : 280,
        opacity: 0.8,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    // Particle pool
    const particleCount = window.innerWidth < 768 ? 40 : 75;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1,
        baseAlpha: Math.random() * 0.5 + 0.25,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render & update click ripples
      for (let r = ripplesRef.current.length - 1; r >= 0; r--) {
        const ripple = ripplesRef.current[r];
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99, 102, 241, ${ripple.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ripple.radius += 5;
        ripple.opacity *= 0.94;
        if (ripple.opacity < 0.02 || ripple.radius > ripple.maxRadius) {
          ripplesRef.current.splice(r, 1);
        }
      }

      // Update & render particles
      const mouse = mouseRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Motion
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.8;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 180, 252, ${p.baseAlpha})`;
        ctx.fill();

        // Connect nearby particles with subtle gradient lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          const maxDist = window.innerWidth < 768 ? 95 : 140;

          if (dist2 < maxDist) {
            const alpha = (1 - dist2 / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect to mouse if close
        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
};

/* ═══════════════════════════════════════════════════════════
   ROLE CYCLER
═══════════════════════════════════════════════════════════ */
const ROLES = [
  'Full Stack Developer',
  'Python & Django Specialist',
  'Vue.js 3 & Quasar Engineer',
  'High-Performance API Architect',
];

const RoleCycler = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROLES.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="h-7 sm:h-8 overflow-hidden flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mono text-sm sm:text-base md:text-lg font-semibold tracking-tight"
          style={{
            background: 'linear-gradient(90deg, #60a5fa, #818cf8, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {ROLES[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAGNETIC BUTTON
═══════════════════════════════════════════════════════════ */
const MagneticButton = ({ children, href, primary, download }) => {
  const ref = useRef(null);
  const [off, setOff] = useState({ x: 0, y: 0 });

  const move = useCallback((e) => {
    if (window.innerWidth < 768) return;
    const r = ref.current.getBoundingClientRect();
    setOff({
      x: (e.clientX - r.left - r.width / 2) * 0.25,
      y: (e.clientY - r.top - r.height / 2) * 0.25,
    });
  }, []);

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      onMouseMove={move}
      onMouseLeave={() => setOff({ x: 0, y: 0 })}
      animate={{ x: off.x, y: off.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      whileTap={{ scale: 0.96 }}
      data-cursor="button"
      className={`inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-sm cursor-pointer transition-all ${
        primary
          ? 'text-white'
          : 'text-slate-300 hover:text-white bg-white/[0.04] border border-white/[0.1] hover:border-indigo-500/40 hover:bg-white/[0.07]'
      }`}
      style={
        primary
          ? {
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.35)',
            }
          : {}
      }
      whileHover={
        primary
          ? {
              boxShadow: '0 8px 30px rgba(99, 102, 241, 0.55)',
              scale: 1.03,
            }
          : { scale: 1.03 }
      }
    >
      {children}
    </motion.a>
  );
};

/* ═══════════════════════════════════════════════════════════
   3D BENTO STAT CARD
═══════════════════════════════════════════════════════════ */
const StatCard = ({ val, suffix, label, accent, delay }) => {
  const cardRef = useRef(null);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setTilt({ x: -y, y: x });
    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.85, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04, y: -3 }}
      data-cursor="hover"
      className="relative p-4 rounded-2xl overflow-hidden cursor-default group"
      style={{
        background: 'rgba(13, 17, 26, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(16px)',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, ${accent}25 0%, transparent 60%)`,
          opacity: glare.opacity,
        }}
      />
      <div className="relative z-10" style={{ transform: 'translateZ(15px)' }}>
        <p
          className="text-2xl sm:text-3xl font-extrabold tracking-tight"
          style={{
            background: `linear-gradient(135deg, #ffffff, ${accent})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {val}{suffix}
        </p>
        <p className="mono text-[10px] text-slate-400 group-hover:text-slate-200 mt-1 font-semibold tracking-wider uppercase transition-colors">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   3D EXECUTIVE HOLOGRAPHIC PORTRAIT CARD
═══════════════════════════════════════════════════════════ */
const ExecutivePortraitCard = () => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setTilt({ x: -y, y: x });
    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 1,
    });
  }, []);

  const handleLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      data-cursor="3d"
      data-cursor-text="DEVELOPER"
      className="w-full max-w-[340px] sm:max-w-[380px] mx-auto"
      style={{
        perspective: '1200px',
        cursor: 'pointer',
      }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: hovered ? 1.02 : 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 25 }}
        style={{
          transformStyle: 'preserve-3d',
          borderRadius: 24,
          padding: '1.5px',
          background: hovered
            ? 'linear-gradient(135deg, #3b82f6, #6366f1, #a855f7)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(99,102,241,0.2), rgba(255,255,255,0.05))',
          boxShadow: hovered
            ? '0 25px 60px -15px rgba(99, 102, 241, 0.4), 0 0 30px rgba(59, 130, 246, 0.2)'
            : '0 20px 50px -20px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        <div
          style={{
            borderRadius: 22.5,
            overflow: 'hidden',
            background: '#0a0e17',
            position: 'relative',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Top Status Pill */}
          <div
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              zIndex: 20,
              transform: hovered ? 'translateZ(45px)' : 'translateZ(0px)',
              transition: 'transform 0.4s ease',
            }}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#07090e]/85 backdrop-blur-md border border-white/10 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="mono text-[10px] text-slate-200 font-semibold tracking-wide">
                Available for Roles
              </span>
            </div>
          </div>

          {/* Portrait Photo */}
          <motion.div
            style={{
              transformStyle: 'preserve-3d',
              transform: hovered ? 'scale(1.03) translateZ(10px)' : 'scale(1) translateZ(0px)',
              transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <img
              src="/mypic.jpg"
              alt="Karthikeyan S"
              style={{
                width: '100%',
                aspectRatio: '3/4',
                objectFit: 'cover',
                display: 'block',
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </motion.div>

          {/* Vignette Gradients */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(10,14,23,0.95) 0%, rgba(10,14,23,0.3) 45%, transparent 75%)',
              pointerEvents: 'none',
            }}
          />

          {/* Glare Lighting */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
              opacity: glare.opacity,
              pointerEvents: 'none',
              transition: 'opacity 0.3s ease',
            }}
          />

          {/* Bottom Info Plate */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: 14,
              transform: hovered ? 'translateZ(40px)' : 'translateZ(0px)',
              transition: 'transform 0.4s ease',
              zIndex: 20,
            }}
          >
            <div className="p-3 rounded-xl bg-[#0d121f]/90 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white text-sm font-bold tracking-tight">Karthikeyan S</h4>
                  <p className="mono text-[10px] text-indigo-300">Software Developer · InfiniTechX</p>
                </div>
                <span className="mono text-[9px] text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30">
                  Full Stack
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAIN HERO
═══════════════════════════════════════════════════════════ */
const Hero = () => {
  const { scrollY } = useScroll();
  const heroOp = useTransform(scrollY, [0, 400], [1, 0]);
  const heroSc = useTransform(scrollY, [0, 400], [1, 0.95]);

  const tools = useMemo(
    () => [
      { Icon: FaPython,      color: '#38bdf8', label: 'Python' },
      { Icon: SiDjango,      color: '#34d399', label: 'Django & DRF' },
      { Icon: SiVuedotjs,    color: '#42b883', label: 'Vue.js 3' },
      { Icon: FaReact,       color: '#61dafb', label: 'React.js' },
      { Icon: SiPostgresql,  color: '#38bdf8', label: 'PostgreSQL' },
      { Icon: SiTypescript,  color: '#60a5fa', label: 'TypeScript' },
      { Icon: SiTailwindcss, color: '#38bdf8', label: 'Tailwind' },
      { Icon: SiDocker,      color: '#38bdf8', label: 'Docker' },
    ],
    []
  );

  return (
    <>
      {/* ── Background Mesh & Physics ── */}
      <ExecutiveMeshCanvas />

      {/* Ambient Radial Highlights */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute top-1/3 -right-32 w-[550px] h-[550px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.07) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden pt-28 sm:pt-36 pb-20 sm:pb-28"
      >
        <motion.div
          style={{ opacity: heroOp, scale: heroSc, zIndex: 10, position: 'relative' }}
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center">
            {/* ── LEFT: Hero Content ── */}
            <div className="space-y-6 sm:space-y-7 text-left">
              {/* Status Pill */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-slate-300 bg-white/[0.04] border border-white/[0.1] backdrop-blur-md shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Engineering High-Reliability Web Applications</span>
              </motion.div>

              {/* Name & Title */}
              <div className="space-y-2">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mono text-xs sm:text-sm text-indigo-400 tracking-[0.2em] uppercase font-semibold"
                >
                  Hello, I'm
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.7 }}
                  className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05]"
                >
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 20%, #e2e8f0 60%, #94a3b8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    KARTHIKEYAN S
                  </span>
                </motion.h1>

                {/* Animated Role Cycler */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="flex items-center gap-3 pt-1"
                >
                  <div className="h-[2px] w-8 rounded-full bg-indigo-500" />
                  <RoleCycler />
                </motion.div>
              </div>

              {/* Executive Summary */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-xl font-normal"
              >
                Full Stack Developer with{' '}
                <span className="text-white font-semibold">1.7+ years of production experience</span> building enterprise applications using{' '}
                <span className="text-indigo-400 font-semibold">Python, Django, DRF, Vue.js 3, and Quasar</span>. Shipped 10+ RESTful APIs, optimized database schemas for 40% faster queries, and resolved 30+ mission-critical issues.
              </motion.p>

              {/* Core Tools Pills */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex flex-wrap gap-2 pt-1"
              >
                {tools.map(({ Icon, color, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.04 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 bg-white/[0.04] border border-white/[0.08] backdrop-blur-md cursor-pointer hover:border-indigo-500/40 hover:text-white transition-colors"
                  >
                    <Icon style={{ color, fontSize: 13 }} />
                    <span className="mono text-[11px]">{label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="flex items-center gap-3 sm:gap-4 flex-wrap pt-3"
              >
                <MagneticButton href="#projects" primary>
                  <span>Explore Featured Work</span>
                  <FaArrowRight size={11} />
                </MagneticButton>

                <MagneticButton href="#contact">
                  <span>Get In Touch</span>
                </MagneticButton>

                {/* Social Links */}
                <div className="flex gap-2">
                  {[
                    { Icon: FaGithub, href: 'https://github.com' },
                    { Icon: FaLinkedin, href: 'https://www.linkedin.com/in/karthikeyanssd' },
                  ].map(({ Icon, href }, i) => (
                    <motion.a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2, scale: 1.08 }}
                      data-cursor="button"
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-400 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/40 transition-colors"
                    >
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: 3D Portrait & Stats ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 w-full"
            >
              <ExecutivePortraitCard />

              {/* Bento Stats */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-[340px] sm:max-w-[380px] mx-auto">
                <StatCard val="1.7" suffix="+" label="Years Exp." accent="#3b82f6" delay={0.9} />
                <StatCard val="10" suffix="+" label="REST APIs" accent="#8b5cf6" delay={1.0} />
                <StatCard val="30" suffix="+" label="Issues Solved" accent="#10b981" delay={1.1} />
                <StatCard val="99.9" suffix="%" label="Reliability" accent="#f59e0b" delay={1.2} />
              </div>
            </motion.div>
          </div>

          {/* Technology Marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-16 sm:mt-24 overflow-hidden w-full border-t border-white/[0.08] pt-6"
          >
            <div className="animate-marquee flex gap-10 sm:gap-14 whitespace-nowrap">
              {[...Array(2)].flatMap((_, ri) =>
                [
                  'Python',
                  'Django & DRF',
                  'Vue.js 3',
                  'Quasar Framework',
                  'React.js',
                  'PostgreSQL',
                  'MySQL',
                  'Django-Q Tasks',
                  'Stripe Payments',
                  'Docker',
                  'CI/CD Workflows',
                  'RESTful Architecture',
                  'System Optimization',
                ].map((item, i) => (
                  <span
                    key={`${ri}-${i}`}
                    className="mono text-xs sm:text-sm text-slate-500 hover:text-slate-200 cursor-pointer transition-colors uppercase tracking-widest flex items-center gap-2.5 font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/80 inline-block" />
                    {item}
                  </span>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="hidden sm:flex absolute bottom-5 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 cursor-pointer z-20"
          data-cursor="button"
          data-cursor-text="SCROLL"
        >
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="flex flex-col items-center gap-1"
          >
            <span className="mono text-[10px] tracking-[0.25em] uppercase text-slate-400 font-semibold">
              Explore
            </span>
            <div className="w-px h-7 bg-gradient-to-b from-indigo-500/70 to-transparent" />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;