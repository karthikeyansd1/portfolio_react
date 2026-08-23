import React, { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBriefcase, FaCode, FaDatabase, FaShieldAlt, FaRocket, FaMapMarkerAlt, FaCalendarAlt, FaLaptopCode } from 'react-icons/fa';

const experiences = [
  {
    id: 1,
    role: 'Full Stack Developer',
    company: 'InfiniTechX Technologies Pvt Ltd',
    period: 'Feb 2025 – Present',
    location: 'Tiruchirappalli, Tamil Nadu',
    achievements: [
      { icon: FaCode,      color: '#ef4444', text: 'Built & maintained 10+ RESTful APIs with Python & Django with optimized serializers', metric: '25% less latency' },
      { icon: FaCode,      color: '#38bdf8', text: 'Developed responsive UI components in Vue.js 3 & Quasar Framework for Property Management System', metric: '+20–30% render perf' },
      { icon: FaDatabase,  color: '#34d399', text: 'Designed and optimized MySQL & PostgreSQL schemas through indexing and query tuning', metric: '40% faster queries' },
      { icon: FaShieldAlt, color: '#f43f5e', text: 'Integrated Stripe payments and JWT authentication, preventing unauthorized access', metric: '90% safer auth' },
      { icon: FaRocket,    color: '#fbbf24', text: 'Stabilized Django-Q task queues & resolved 30+ production bugs across modules', metric: '40% fewer prod bugs' },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   SPIDER-MAN ACTION 2: UPSIDE-DOWN HANGING & SWAYING (EXPERIENCE SECTION)
═══════════════════════════════════════════════════════════ */
const SpiderManHangingUpsideDown = ({ inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -160 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -160 }}
      transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="hidden md:flex absolute right-6 lg:right-20 -top-8 z-30 flex-col items-center pointer-events-none"
    >
      {/* Elastic Silk Strand */}
      <motion.div
        animate={{ scaleY: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'top' }}
        className="w-[2px] h-24 bg-gradient-to-b from-white via-cyan-300 to-red-500 shadow-[0_0_10px_#38bdf8]"
      />

      {/* Upside Down Swaying Spidey */}
      <motion.div
        animate={{
          rotate: [-10, 10, -10],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformOrigin: 'top center' }}
        className="relative"
      >
        <svg width="60" height="90" viewBox="0 0 100 140" className="drop-shadow-[0_0_22px_rgba(239,68,68,0.85)]">
          {/* Feet holding web at top */}
          <path d="M 40 10 Q 50 25 45 40" stroke="#dc2626" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M 60 10 Q 50 25 55 40" stroke="#dc2626" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="50" cy="8" r="3" fill="#fff" />

          {/* Upside Down Body */}
          <path d="M 42 40 C 36 55 38 72 50 80 C 62 72 64 55 58 40 Z" fill="#dc2626" stroke="#090514" strokeWidth="2" />
          <path d="M 44 50 Q 42 62 49 74 Q 46 62 44 50 Z" fill="#0284c7" />
          <path d="M 56 50 Q 58 62 51 74 Q 54 62 56 50 Z" fill="#0284c7" />

          {/* Upside Down Head at bottom */}
          <ellipse cx="50" cy="100" rx="16" ry="19" fill="#dc2626" stroke="#090514" strokeWidth="2" />
          <path d="M 50 81 L 50 119 M 34 100 L 66 100" stroke="#000" strokeWidth="1" opacity="0.6" />
          {/* Glowing Lenses */}
          <path d="M 40 102 Q 48 105 48 98 Q 44 95 40 99 Z" fill="#fff" stroke="#000" strokeWidth="1.5" />
          <path d="M 60 102 Q 52 105 52 98 Q 56 95 60 99 Z" fill="#fff" stroke="#000" strokeWidth="1.5" />

          {/* Crossed Arms upside down */}
          <path d="M 40 60 Q 25 75 35 90" stroke="#dc2626" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M 60 60 Q 75 75 65 90" stroke="#dc2626" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        </svg>

        {/* Comic "THWIP!" Floating Badge */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/90 border border-red-500 shadow-lg text-[9px] mono font-bold text-red-300 whitespace-nowrap">
          🕸️ HANGING OUT
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   3D WORK EXPERIENCE PHOTO CARD (Left Side)
═══════════════════════════════════════════════════════════ */
const ExperiencePhotoCard = ({ inView }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [hovered, setHovered] = useState(false);

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
      data-cursor-text="WORKSPACE"
      style={{ perspective: '1000px' }}
      className="w-full max-w-[420px] mx-auto lg:max-w-none cursor-pointer"
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="relative rounded-3xl overflow-hidden shadow-2xl p-[1.5px]"
        style={{
          transformStyle: 'preserve-3d',
          background: hovered
            ? 'linear-gradient(135deg, #ef4444, #38bdf8, #ef4444)'
            : 'linear-gradient(135deg, rgba(239,68,68,0.4), rgba(56,189,248,0.3), rgba(239,68,68,0.2))',
          boxShadow: hovered
            ? '0 0 50px rgba(239,68,68,0.5), 0 20px 50px rgba(0,0,0,0.8)'
            : '0 0 20px rgba(239,68,68,0.2), 0 10px 30px rgba(0,0,0,0.6)',
        }}
      >
        <div className="relative rounded-[22px] overflow-hidden bg-[#070614]" style={{ transformStyle: 'preserve-3d' }}>
          {/* Main Work Experience Photo */}
          <motion.div
            style={{
              transform: hovered ? 'scale(1.04) translateZ(10px)' : 'scale(1) translateZ(0px)',
              transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <img
              src="/experience_pic.jpg"
              alt="Karthikeyan S - Work Experience"
              className="w-full h-auto object-cover aspect-[4/5] block rounded-[22px]"
            />
          </motion.div>

          {/* Vignette & Radial Glare */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(7,6,20,0.92) 0%, rgba(7,6,20,0.25) 50%, transparent 80%)',
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.15) 0%, rgba(239,68,68,0.1) 40%, transparent 70%)`,
              opacity: glare.opacity,
            }}
          />

          {/* Floating Top Badge: Company & Role */}
          <div
            className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none"
            style={{
              transform: hovered ? 'translateZ(45px)' : 'translateZ(0px)',
              transition: 'transform 0.4s ease',
            }}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-red-500/40 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="mono text-[10px] text-slate-200 font-bold tracking-wider">
                InfiniTechX · Dev Rig
              </span>
            </div>

            <div className="px-3 py-1 rounded-xl bg-red-600/85 backdrop-blur-md text-white text-[10px] mono font-bold shadow-lg shadow-red-500/30">
              ⚡ LIVE ON SITE
            </div>
          </div>

          {/* Floating Bottom Card: Nameplate & Status */}
          <div
            className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-red-500/30 shadow-2xl pointer-events-none"
            style={{
              transform: hovered ? 'translateZ(50px)' : 'translateZ(0px)',
              transition: 'transform 0.4s ease',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-sm tracking-tight flex items-center gap-1.5">
                  <FaLaptopCode className="text-red-400" />
                  KARTHIKEYAN S
                </p>
                <p className="mono text-[11px] text-red-300 font-medium mt-0.5">
                  Software Developer @ InfiniTechX
                </p>
              </div>
              <span className="mono text-[10px] text-sky-400 px-2 py-1 rounded-lg bg-sky-950/60 border border-sky-400/30">
                Feb 2025 – Present
              </span>
            </div>
            <p className="mono text-[10px] text-slate-400 mt-2 border-t border-white/10 pt-2 flex items-center justify-between">
              <span>"Focus. Plan. Execute. Repeat."</span>
              <span className="text-red-400 font-bold">🕷️</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   3D EXPERIENCE DETAILS CARD (Right Side)
═══════════════════════════════════════════════════════════ */
const ExperienceCard = ({ exp, inView }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
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
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="hover"
      style={{ perspective: '1000px' }}
      className="w-full"
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        whileHover={{ y: -4 }}
        className="relative rounded-2xl overflow-hidden group shadow-2xl"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(239,68,68,0.2)',
          backdropFilter: 'blur(16px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Radial Glare */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(239,68,68,0.2) 0%, transparent 60%)`,
            opacity: glare.opacity,
          }}
        />

        {/* Card Header */}
        <div
          className="p-4 sm:p-6 md:p-7"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', transform: 'translateZ(15px)' }}
        >
          {/* Role */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mb-2 group-hover:text-red-300 transition-colors">
            {exp.role}
          </h3>

          {/* Company */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <FaBriefcase className="text-red-400 text-xs sm:text-sm" />
            <span className="text-red-300 font-bold text-xs sm:text-sm">{exp.company}</span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-2.5 sm:gap-4 text-[11px] sm:text-xs text-slate-400 mono">
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt className="text-red-400" />
              {exp.period}
            </span>
            <span className="flex items-center gap-1.5">
              <FaMapMarkerAlt className="text-sky-400" />
              {exp.location}
            </span>
          </div>
        </div>

        {/* Achievements */}
        <div className="p-4 sm:p-6 md:p-7 space-y-3" style={{ transform: 'translateZ(25px)' }}>
          {exp.achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              whileHover={{ x: 6, backgroundColor: 'rgba(255,255,255,0.06)' }}
              data-cursor="hover"
              data-cursor-text="METRIC"
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl group/item cursor-pointer transition-all border border-white/5 hover:border-red-500/40"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform shadow-md"
                style={{ background: `${a.color}20`, border: `1px solid ${a.color}40` }}
              >
                <a.icon style={{ color: a.color }} className="text-xs sm:text-base" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-2 font-light group-hover/item:text-white transition-colors">
                  {a.text}
                </p>
                <span
                  className="mono text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg font-bold inline-block shadow-sm"
                  style={{ background: `${a.color}18`, color: a.color, border: `1px solid ${a.color}35` }}
                >
                  📈 {a.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          className="h-[2.5px] w-full"
          style={{ background: 'linear-gradient(90deg,#ef4444,#dc2626,#38bdf8)' }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        />
      </motion.div>
    </div>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });

  return (
    <section id="experience" className="relative py-24 sm:py-36 overflow-hidden" style={{ background: '#040408' }}>
      <div className="section-divider" />

      {/* Background ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(239,68,68,0.08),transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(14,165,233,0.06),transparent 70%)', filter: 'blur(60px)' }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* ── SPIDER-MAN HANGING UPSIDE DOWN ACTION ── */}
        <SpiderManHangingUpsideDown inView={inView} />

        {/* Header with Scroll Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="mono text-xs text-red-400 tracking-[0.25em] uppercase mb-3">
            <span className="text-red-500">🕸️ // </span>experience.json
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight sm:tracking-tighter">
            Work{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg,#ef4444,#38bdf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Experience
            </span>
          </h2>
          <p className="text-slate-300 mt-3 max-w-xl mx-auto text-xs sm:text-sm font-light">
            Professional track record of shipping production-ready web apps, APIs, and scalable infrastructure.
          </p>
        </motion.div>

        {/* 2-Column Responsive Layout with 3D Opposing Scroll Slide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center" style={{ perspective: '1200px' }}>
          {/* Left Column: Photo Card */}
          <motion.div
            initial={{ opacity: 0, x: -70, rotateY: -15 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -70, rotateY: -15 }}
            transition={{ duration: 0.9, delay: 0.15, type: 'spring', stiffness: 200, damping: 22 }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <ExperiencePhotoCard inView={inView} />
          </motion.div>

          {/* Right Column: Work Experience Card */}
          <motion.div
            initial={{ opacity: 0, x: 70, rotateY: 15 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 70, rotateY: 15 }}
            transition={{ duration: 0.9, delay: 0.25, type: 'spring', stiffness: 200, damping: 22 }}
            className="lg:col-span-7 w-full"
          >
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} inView={inView} />
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.7 }}
          className="text-center mt-12 sm:mt-16"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(239,68,68,0.7), 0 0 15px rgba(14,165,233,0.4)' }}
            whileTap={{ scale: 0.95 }}
            data-cursor="button"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold text-white shadow-xl cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)' }}
          >
            Explore Projects & Code 🕸️ →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;