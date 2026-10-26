import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaRocket, FaCode, FaCheckCircle, FaLaptopCode } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: 'Property Management System (PMS)',
    company: 'InfiniTechX Technologies Pvt Ltd',
    description: 'Enterprise full-stack SaaS platform automating property management lifecycle — tenant rent collections, security deposit handling, owner disbursements, and reserve funds.',
    technologies: ['Python', 'Django', 'DRF', 'Vue.js 3', 'Quasar', 'PostgreSQL', 'Django-Q', 'Stripe'],
    category: 'saas',
    github: 'https://github.com/karthikeyanssd',
    live: 'https://demo-property.example.com',
    accent: '#3b82f6',
    stats: '60% Faster Ops',
    features: [
      'Automated tenant tracking, recurring rent collection & digital lease records',
      'Dynamic financial reporting and reserve fund dashboards cutting calculation time by 50%',
      'Integrated Stripe payment processing with security-deposit-first architecture',
      'Asynchronous task scheduling via Django-Q worker queues for report generation',
    ],
  },
  {
    id: 2,
    title: 'Multi-Banking Secured System',
    company: 'Softlogic Institute',
    description: 'Consolidated banking gateway enabling customers to securely monitor and manage accounts across multiple financial institutions through single-sign-on (SSO).',
    technologies: ['Java', 'JavaScript', 'Bootstrap', 'MySQL', 'REST API', 'HTML5/CSS3'],
    category: 'enterprise',
    github: 'https://github.com/karthikeyanssd',
    live: 'https://demo-banking.example.com',
    accent: '#8b5cf6',
    stats: 'Single-Access SSO',
    features: [
      'Unified multi-bank access dashboard allowing cross-account monitoring in real-time',
      'Cryptographic email-based token recovery and session timeout protocols',
      'Admin portal with granular role-based access control (RBAC) and audit trails',
      'Responsive interface ensuring high-speed client interactions and low memory footprint',
    ],
  },
  {
    id: 3,
    title: 'Athletic Tournament & Scoring Platform',
    company: 'University & State Meet',
    description: 'Athletic event management system automating athlete registration, heat generation, live sprint timing recording, and real-time tournament leaderboards.',
    technologies: ['Python', 'Django', 'JavaScript', 'PostgreSQL', 'HTML5/CSS3'],
    category: 'fullstack',
    github: 'https://github.com/karthikeyanssd',
    live: 'https://demo-athletic.example.com',
    accent: '#10b981',
    stats: 'Automated Heat Seeding',
    features: [
      'Automated competitor seeding and heat assignment algorithms based on entry times',
      'Sub-second sprint timing capture with live scoreboard updates for spectators',
      'Instant certificate generation and tournament analytics export (PDF/CSV)',
      'Designed and tested by a University Gold Medalist & State Bronze Medalist athlete',
    ],
  },
];

const filters = [
  { key: 'all', label: 'All Projects', icon: FaRocket },
  { key: 'saas', label: 'Enterprise SaaS', icon: FaLaptopCode },
  { key: 'fullstack', label: 'Full Stack Systems', icon: FaCode },
];

/* 3D Interactive Project Card */
const ProjectCard = ({ project, idx, inView }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [hovered, setHovered] = useState(false);

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
      style={{ perspective: '1200px' }}
      className="w-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: tilt.x, rotateY: tilt.y } : {}}
        transition={{ delay: 0.15 + idx * 0.12, duration: 0.7 }}
        whileHover={{ y: -6 }}
        className="relative rounded-2xl overflow-hidden group h-full flex flex-col justify-between"
        style={{
          background: 'rgba(13, 17, 26, 0.7)',
          border: hovered ? `1px solid ${project.accent}80` : '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: hovered
            ? `0 20px 45px -10px ${project.accent}25, 0 0 1px 1px ${project.accent}40`
            : '0 10px 30px rgba(0, 0, 0, 0.4)',
          transformStyle: 'preserve-3d',
          backdropFilter: 'blur(16px)',
          transition: 'border 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Specular glare */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, ${project.accent}20 0%, transparent 65%)`,
            opacity: glare.opacity,
          }}
        />

        {/* Top Accent Line */}
        <div
          className="h-[2px] w-full"
          style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
        />

        {/* Terminal Header */}
        <div
          className="terminal-header rounded-none justify-between px-4 py-2.5"
          style={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            background: 'rgba(10, 14, 22, 0.8)',
            transform: 'translateZ(10px)',
          }}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="terminal-dot bg-red-500/80" />
            <div className="terminal-dot bg-amber-500/80" />
            <div className="terminal-dot bg-emerald-500/80" />
            <span className="mono text-slate-400 text-[11px] ml-2 truncate">
              {project.company}
            </span>
          </div>

          <span
            className="mono text-[10px] px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider flex-shrink-0"
            style={{ background: `${project.accent}15`, color: project.accent }}
          >
            {project.stats}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between" style={{ transform: 'translateZ(15px)' }}>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight group-hover:text-indigo-300 transition-colors">
              {project.title}
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
              {project.description}
            </p>

            {/* Features List */}
            <div className="space-y-2 mb-5">
              {project.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <FaCheckCircle
                    size={11}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: project.accent }}
                  />
                  <span className="leading-snug">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies & Links */}
          <div>
            <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-white/[0.06]">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="mono text-[11px] px-2.5 py-1 rounded-lg text-slate-300 bg-white/[0.04] border border-white/[0.06] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="button"
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08]"
              >
                <FaGithub size={13} />
                <span>Source Code</span>
              </a>

              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="button"
                className="flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-lg transition-all shadow-sm"
                style={{ background: `linear-gradient(135deg, ${project.accent}, #6366f1)` }}
              >
                <span>Live Preview</span>
                <FaExternalLinkAlt size={10} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 sm:py-36 overflow-hidden bg-[#07090e]">
      <div className="section-divider mb-0" />

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)', filter: 'blur(90px)' }}
        />
        <div
          className="absolute bottom-10 left-1/4 w-[450px] h-[450px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.05), transparent 70%)', filter: 'blur(90px)' }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <p className="mono text-xs text-indigo-400 tracking-[0.25em] uppercase mb-2 font-semibold">
            {'// '}PORTFOLIO & CASE STUDIES
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Featured Projects &{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 50%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Enterprise Systems
            </span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 font-normal">
            Real-world full-stack platforms delivering measurable business efficiency, clean asynchronous workers, and robust data integrity.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {filters.map((f) => {
            const Icon = f.icon;
            const isActive = activeFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                data-cursor="button"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                    : 'text-slate-400 hover:text-white bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06]'
                }`}
              >
                <Icon size={12} />
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <ProjectCard key={project.id} project={project} idx={idx} inView={inView} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;