import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const categories = [
  {
    label: 'Backend & Architecture',
    accent: '#3b82f6',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'Django & DRF', level: 95 },
      { name: 'RESTful API Architecture', level: 96 },
      { name: 'Django-Q (Task Queues)', level: 88 },
      { name: 'JWT & RBAC Authentication', level: 92 },
      { name: 'Java & Spring Boot', level: 78 },
    ],
  },
  {
    label: 'Frontend & Reactive UI',
    accent: '#8b5cf6',
    skills: [
      { name: 'Vue.js 3', level: 92 },
      { name: 'Quasar Framework', level: 90 },
      { name: 'React.js', level: 86 },
      { name: 'JavaScript (ES6+) & TypeScript', level: 93 },
      { name: 'TailwindCSS & CSS3', level: 92 },
      { name: 'Responsive Web Design', level: 95 },
    ],
  },
  {
    label: 'Databases & Query Tuning',
    accent: '#10b981',
    skills: [
      { name: 'PostgreSQL', level: 92 },
      { name: 'MySQL', level: 90 },
      { name: 'Relational Schema Design', level: 92 },
      { name: 'Composite Indexing', level: 88 },
      { name: 'SQL Query Optimization', level: 88 },
      { name: 'Database Normalization', level: 90 },
    ],
  },
  {
    label: 'DevOps & Tooling',
    accent: '#f59e0b',
    skills: [
      { name: 'Git & GitHub Workflows', level: 94 },
      { name: 'CI/CD Pipelines', level: 86 },
      { name: 'Docker Containers', level: 82 },
      { name: 'Stripe API Integration', level: 90 },
      { name: 'Postman & Root-Cause QA', level: 92 },
      { name: 'Agile & Scrum Practices', level: 90 },
    ],
  },
];

const SkillBar = ({ name, level, accent, inView, delay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="hover"
      className="p-1.5 -mx-1 rounded-lg hover:bg-white/[0.04] transition-all cursor-default"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className={`mono text-xs transition-colors ${hovered ? 'text-white font-bold' : 'text-slate-300'}`}>
          {name}
        </span>
        <motion.span
          animate={{ scale: hovered ? 1.12 : 1 }}
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
            background: `linear-gradient(90deg, ${accent}, #818cf8, #ffffff)`,
            boxShadow: hovered ? `0 0 12px ${accent}` : `0 0 6px ${accent}40`,
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: level / 100 } : { scaleX: 0 }}
          transition={{ delay: delay + 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
};

const SkillCategoryCard = ({ cat, ci, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: ci * 0.1, duration: 0.7 }}
      whileHover={{ y: -4 }}
      className="relative rounded-2xl overflow-hidden shadow-xl h-full flex flex-col justify-between p-5 sm:p-6 bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/35 transition-all backdrop-blur-md"
    >
      {/* Top Accent Line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${cat.accent}, transparent)` }}
      />

      <div>
        <div className="flex items-center gap-2 mb-5">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: cat.accent, boxShadow: `0 0 8px ${cat.accent}` }}
          />
          <h3 className="mono text-xs font-bold tracking-wider uppercase text-white">
            {cat.label}
          </h3>
        </div>

        <div className="space-y-3">
          {cat.skills.map((sk, si) => (
            <SkillBar
              key={sk.name}
              name={sk.name}
              level={sk.level}
              accent={cat.accent}
              inView={inView}
              delay={0.25 + ci * 0.1 + si * 0.05}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });
  const [terminalTab, setTerminalTab] = useState(0);

  const terminalTabs = [
    {
      title: 'runtime-env',
      command: 'pip list | grep -E "django|vue|quasar|postgres"',
      lines: [
        'karthi@production-server:~$ pip list --format=columns',
        'Package                  Version      Status',
        '-----------------------  -----------  -------',
        'Django                   5.1.2        Production-Ready',
        'djangorestframework      3.15.0       Active',
        'django-q2                1.7.0        Workers Live',
        'vue                      3.4.0        Reactive',
        'quasar                   2.14.0       UI Core',
        'psycopg2-binary          2.9.9        Connected',
      ],
    },
    {
      title: 'benchmarks',
      command: 'python manage.py test_perf --all',
      lines: [
        'Starting API throughput verification...',
        '✓ REST API Latency: 25% reduction with optimized querysets',
        '✓ PostgreSQL Query Times: 40% speedup via composite indexing',
        '✓ Frontend Load Time: +25% performance boost using Quasar UI components',
        '✓ Status: All 42 unit & integration tests passed in 1.48s [SUCCESS]',
      ],
    },
    {
      title: 'system-status',
      command: 'systemctl status fullstack-app',
      lines: [
        '● fullstack-app.service - Karthikeyan Portfolio Production App',
        '   Loaded: loaded (/etc/systemd/system/fullstack-app.service)',
        '   Active: active (running) - Uptime 99.9%',
        '   Main PID: 1042 (gunicorn/uvicorn workers)',
        '   Memory: 184.2M / 1.0G (Optimized)',
        '   Tasks: 4 worker threads handling asynchronous queues',
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-24 sm:py-36 overflow-hidden bg-[#07090e]">
      <div className="section-divider mb-0" />

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)', filter: 'blur(90px)' }}
        />
        <div
          className="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.05), transparent 70%)', filter: 'blur(90px)' }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto"
        >
          <p className="mono text-xs text-indigo-400 tracking-[0.25em] uppercase mb-2 font-semibold">
            {'// '}TECHNICAL TOOLKIT & ARCHITECTURE
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Technical Proficiency &{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 50%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Core Competencies
            </span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 font-normal">
            Comprehensive skill set spanning high-throughput backend APIs, reactive frontend frameworks, relational database optimization, and CI/CD pipelines.
          </p>
        </motion.div>

        {/* 4-Column Skill Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {categories.map((cat, ci) => (
            <SkillCategoryCard key={cat.label} cat={cat} ci={ci} inView={inView} />
          ))}
        </div>

        {/* Interactive Developer Terminal Sandbox */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-12 sm:mt-16 max-w-3xl mx-auto w-full"
        >
          <div className="terminal shadow-2xl overflow-hidden">
            <div className="terminal-header justify-between flex-wrap gap-2 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="terminal-dot bg-red-500/80" />
                <div className="terminal-dot bg-amber-500/80" />
                <div className="terminal-dot bg-emerald-500/80" />
                <span className="mono text-slate-400 text-xs ml-2 font-medium">bash ~ karthi@portfolio</span>
              </div>

              {/* Tabs */}
              <div className="flex gap-1.5 flex-wrap">
                {terminalTabs.map((t, idx) => (
                  <button
                    key={t.title}
                    onClick={() => setTerminalTab(idx)}
                    data-cursor="button"
                    className={`mono text-[11px] px-2.5 py-1 rounded-lg transition-all cursor-pointer font-medium ${
                      terminalTab === idx
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 bg-white/[0.04]'
                    }`}
                  >
                    {t.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-5 mono text-xs leading-6 bg-[#080b12]/95 overflow-x-auto">
              <p className="flex items-center gap-2 mb-2">
                <span className="text-emerald-400 font-bold">➜</span>
                <span className="text-indigo-300 font-semibold">{terminalTabs[terminalTab].command}</span>
              </p>
              <div className="space-y-1 text-slate-300">
                {terminalTabs[terminalTab].lines.map((line, li) => (
                  <p key={li} className="whitespace-pre">{line}</p>
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