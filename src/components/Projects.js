import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaRocket, FaCode, FaCheckCircle } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: 'Property Management System (PMS)',
    company: 'InfiniTechX Technologies Pvt Ltd',
    description: 'Production full-stack platform automating property operations — tenant billing, security deposits, owner disbursements, and reserve fund calculations.',
    technologies: ['Python', 'Django', 'DRF', 'Vue.js 3', 'Quasar', 'PostgreSQL', 'Django-Q', 'Stripe'],
    category: 'fullstack',
    github: 'https://github.com/karthikeyanssd',
    live: 'https://demo-property.example.com',
    accent: '#818cf8',
    stats: '60% Faster Ops',
    features: [
      'Automated tenant tracking, rent collection & lease records (80% less paperwork)',
      'Built financial reporting & reserve fund dashboards cutting calculation time by 50%',
      'Designed security-deposit-first payment gate with Stripe payment integration',
      'Real-time maintenance ticket dispatcher increasing resolution speed by 30%'
    ],
  },
  {
    id: 2,
    title: 'Multi-Banking Secured System',
    company: 'Softlogic Institute',
    description: 'Responsive multi-bank access portal allowing users to securely view and manage accounts across banks through a single authentication gateway.',
    technologies: ['Java', 'JavaScript', 'Bootstrap', 'MySQL', 'HTML5/CSS3', 'REST API'],
    category: 'fullstack',
    github: 'https://github.com/karthikeyanssd',
    live: 'https://demo-banking.example.com',
    accent: '#c084fc',
    stats: 'Single Access SSO',
    features: [
      'Unified multi-bank access dashboard allowing cross-account monitoring',
      'Implemented secure email-based password recovery and customization APIs',
      'Admin-monitored banking operations with role-based authorization',
      '100% responsive UI with streamlined user authentication'
    ],
  },
  {
    id: 3,
    title: 'Athletic Tournament Platform',
    company: 'University & State Meet',
    description: 'Athletic registration & tournament management portal for tracking participant records, timings, and university sports event standings.',
    technologies: ['Python', 'Django', 'JavaScript', 'PostgreSQL', 'HTML5/CSS3'],
    category: 'fullstack',
    github: 'https://github.com/karthikeyanssd',
    live: 'https://demo-athletic.example.com',
    accent: '#f472b6',
    stats: 'Sports & Medals',
    features: [
      'Dynamic participant registration engine with automated heat generation',
      'Real-time score & sprint timing recording system with live leaderboard',
      'Exportable certificates and tournament analytics dashboard',
      'Built by university Gold Medalist & state Bronze Medalist athlete'
    ],
  },
];

const filters = [
  { key: 'all', label: 'All Projects', icon: FaRocket },
  { key: 'fullstack', label: 'Full Stack', icon: FaCode },
];

/* ═══════════════════════════════════════════════════════════
   SPIDER-MAN ACTION 3: WEB-SWINGING & FLYING (PROJECTS SECTION)
═══════════════════════════════════════════════════════════ */
const SpiderManWebFlyer = ({ inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -140, y: -40, rotate: -25 }}
      animate={inView ? { opacity: 1, x: 0, y: 0, rotate: 0 } : { opacity: 0, x: -140, y: -40, rotate: -25 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className="hidden md:flex absolute left-8 lg:left-24 top-16 z-20 items-center pointer-events-none"
    >
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [-6, 8, -6],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative flex items-center"
      >
        {/* Curved Web Shooting Strand */}
        <svg width="180" height="70" viewBox="0 0 180 70" className="overflow-visible absolute -left-36 -top-8 pointer-events-none">
          <path
            d="M 0 0 Q 90 25 180 50"
            stroke="url(#webGrad)"
            strokeWidth="2.5"
            fill="none"
            className="drop-shadow-[0_0_8px_#38bdf8]"
          />
          <defs>
            <linearGradient id="webGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Dynamic Flying Spidey Figure */}
        <svg width="78" height="65" viewBox="0 0 120 100" className="drop-shadow-[0_0_25px_rgba(239,68,68,0.85)]">
          {/* Extended Shooting Arm */}
          <path d="M 50 45 L 15 20" stroke="#dc2626" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <circle cx="15" cy="20" r="3.5" fill="#fff" />

          {/* Torso in flight */}
          <path d="M 45 40 Q 65 35 85 45 Q 70 58 45 52 Z" fill="#dc2626" stroke="#090514" strokeWidth="1.5" />
          <path d="M 55 42 Q 68 38 78 45 Q 68 52 55 48 Z" fill="#0284c7" />

          {/* Head looking forward */}
          <ellipse cx="40" cy="38" rx="14" ry="16" fill="#dc2626" stroke="#090514" strokeWidth="1.5" />
          <path d="M 32 36 Q 38 34 38 40 Q 35 42 32 39 Z" fill="#fff" stroke="#000" strokeWidth="1.2" />

          {/* Back Trailing Arm */}
          <path d="M 75 42 Q 95 48 105 55" stroke="#dc2626" strokeWidth="4.5" strokeLinecap="round" fill="none" />

          {/* Trailing Acrobat Legs */}
          <path d="M 82 46 Q 100 55 115 50" stroke="#0284c7" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M 80 50 Q 98 65 110 68" stroke="#0284c7" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <circle cx="115" cy="50" r="3" fill="#dc2626" />
          <circle cx="110" cy="68" r="3" fill="#dc2626" />
        </svg>

        {/* Flying Speed Flare */}
        <span className="mono text-[10px] font-black text-cyan-300 ml-2 px-2 py-0.5 rounded-full bg-black/80 border border-cyan-400 shadow-md">
          ⚡ FLYING
        </span>
      </motion.div>
    </motion.div>
  );
};

