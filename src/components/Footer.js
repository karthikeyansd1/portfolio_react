import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa';

const Footer = () => {
  const links = [
    { label: 'Overview', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#07090e] border-t border-white/[0.08]">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[220px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)', filter: 'blur(70px)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 mb-10 sm:mb-12">

          {/* Brand Column */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white shadow-md shadow-indigo-500/25"
                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' }}
              >
                KS
              </div>
              <span className="font-bold text-white text-base tracking-tight">Karthikeyan S</span>
            </div>
            <p className="mono text-xs text-slate-400 leading-relaxed font-normal">
              Full Stack Developer specializing in Python, Django, DRF, Vue.js 3, and scalable database systems.
            </p>

            {/* Socials */}
            <div className="flex gap-2 pt-1">
              {[
                { Icon: FaGithub, href: 'https://github.com' },
                { Icon: FaLinkedin, href: 'https://www.linkedin.com/in/karthikeyanssd' },
                { Icon: FaEnvelope, href: 'mailto:karthikeyancs10@gmail.com' },
              ].map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.08 }}
                  data-cursor="button"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/40 transition-colors"
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <p className="mono text-[11px] text-slate-400 uppercase tracking-widest mb-3.5 font-bold">
              Navigation
            </p>
            <div className="grid grid-cols-2 gap-2">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  data-cursor="hover"
                  className="mono text-xs text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5 py-1"
                >
                  <span className="text-indigo-500 font-bold">▸</span> {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Live Developer Status Terminal */}
          <div className="sm:col-span-2 md:col-span-1">
            <p className="mono text-[11px] text-slate-400 uppercase tracking-widest mb-3.5 font-bold">
              Status & Availability
            </p>
            <div className="terminal rounded-xl">
              <div className="p-3.5 sm:p-4 mono text-[11px] leading-5 space-y-1 bg-[#080b12]/95 text-slate-300">
                <p><span className="code-keyword">const</span> <span className="code-function">engineer</span> = &#123;</p>
                <p className="pl-4"><span className="code-var">status</span>: <span className="code-string">"Available for Hire"</span>,</p>
                <p className="pl-4"><span className="code-var">location</span>: <span className="code-string">"India · Remote"</span>,</p>
                <p className="pl-4"><span className="code-var">relocation</span>: <span className="code-keyword">true</span></p>
                <p>&#125;;</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-center sm:text-left border-t border-white/[0.06]"
        >
          <p className="mono text-xs text-slate-400 flex items-center justify-center gap-1.5">
            Designed & Engineered with{' '}
            <FaCode className="text-indigo-400" size={11} /> by{' '}
            <span className="text-white font-semibold">Karthikeyan S</span>
          </p>
          <p className="mono text-xs text-slate-500">
            © {new Date().getFullYear()} Karthikeyan S. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;