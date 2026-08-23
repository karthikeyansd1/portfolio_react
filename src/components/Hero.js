import React, {
  useEffect, useState, useRef, useCallback, useMemo,
} from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaReact, FaGithub, FaLinkedin, FaPython } from 'react-icons/fa';
import {
  SiTypescript, SiTailwindcss, SiNodedotjs, SiDjango, SiPostgresql,
} from 'react-icons/si';

/* ═══════════════════════════════════════════════════════════
   SPIDER-MAN CYBER CODE RAIN CANVAS
   — Live code streams infused with Spider Crimson & Electric Web Blue physics
═══════════════════════════════════════════════════════════ */
const CODE_LINES = [
  // Python / Django
  { text: "from django.db import models",              type: "keyword"  },
  { text: "class SpiderWeb(models.Model):",            type: "keyword"  },
  { text: "    hero = models.CharField(default='Spidey')", type: "var"   },
  { text: "    def shoot_web(self): return 'THWIP!'",  type: "func"     },
  { text: "@api_view(['GET', 'POST'])",                type: "decorator"},
  { text: "def fullstack_pipeline(request):",          type: "func"     },
  { text: "    queryset = Project.objects.all()",      type: "var"      },
  { text: "    return Response(serializer.data)",      type: "return"   },
  { text: "urlpatterns = [path('api/', include(...))]",type: "config"   },
  { text: "DATABASES = { 'ENGINE': 'postgresql' }",   type: "config"   },
  // JS / React / Vue
  { text: "const Portfolio = () => {",               type: "keyword"  },
  { text: "  return <SpiderManHero name='Karthi' />;", type: "jsx"      },
  { text: "import React, { useState } from 'react';", type: "import"   },
  { text: "useEffect(() => { activateWebShooter(); }, []);", type: "hook" },
  { text: "const [spiderSense, setSense] = useState(true);", type: "var" },
  { text: "export default function App() {",           type: "keyword"  },
  { text: "  const router = useRouter();",             type: "var"      },
  { text: "  .map(item => <WebCard key={item.id} />)", type: "jsx"      },
  { text: "async function deployProject() {",          type: "func"     },
  { text: "  const res = await fetch('/api/data');",   type: "await"    },
  { text: "  return res.json();",                      type: "return"   },
  { text: "tailwind.config = { theme: 'spiderman' };", type: "config"   },
  // SQL
  { text: "SELECT * FROM projects WHERE active=true;", type: "sql"      },
  { text: "JOIN users ON users.id = projects.owner_id",type: "sql"      },
  { text: "CREATE INDEX idx_title ON projects(title);",type: "sql"      },
  // Terminal / Web Actions
  { text: "git commit -m 'feat: spider-man theme activation'", type: "git" },
  { text: "npm run build && npm run deploy",           type: "terminal" },
  { text: "docker build -t spiderman-portfolio:latest .", type: "terminal" },
  { text: "kubectl apply -f deployment.yaml",          type: "terminal" },
  { text: "✓ Spider-Sense activated in 420ms ⚡",       type: "success"  },
  { text: ">> Live Server running on port 8000 🕸️",   type: "success"  },
  // TypeScript
  { text: "interface HeroProps { alias: string; agility: number; }", type: "type" },
  { text: "type ApiResponse<T> = Promise<T | null>;",  type: "type"     },
  { text: "const handler = async (req: NextApiRequest)",type: "func"    },
];

const TYPE_COLORS = {
  keyword  : 'rgba(239,68,68,',    // Spider Crimson Red
  jsx      : 'rgba(56,189,248,',   // Electric Web Cyan
  import   : 'rgba(244,63,94,',    // Rose Red
  hook     : 'rgba(192,132,252,',  // Spider-Verse Purple
  var      : 'rgba(248,250,252,',  // Web White
  func     : 'rgba(14,165,233,',   // Spider Blue
  await    : 'rgba(251,191,36,',   // Neon Gold
  return   : 'rgba(239,68,68,',    // Crimson
  config   : 'rgba(100,116,139,',  // Slate
  decorator: 'rgba(251,191,36,',   // Gold
  sql      : 'rgba(52,211,153,',   // Green
  git      : 'rgba(251,191,36,',   // Gold
  terminal : 'rgba(148,163,184,',  // Light Slate
  success  : 'rgba(56,189,248,',   // Cyan
  type     : 'rgba(244,63,94,',    // Spider Red
};

