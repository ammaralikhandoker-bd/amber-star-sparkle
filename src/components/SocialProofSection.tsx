import { motion } from 'framer-motion';
import { Users, Award, BadgeCheck, ExternalLink, Linkedin, TrendingUp, Sparkles, ShieldCheck, Star, Trophy, Medal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedCounter from './AnimatedCounter';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const SocialProofSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {/* LinkedIn Network — Exceptional motion design */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="relative col-span-1 sm:col-span-2 group"
          >
            {/* Animated gradient glow border */}
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-[1px] rounded-2xl blur-md hidden sm:block"
              style={{ background: 'var(--gradient-primary)' }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-[1px] rounded-2xl opacity-60 hidden sm:block"
              style={{
                background: 'conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--secondary)), transparent 60%, hsl(var(--primary)))',
                WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                padding: '1.5px',
              }}
            />

            <div className="relative glass-card rounded-2xl p-6 overflow-hidden">
              {/* Sweeping shine */}
              <motion.div
                animate={{ x: ['-120%', '220%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
                className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 hidden sm:block"
                style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--secondary) / 0.18), transparent)' }}
              />

              {/* Floating background dots */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden hidden sm:block">
                {[...Array(6)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-primary/40"
                    style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
                    animate={{ y: [0, -12, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                  />
                ))}
              </div>

              <div className="relative flex flex-col sm:flex-row items-center gap-5">
                {/* Left: Animated LinkedIn orbit */}
                <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                  {/* Pulse rings */}
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="absolute inset-0 rounded-full border border-primary/40 hidden sm:block"
                      animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: i * 0.8 }}
                    />
                  ))}
                  {/* Rotating ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-secondary/40 hidden sm:block"
                  />
                  {/* Orbiting nodes */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 hidden sm:block"
                  >
                    <span className="absolute left-1/2 -top-1 -translate-x-1/2 w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_hsl(var(--secondary))]" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 hidden sm:block"
                  >
                    <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
                  </motion.div>
                  {/* Center LinkedIn icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -8 }}
                    transition={{ type: 'spring', stiffness: 250 }}
                    className="relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--glow-indigo)' }}
                  >
                    <Linkedin className="w-7 h-7 text-primary-foreground" fill="currentColor" />
                  </motion.div>
                </div>

                {/* Right: Counter + meta */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <motion.span
                      animate={{ scale: [1, 1.25, 1], opacity: [1, 0.6, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_hsl(142_76%_55%)]"
                    />
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Live Network</span>
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Sparkles className="w-3 h-3 text-secondary" />
                    </motion.div>
                  </div>

                  <div className="flex items-baseline justify-center sm:justify-start gap-1.5">
                    <div className="text-4xl md:text-5xl font-display font-bold text-gradient leading-none">
                      <AnimatedCounter end={7500} suffix="+" decimals={0} duration={2.8} />
                    </div>
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      className="flex items-center gap-0.5 text-green-400 text-xs font-semibold"
                    >
                      <TrendingUp className="w-3 h-3" />
                      <span>Growing</span>
                    </motion.div>
                  </div>

                  <p className="text-muted-foreground text-sm mt-1 mb-3">
                    Professional Network on <span className="text-primary font-medium">LinkedIn</span>
                  </p>

                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
                    <Button
                      asChild
                      size="sm"
                      className="text-primary-foreground hover:opacity-90 font-display text-xs group/btn relative overflow-hidden"
                      style={{ background: 'var(--gradient-primary)' }}
                    >
                      <a href="https://www.linkedin.com/in/ammar-khandoker-bd" target="_blank" rel="noopener noreferrer">
                        <Users className="mr-1.5 h-3 w-3" />
                        Connect on LinkedIn
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <ExternalLink className="ml-1.5 h-3 w-3" />
                        </motion.span>
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certified Freelancer — Holographic shield with scan-line */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.03, rotateX: 4 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="relative group"
            style={{ perspective: 1000 }}
          >
            {/* Outer aurora glow */}
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.04, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-1 rounded-2xl blur-lg"
              style={{ background: 'radial-gradient(circle at 50% 50%, hsl(var(--secondary) / 0.5), transparent 70%)' }}
            />
            <div className="relative glass-card rounded-2xl p-6 text-center overflow-hidden border border-secondary/20">
              {/* Diagonal scan line */}
              <motion.div
                animate={{ y: ['-150%', '250%'] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                className="pointer-events-none absolute inset-x-0 h-1/4"
                style={{ background: 'linear-gradient(180deg, transparent, hsl(var(--secondary) / 0.25), transparent)' }}
              />
              {/* Hologram grid */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: 'linear-gradient(hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)',
                  backgroundSize: '12px 12px',
                }}
              />
              {/* Shield with rotating halo */}
              <div className="relative w-16 h-16 mx-auto mb-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent, hsl(var(--secondary)), transparent 50%)',
                    WebkitMask: 'radial-gradient(circle, transparent 55%, #000 56%)',
                    mask: 'radial-gradient(circle, transparent 55%, #000 56%)',
                  }}
                />
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-2 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--secondary) / 0.2), hsl(var(--primary) / 0.2))' }}
                >
                  <ShieldCheck className="w-7 h-7 text-secondary" strokeWidth={2.2} />
                </motion.div>
              </div>
              <div className="relative flex items-center justify-center gap-1 mb-1">
                <p className="font-display font-bold text-foreground text-sm tracking-wide">VERIFIED</p>
                <motion.div
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 20, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <BadgeCheck className="w-4 h-4 text-secondary" />
                </motion.div>
              </div>
              <p className="relative text-muted-foreground text-xs leading-snug">
                Bangladesh Govt.<br/>Certified Freelancer
              </p>
              {/* Corner ticks */}
              <span className="absolute top-2 left-2 w-2 h-2 border-t border-l border-secondary/60" />
              <span className="absolute top-2 right-2 w-2 h-2 border-t border-r border-secondary/60" />
              <span className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-secondary/60" />
              <span className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-secondary/60" />
            </div>
          </motion.div>

          {/* Professional Certificates — Trophy with rising sparks */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="relative group"
          >
            {/* Gold glow underneath */}
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-1 rounded-2xl blur-xl"
              style={{ background: 'radial-gradient(ellipse at 50% 100%, hsl(45 95% 60% / 0.5), transparent 65%)' }}
            />
            <div className="relative glass-card rounded-2xl p-6 text-center overflow-hidden border border-amber-400/20">
              {/* Rising sparks */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute bottom-0 w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_6px_rgb(251_191_36)]"
                    style={{ left: `${10 + i * 11}%` }}
                    animate={{ y: [0, -90], opacity: [0, 1, 0], scale: [0.5, 1, 0.3] }}
                    transition={{ duration: 2.5 + (i % 3) * 0.4, repeat: Infinity, ease: 'easeOut', delay: i * 0.3 }}
                  />
                ))}
              </div>
              {/* Trophy with bouncing motion */}
              <motion.div
                animate={{ y: [0, -4, 0], rotate: [-3, 3, -3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-14 h-14 mx-auto mb-2 flex items-center justify-center"
              >
                {/* Glow halo */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full opacity-70"
                  style={{ background: 'conic-gradient(from 0deg, transparent, rgb(251 191 36 / 0.6), transparent 70%)' }}
                />
                <Trophy className="relative w-9 h-9 text-amber-400 drop-shadow-[0_0_8px_rgb(251_191_36_/_0.7)]" strokeWidth={2} />
              </motion.div>
              {/* Star rating */}
              <div className="relative flex items-center justify-center gap-0.5 mb-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 250 }}
                  >
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  </motion.div>
                ))}
              </div>
              {/* Counter */}
              <div className="relative text-3xl md:text-4xl font-display font-bold leading-none mb-1"
                style={{ background: 'linear-gradient(135deg, rgb(251 191 36), rgb(245 158 11))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                <AnimatedCounter end={62} suffix="+" decimals={0} duration={2.2} />
              </div>
              <div className="relative flex items-center justify-center gap-1">
                <Medal className="w-3 h-3 text-amber-400" />
                <p className="text-muted-foreground text-xs font-medium">Professional Certificates</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
