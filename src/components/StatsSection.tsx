import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import { Briefcase, Building2, Calendar, Clock, Hourglass, Award, Target, Zap } from 'lucide-react';

const baseEnter = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

/* ============================================================
 * Card 1 — YEARS EXPERIENCE: Time Vortex (rotating clock rings)
 * ============================================================ */
const YearsExperienceCard = () => (
  <motion.div
    custom={0}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={baseEnter}
    whileHover={{ y: -8, scale: 1.03 }}
    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    className="relative group"
  >
    {/* Ambient pulse */}
    <motion.div
      animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -inset-1 rounded-2xl blur-xl"
      style={{ background: 'radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.5), transparent 70%)' }}
    />
    <div className="relative glass-card rounded-2xl p-6 md:p-7 text-center overflow-hidden border border-primary/20">
      {/* Concentric rotating rings */}
      <div className="relative w-16 h-16 mx-auto mb-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border border-secondary/50"
        />
        {/* Tick marks */}
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 w-px h-1.5 bg-primary/40 origin-bottom"
            style={{ transform: `translate(-50%, -100%) rotate(${i * 30}deg) translateY(-22px)` }}
          />
        ))}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-3 rounded-full flex items-center justify-center"
          style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--glow-indigo)' }}
        >
          <Hourglass className="w-5 h-5 text-primary-foreground" strokeWidth={2.2} />
        </motion.div>
      </div>
      <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-1 leading-none">
        <AnimatedCounter end={5} suffix="+" decimals={0} duration={2.2} />
      </div>
      <div className="flex items-center justify-center gap-1">
        <Clock className="w-3 h-3 text-primary" />
        <p className="text-muted-foreground text-xs font-medium tracking-wide">Years Experience</p>
      </div>
    </div>
  </motion.div>
);

/* ============================================================
 * Card 2 — COMPANIES WORKED: Stacking buildings skyline
 * ============================================================ */