const CodeRainCanvas = () => {
  const ref = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0, radius: 180 });
  const ripplesRef = useRef([]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      const vx = e.clientX - mouseRef.current.lastX;
      const vy = e.clientY - mouseRef.current.lastY;
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        vx,
        vy,
        lastX: e.clientX,
        lastY: e.clientY,
        radius: window.innerWidth < 768 ? 130 : 220,
      };
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          vx: 0,
          vy: 0,
          lastX: e.touches[0].clientX,
          lastY: e.touches[0].clientY,
          radius: 130,
        };
      }
    };

    const handleClick = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY);
      if (clientX && clientY) {
        ripplesRef.current.push({
          x: clientX,
          y: clientY,
          radius: 10,
          maxRadius: window.innerWidth < 768 ? 220 : 360,
          opacity: 0.9,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick);

    const buildCols = () => {
      const isSmall = window.innerWidth < 640;
      const colWidth = isSmall ? 240 : 320;
      const cols = [];
      const colCount = Math.ceil(window.innerWidth / colWidth) + 2;
      for (let c = 0; c < colCount; c++) {
        const lines = [];
        const lineCount = Math.ceil(window.innerHeight / 22) + 25;
        for (let l = 0; l < lineCount; l++) {
          lines.push(CODE_LINES[Math.floor(Math.random() * CODE_LINES.length)]);
        }
        cols.push({
          baseX  : c * colWidth + Math.random() * 20 - 10,
          x      : c * colWidth + Math.random() * 20 - 10,
          y      : -(Math.random() * window.innerHeight),
          speed  : 0.35 + Math.random() * 0.35,
          opacity: 0.08 + Math.random() * 0.12,
          lines,
          lineCount,
        });
      }
      return cols;
    };

    let cols = buildCols();

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      const isSmall = W < 640;
      const FONT_SIZE = isSmall ? 11 : 13;
      const LINE_HEIGHT = isSmall ? 18 : 22;

      // Transparent frame clear so Spider-Man background image is 100% visible
      ctx.clearRect(0, 0, W, H);

      ctx.font = `${FONT_SIZE}px 'JetBrains Mono', 'Fira Code', monospace`;
      ctx.textBaseline = 'top';

      const mouse = mouseRef.current;

      // Update spider-web ripples
      ripplesRef.current = ripplesRef.current.filter((r) => {
        r.radius += 7.5;
        r.opacity *= 0.93;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(239,68,68,${r.opacity.toFixed(3)})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Web strands shooting out from ripple center
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4;
          ctx.moveTo(r.x, r.y);
          ctx.lineTo(r.x + Math.cos(angle) * r.radius, r.y + Math.sin(angle) * r.radius);
        }
        ctx.strokeStyle = `rgba(14,165,233,${(r.opacity * 0.6).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        return r.radius < r.maxRadius && r.opacity > 0.01;
      });

      cols.forEach(col => {
        col.y += col.speed;

        if (col.y > H + col.lineCount * LINE_HEIGHT) {
          col.y = -col.lineCount * LINE_HEIGHT;
          col.lines = col.lines.map(() => CODE_LINES[Math.floor(Math.random() * CODE_LINES.length)]);
        }

        col.lines.forEach((line, li) => {
          const drawY = col.y + li * LINE_HEIGHT;
          if (drawY < -LINE_HEIGHT || drawY > H + LINE_HEIGHT) return;

          let drawX = col.x;
          const dx = drawX - mouse.x;
          const dy = drawY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let isNearMouse = false;
          let mouseFactor = 0;

          if (dist < mouse.radius) {
            isNearMouse = true;
            mouseFactor = (1 - dist / mouse.radius);
            const repel = mouseFactor * 32 * (dx >= 0 ? 1 : -1);
            drawX += repel;
          }

          ripplesRef.current.forEach(r => {
            const rdx = drawX - r.x;
            const rdy = drawY - r.y;
            const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
            if (Math.abs(rdist - r.radius) < 35) {
              mouseFactor = Math.max(mouseFactor, r.opacity * 1.2);
            }
          });

          const progress = (drawY - col.y) / (col.lineCount * LINE_HEIGHT);
          let finalAlpha = Math.sin(progress * Math.PI) * col.opacity;

          if (isNearMouse || mouseFactor > 0) {
            finalAlpha = Math.min(0.95, finalAlpha + mouseFactor * 0.75);
            ctx.shadowColor = '#ef4444';
            ctx.shadowBlur = mouseFactor * 12;
          } else {
            ctx.shadowBlur = 0;
          }

          const colorBase = TYPE_COLORS[line.type] || 'rgba(248,250,252,';
          ctx.fillStyle = isNearMouse
            ? `rgba(254,202,202,${finalAlpha.toFixed(3)})`
            : `${colorBase}${finalAlpha.toFixed(3)})`;

          ctx.fillText(line.text, drawX, drawY);
        });
      });

      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

/* ═══════════════════════════════════════════════════════════
   SPIDER-SENSE CURSOR SPOTLIGHT
═══════════════════════════════════════════════════════════ */
const CursorLight = () => {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  useEffect(() => {
    const m = e => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', m);
    return () => window.removeEventListener('mousemove', m);
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none" style={{
      zIndex: 1,
      background: `radial-gradient(550px at ${pos.x}px ${pos.y}px, rgba(239,68,68,0.09), transparent 70%)`,
    }} />
  );
};

/* ═══════════════════════════════════════════════════════════
   NOISE OVERLAY
═══════════════════════════════════════════════════════════ */
const Noise = () => (
  <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.028]" style={{ zIndex: 1 }}>
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#n)" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   3D SPIDER-VERSE HOLOGRAPHIC IMAGE CARD
═══════════════════════════════════════════════════════════ */
const HoloCard = () => {
  const cardRef  = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt]       = useState({ x: 0, y: 0 });
  const [shimmer, setShimmer] = useState({ x: 50, y: 50 });
  const [spinAngle, setSpinAngle] = useState(0);

  useEffect(() => {
    let id;
    const run = () => { setSpinAngle(a => (a + 0.8) % 360); id = requestAnimationFrame(run); };
    id = requestAnimationFrame(run);
    return () => cancelAnimationFrame(id);
  }, []);

  const handleMouseMove = useCallback(e => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 26;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 26;
    setTilt({ x: -y, y: x });
    setShimmer({
      x: ((e.clientX - rect.left) / rect.width  ) * 100,
      y: ((e.clientY - rect.top)  / rect.height ) * 100,
    });
  }, []);

  const handleLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
    setShimmer({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      data-cursor="3d"
      data-cursor-text="SPIDER-3D"
      className="w-full max-w-[320px] sm:max-w-[360px] mx-auto"
      style={{
        perspective: '1000px',
        perspectiveOrigin: '50% 50%',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {/* ── Outer 3D Card Shell (Spider-Verse Conic Border) ── */}
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: hovered ? 1.02 : 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 25 }}
        style={{
          transformStyle: 'preserve-3d',
          borderRadius: 24,
          padding: '1.8px',
          background: hovered
            ? `conic-gradient(from ${spinAngle}deg at 50% 50%, #ef4444, #dc2626, #0284c7, #38bdf8, #f43f5e, #ef4444)`
            : `conic-gradient(from ${spinAngle}deg at 50% 50%, rgba(239,68,68,0.5), rgba(14,165,233,0.4), rgba(239,68,68,0.5))`,
          boxShadow: hovered
            ? '0 0 60px rgba(239,68,68,0.6), 0 0 100px rgba(14,165,233,0.35), 0 30px 70px rgba(0,0,0,0.85)'
            : '0 0 20px rgba(239,68,68,0.25), 0 15px 40px rgba(0,0,0,0.5)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* ── Card Inner Container ── */}
        <div style={{
          borderRadius: 22,
          overflow: 'hidden',
          background: '#09081a',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}>

          {/* ── Floating Spider-Sense Pulse on Top Left ── */}
          <div
            style={{
              position: 'absolute', top: 12, left: 12, zIndex: 20,
              transform: hovered ? 'translateZ(50px)' : 'translateZ(0px)',
              transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-red-500/40 shadow-lg shadow-red-500/20">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="mono text-[10px] text-red-200 font-bold tracking-wider">⚡ SPIDER-SENSE</span>
            </div>
          </div>

          {/* ── IMAGE LAYER ── */}
          <motion.div
            style={{
              transformStyle: 'preserve-3d',
              transform: hovered ? 'scale(1.03) translateZ(10px)' : 'scale(1) translateZ(0px)',
              transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <img
              src="/mypic.jpg"
              alt="Karthikeyan S"
              style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
              onError={e => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML =
                  '<div style="width:100%;aspect-ratio:3/4;background:linear-gradient(135deg,#18080c,#0c1428,#18080c);display:flex;align-items:center;justify-content:center;"><span style="font-size:4.5rem;opacity:0.2">🕷️</span></div>';
              }}
            />
          </motion.div>

          {/* ── Spider-Man Depth Overlay ── */}
          <div style={{
            position: 'absolute', inset: 0,
            background: hovered
              ? 'linear-gradient(to top, rgba(9,8,26,0.96) 0%, rgba(9,8,26,0.4) 45%, rgba(9,8,26,0.1) 70%)'
              : 'linear-gradient(to top, rgba(9,8,26,0.96) 0%, rgba(9,8,26,0.45) 45%, transparent 70%)',
            transition: 'background 0.4s ease',
            pointerEvents: 'none',
          }} />

          {/* ── Spider Web Lattice Watermark ── */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              radial-gradient(circle at 50% 50%, transparent 20%, rgba(239,68,68,0.06) 21%, transparent 23%),
              radial-gradient(circle at 50% 50%, transparent 40%, rgba(14,165,233,0.05) 41%, transparent 43%),
              radial-gradient(circle at 50% 50%, transparent 65%, rgba(239,68,68,0.05) 66%, transparent 68%)
            `,
            opacity: hovered ? 1 : 0.4,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }} />

          {/* ── Holographic Radial Web Shimmer ── */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(circle at ${shimmer.x}% ${shimmer.y}%,
              rgba(255,255,255,0.14) 0%,
              rgba(239,68,68,0.08) 35%,
              transparent 65%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
          }} />

          {/* ── Floating Tech Badges (Spider Colors) ── */}
          {hovered && (
            <div className="hidden sm:block absolute inset-0 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                style={{
                  position: 'absolute', top: '35%', right: 12,
                  transform: 'translateZ(60px)',
                }}
                className="px-2.5 py-0.5 rounded-xl bg-red-950/85 backdrop-blur-md border border-red-500/50 text-red-200 text-[10px] mono font-bold shadow-xl shadow-red-500/30"
              >
                🕷️ Python & Django
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.08 }}
                style={{
                  position: 'absolute', top: '52%', left: 12,
                  transform: 'translateZ(70px)',
                }}
                className="px-2.5 py-0.5 rounded-xl bg-sky-950/85 backdrop-blur-md border border-sky-400/50 text-sky-200 text-[10px] mono font-bold shadow-xl shadow-sky-500/30"
              >
                🕸️ Vue.js & Quasar
              </motion.div>
            </div>
          )}

          {/* ── TOP RIGHT: Availability Badge ── */}
          <motion.div
            animate={{ y: hovered ? [0, -4, 0] : 0 }}
            transition={hovered ? { y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } } : { duration: 0.4 }}
            style={{
              position: 'absolute', top: 12, right: 12,
              padding: '4px 10px',
              borderRadius: 10,
              background: 'linear-gradient(135deg, rgba(239,68,68,0.95), rgba(220,38,38,0.95))',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: hovered
                ? '0 0 30px rgba(239,68,68,0.8), 0 8px 20px rgba(0,0,0,0.5)'
                : '0 0 15px rgba(239,68,68,0.4)',
              color: '#fff',
              fontSize: 10,
              fontWeight: 700,
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.05em',
              transform: hovered ? 'translateZ(60px) scale(1.05)' : 'translateZ(0)',
              transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease',
              zIndex: 25,
            }}>
            🕷️ Available
          </motion.div>

          {/* ── BOTTOM INFO: Terminal Name Card ── */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: 12,
            transform: hovered ? 'translateZ(45px)' : 'translateZ(0px)',
            transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
            zIndex: 20,
          }}>
            <motion.div
              animate={{ y: hovered ? -4 : 0, scale: hovered ? 1.02 : 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: hovered ? 'rgba(8,6,20,0.95)' : 'rgba(8,6,20,0.88)',
                border: hovered ? '1px solid rgba(239,68,68,0.6)' : '1px solid rgba(239,68,68,0.25)',
                borderRadius: 12,
                padding: '10px 12px',
                backdropFilter: 'blur(20px)',
                boxShadow: hovered ? '0 0 25px rgba(239,68,68,0.4)' : 'none',
                transition: 'all 0.4s ease',
              }}
            >
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, lineHeight: 1.6 }}>
                <p style={{ color: '#f43f5e' }}><span style={{ color: '#ef4444' }}>const</span>{' hero = {'}</p>
                <p style={{ paddingLeft: 10 }}>
                  <span style={{ color: '#e2e8f0' }}>name</span>
                  <span style={{ color: '#64748b' }}>: </span>
                  <span style={{ color: '#38bdf8' }}>"Karthikeyan S"</span><span style={{ color: '#64748b' }}>,</span>
                </p>
                <p style={{ paddingLeft: 10 }}>
                  <span style={{ color: '#e2e8f0' }}>role</span>
                  <span style={{ color: '#64748b' }}>: </span>
                  <span style={{ color: '#38bdf8' }}>"Full Stack Dev"</span><span style={{ color: '#64748b' }}>,</span>
                </p>
                <p style={{ paddingLeft: 10 }}>
                  <span style={{ color: '#e2e8f0' }}>mode</span>
                  <span style={{ color: '#64748b' }}>: </span>
                  <span style={{ color: '#ef4444' }}>"{hovered ? 'THWIP! 🕸️ 3D Active' : 'Hover for Spider-3D'}"</span>
                </p>
                <p style={{ color: '#ef4444' }}>{'}'}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── 3D Spider Glow Shadow Plane ── */}
      <motion.div
        animate={{
          scaleX: hovered ? 0.9 : 0.95,
          opacity: hovered ? 0.8 : 0.4,
          y: hovered ? 22 : 10,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        style={{
          position: 'absolute', bottom: -8, left: '5%', right: '5%',
          height: 38, borderRadius: 24,
          background: 'linear-gradient(135deg, #ef4444, #0284c7)',
          filter: 'blur(22px)',
          zIndex: -1,
        }}
      />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   TEXT SCRAMBLE WITH MOUSE HOVER AND CLICK DECODE
═══════════════════════════════════════════════════════════ */
const CHARS = '!<>-_\\/[]{}=+*^?#@$%&01🕷️⚡';
function useScramble(target, active) {
  const [out, setOut] = useState(target);
  const frame = useRef(null), iter = useRef(0);
  useEffect(() => {
    if (!active) { setOut(target); return; }
    iter.current = 0;
    const run = () => {
      setOut(target.split('').map((ch, i) => {
        if (ch === ' ') return ' ';
        if (i < iter.current) return target[i];
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(''));
      iter.current += 0.55;
      if (iter.current < target.length) frame.current = requestAnimationFrame(run);
      else setOut(target);
    };
    frame.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frame.current);
  }, [target, active]);
  return out;
}

/* ═══════════════════════════════════════════════════════════
   ROLE CYCLER
═══════════════════════════════════════════════════════════ */
const ROLES = [
  'Full Stack Developer 🕷️',
  'Python & Django Expert ⚡',
  'Vue.js 3 & Quasar Specialist 🕸️',
  'Django REST Framework Architect 🚀',
];
const RoleCycler = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % ROLES.length), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="h-7 sm:h-8 overflow-hidden flex items-center">
      <AnimatePresence mode="wait">
        <motion.span key={idx}
          initial={{ y: 24, opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0,  opacity: 1, filter: 'blur(0px)' }}
          exit={{   y: -24, opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mono text-sm sm:text-base md:text-lg font-medium"
          style={{ background: 'linear-gradient(90deg,#ef4444,#f43f5e,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          {ROLES[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAGNETIC BUTTON (Spider-Man Crimson Web Theme)
═══════════════════════════════════════════════════════════ */
const MagBtn = ({ children, href, primary }) => {
  const ref = useRef(null);
  const [off, setOff] = useState({ x: 0, y: 0 });
  const move = useCallback(e => {
    if (window.innerWidth < 768) return;
    const r = ref.current.getBoundingClientRect();
    setOff({ x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3 });
  }, []);
  return (
    <motion.a ref={ref} href={href}
      onMouseMove={move} onMouseLeave={() => setOff({ x: 0, y: 0 })}
      animate={{ x: off.x, y: off.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 16 }}
      whileTap={{ scale: 0.95 }}
      data-cursor="button"
      className={`inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-sm cursor-pointer transition-all ${primary ? 'text-white' : 'text-slate-300 hover:text-white'}`}
      style={primary
        ? { background: 'linear-gradient(135deg,#ef4444,#dc2626)', boxShadow: '0 0 25px rgba(239,68,68,0.4)' }
        : { border: '1px solid rgba(239,68,68,0.25)', background: 'rgba(255,255,255,0.03)' }}
      whileHover={primary
        ? { boxShadow: '0 0 45px rgba(239,68,68,0.7), 0 0 20px rgba(14,165,233,0.4)', scale: 1.04 }
        : { borderColor: 'rgba(239,68,68,0.6)', scale: 1.04, background: 'rgba(239,68,68,0.08)' }}>
      {children}
    </motion.a>
  );
};

/* ═══════════════════════════════════════════════════════════
   3D BENTO STAT CARD (Spider-Man Glowing Accents)
═══════════════════════════════════════════════════════════ */
const Stat = ({ val, suffix, label, accent, delay }) => {
  const cardRef = useRef(null);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04, y: -4 }}
      data-cursor="hover"
      className="relative p-3.5 sm:p-5 rounded-2xl overflow-hidden cursor-default group"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(239,68,68,0.15)',
        backdropFilter: 'blur(16px)',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, ${accent}30 0%, transparent 60%)`,
          opacity: glare.opacity,
        }}
      />
      <div className="relative z-10" style={{ transform: 'translateZ(15px)' }}>
        <p className="text-2xl sm:text-4xl font-black tracking-tight"
          style={{ background: `linear-gradient(135deg,#fff,${accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {val}{suffix}
        </p>
        <p className="mono text-[9px] sm:text-[10px] text-slate-500 group-hover:text-slate-300 mt-1 font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-colors">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   3D INTERACTIVE SPIDER-MAN HERO BACKGROUND FIGURE
   — Resized to prevent page overflow, with 3D perspective tilt on hover
═══════════════════════════════════════════════════════════ */
const SpiderManHeroFigure = () => {
  const figureRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!figureRef.current || window.innerWidth < 768) return;
    const rect = figureRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 32;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 32;
    setTilt({ x: -y, y: x });
  }, []);

  const handleLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={figureRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      data-cursor="3d"
      data-cursor-text="SPIDER-3D"
      className="fixed inset-0 pointer-events-auto z-[1] overflow-hidden flex items-center justify-center lg:justify-end lg:pr-24 select-none"
      style={{ perspective: '1200px' }}
    >
      {/* Ambient Spider Aura Glow */}
      <div
        className="absolute w-[420px] h-[420px] rounded-full pointer-events-none transition-all duration-500"
        style={{
          background: hovered
            ? 'radial-gradient(circle, rgba(239,68,68,0.45) 0%, rgba(56,189,248,0.3) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(239,68,68,0.25) 0%, rgba(56,189,248,0.12) 45%, transparent 70%)',
          filter: 'blur(70px)',
          transform: hovered ? 'scale(1.2)' : 'scale(1)',
        }}
      />

      {/* 3D Spider-Man Figure Container (Resized to max-h 48vh to prevent page overflow) */}
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: hovered ? 1.12 : 1,
          y: hovered ? [0, -6, 0] : [0, -14, 0],
        }}
        transition={{
          rotateX: { type: 'spring', stiffness: 300, damping: 22 },
          rotateY: { type: 'spring', stiffness: 300, damping: 22 },
          scale: { type: 'spring', stiffness: 260, damping: 20 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="relative w-[240px] sm:w-[320px] md:w-[380px] lg:w-[440px] max-h-[48vh] flex items-center justify-center cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          filter: hovered
            ? 'drop-shadow(0 0 45px rgba(239,68,68,0.95)) drop-shadow(0 0 90px rgba(56,189,248,0.7)) contrast(1.2)'
            : 'drop-shadow(0 0 25px rgba(239,68,68,0.6)) drop-shadow(0 0 50px rgba(56,189,248,0.35)) contrast(1.1)',
          transition: 'filter 0.4s ease',
        }}
      >
        <img
          src="/spiderman.png"
          alt="Spider-Man 3D"
          className="w-full h-auto max-h-[46vh] object-contain pointer-events-none block"
        />

        {/* 3D Spider-Sense Hologram Badge on Hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              style={{
                position: 'absolute',
                top: '5%',
                right: '-8%',
                transform: 'translateZ(60px)',
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-red-500 shadow-xl shadow-red-500/40 pointer-events-none"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="mono text-[10px] text-red-200 font-black tracking-wider">
                ⚡ 3D SPIDER-SENSE
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAIN HERO
═══════════════════════════════════════════════════════════ */
const Hero = () => {
  const { scrollY } = useScroll();
  const heroOp = useTransform(scrollY, [0, 450], [1, 0]);
  const heroSc = useTransform(scrollY, [0, 450], [1, 0.93]);

  const [hov, setHov] = useState(false);
  const name = useScramble('KARTHIKEYAN S', hov);

  const tools = useMemo(() => [
    { Icon: FaPython,      color: '#ef4444', label: 'Python'    },
    { Icon: SiDjango,      color: '#38bdf8', label: 'Django'    },
    { Icon: SiDjango,      color: '#ef4444', label: 'DRF'       },
    { Icon: FaReact,       color: '#38bdf8', label: 'Vue.js 3'  },
    { Icon: FaReact,       color: '#ef4444', label: 'Quasar'    },
    { Icon: FaReact,       color: '#38bdf8', label: 'React.js'  },
    { Icon: SiPostgresql,  color: '#38bdf8', label: 'PostgreSQL'},
    { Icon: SiTypescript,  color: '#38bdf8', label: 'TypeScript'},
    { Icon: SiTailwindcss, color: '#06B6D4', label: 'Tailwind'  },
    { Icon: SiNodedotjs,   color: '#22c55e', label: 'Node.js'   },
  ], []);

  return (
    <>
      {/* ── 3D Spider-Man Hero Background Figure ── */}
      <SpiderManHeroFigure />

      {/* ── Live Cyber Code Rain Streaming Over Spider-Man ── */}
      <CodeRainCanvas />
      <Noise />
      <CursorLight />

      <section id="home" className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'transparent' }}>

        {/* Spider Web Hex Lattice Overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          zIndex: 2,
          backgroundImage: 'linear-gradient(rgba(239,68,68,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,0.04) 1px,transparent 1px)',
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%,black 30%,transparent 100%)',
        }} />

        {/* Main Content */}
        <motion.div
          style={{ opacity: heroOp, scale: heroSc, zIndex: 10, position: 'relative' }}
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-28 sm:pt-36 pb-16 sm:pb-24">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-20 items-center lg:items-start">

            {/* ── LEFT ── */}
            <div className="space-y-6 sm:space-y-8 text-left">

              {/* Spider Status Pill */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                data-cursor="hover"
                data-cursor-text="SPIDER-DEV"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider sm:tracking-widest uppercase cursor-pointer"
                style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.4)', color: '#fca5a5', backdropFilter: 'blur(12px)' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-red-500" />
                </span>
                🕷️ With Great Code Comes Great Reliability ⚡
              </motion.div>

              {/* Name scramble */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <p className="mono text-[11px] sm:text-xs text-red-400 mb-2 sm:mb-3 tracking-[0.25em] uppercase">
                  <span className="code-keyword">const </span>
                  <span className="code-function">spiderDeveloper</span>
                  {' = () => {'}
                </p>
                <h1
                  data-cursor="text"
                  data-cursor-text="THWIP!"
                  className="font-black leading-none tracking-tight sm:tracking-tighter cursor-pointer select-none break-words"
                  style={{
                    fontSize: 'clamp(2.4rem, 8vw, 7.5rem)',
                    backgroundImage: 'linear-gradient(135deg,#ffffff 10%,#fecaca 40%,#ef4444 75%,#38bdf8 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 80px rgba(239,68,68,0.3)',
                    filter: 'drop-shadow(0 0 35px rgba(239,68,68,0.2))',
                  }}
                  onMouseEnter={() => setHov(true)}
                  onMouseLeave={() => setHov(false)}
                  onClick={() => { setHov(false); setTimeout(() => setHov(true), 50); }}
                >
                  {name}
                </h1>
                <p className="mono text-[11px] sm:text-xs text-red-400 mt-2 tracking-[0.25em]">{'};'}</p>
              </motion.div>

              {/* Role */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.7 }} className="flex items-center gap-2.5">
                <div className="h-px w-6 sm:w-8" style={{ background: 'linear-gradient(90deg,#ef4444,#38bdf8,transparent)' }} />
                <span className="mono text-slate-500 text-xs sm:text-sm">{'// '}</span>
                <RoleCycler />
              </motion.div>

              {/* Description */}
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.8 }}
                className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-xl font-light">
                Full Stack Developer with <span className="text-white font-medium">1.8 years of experience</span> building production web applications using <span className="text-red-400 font-semibold">Python, Django, DRF, Vue.js, and Quasar</span>. Shipped 10+ RESTful APIs, optimized database schemas, and resolved 30+ production bugs.
              </motion.p>

              {/* Tech pills */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                className="flex flex-wrap gap-2">
                {tools.map(({ Icon, color, label }, i) => (
                  <motion.div key={label}
                    initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.55 + i * 0.04, type: 'spring', stiffness: 260 }}
                    whileHover={{ scale: 1.12, y: -3, boxShadow: `0 0 20px ${color}50`, borderColor: color }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor="hover"
                    data-cursor-text={label.toUpperCase()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 cursor-pointer transition-colors"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(239,68,68,0.2)', backdropFilter: 'blur(8px)' }}>
                    <Icon style={{ color, fontSize: 13 }} />
                    <span className="mono text-[11px] sm:text-xs">{label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                className="flex items-center gap-3 flex-wrap pt-2">
                <MagBtn href="#projects" primary>View My Web 🕸️</MagBtn>
                <MagBtn href="#contact">Contact Spidey ⚡</MagBtn>
                <div className="flex gap-2">
                  {[
                    { Icon: FaGithub, href: 'https://github.com' },
                    { Icon: FaLinkedin, href: 'https://www.linkedin.com/in/karthikeyanssd' },
                  ].map(({ Icon, href }, i) => (
                    <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.15, boxShadow: '0 0 20px rgba(239,68,68,0.6)', borderColor: 'rgba(239,68,68,0.7)' }}
                      data-cursor="button"
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(239,68,68,0.2)', backdropFilter: 'blur(8px)' }}>
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: 3D Holo Card + Bento Stats ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 w-full">

              {/* THE 3D SPIDER-MAN HOLO IMAGE CARD */}
              <HoloCard />

              {/* Bento stats */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-[320px] sm:max-w-[360px] mx-auto">
                <Stat val="1.8" suffix="+" label="Years Exp."   accent="#ef4444" delay={1.1} />
                <Stat val="10"  suffix="+" label="RESTful APIs" accent="#38bdf8" delay={1.2} />
                <Stat val="30"  suffix="+" label="Bugs Fixed"   accent="#ef4444" delay={1.3} />
                <Stat val="99"  suffix="%" label="System Uptime" accent="#fbbf24" delay={1.4} />
              </div>
            </motion.div>
          </div>

          {/* Marquee */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
            className="mt-16 sm:mt-20 overflow-hidden w-full"
            style={{ borderTop: '1px solid rgba(239,68,68,0.15)', paddingTop: '1.5rem' }}>
            <div className="animate-marquee flex gap-8 sm:gap-10 whitespace-nowrap">
              {[...Array(2)].flatMap((_, ri) =>
                ['Python','Django','DRF','Vue.js 3','Quasar','PostgreSQL','MySQL','Django-Q','Stripe API','Docker','CI/CD','Spider-Sense'].map((item, i) => (
                  <span key={`${ri}-${i}`} className="mono text-[11px] sm:text-xs text-slate-500 hover:text-red-400 cursor-pointer transition-colors uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'linear-gradient(135deg,#ef4444,#38bdf8)' }} />
                    {item}
                  </span>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 cursor-pointer"
          data-cursor="button"
          style={{ zIndex: 20 }}>
          <motion.div animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-1">
            <span className="mono text-[10px] tracking-[0.3em] uppercase text-red-400 font-bold">Scroll 🕸️</span>
            <div className="w-px h-8 bg-gradient-to-b from-red-500/60 to-transparent" />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;