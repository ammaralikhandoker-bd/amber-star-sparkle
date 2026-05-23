import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, GraduationCap, Send, PhoneCall, Navigation, BookOpen, GitBranch, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import aboutPhoto from '@/assets/about-photo.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -60, filter: 'blur(6px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const slideRight = {
  hidden: { opacity: 0, x: 60, filter: 'blur(6px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, type: 'spring' as const, stiffness: 120, damping: 14 },
  }),
};

const bulletVariants = {
  hidden: { opacity: 0, x: 30, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { delay: 0.4 + i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const useCopy = () => {
  const [copied, setCopied] = useState(false);
  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`${label} copied!`, { description: value });
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error('Failed to copy');
    }
  };
  return { copied, copy };
};

const CopyButton = ({ copied, onClick, label }: { copied: boolean; onClick: (e: React.MouseEvent) => void; label: string }) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    aria-label={`Copy ${label}`}
    className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center border border-primary/30 bg-background/60 backdrop-blur hover:bg-primary/20 transition-colors"
  >
    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-primary" />}
  </motion.button>
);

/* ============== Card 1 — EMAIL: paper-plane streak ============== */
const EmailCard = () => {
  const email = 'mdamberalikhandoker@outlook.com';
  const { copied, copy } = useCopy();
  return (
  <motion.a
    href="mailto:mdamberalikhandoker@outlook.com"
    custom={0}
    variants={cardVariants}
    whileHover={{ y: -6, scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="relative block glass-card rounded-2xl p-6 text-center overflow-hidden border border-primary/20 group"
  >
    <CopyButton copied={copied} label="email" onClick={(e) => { e.preventDefault(); e.stopPropagation(); copy(email, 'Email'); }} />
    <motion.div
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -inset-1 rounded-2xl blur-xl pointer-events-none"
      style={{ background: 'radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.4), transparent 70%)' }}
    />
    {/* Flying paper plane streak */}
    <motion.div
      animate={{ x: ['-30%', '130%'], y: [10, -10, 10] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
      className="pointer-events-none absolute top-3 left-0"
    >
      <Send className="w-3 h-3 text-primary/70 -rotate-45" />
    </motion.div>
    <div className="relative w-14 h-14 mx-auto mb-3">
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-2xl"
        style={{ background: 'var(--gradient-primary)', filter: 'blur(8px)' }}
      />
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-full h-full rounded-2xl flex items-center justify-center border border-primary/30"
        style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--secondary) / 0.15))' }}
      >
        <Mail className="w-6 h-6 text-primary" strokeWidth={2.2} />
      </motion.div>
    </div>
    <p className="relative text-muted-foreground text-xs uppercase tracking-wider mb-1">Email</p>
    <p className="relative text-foreground font-medium text-sm break-all">{email}</p>
  </motion.a>
  );
};

/* ============== Card 2 — PHONE: pulsing call rings ============== */
const PhoneCard = () => {
  const phone = '+8801716861353';
  const phoneDisplay = '+8801716-861353';
  const { copied, copy } = useCopy();
  return (
  <motion.a
    href="tel:+8801716861353"
    custom={1}
    variants={cardVariants}
    whileHover={{ y: -6, scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="relative block glass-card rounded-2xl p-6 text-center overflow-hidden border border-secondary/20 group"
  >
    <CopyButton copied={copied} label="phone" onClick={(e) => { e.preventDefault(); e.stopPropagation(); copy(phone, 'Phone'); }} />
    <motion.div
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -inset-1 rounded-2xl blur-xl pointer-events-none"
      style={{ background: 'radial-gradient(circle at 70% 30%, rgb(34 197 94 / 0.45), transparent 70%)' }}
    />
    <div className="relative w-14 h-14 mx-auto mb-3 flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border border-green-400/50"
          animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: i * 0.6 }}
        />
      ))}
      <motion.div
        animate={{ rotate: [0, -12, 12, -8, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
        className="relative w-full h-full rounded-full flex items-center justify-center border border-green-400/40"
        style={{ background: 'linear-gradient(135deg, rgb(34 197 94 / 0.2), hsl(var(--secondary) / 0.2))' }}
      >
        <PhoneCall className="w-5 h-5 text-green-400" strokeWidth={2.2} />
      </motion.div>
    </div>
    <p className="relative text-muted-foreground text-xs uppercase tracking-wider mb-1">Phone</p>
    <p className="relative text-foreground font-medium text-sm">{phoneDisplay}</p>
  </motion.a>
  );
};

/* ============== Card 3 — LOCATION: GPS pin with sweeping radar ============== */
const LocationCard = () => (
  <motion.div
    custom={2}
    variants={cardVariants}
    whileHover={{ y: -6, scale: 1.03 }}
    className="relative block glass-card rounded-2xl p-6 text-center overflow-hidden border border-amber-400/20 group"
  >
    <motion.div
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -inset-1 rounded-2xl blur-xl pointer-events-none"
      style={{ background: 'radial-gradient(circle at 50% 50%, hsl(45 95% 60% / 0.4), transparent 70%)' }}
    />
    {/* Background grid */}
    <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage: 'linear-gradient(hsl(45 95% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(45 95% 60%) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
      }}
    />
    <div className="relative w-14 h-14 mx-auto mb-3">
      {/* Radar sweep */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, hsl(45 95% 60% / 0.5) 60deg, transparent 90deg)',
        }}
      />
      {/* Concentric circles */}
      {[1, 0.7, 0.4].map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full border border-amber-400/30"
          style={{ inset: `${(1 - s) * 50}%` }}
        />
      ))}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <MapPin className="w-6 h-6 text-amber-400 drop-shadow-[0_0_6px_hsl(45_95%_60%_/_0.7)] fill-amber-400/30" strokeWidth={2.2} />
      </motion.div>
    </div>
    <div className="relative flex items-center justify-center gap-1 mb-1">
      <Navigation className="w-3 h-3 text-amber-400" />
      <p className="text-muted-foreground text-xs uppercase tracking-wider">Location</p>
    </div>
    <p className="relative text-foreground font-medium text-sm">Savar, Dhaka</p>
  </motion.div>
);

