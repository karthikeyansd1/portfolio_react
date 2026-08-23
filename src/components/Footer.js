import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaHeart, FaCode } from 'react-icons/fa';

const Footer = () => {
  const links = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'];

  return (
    <footer className="relative overflow-hidden" style={{ background: '#040408' }}>
      <div className="section-divider" />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.08),transparent 70%)', filter: 'blur(60px)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 mb-8 sm:mb-10">

          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white shadow-md"
                style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
              >
                KK
              </div>
              <span className="font-bold text-white tracking-tight">Karthikeyan S</span>
            </div>
            <p className="mono text-xs text-slate-500 leading-5">
              <span className="code-comment">{'/* Full Stack Developer'}</span><br />
              <span className="code-comment">&nbsp; &nbsp;crafting scalable</span><br />
              <span className="code-comment">{'   digital applications */'}</span>
            </p>
            {/* Socials */}
            <div className="flex gap-2 pt-1">
              {[
                { Icon: FaGithub, href: 'https://github.com' },
                { Icon: FaLinkedin, href: 'https://www.linkedin.com/in/karthikeyanssd' },
              ].map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  data-cursor="button"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-indigo-400 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <p className="mono text-[10px] text-slate-500 uppercase tracking-widest mb-3 sm:mb-4">
              <span className="code-comment">{'// '}</span>navigation
            </p>
            <div className="grid grid-cols-2 gap-2">
              {links.map((l) => (
                <motion.a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  whileHover={{ x: 4, color: '#818cf8' }}
                  data-cursor="hover"
                  className="mono text-xs text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5 py-1"
                >
                  <span className="text-indigo-500">▸</span> {l}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Status Widget */}
          <div className="sm:col-span-2 md:col-span-1">
            <p className="mono text-[10px] text-slate-500 uppercase tracking-widest mb-3 sm:mb-4">
              <span className="code-comment">{'// '}</span>current_status
            </p>
            <div className="terminal rounded-xl">
              <div className="p-3.5 sm:p-4 mono text-[11px] leading-5 space-y-1 bg-black/40">
                <p><span className="code-keyword">const</span> <span className="code-function">status</span> = &#123;</p>
                <p className="pl-4"><span className="code-var">available</span>: <span className="code-keyword">true</span>,</p>
                <p className="pl-4"><span className="code-var">location</span>: <span className="code-string">"India"</span>,</p>
                <p className="pl-4"><span className="code-var">coffee</span>: <span className="code-keyword">Infinity</span></p>
                <p>&#125;</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-center sm:text-left"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mono text-xs text-slate-500 flex items-center justify-center gap-1.5"
          >
            Made with <FaHeart className="text-pink-500" size={11} /> and{' '}
            <FaCode className="text-indigo-400" size={11} /> by{' '}
            <span className="text-slate-300 font-semibold">Karthi Keyan</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mono text-xs text-slate-600"
          >
            © {new Date().getFullYear()} — All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;