const CompaniesCard = () => (
  <motion.div
    custom={1}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={baseEnter}
    whileHover={{ y: -8, scale: 1.03, rotateY: 6 }}
    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    className="relative group"
    style={{ perspective: 1000 }}
  >
    <motion.div
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -inset-1 rounded-2xl blur-xl"
      style={{ background: 'radial-gradient(circle at 70% 80%, hsl(var(--secondary) / 0.5), transparent 70%)' }}
    />
    <div className="relative glass-card rounded-2xl p-6 md:p-7 text-center overflow-hidden border border-secondary/20">
      {/* Animated skyline bars */}
      <div className="absolute bottom-0 inset-x-0 flex items-end justify-center gap-1 h-12 opacity-30 pointer-events-none">
        {[40, 70, 55, 85, 50, 75].map((h, i) => (
          <motion.span
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
            className="w-2 bg-gradient-to-t from-secondary to-primary rounded-sm"
          />
        ))}
      </div>
      {/* Building icon with glow */}
      <div className="relative w-14 h-14 mx-auto mb-3">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full rounded-xl flex items-center justify-center border border-secondary/30"
          style={{ background: 'linear-gradient(135deg, hsl(var(--secondary) / 0.2), hsl(var(--primary) / 0.2))' }}
        >
          <Building2 className="w-7 h-7 text-secondary drop-shadow-[0_0_8px_hsl(var(--secondary)/0.6)]" />
        </motion.div>
        {/* Twinkling windows */}
        {[...Array(4)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-sm bg-amber-300"
            style={{ left: `${30 + (i % 2) * 30}%`, top: `${30 + Math.floor(i / 2) * 25}%` }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>
      <div className="relative text-3xl md:text-4xl font-display font-bold text-gradient mb-1 leading-none">
        <AnimatedCounter end={4} decimals={0} duration={2} />
      </div>
      <div className="relative flex items-center justify-center gap-1">
        <Briefcase className="w-3 h-3 text-secondary" />
        <p className="text-muted-foreground text-xs font-medium tracking-wide">Companies Worked</p>
      </div>
    </div>
  </motion.div>
);

/* ============================================================
 * Card 3 — CERTIFICATES: Spinning medal with ribbon shimmer
 * ============================================================ */
const CertificatesCard = () => (
  <motion.div
    custom={2}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={baseEnter}
    whileHover={{ y: -8, scale: 1.03 }}
    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    className="relative group"
  >
    <motion.div
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -inset-1 rounded-2xl blur-xl"
      style={{ background: 'radial-gradient(ellipse at 50% 50%, rgb(168 85 247 / 0.45), transparent 70%)' }}
    />
    <div className="relative glass-card rounded-2xl p-6 md:p-7 text-center overflow-hidden border border-purple-400/20">
      {/* Confetti dots */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-sm"
            style={{
              left: `${10 + i * 9}%`,
              top: '20%',
              background: i % 2 === 0 ? 'hsl(var(--primary))' : 'rgb(168 85 247)',
            }}
            animate={{ y: [0, 60, 0], opacity: [0, 1, 0], rotate: [0, 360] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
          />
        ))}
      </div>
      {/* Spinning medal */}
      <div className="relative w-16 h-16 mx-auto mb-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, rgb(168 85 247), hsl(var(--primary)), rgb(168 85 247))',
            WebkitMask: 'radial-gradient(circle, transparent 50%, #000 51%)',
            mask: 'radial-gradient(circle, transparent 50%, #000 51%)',
          }}
        />
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-2 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgb(168 85 247 / 0.3), hsl(var(--primary) / 0.3))',
            transformStyle: 'preserve-3d',
          }}
        >
          <Award className="w-7 h-7 text-purple-400 drop-shadow-[0_0_8px_rgb(168_85_247_/_0.7)]" strokeWidth={2.2} />
        </motion.div>
      </div>
      <div
        className="text-3xl md:text-4xl font-display font-bold mb-1 leading-none"
        style={{ background: 'linear-gradient(135deg, rgb(192 132 252), hsl(var(--primary)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        <AnimatedCounter end={62} suffix="+" decimals={0} duration={2.4} />
      </div>
      <div className="flex items-center justify-center gap-1">
        <Award className="w-3 h-3 text-purple-400" />
        <p className="text-muted-foreground text-xs font-medium tracking-wide">Certificates</p>
      </div>
    </div>
  </motion.div>
);

/* ============================================================
 * Card 4 — COMMITMENT: Pulsing radial progress ring
 * ============================================================ */
const CommitmentCard = () => (
  <motion.div
    custom={3}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={baseEnter}
    whileHover={{ y: -8, scale: 1.03 }}
    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    className="relative group"
  >
    <motion.div
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -inset-1 rounded-2xl blur-xl"
      style={{ background: 'radial-gradient(circle, rgb(34 197 94 / 0.5), transparent 70%)' }}
    />
    <div className="relative glass-card rounded-2xl p-6 md:p-7 text-center overflow-hidden border border-green-400/20">
      {/* Lightning streaks */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-px h-8 bg-gradient-to-b from-transparent via-green-400 to-transparent"
            style={{ left: `${20 + i * 30}%`, top: '10%' }}
            animate={{ opacity: [0, 1, 0], scaleY: [0.5, 1.4, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
          />
        ))}
      </div>
      {/* Progress ring */}
      <div className="relative w-16 h-16 mx-auto mb-3">
        <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
          <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--muted) / 0.3)" strokeWidth="3" />
          <motion.circle
            cx="32" cy="32" r="28" fill="none"
            stroke="rgb(34 197 94)" strokeWidth="3" strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 28}
            initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
            whileInView={{ strokeDashoffset: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: 'easeOut', delay: 0.4 }}
            style={{ filter: 'drop-shadow(0 0 6px rgb(34 197 94 / 0.7))' }}
          />
        </svg>
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Target className="w-6 h-6 text-green-400 drop-shadow-[0_0_6px_rgb(34_197_94_/_0.8)]" strokeWidth={2.2} />
        </motion.div>
      </div>
      <div
        className="text-3xl md:text-4xl font-display font-bold mb-1 leading-none"
        style={{ background: 'linear-gradient(135deg, rgb(74 222 128), rgb(34 197 94))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        <AnimatedCounter end={100} suffix="%" decimals={0} duration={2.5} />
      </div>
      <div className="flex items-center justify-center gap-1">
        <Zap className="w-3 h-3 text-green-400 fill-green-400" />
        <p className="text-muted-foreground text-xs font-medium tracking-wide">Commitment</p>
      </div>
    </div>
  </motion.div>
);

const StatsSection = () => {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <YearsExperienceCard />
          <CompaniesCard />
          <CertificatesCard />
          <CommitmentCard />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
