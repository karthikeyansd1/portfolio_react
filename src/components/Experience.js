import React, { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaBriefcase, FaCode, FaDatabase, FaShieldAlt, FaRocket
} from 'react-icons/fa';

const achievements = [
  {
    icon: FaCode,
    color: '#3b82f6',
    title: 'High-Throughput RESTful APIs',
    desc: 'Architected and deployed 10+ RESTful endpoints in Python & Django with tailored serializers and select_related query optimization.',
    metric: '25% Latency Reduction',
  },
  {
    icon: FaRocket,
    color: '#8b5cf6',
    title: 'Reactive PMS Frontend Modules',
    desc: 'Built dynamic Property Management System (PMS) interfaces using Vue.js 3, Quasar Framework, and responsive state pipelines.',
    metric: '+20–30% Render Speed',
  },
  {
    icon: FaDatabase,
    color: '#10b981',
    title: 'PostgreSQL & MySQL Schema Tuning',
    desc: 'Redesigned core relational schemas, integrated composite indexes, and eliminated N+1 bottlenecks across heavy reporting tables.',
    metric: '40% Faster Query Exec',
  },
  {
    icon: FaShieldAlt,
    color: '#f43f5e',
    title: 'Stripe Payments & JWT Security',
    desc: 'Implemented Stripe payment processing for tenant billing, security deposits, and token-based authentication with strict RBAC.',
    metric: 'Enterprise Auth Standards',
  },
  {
    icon: FaBriefcase,
    color: '#f59e0b',
    title: 'Django-Q Queues & Bug Resolution',
    desc: 'Stabilized asynchronous worker queues for background disbursements and systematically resolved 30+ production defects.',
    metric: '40% Drop in Prod Defects',
  },
];

/* 3D Workstation Photo Card */
const WorkstationPhotoCard = ({ inView }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
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
      data-cursor-text="WORKSTATION"
      style={{ perspective: '1200px' }}
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
            ? 'linear-gradient(135deg, #3b82f6, #6366f1, #a855f7)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(99,102,241,0.2), rgba(255,255,255,0.05))',
          boxShadow: hovered
            ? '0 25px 60px -15px rgba(99, 102, 241, 0.35)'
            : '0 20px 40px -20px rgba(0, 0, 0, 0.7)',
        }}
      >
        <div className="relative rounded-[22px] overflow-hidden bg-[#0a0e18]" style={{ transformStyle: 'preserve-3d' }}>
          {/* Workstation photo */}
          <motion.div
            style={{
              transform: hovered ? 'scale(1.03) translateZ(10px)' : 'scale(1) translateZ(0px)',
              transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <img
              src="/experience_pic.jpg"
              alt="Karthikeyan S - Software Developer Workstation"
              className="w-full h-auto object-cover aspect-[4/5] block rounded-[22px]"
            />
          </motion.div>

          {/* Vignette Gradients */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(7,9,14,0.95) 0%, rgba(7,9,14,0.3) 45%, transparent 75%)',
            }}
          />

          {/* Glare specular */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.15) 0%, transparent 65%)`,
              opacity: glare.opacity,
            }}
          />

          {/* Top Company Badge */}
          <div
            className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none"
            style={{
              transform: hovered ? 'translateZ(45px)' : 'translateZ(0px)',
              transition: 'transform 0.4s ease',
            }}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#07090e]/85 backdrop-blur-md border border-white/10 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="mono text-[10px] text-slate-200 font-semibold tracking-wide">
                InfiniTechX Technologies
              </span>
            </div>

            <div className="px-2.5 py-1 rounded-xl bg-indigo-600/80 backdrop-blur-md text-white text-[10px] mono font-bold shadow-md">
              Full Stack
            </div>
          </div>

          {/* Bottom Info Plate */}
          <div
            className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0d121f]/90 backdrop-blur-md border border-white/10 shadow-xl pointer-events-none"
            style={{
              transform: hovered ? 'translateZ(50px)' : 'translateZ(0px)',
              transition: 'transform 0.4s ease',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-sm tracking-tight">
                  Full Stack Developer
                </p>
                <p className="mono text-[11px] text-indigo-300 font-medium mt-0.5">
                  InfiniTechX Technologies Pvt Ltd
                </p>
              </div>
              <span className="mono text-[10px] text-slate-300 px-2 py-1 rounded-lg bg-white/[0.06] border border-white/10">
                Feb 2025 – Present
              </span>
            </div>
            <div className="mono text-[10px] text-slate-400 mt-2.5 pt-2 border-t border-white/[0.08] flex items-center justify-between">
              <span>Tiruchirappalli, Tamil Nadu</span>
              <span className="text-emerald-400 font-semibold">Active Role</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, margin: '-60px' });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 sm:py-36 overflow-hidden bg-[#07090e]"
    >
      <div className="section-divider mb-0" />

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06), transparent 70%)', filter: 'blur(90px)' }}
        />
        <div
          className="absolute bottom-10 right-0 w-[450px] h-[450px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)', filter: 'blur(90px)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <p className="mono text-xs text-indigo-400 tracking-[0.25em] uppercase mb-2 font-semibold">
            {'// '}CAREER TRACK & ACHIEVEMENTS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Work Experience &{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 50%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Engineering Impact
            </span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 font-normal">
            Proven track record of architecting scalable backend APIs, optimizing database throughput, and shipping production features.
          </p>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-14 items-start">
          {/* Left: Workstation Photo Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <WorkstationPhotoCard inView={inView} />
          </motion.div>

          {/* Right: Key Achievements Timeline */}
          <div className="space-y-4">
            {achievements.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  whileHover={{ x: 6 }}
                  className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-indigo-500/35 transition-all group backdrop-blur-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${item.color}15` }}
                      >
                        <Icon style={{ color: item.color, fontSize: 16 }} />
                      </div>
                      <h4 className="text-white text-sm sm:text-base font-bold tracking-tight group-hover:text-indigo-300 transition-colors">
                        {item.title}
                      </h4>
                    </div>

                    <span
                      className="mono text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full self-start sm:self-auto"
                      style={{ background: `${item.color}15`, color: item.color }}
                    >
                      {item.metric}
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-0 sm:pl-12 font-normal">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;