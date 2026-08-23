import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaCopy, FaCheck, FaPaperPlane } from 'react-icons/fa';
import emailjs from 'emailjs-com';

/* ═══════════════════════════════════════════════════════════
   SPIDER-MAN ACTION 5: PERCHED ON ROOFTOP TRANSMITTER (CONTACT SECTION)
═══════════════════════════════════════════════════════════ */
const SpiderManPerched = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 1, type: 'spring', stiffness: 240, damping: 20 }}
      className="hidden md:flex absolute right-8 lg:right-28 top-12 z-20 flex-col items-center pointer-events-none"
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative flex flex-col items-center"
      >
        {/* Electric Spider-Sense Radar Arcs */}
        <div className="absolute -top-7 flex items-center gap-1">
          <span className="text-xs text-red-500 font-bold animate-ping">⚡</span>
          <span className="text-sm text-cyan-400 font-bold animate-bounce">⚡</span>
          <span className="text-xs text-red-500 font-bold animate-ping">⚡</span>
        </div>

        {/* Perched Crouching Spider-Man Vector */}
        <svg width="76" height="82" viewBox="0 0 100 120" className="drop-shadow-[0_0_24px_rgba(239,68,68,0.85)]">
          {/* Head perched looking right at user */}
          <ellipse cx="50" cy="40" rx="15" ry="17" fill="#dc2626" stroke="#090514" strokeWidth="2" />
          <path d="M 50 23 L 50 57 M 35 40 L 65 40" stroke="#000" strokeWidth="1" opacity="0.6" />
          {/* Glowing Alert Lenses */}
          <path d="M 38 38 Q 46 35 47 42 Q 43 45 38 42 Z" fill="#fff" stroke="#000" strokeWidth="1.5" />
          <path d="M 62 38 Q 54 35 53 42 Q 57 45 62 42 Z" fill="#fff" stroke="#000" strokeWidth="1.5" />

          {/* Deep Perched Crouched Torso */}
          <path d="M 40 55 C 34 68 38 85 50 92 C 62 85 66 68 60 55 Z" fill="#dc2626" stroke="#090514" strokeWidth="2" />
          <path d="M 44 65 Q 42 75 49 84 Q 46 75 44 65 Z" fill="#0284c7" />
          <path d="M 56 65 Q 58 75 51 84 Q 54 75 56 65 Z" fill="#0284c7" />

          {/* Perched Arms resting on knees */}
          <path d="M 42 58 Q 28 65 35 85" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M 58 58 Q 72 65 65 85" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" fill="none" />

          {/* Perched Folded Legs */}
          <path d="M 45 80 Q 22 85 18 105" stroke="#0284c7" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <circle cx="18" cy="105" r="4" fill="#dc2626" />
          <path d="M 55 80 Q 78 85 82 105" stroke="#0284c7" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <circle cx="82" cy="105" r="4" fill="#dc2626" />
        </svg>

        {/* Perched Radar Pill */}
        <span className="mono text-[10px] font-black text-cyan-300 px-2.5 py-0.5 rounded-full bg-black/90 border border-cyan-400 shadow-md">
          📡 SENSE ACTIVE
        </span>
      </motion.div>
    </motion.div>
  );
};

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [copiedItem, setCopiedItem] = useState(null);

  const handleChange = (e) => setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send('service_p5karthik', 'template_c0km3i8', formData, 'I6pjqY--4GRoQhoqP');
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      Icon: FaEnvelope,
      label: 'Email',
      value: 'karthikeyancs10@gmail.com',
      copyValue: 'karthikeyancs10@gmail.com',
      href: 'mailto:karthikeyancs10@gmail.com',
      color: '#818cf8',
    },
    {
      Icon: FaPhone,
      label: 'Phone',
      value: '+91 87780 76919',
      copyValue: '+918778076919',
      href: 'tel:+918778076919',
      color: '#34d399',
    },
    {
      Icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Trichy, Tamil Nadu, India',
      copyValue: 'Trichy, Tamil Nadu, India',
      href: '#',
      color: '#f472b6',
    },
    {
      Icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/karthikeyanssd',
      copyValue: 'https://www.linkedin.com/in/karthikeyanssd',
      href: 'https://www.linkedin.com/in/karthikeyanssd',
      color: '#0ea5e9',
    },
    {
      Icon: FaGithub,
      label: 'GitHub',
      value: 'github.com/karthikeyanssd',
      copyValue: 'https://github.com',
      href: 'https://github.com',
      color: '#e2e8f0',
    },
  ];

  const inputClass = `
    w-full bg-black/40 border rounded-xl px-3.5 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm text-slate-200 placeholder-slate-600
    mono outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-indigo-950/20 focus:shadow-[0_0_20px_rgba(99,102,241,0.25)]
  `;

  return (
    <section id="contact" className="relative py-20 sm:py-32 overflow-hidden" style={{ background: '#040408' }}>
      <div className="section-divider" />

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.08),transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(236,72,153,0.07),transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* ── SPIDER-MAN PERCHED ACTION ── */}
        <SpiderManPerched />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="mono text-xs text-slate-500 tracking-[0.25em] uppercase mb-3">
            <span className="code-comment">{'// '}</span>contact.ts
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight sm:tracking-tighter mb-4">
            Let's{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg,#818cf8,#c084fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Connect
            </span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto font-light">
            Have a project in mind, an open role, or just want to chat about tech? Drop a message below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-10" style={{ perspective: '1200px' }}>

          {/* ── LEFT: Interactive Contact Badges ── */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ delay: 0.1, duration: 0.8, type: 'spring', stiffness: 220, damping: 22 }}
            className="space-y-3.5 sm:space-y-4"
          >
            {/* Status card */}
            <div className="terminal rounded-2xl mb-4 sm:mb-6 shadow-xl border border-red-500/20">
              <div className="terminal-header rounded-t-2xl px-4 py-2.5">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-400" />
                <div className="terminal-dot bg-cyan-400" />
                <span className="mono text-slate-400 text-xs ml-2">spider_status.sh</span>
              </div>
              <div className="p-4 sm:p-5 mono text-xs leading-5 sm:leading-6 bg-black/40">
                <p className="flex items-center gap-2">
                  <span className="text-red-400">🕷️ $</span>
                  <span className="text-sky-300">check_availability</span>
                </p>
                <p className="mt-1 text-emerald-300">"Available for Full-Time Roles & Opportunities"</p>
                <p className="mt-2.5 sm:mt-3 flex items-center gap-2">
                  <span className="text-red-400">🕷️ $</span>
                  <span className="text-sky-300">spider_sense_speed</span>
                </p>
                <p className="text-cyan-300">"Response within 24 hours ⚡"</p>
              </div>
            </div>

            {contactInfo.map(({ Icon, label, value, copyValue, href, color }) => (
              <motion.div
                key={label}
                whileHover={{ x: 6, scale: 1.01, backgroundColor: 'rgba(255,255,255,0.06)' }}
                data-cursor="hover"
                data-cursor-text={label === 'LinkedIn' || label === 'GitHub' ? 'VISIT' : 'COPY'}
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl group transition-all border border-white/5 hover:border-indigo-500/40"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1 cursor-pointer"
                >
                  <div
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: `${color}20`, border: `1px solid ${color}40` }}
                  >
                    <Icon style={{ color }} className="text-sm sm:text-base" />
                  </div>
                  <div className="min-w-0">
                    <p className="mono text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest">{label}</p>
                    <p className="text-slate-200 text-xs sm:text-sm font-medium truncate group-hover:text-indigo-300 transition-colors">
                      {value}
                    </p>
                  </div>
                </a>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(copyValue, label);
                  }}
                  data-cursor="button"
                  title={`Copy ${label}`}
                  className="p-2 rounded-lg hover:bg-white/10 text-[11px] sm:text-xs text-slate-500 hover:text-indigo-300 transition-all ml-2 flex-shrink-0 cursor-pointer"
                >
                  {copiedItem === label ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-bold mono">
                      <FaCheck size={11} />
                    </span>
                  ) : (
                    <FaCopy size={13} className="opacity-60 hover:opacity-100" />
                  )}
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* ── RIGHT: Interactive Terminal Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring', stiffness: 220, damping: 22 }}
          >
            <div className="terminal rounded-2xl shadow-2xl">
              <div className="terminal-header rounded-t-2xl px-4 py-2.5">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-400" />
                <div className="terminal-dot bg-green-400" />
                <span className="mono text-slate-500 text-xs ml-2">send_message.ts</span>
              </div>

              <div className="p-4 sm:p-6 md:p-8">
                {/* Status Alert */}
                <AnimatePresence>
                  {status && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`mb-6 p-3 sm:p-4 rounded-xl mono text-xs sm:text-sm ${
                        status === 'success'
                          ? 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/30'
                          : 'text-rose-400 bg-rose-400/10 border border-rose-400/30'
                      }`}
                    >
                      {status === 'success'
                        ? '✅ Message sent successfully! I will reply within 24 hours.'
                        : '❌ Failed to send message. Please reach out directly at karthikeyancs10@gmail.com'}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="mono text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-widest block mb-1.5 sm:mb-2">
                        Your Name <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Karthi Keyan"
                        className={inputClass}
                        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                      />
                    </div>
                    <div>
                      <label className="mono text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-widest block mb-1.5 sm:mb-2">
                        Your Email <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="karthi@example.com"
                        className={inputClass}
                        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mono text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-widest block mb-1.5 sm:mb-2">
                      Subject
                    </label>
                    <input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project Opportunity / Collaboration / Inquiry"
                      className={inputClass}
                      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                    />
                  </div>

                  <div>
                    <label className="mono text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-widest block mb-1.5 sm:mb-2">
                      Message <span className="text-indigo-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell me about your project goals, scope, timeline, or requirements..."
                      className={`${inputClass} resize-none`}
                      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 35px rgba(239,68,68,0.7), 0 0 15px rgba(14,165,233,0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    data-cursor="button"
                    className="w-full py-3.5 sm:py-4 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 shadow-xl cursor-pointer disabled:opacity-60 transition-all"
                    style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)' }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                          ⟳
                        </motion.span>
                        <span>Shooting Web Payload...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane size={13} />
                        <span>Shoot Message 🕸️</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;