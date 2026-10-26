import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaCopy, FaCheck, FaPaperPlane, FaFileDownload
} from 'react-icons/fa';
import emailjs from 'emailjs-com';

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
    setTimeout(() => setCopiedItem(null), 2200);
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
      setTimeout(() => setStatus(null), 6000);
    }
  };

  const contactInfo = [
    {
      Icon: FaEnvelope,
      label: 'Email',
      value: 'karthikeyancs10@gmail.com',
      copyValue: 'karthikeyancs10@gmail.com',
      href: 'mailto:karthikeyancs10@gmail.com',
      color: '#3b82f6',
    },
    {
      Icon: FaPhone,
      label: 'Phone',
      value: '+91 87780 76919',
      copyValue: '+918778076919',
      href: 'tel:+918778076919',
      color: '#10b981',
    },
    {
      Icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Tiruchirappalli, Tamil Nadu, India',
      copyValue: 'Tiruchirappalli, Tamil Nadu, India',
      href: '#',
      color: '#8b5cf6',
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
      copyValue: 'https://github.com/karthikeyanssd',
      href: 'https://github.com',
      color: '#e2e8f0',
    },
  ];

  const inputClass = `
    w-full bg-[#080b12]/90 border border-white/[0.08] rounded-xl px-4 py-3 sm:py-3.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500
    outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-[#0c101c] focus:shadow-[0_0_20px_rgba(99,102,241,0.2)]
  `;

  return (
    <section id="contact" className="relative py-24 sm:py-36 overflow-hidden bg-[#07090e]">
      <div className="section-divider mb-0" />

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)', filter: 'blur(90px)' }}
        />
        <div
          className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06), transparent 70%)', filter: 'blur(90px)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto"
        >
          <p className="mono text-xs text-indigo-400 tracking-[0.25em] uppercase mb-2 font-semibold">
            {'// '}GET IN TOUCH
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Let's Build Something{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 50%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Exceptional
            </span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 font-normal">
            Whether you are looking to hire a Full Stack Developer, need technical consultation, or want to discuss a project, my inbox is open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-12 items-start">
          {/* ── LEFT: Contact Details & Resume ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="space-y-3.5"
          >
            {contactInfo.map((item) => {
              const Icon = item.Icon;
              const isCopied = copiedItem === item.label;

              return (
                <div
                  key={item.label}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/35 transition-all flex items-center justify-between group backdrop-blur-md"
                >
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 min-w-0 flex-1 cursor-pointer"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}15` }}
                    >
                      <Icon style={{ color: item.color, fontSize: 16 }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        {item.label}
                      </p>
                      <p className="text-white text-xs sm:text-sm font-medium truncate group-hover:text-indigo-300 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>

                  {item.copyValue && (
                    <button
                      onClick={() => copyToClipboard(item.copyValue, item.label)}
                      data-cursor="button"
                      data-cursor-text="COPY"
                      title="Copy to clipboard"
                      className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-colors ml-2"
                    >
                      {isCopied ? (
                        <FaCheck size={12} className="text-emerald-400" />
                      ) : (
                        <FaCopy size={12} />
                      )}
                    </button>
                  )}
                </div>
              );
            })}

            {/* Quick Resume Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-blue-950/20 border border-indigo-500/30 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <span className="mono text-[10px] text-indigo-300 uppercase font-bold tracking-wider">
                  Curriculum Vitae
                </span>
                <span className="flex items-center gap-1.5 mono text-[10px] text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Updated 2026
                </span>
              </div>
              <p className="text-white text-xs leading-relaxed mb-4 font-normal">
                Looking for a detailed breakdown of my tech stack, company history, and key projects?
              </p>
              <a
                href="/resume.pdf"
                download="Karthikeyan_S_Resume.pdf"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
              >
                <FaFileDownload size={12} />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT: Direct Message Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-2xl relative"
          >
            <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
              Send a Direct Message
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mb-6 font-normal">
              Fill in your details below and I will reply within 24 hours.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mono text-[11px] text-slate-400 mb-1.5 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block mono text-[11px] text-slate-400 mb-1.5 font-medium">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block mono text-[11px] text-slate-400 mb-1.5 font-medium">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Full Stack Developer Opportunity / Project Inquiry"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block mono text-[11px] text-slate-400 mb-1.5 font-medium">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, timeline, or open role requirements..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Status Message */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2"
                  >
                    <FaCheck className="text-emerald-400" />
                    <span>Your message has been dispatched successfully! I will be in touch shortly.</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2"
                  >
                    <span>Failed to transmit message. Please email me directly at karthikeyancs10@gmail.com</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                data-cursor="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' }}
              >
                {isSubmitting ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FaPaperPlane size={11} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;