/* ============== Card 4 — EDUCATION: graduation cap with floating books ============== */
const EducationCard = () => (
  <motion.div
    custom={3}
    variants={cardVariants}
    whileHover={{ y: -6, scale: 1.03, rotateY: 6 }}
    className="relative block glass-card rounded-2xl p-6 text-center overflow-hidden border border-purple-400/20 group"
    style={{ perspective: 1000 }}
  >
    <motion.div
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -inset-1 rounded-2xl blur-xl pointer-events-none"
      style={{ background: 'radial-gradient(circle at 50% 100%, rgb(168 85 247 / 0.45), transparent 70%)' }}
    />
    {/* Floating books/icons */}
    <div className="pointer-events-none absolute inset-0">
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{ left: `${15 + i * 18}%`, top: '70%' }}
          animate={{ y: [0, -40, 0], opacity: [0, 1, 0], rotate: [0, 180] }}
          transition={{ duration: 3 + (i % 2), repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}
        >
          <BookOpen className="w-2.5 h-2.5 text-purple-400/70" />
        </motion.span>
      ))}
    </div>
    <div className="relative w-14 h-14 mx-auto mb-3">
      {/* Rotating halo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, transparent, rgb(168 85 247 / 0.6), transparent 50%)',
          WebkitMask: 'radial-gradient(circle, transparent 55%, #000 56%)',
          mask: 'radial-gradient(circle, transparent 55%, #000 56%)',
        }}
      />
      {/* Tossing graduation cap */}
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [-8, 8, -8] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-1 rounded-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, rgb(168 85 247 / 0.25), hsl(var(--primary) / 0.25))' }}
      >
        <GraduationCap className="w-6 h-6 text-purple-400 drop-shadow-[0_0_6px_rgb(168_85_247_/_0.7)]" strokeWidth={2.2} />
      </motion.div>
    </div>
    <div className="relative flex items-center justify-center gap-1 mb-1">
      <GitBranch className="w-3 h-3 text-purple-400" />
      <p className="text-muted-foreground text-xs uppercase tracking-wider">Education</p>
    </div>
    <p className="relative text-foreground font-medium text-sm">BSS · Kurigram Govt. College</p>
  </motion.div>
);

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          <span className="text-gradient">About</span> Me
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <motion.div
                animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.08, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl"
              />
              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden ring-glow-indigo">
                <img src={aboutPhoto} alt="MD. Amber Ali Khandoker" className="w-full h-full object-cover" loading="lazy" width={320} height={384} decoding="async" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-medium text-secondary">Gov. Verified Freelancer · ICT Division, Bangladesh</span>
            </div>
            <h3 className="font-display font-bold text-lg text-foreground mb-3">Professional Summary</h3>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
              Results-driven HR, Admin & Digital Marketing professional with <span className="text-foreground font-semibold">5+ years</span> of hands-on
              experience across ERP/HRIS operations, inventory management, MIS reporting, and digital campaigns.
              Government Verified Freelancer (ID: F126497733229) skilled in AI tools, Prompt Engineering,
              WordPress, Canva, and Video Editing.
            </p>
            <ul className="space-y-2 text-muted-foreground text-sm">
              {[
                { color: 'bg-primary', text: 'HRIS / ERP operations · onboarded 100+ employees with 99% data accuracy' },
                { color: 'bg-secondary', text: '50+ digital campaigns delivered · 500+ qualified leads generated' },
                { color: 'bg-primary', text: 'AI-powered workflows · Prompt Engineering, ChatGPT, Gemini, Claude' },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={bulletVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex items-start gap-2"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${item.color} mt-2 shrink-0`} />
                  {item.text}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <EmailCard />
          <PhoneCard />
          <LocationCard />
          <EducationCard />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
