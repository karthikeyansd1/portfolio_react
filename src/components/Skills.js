import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const categories = [
  {
    label: 'Backend & Frameworks 🕷️',
    accent: '#ef4444',
    skills: [
      { name: 'Python',                level: 94 },
      { name: 'Django & DRF',          level: 95 },
      { name: 'Django-Q (Task Queue)', level: 88 },
      { name: 'RESTful API Design',    level: 96 },
      { name: 'JWT Authentication',    level: 92 },
      { name: 'Spring Boot & Java',    level: 78 },
    ],
  },
  {
    label: 'Frontend & UI 🕸️',
    accent: '#38bdf8',
    skills: [
      { name: 'Vue.js 3',             level: 92 },
      { name: 'Quasar Framework',     level: 90 },
      { name: 'React.js',             level: 85 },
      { name: 'JavaScript (ES6+)',    level: 94 },
      { name: 'TailwindCSS & CSS3',   level: 90 },
      { name: 'Responsive UI Design', level: 95 },
    ],
  },
  {
    label: 'Databases & Tuning ⚡',
    accent: '#fbbf24',
    skills: [
      { name: 'PostgreSQL',           level: 92 },
      { name: 'MySQL',                level: 90 },
      { name: 'Schema Design',        level: 90 },
      { name: 'Query Optimization',   level: 88 },
      { name: 'Database Indexing',    level: 86 },
    ],
  },
  {
    label: 'Tools & DevOps 🚀',
    accent: '#f43f5e',
    skills: [
      { name: 'Git & GitHub',         level: 94 },
      { name: 'Git CI/CD Workflows',  level: 86 },
      { name: 'Stripe Integration',   level: 90 },
      { name: 'Postman & Root Cause', level: 92 },
      { name: 'Agile / Scrum',        level: 90 },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   SPIDER-MAN ACTION 4: SUPERHERO 3-POINT GROUND LANDING (SKILLS SECTION)
═══════════════════════════════════════════════════════════ */
const SpiderManSuperheroLanding = ({ inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 2, y: -140 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 2, y: -140 }}
      transition={{ duration: 0.9, type: 'spring', stiffness: 280, damping: 18 }}
      className="hidden md:flex absolute right-6 lg:right-24 top-14 z-20 flex-col items-center pointer-events-none"
    >
      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative flex flex-col items-center"
      >
        {/* Superhero 3-Point Ground Landing Vector */}
        <svg width="84" height="74" viewBox="0 0 120 100" className="drop-shadow-[0_0_26px_rgba(239,68,68,0.9)]">
          {/* Ground Fist Impact */}
          <circle cx="60" cy="85" r="4.5" fill="#dc2626" stroke="#fff" strokeWidth="1.2" />

          {/* Crouched Torso */}
          <path d="M 45 60 C 40 70 48 82 60 85 C 72 82 80 70 75 60 Z" fill="#dc2626" stroke="#090514" strokeWidth="2" />
          <path d="M 48 65 Q 45 74 54 80 Q 50 72 48 65 Z" fill="#0284c7" />
          <path d="M 72 65 Q 75 74 66 80 Q 70 72 72 65 Z" fill="#0284c7" />

          {/* Head looking down/up */}
          <ellipse cx="60" cy="48" rx="14" ry="16" fill="#dc2626" stroke="#090514" strokeWidth="2" />
          <path d="M 52 46 Q 58 44 58 50 Q 55 52 52 49 Z" fill="#fff" stroke="#000" strokeWidth="1.5" />
          <path d="M 68 46 Q 62 44 62 50 Q 65 52 68 49 Z" fill="#fff" stroke="#000" strokeWidth="1.5" />

          {/* Fist Ground Arm */}
          <path d="M 50 58 Q 52 72 60 85" stroke="#dc2626" strokeWidth="5.5" strokeLinecap="round" fill="none" />

          {/* Back Stabilizing Arm */}
          <path d="M 70 58 Q 88 50 95 38" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" fill="none" />

          {/* Deep Bent Landing Legs */}
          <path d="M 48 72 Q 28 65 20 85" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="20" cy="85" r="3.5" fill="#dc2626" />
          <path d="M 72 72 Q 95 70 105 85" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="105" cy="85" r="3.5" fill="#dc2626" />
        </svg>

        {/* Ground Shockwave Radar */}
        <span className="absolute bottom-0 w-20 h-6 rounded-full border border-red-500 animate-ping opacity-60 pointer-events-none" />

        {/* Action Label */}
        <span className="mono text-[10px] font-black text-red-300 mt-1 px-2.5 py-0.5 rounded-full bg-black/90 border border-red-500 shadow-lg">
          💥 HERO LANDING
        </span>
      </motion.div>
    </motion.div>
  );
};

const SkillBar = ({ name, level, accent, inView, delay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="hover"
      className="group cursor-pointer p-1.5 -mx-1 rounded-lg hover:bg-white/5 transition-all"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className={`mono text-xs transition-colors ${hovered ? 'text-white font-bold' : 'text-slate-400'}`}>
          {name}
        </span>
        <motion.span
          animate={{ scale: hovered ? 1.15 : 1 }}
          className="mono text-xs font-bold"
          style={{ color: accent }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          style={{
            transformOrigin: 'left',
            background: `linear-gradient(90deg, ${accent}, #38bdf8, #ffffff)`,
            boxShadow: hovered ? `0 0 16px ${accent}` : `0 0 8px ${accent}60`,
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: level / 100 } : { scaleX: 0 }}
          transition={{ delay: delay + 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
};

const SkillCategoryCard = ({ cat, ci, inView }) => {
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
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: tilt.x, rotateY: tilt.y } : {}}
        transition={{ delay: ci * 0.1, duration: 0.7 }}
        whileHover={{ y: -4, scale: 1.02 }}
        className="relative rounded-2xl overflow-hidden group shadow-xl h-full flex flex-col justify-between"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(16px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Radial Glare */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, ${cat.accent}25 0%, transparent 60%)`,
            opacity: glare.opacity,
          }}
        />

        {/* Top Accent */}
        <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${cat.accent}, transparent)` }} />

        <div className="p-4 sm:p-5" style={{ transform: 'translateZ(15px)' }}>
          {/* Category Header */}
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.accent, boxShadow: `0 0 8px ${cat.accent}` }} />
            <span className="mono text-xs font-bold tracking-widest uppercase" style={{ color: cat.accent }}>
              {cat.label}
            </span>
          </div>

          {/* Skill Bars */}
          <div className="space-y-2.5 sm:space-y-3">
            {cat.skills.map((sk, si) => (
              <SkillBar
                key={sk.name}
                name={sk.name}
                level={sk.level}
                accent={cat.accent}
                inView={inView}
                delay={0.3 + ci * 0.1 + si * 0.06}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });
  const [terminalTab, setTerminalTab] = useState(0);

  const terminalTabs = [
    {
      title: 'spidey stack',
      command: 'pip list | grep -E "django|vue|quasar"',
      lines: [
        'karthikeyan@spidey-portfolio:~$ pip list',
        '├── django@5.1.2 🐍',
        '├── djangorestframework@3.15.0 ⚡',
        '├── django-q2@1.7.0 🕸️',
        '├── vue@3.4.0 🟢',
        '├── quasar@2.14.0 💎',
        '├── postgresql-driver@3.2.0 🗄️',
        '└── spider-sense@active ⚡',
      ],
    },
    {
      title: 'spider_check.py',
      command: 'python manage.py check --deploy',
      lines: [
        'System check identified 0 issues (0 silenced).',
        'Database connections: PostgreSQL [OK], MySQL [OK], Django-Q Queue [ACTIVE]',
        'Spider-Sense Status: 100% Ready for Full-Time Deployment 🕷️',
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-24 sm:py-36 overflow-hidden" style={{ background: '#040408' }}>
      <div className="section-divider" />

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(239,68,68,0.08),transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(14,165,233,0.06),transparent 70%)', filter: 'blur(60px)' }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* ── SPIDER-MAN HERO 3-POINT LANDING ACTION ── */}
        <SpiderManSuperheroLanding inView={inView} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="mono text-xs text-red-400 tracking-[0.25em] uppercase mb-3">
            <span className="code-comment">{'// '}</span>spider_skills.config.py
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight sm:tracking-tighter mb-4">
            Technical{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg,#ef4444,#38bdf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Proficiency
            </span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto font-light">
            Core tech stack, tools, and paradigms utilized to build modern high-throughput software.
          </p>
        </motion.div>

        {/* 3D Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, ci) => (
            <SkillCategoryCard key={cat.label} cat={cat} ci={ci} inView={inView} />
          ))}
        </div>

        {/* Interactive Terminal Sandbox at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-12 sm:mt-16 max-w-2xl mx-auto w-full"
        >
          <div className="terminal shadow-2xl overflow-hidden">
            <div className="terminal-header justify-between flex-wrap gap-2 px-3 sm:px-4 py-2 sm:py-2.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-400" />
                <div className="terminal-dot bg-green-400" />
                <span className="mono text-slate-500 text-xs ml-2 truncate">bash ~ karthi@portfolio</span>
              </div>

              {/* Interactive Tabs */}
              <div className="flex gap-1 flex-wrap">
                {terminalTabs.map((t, idx) => (
                  <button
                    key={t.title}
                    onClick={() => setTerminalTab(idx)}
                    data-cursor="hover"
                    className={`mono text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 rounded transition-all ${
                      terminalTab === idx
                        ? 'bg-indigo-600/40 text-indigo-200 border border-indigo-500/40'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {t.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 sm:p-5 mono text-xs leading-5 sm:leading-6 bg-black/40 overflow-x-auto">
              <p className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">➜</span>
                <span className="text-indigo-300 font-semibold">{terminalTabs[terminalTab].command}</span>
              </p>
              <div className="mt-2 space-y-1 text-slate-400">
                {terminalTabs[terminalTab].lines.map((line, li) => (
                  <p key={li} className="whitespace-pre-wrap sm:whitespace-normal">{line}</p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;