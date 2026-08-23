import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FaCopy, FaCheck, FaDownload } from 'react-icons/fa';

const SectionLabel = ({ children }) => (
  <p className="mono text-xs text-red-400 tracking-[0.25em] uppercase mb-2 flex items-center gap-2">
    <span className="text-red-500">🕸️ // </span>{children}
  </p>
);

const SectionTitle = ({ children, accent }) => (
  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight sm:tracking-tighter leading-tight">
    {children}
    {accent && (
      <span style={{ backgroundImage: 'linear-gradient(135deg,#ef4444,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {' '}{accent}
      </span>
    )}
  </h2>
);

const skills = [
  { name: 'Python', category: 'backend', icon: '🐍' },
  { name: 'Django', category: 'backend', icon: '⚡' },
  { name: 'Vue.js 3', category: 'frontend', icon: '🟢' },
  { name: 'Quasar', category: 'frontend', icon: '💎' },
  { name: 'React.js', category: 'frontend', icon: '⚛️' },
  { name: 'JavaScript', category: 'frontend', icon: '💛' },
  { name: 'TypeScript', category: 'frontend', icon: '🔷' },
  { name: 'PostgreSQL', category: 'database', icon: '🐘' },
  { name: 'MySQL', category: 'database', icon: '🐬' },
  { name: 'Django-Q', category: 'backend', icon: '🕸️' },
  { name: 'REST APIs', category: 'backend', icon: '🔌' },
  { name: 'Stripe API', category: 'backend', icon: '💳' },
  { name: 'Docker', category: 'devops', icon: '🐳' },
  { name: 'Git & CI/CD', category: 'devops', icon: '🐙' },
  { name: 'TailwindCSS', category: 'frontend', icon: '🎨' },
  { name: 'Java', category: 'backend', icon: '☕' },
  { name: 'Spring Boot', category: 'backend', icon: '🍃' },
  { name: 'SQL Tuning', category: 'database', icon: '🗄️' },
];

/* ═══════════════════════════════════════════════════════════
   SPIDER-MAN ACTION 1: WALL CLIMBING & CRAWLING (ABOUT SECTION)
═══════════════════════════════════════════════════════════ */
const SpiderManWallClimber = ({ inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 150, x: -30 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 150, x: -30 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="hidden md:flex absolute -left-4 lg:left-4 top-24 z-20 flex-col items-center pointer-events-none"
    >
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [-3, 3, -3],
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="relative"
      >
        {/* Wall Silk Grip Lines */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[1.5px] h-16 bg-gradient-to-t from-red-500 to-transparent opacity-60 shadow-[0_0_8px_#ef4444]" />

        {/* Vector Climbing Spider-Man */}
        <svg width="68" height="88" viewBox="0 0 100 130" className="drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">
          {/* Head looking up */}
          <ellipse cx="50" cy="35" rx="15" ry="18" fill="#dc2626" stroke="#090514" strokeWidth="2" />
          <path d="M 50 17 L 50 53 M 35 35 L 65 35" stroke="#000" strokeWidth="1" opacity="0.6" />
          <path d="M 40 32 Q 48 30 48 37 Q 44 40 40 36 Z" fill="#fff" stroke="#000" strokeWidth="1.5" />
          <path d="M 60 32 Q 52 30 52 37 Q 56 40 60 36 Z" fill="#fff" stroke="#000" strokeWidth="1.5" />

          {/* Torso Crouch */}
          <path d="M 42 50 C 36 65 38 82 50 90 C 62 82 64 65 58 50 Z" fill="#dc2626" stroke="#090514" strokeWidth="2" />
          <path d="M 44 60 Q 42 72 49 84 Q 46 72 44 60 Z" fill="#0284c7" />
          <path d="M 56 60 Q 58 72 51 84 Q 54 72 56 60 Z" fill="#0284c7" />

          {/* Spider Chest Emblem */}
          <circle cx="50" cy="65" r="2.5" fill="#000" />
          <path d="M 48 63 L 44 59 M 52 63 L 56 59 M 48 67 L 44 71 M 52 67 L 56 71" stroke="#000" strokeWidth="1.2" />

          {/* Crawling Arms Gripping Wall */}
          <path d="M 42 52 Q 22 35 15 15" stroke="#dc2626" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <circle cx="15" cy="15" r="4" fill="#dc2626" stroke="#fff" strokeWidth="1" />
          <path d="M 58 52 Q 78 35 85 20" stroke="#dc2626" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <circle cx="85" cy="20" r="4" fill="#dc2626" stroke="#fff" strokeWidth="1" />

          {/* Crawling Back Legs */}
          <path d="M 45 85 Q 25 95 18 120" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="18" cy="120" r="3.5" fill="#dc2626" />
          <path d="M 55 85 Q 75 95 82 115" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="82" cy="115" r="3.5" fill="#dc2626" />
        </svg>

        {/* Wall Pulse Radar */}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-red-500 animate-ping opacity-40" />
      </motion.div>
    </motion.div>
  );
};

/* 3D Tilt Card with Glare for About Section */
const TiltStatCard = ({ s, i, inView }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
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
      initial={{ opacity: 0, y: 50, rotateX: 20, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: tilt.x, rotateY: tilt.y, scale: 1 } : {}}
      transition={{ delay: 0.2 + i * 0.12, duration: 0.8, type: 'spring', stiffness: 220, damping: 20 }}
      whileHover={{ scale: 1.05, y: -6 }}
      data-cursor="hover"
      className="relative p-4 sm:p-6 rounded-2xl overflow-hidden group cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(239,68,68,0.18)',
        transformStyle: 'preserve-3d',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, ${s.accent}30 0%, transparent 60%)`,
          opacity: glare.opacity,
        }}
      />
      <div style={{ transform: 'translateZ(20px)' }}>
        <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{s.icon}</div>
        <p className="text-2xl sm:text-4xl font-black tracking-tight"
          style={{ background: `linear-gradient(135deg,#fff,${s.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {s.val}
        </p>
        <p className="text-[10px] sm:text-xs text-slate-400 group-hover:text-slate-200 mt-1 sm:mt-1.5 font-semibold tracking-wider sm:tracking-widest uppercase transition-colors">
          {s.label}
        </p>
      </div>

      <motion.div className="absolute bottom-0 left-0 h-[2.5px] rounded-b-2xl"
        style={{ background: `linear-gradient(90deg,${s.accent},#38bdf8,transparent)` }}
        initial={{ width: 0 }}
        animate={inView ? { width: '100%' } : { width: 0 }}
        transition={{ delay: 0.4 + i * 0.1, duration: 1 }} />
    </motion.div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, margin: '-60px' });
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  // Parallax scroll transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const webRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const jsonCode = `{
  "name": "Karthikeyan S",
  "role": "Full Stack Developer",
  "location": "Trichy, Tamil Nadu, India 🇮🇳",
  "experience": "1.8+ Years",
  "phone": "+91 87780 76919",
  "email": "karthikeyancs10@gmail.com",
  "linkedin": "linkedin.com/in/karthikeyanssd",
  "specialties": ["Python", "Django", "DRF", "Vue.js 3", "Quasar", "PostgreSQL"],
  "education": "M.Sc. Computer Science (77%), B.Sc. Computer Science (78%)",
  "status": "Available for Full-Time Roles 🚀"
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(jsonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-36 overflow-hidden"
      style={{ background: '#040408' }}
    >
      <div className="section-divider mb-0" />

      {/* ── SPIDER-MAN WALL CLIMBING ACTION ── */}
      <SpiderManWallClimber inView={inView} />

      {/* ── PARALLAX SPIDER WEB BACKGROUND ROTATION ON SCROLL ── */}
      <motion.div
        style={{ rotate: webRotate, y: parallaxY }}
        className="absolute -right-32 top-10 w-[500px] h-[500px] pointer-events-none opacity-[0.07]"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-red-500 fill-none" strokeWidth="1.5">
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="30" />
          <circle cx="50" cy="50" r="15" />
          <line x1="50" y1="5" x2="50" y2="95" />
          <line x1="5" y1="50" x2="95" y2="50" />
          <line x1="18" y1="18" x2="82" y2="82" />
          <line x1="18" y1="82" x2="82" y2="18" />
        </svg>
      </motion.div>

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(239,68,68,0.08),transparent 70%)', filter: 'blur(70px)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(14,165,233,0.06),transparent 70%)', filter: 'blur(70px)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Content with Scroll-Triggered Entrance ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <SectionLabel>about_karthi.py</SectionLabel>
              <SectionTitle accent="Me.">About</SectionTitle>
            </div>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              <p>
                I'm a dedicated{' '}
                <span className="text-white font-bold hover:text-red-400 transition-colors">Full Stack Developer</span>{' '}
                with <span className="text-red-400 font-semibold">1.8 years of experience</span> building and maintaining production web applications using <span className="text-white font-medium">Python, Django, Django REST Framework, Vue.js, and Quasar Framework</span>.
              </p>
              <p>
                Proven track record delivering <span className="text-sky-300 font-medium">10+ RESTful APIs</span>, optimizing MySQL and PostgreSQL database schemas, and resolving 30+ production bugs to improve platform stability. Experienced in end-to-end feature delivery for multi-module Property Management and Secured Banking Systems.
              </p>
            </div>

            {/* Interactive Terminal Profile Card with 3D Fold on Scroll */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 12 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: 12 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              whileHover={{ y: -4 }}
              className="transition-transform"
            >
              <div className="terminal relative group">
                <div className="terminal-header justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="terminal-dot bg-red-500" />
                    <div className="terminal-dot bg-yellow-400" />
                    <div className="terminal-dot bg-cyan-400" />
                    <span className="mono text-slate-400 text-xs ml-2">profile.json</span>
                  </div>
                  <button
                    onClick={copyCode}
                    data-cursor="button"
                    className="flex items-center gap-1.5 text-xs mono text-slate-300 hover:text-red-300 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 transition-colors"
                  >
                    {copied ? (
                      <>
                        <FaCheck className="text-emerald-400" size={12} />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <FaCopy size={12} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 sm:p-5 mono text-xs sm:text-[13px] space-y-1 leading-5 sm:leading-6 overflow-x-auto">
                  <p><span className="code-keyword">&#123;</span></p>
                  <p className="pl-4 sm:pl-5"><span className="code-var">"name"</span>: <span className="code-string">"Karthikeyan S"</span>,</p>
                  <p className="pl-4 sm:pl-5"><span className="code-var">"role"</span>: <span className="code-string">"Full Stack Developer"</span>,</p>
                  <p className="pl-4 sm:pl-5"><span className="code-var">"location"</span>: <span className="code-string">"Trichy, Tamil Nadu, India 🇮🇳"</span>,</p>
                  <p className="pl-4 sm:pl-5"><span className="code-var">"experience"</span>: <span className="code-number">1.8</span>,</p>
                  <p className="pl-4 sm:pl-5"><span className="code-var">"degree"</span>: <span className="code-string">"M.Sc. Computer Science (77%)"</span>,</p>
                  <p className="pl-4 sm:pl-5"><span className="code-var">"openToWork"</span>: <span className="code-keyword">true</span></p>
                  <p><span className="code-keyword">&#125;</span></p>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap">
              <motion.a
                href="/resume.pdf"
                download="Karthikeyan_S_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(239,68,68,0.7), 0 0 15px rgba(14,165,233,0.4)' }}
                whileTap={{ scale: 0.95 }}
                data-cursor="button"
                className="flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-sm font-bold text-white cursor-pointer shadow-lg"
                style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)' }}>
                <FaDownload size={13} />
                <span>Download Resume</span>
              </motion.a>
              <motion.a href="#contact"
                whileHover={{ scale: 1.04, borderColor: 'rgba(239,68,68,0.6)', background: 'rgba(239,68,68,0.08)' }}
                whileTap={{ scale: 0.95 }}
                data-cursor="button"
                className="flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-sm font-bold text-slate-200 transition-all"
                style={{ border: '1px solid rgba(239,68,68,0.25)', background: 'rgba(255,255,255,0.03)' }}>
                Contact Me 🕸️
              </motion.a>
            </div>
          </motion.div>

          {/* ── RIGHT: 3D Tilt Stat Cards with Staggered Scroll Rise ── */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
            {[
              { val: '1.8+',  label: 'Years Exp.',           icon: '⚡', accent: '#ef4444' },
              { val: '10+',   label: 'RESTful APIs',         icon: '🔌', accent: '#38bdf8' },
              { val: '30+',   label: 'Bugs Resolved',        icon: '🔧', accent: '#ef4444' },
              { val: '99%',   label: 'System Uptime',        icon: '💎', accent: '#fbbf24' },
            ].map((s, i) => (
              <TiltStatCard key={s.label} s={s} i={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* Tech Stack Chips with Elastic Web-Snare Stagger */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 sm:mt-24 text-center"
        >
          <SectionLabel>tech_stack.json</SectionLabel>
          <p className="text-xl sm:text-2xl font-bold text-white mb-6">Technologies & Frameworks</p>

          {/* Filter Pills */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mb-8 flex-wrap">
            {['all', 'frontend', 'backend', 'database', 'devops'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-cursor="hover"
                className={`mono text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 rounded-full capitalize font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/40'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {filteredSkills.map((s, idx) => (
              <motion.span
                key={s.name}
                layout
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 20 }}
                transition={{ delay: 0.04 * idx, type: 'spring', stiffness: 300, damping: 20 }}
                whileHover={{ scale: 1.1, y: -3, boxShadow: '0 0 20px rgba(239,68,68,0.5)', borderColor: 'rgba(239,68,68,0.7)' }}
                whileTap={{ scale: 0.95 }}
                data-cursor="hover"
                data-cursor-text={s.category.toUpperCase()}
                className="mono px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-200 cursor-pointer flex items-center gap-1.5 sm:gap-2 transition-colors"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
                <span>{s.icon}</span>
                <span>{s.name}</span>
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;