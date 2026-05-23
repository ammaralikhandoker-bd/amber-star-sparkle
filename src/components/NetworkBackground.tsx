import { motion } from 'framer-motion';
import { useMemo, useEffect, useState, useRef } from 'react';

const NetworkBackground = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [cursor, setCursor] = useState({ x: 50, y: 30 });
  const targetRef = useRef({ x: 50, y: 30 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (isMobile) return;

    const handleMove = (e: MouseEvent) => {
      targetRef.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
    };

    const tick = () => {
      setCursor((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.08,
        y: prev.y + (targetRef.current.y - prev.y) * 0.08,
      }));
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  const particles = useMemo(() =>
    Array.from({ length: isMobile ? 0 : 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 6 + 4,
      drift: (Math.random() - 0.5) * 30,
    })), []
  );

  const connections = useMemo(() =>
    Array.from({ length: isMobile ? 0 : 6 }, (_, i) => {
      const x1 = Math.random() * 100;
      const y1 = Math.random() * 100;
      const x2 = x1 + (Math.random() - 0.5) * 30;
      const y2 = y1 + (Math.random() - 0.5) * 30;
      return { id: i, x1, y1, x2, y2, delay: Math.random() * 6, duration: Math.random() * 4 + 3 };
    }), []
  );

  return (
    <div className="network-bg pointer-events-none" style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
      {/* Base gradient - deep ocean */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,50%,3%)] via-[hsl(230,40%,7%)] to-[hsl(210,45%,4%)]" />

      {/* Aurora layers - CSS only for performance */}
      <div
        className="absolute top-[-20%] left-[-20%] w-[140%] h-[50%] opacity-[0.12]"
        style={{
          background: 'linear-gradient(135deg, hsl(160 70% 40% / 0.15), hsl(200 80% 50% / 0.1), hsl(260 60% 50% / 0.12), transparent)',
          filter: isMobile ? 'blur(40px)' : 'blur(80px)',
        }}
      />
      <div
        className="absolute top-[10%] left-[-10%] w-[120%] h-[40%] opacity-[0.1]"
        style={{
          background: 'linear-gradient(180deg, hsl(280 50% 50% / 0.1), hsl(217 91% 60% / 0.15), hsl(180 60% 40% / 0.08))',
          filter: isMobile ? 'blur(40px)' : 'blur(100px)',
        }}
      />

      {/* Warm glow accent - CSS only */}
      <div
        className="absolute bottom-[5%] right-[10%] w-[50%] h-[40%] rounded-full opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle, hsl(43 96% 56% / 0.1), transparent 60%)',
          filter: isMobile ? 'blur(40px)' : 'blur(80px)',
        }}
      />

      {/* Cursor-following interactive orb (desktop only) */}
      {!isMobile && (
        <>
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${cursor.x}%`,
              top: `${cursor.y}%`,
              width: '600px',
              height: '600px',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, hsl(244 80% 69% / 0.18), hsl(190 100% 50% / 0.08) 40%, transparent 70%)',
              filter: 'blur(40px)',
              willChange: 'left, top',
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${cursor.x}%`,
              top: `${cursor.y}%`,
              width: '200px',
              height: '200px',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, hsl(190 100% 60% / 0.25), transparent 60%)',
              filter: 'blur(30px)',
              willChange: 'left, top',
            }}
          />
        </>
      )}

      {/* Floating particles — desktop only (SVG animations are costly on mobile) */}
      {!isMobile && (
      <svg className="absolute inset-0 w-full h-full">
        {/* Connection lines */}
        {connections.map((c) => (
          <motion.line
            key={`line-${c.id}`}
            x1={`${c.x1}%`}
            y1={`${c.y1}%`}
            x2={`${c.x2}%`}
            y2={`${c.y2}%`}
            stroke="hsl(217 91% 60% / 0.08)"
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{ duration: c.duration, repeat: Infinity, delay: c.delay, ease: 'easeInOut' }}
          />
        ))}

        {/* Particles */}
        {particles.map((p) => (
          <motion.circle
            key={p.id}
            cx={`${p.x}%`}
            cy={`${p.y}%`}
            r={p.size}
            fill={p.id % 5 === 0 ? 'hsl(43 96% 56% / 0.6)' : p.id % 3 === 0 ? 'hsl(160 70% 50% / 0.5)' : 'hsl(217 91% 70% / 0.5)'}
            initial={{ opacity: 0.1 }}
            animate={{
              opacity: [0.1, 0.7, 0.1],
              cy: [`${p.y}%`, `${p.y + p.drift}%`, `${p.y}%`],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
      )}

      {/* Mesh grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] hidden md:block"
        style={{
          backgroundImage: `
            linear-gradient(hsl(217 91% 60% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(217 91% 60% / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(220 50% 3% / 0.7) 100%)',
        }}
      />
    </div>
  );
};

export default NetworkBackground;