/* 3D Interactive Tilt Project Card */
const ProjectCard = ({ project, idx, inView }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
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
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-cursor="3d"
      data-cursor-text="VIEW"
      style={{ perspective: '1000px', cursor: 'pointer' }}
      className="w-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: 18, scale: 0.92 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: tilt.x, rotateY: tilt.y, scale: 1 } : { opacity: 0, y: 60, rotateX: 18, scale: 0.92 }}
        transition={{ delay: 0.2 + idx * 0.15, duration: 0.8, type: 'spring', stiffness: 220, damping: 22 }}
        whileHover={{ scale: 1.03, y: -8 }}
        className="relative rounded-2xl overflow-hidden group h-full flex flex-col justify-between"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: hovered ? `1px solid ${project.accent}` : '1px solid rgba(239,68,68,0.2)',
          boxShadow: hovered
            ? `0 0 45px ${project.accent}40, 0 20px 40px rgba(0,0,0,0.7)`
            : '0 10px 30px rgba(0,0,0,0.4)',
          transformStyle: 'preserve-3d',
          backdropFilter: 'blur(16px)',
          transition: 'border 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Holographic Glare Follower */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, ${project.accent}25 0%, transparent 65%)`,
            opacity: glare.opacity,
          }}
        />

        {/* Top Accent Line */}
        <div
          className="h-[2px] w-full"
          style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
        />

        {/* Terminal macOS Header */}
        <div
          className="terminal-header rounded-none justify-between px-4 py-2.5"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(15,15,30,0.7)',
            transform: 'translateZ(10px)',
          }}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="terminal-dot bg-red-500" />
            <div className="terminal-dot bg-yellow-400" />
            <div className="terminal-dot bg-green-400" />
            <span className="mono text-slate-500 text-[10px] sm:text-[11px] ml-2 truncate">
              {project.title.toLowerCase().replace(/ /g, '_')}.tsx
            </span>
          </div>

          <span
            className="mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider flex-shrink-0"
            style={{ background: `${project.accent}20`, color: project.accent }}
          >
            {project.stats}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between" style={{ transform: 'translateZ(20px)' }}>
          <div>
            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight group-hover:text-indigo-300 transition-colors">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 font-light">
              {project.description}
            </p>

            {/* Features list */}
            <div className="space-y-1.5 sm:space-y-2 mb-5">
              {project.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-300 mono">
                  <FaCheckCircle className="mt-0.5 flex-shrink-0" style={{ color: project.accent }} size={10} />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* Tech Pills */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="mono text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-slate-300 hover:text-white transition-colors"
                  style={{
                    background: `${project.accent}15`,
                    border: `1px solid ${project.accent}30`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Interactive Action Buttons */}
            <div className="flex gap-2 sm:gap-3 pt-1" style={{ transform: 'translateZ(25px)' }}>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, borderColor: 'rgba(99,102,241,0.6)' }}
                whileTap={{ scale: 0.96 }}
                data-cursor="button"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <FaGithub size={13} />
                <span>Source</span>
              </motion.a>

              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: `0 0 25px ${project.accent}60` }}
                whileTap={{ scale: 0.96 }}
                data-cursor="button"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-3 rounded-xl text-xs font-semibold text-white transition-all shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${project.accent}, ${project.accent}dd)`,
                }}
              >
                <FaExternalLinkAlt size={11} />
                <span>Live Demo</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-20 sm:py-32 overflow-hidden" style={{ background: '#040408' }}>
      <div className="section-divider" />

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.07),transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(236,72,153,0.06),transparent 70%)', filter: 'blur(60px)' }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* ── SPIDER-MAN WEB-SWINGING & FLYING ACTION ── */}
        <SpiderManWebFlyer inView={inView} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="mono text-xs text-slate-500 tracking-[0.25em] uppercase mb-3">
            <span className="code-comment">{'// '}</span>projects.json
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight sm:tracking-tighter mb-4">
            Featured{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg,#818cf8,#c084fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Projects
            </span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto font-light">
            Real production projects engineered with scalable backends, clean architecture, and modern UI.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-8 sm:mb-12">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              data-cursor="hover"
              className={`mono px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
                filter === f.key ? 'text-white shadow-lg shadow-indigo-500/25' : 'text-slate-400 hover:text-slate-200'
              }`}
              style={
                filter === f.key
                  ? { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }
                  : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              <f.icon size={12} />
              <span>{f.label}</span>
            </button>
          ))}
        </div>

        {/* 3D Project Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} idx={i} inView={inView} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;