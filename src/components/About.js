import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCopy, FaCheck, FaDownload, FaGraduationCap, FaMedal, FaCode, FaBolt } from 'react-icons/fa';

const SectionLabel = ({ children }) => (
  <p className="mono text-xs text-indigo-400 tracking-[0.25em] uppercase mb-2 flex items-center gap-2 font-semibold">
    <span className="text-indigo-500">{'//'}</span> {children}
  </p>
);

const SectionTitle = ({ children, accent }) => (
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
    {children}
    {accent && (
      <span
        style={{
          backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 50%, #c084fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {' '}{accent}
      </span>
    )}
  </h2>
);

const skills = [
  { name: 'Python', category: 'backend' },
  { name: 'Django & DRF', category: 'backend' },
  { name: 'Vue.js 3', category: 'frontend' },
  { name: 'Quasar', category: 'frontend' },
  { name: 'React.js', category: 'frontend' },
  { name: 'JavaScript (ES6+)', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'MySQL', category: 'database' },
  { name: 'Django-Q (Queues)', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'Stripe API', category: 'backend' },
  { name: 'Docker', category: 'devops' },
  { name: 'Git & CI/CD', category: 'devops' },
  { name: 'TailwindCSS', category: 'frontend' },
  { name: 'Java & Spring Boot', category: 'backend' },
  { name: 'Query Optimization', category: 'database' },
  { name: 'Database Indexing', category: 'database' },
];

/* 3D Tilt Highlight Card */
const HighlightCard = ({ icon: Icon, title, desc, accent, delay, inView }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setTilt({ x: -y, y: x });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: tilt.x, rotateY: tilt.y } : {}}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -4 }}
      className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-indigo-500/30 transition-all group backdrop-blur-md"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5" style={{ background: `${accent}18` }}>
        <Icon style={{ color: accent, fontSize: 18 }} />
      </div>
      <h4 className="text-white text-sm font-bold tracking-tight mb-1 group-hover:text-indigo-300 transition-colors">
        {title}
      </h4>
      <p className="text-slate-400 text-xs leading-relaxed font-normal">
        {desc}
      </p>
    </motion.div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, margin: '-60px' });
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const jsonCode = `{
  "developer": "Karthikeyan S",
  "role": "Full Stack Developer",
  "location": "Tiruchirappalli, Tamil Nadu, India",
  "experience": "1.7+ Years (Production)",
  "education": [
    "M.Sc. Computer Science (77%) - Bishop Heber College",
    "B.Sc. Computer Science (78%) - Bishop Heber College"
  ],
  "certifications": [
    "Java Full Stack - Softlogic Institute",
    "Java Fundamentals - IBM Developer Skills Network"
  ],
  "athletics": "University Gold Medalist & State Bronze Medalist",
  "specialties": [
    "Python / Django / DRF",
    "Vue.js 3 / Quasar / React",
    "PostgreSQL / MySQL Tuning",
    "Django-Q / Stripe Payments"
  ],
  "contact": {
    "phone": "+91 87780 76919",
    "email": "karthikeyancs10@gmail.com",
    "linkedin": "linkedin.com/in/karthikeyanssd",
    "portfolio": "https://portfoliosk-react.vercel.app/"
  },
  "status": "Available for Full-Time Roles"
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(jsonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-36 overflow-hidden bg-[#07090e]"
    >
      <div className="section-divider mb-0" />

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)', filter: 'blur(90px)' }}
        />
        <div
          className="absolute bottom-10 left-0 w-[450px] h-[450px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.05), transparent 70%)', filter: 'blur(90px)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Narrative & Pillars ── */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <SectionLabel>Professional Overview</SectionLabel>
              <SectionTitle accent="Purpose & Reliability">
                Engineering With
              </SectionTitle>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal"
            >
              I am a dedicated <span className="text-white font-semibold">Full Stack Developer</span> with 1.7+ years of production experience crafting performant web platforms. My core stack centers on <span className="text-indigo-400 font-medium">Python, Django, Django REST Framework, Vue.js 3, Quasar, and PostgreSQL</span>, bridging clean backend architecture with intuitive, responsive user experiences.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal"
            >
              Beyond technical engineering, I bring an elite athletic background as a <span className="text-white font-semibold">University Gold Medalist & State Bronze Medalist in Athletics</span>. That competitive training instills deep daily discipline, endurance through complex debugging sessions, and high focus under pressure.
            </motion.p>

            {/* Quick Education & Athletic Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.28 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1"
            >
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                <FaGraduationCap className="text-indigo-400 text-lg flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-white text-xs font-bold">M.Sc. & B.Sc. Computer Science</h5>
                  <p className="mono text-[11px] text-slate-400 mt-0.5">Bishop Heber College, Trichy (77% & 78%)</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                <FaMedal className="text-amber-400 text-lg flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-white text-xs font-bold">Gold & Bronze Medalist</h5>
                  <p className="mono text-[11px] text-slate-400 mt-0.5">University & State Athletic Track Meets</p>
                </div>
              </div>
            </motion.div>

            {/* 4 Engineering Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <HighlightCard
                icon={FaBolt}
                title="Performance Optimization"
                desc="Engineered query indexing and caching yielding 40% faster response times across datasets."
                accent="#3b82f6"
                delay={0.35}
                inView={inView}
              />
              <HighlightCard
                icon={FaCode}
                title="Full-Stack Delivery"
                desc="10+ scalable RESTful APIs shipped with end-to-end frontend interfaces in Vue 3 and Quasar."
                accent="#8b5cf6"
                delay={0.42}
                inView={inView}
              />
            </div>

            {/* Resume Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="pt-2"
            >
              <a
                href="/resume.pdf"
                download="Karthikeyan_S_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs text-white bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.09] hover:border-indigo-500/40 transition-all cursor-pointer shadow-sm"
              >
                <FaDownload size={12} className="text-indigo-400" />
                <span>Download Official Resume (PDF)</span>
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT: Terminal JSON Profile & Competencies ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="space-y-6"
          >
            {/* Developer JSON Terminal */}
            <div className="terminal shadow-2xl">
              <div className="terminal-header justify-between">
                <div className="flex items-center gap-2">
                  <div className="terminal-dot bg-red-500/80" />
                  <div className="terminal-dot bg-amber-500/80" />
                  <div className="terminal-dot bg-emerald-500/80" />
                  <span className="mono text-xs text-slate-400 ml-2 font-medium">developer_profile.json</span>
                </div>

                <button
                  onClick={copyCode}
                  data-cursor="button"
                  data-cursor-text={copied ? "COPIED" : "COPY"}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] mono text-slate-400 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <FaCheck className="text-emerald-400" size={10} />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy size={10} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 sm:p-5 mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-slate-300 bg-[#080b12]/90">
                <pre className="text-slate-300">
                  <code dangerouslySetInnerHTML={{
                    __html: jsonCode
                      .replace(/"(.*?)":/g, '<span class="code-keyword">"$1"</span>:')
                      .replace(/: "(.*?)"/g, ': <span class="code-string">"$1"</span>')
                      .replace(/: true/g, ': <span class="code-function">true</span>')
                  }} />
                </pre>
              </div>
            </div>

            {/* Interactive Core Competencies Filter */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
              <div className="flex items-center justify-between mb-3.5">
                <h4 className="text-white text-xs font-bold tracking-wider uppercase mono">
                  Core Competencies
                </h4>
                <div className="flex gap-1.5 flex-wrap">
                  {['all', 'backend', 'frontend', 'database'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      data-cursor="button"
                      className={`px-2.5 py-0.5 rounded-lg text-[10px] mono font-semibold capitalize transition-all cursor-pointer ${
                        activeCategory === cat
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                          : 'text-slate-400 hover:text-slate-200 bg-white/[0.04]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {filteredSkills.map((s) => (
                  <span
                    key={s.name}
                    className="px-2.5 py-1 rounded-lg text-xs mono font-medium text-slate-300 bg-white/[0.04] border border-white/[0.06] hover:border-indigo-500/40 hover:text-white transition-colors cursor-default"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;