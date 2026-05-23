import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, ExternalLink, BadgeCheck, ShieldCheck, X, Maximize2, Sparkles, Star, Trophy, Medal, Crown, Zap, Flame, Gem, Rocket, Target } from 'lucide-react';
import freelancerIdCard from '@/assets/freelancer-id-card.jpg';

const certificates = [
  { name: 'Deep Dive into OpenAI Models: Master o3, o4-mini & Beyond', issuer: 'Udemy', date: 'Jan 2026', credential: 'https://www.udemy.com/certificate/UC-da299e1d-71cd-4fc3-aeaf-fb74a0e41133/' },
  { name: '5-Day AI Agents Intensive Course with Google', issuer: 'Kaggle', date: 'Dec 2025', credential: 'https://www.kaggle.com/certification/badges/mdamberalikhandoker/105' },
  { name: 'Excel Essentials for Workplace Productivity', issuer: 'Passport to Earning Bangladesh', date: 'Dec 2025' },
  { name: 'Critical Thinking in AI Era', issuer: 'HP LIFE', date: 'Dec 2025', credential: 'https://www.linkedin.com/learning/certificates/edd333eccb1a7d3968828775be2c12fd401bff9e357441c888aa40d5f77b0d8f' },
  { name: 'Human Resources: Writing an Effective Job Description', issuer: 'LinkedIn Learning', date: 'Oct 2025', credential: 'https://www.linkedin.com/learning/certificates/52bcd3b0090706426fdb170fea26395ea3757c2bdf7a41b9b020f86908ad9baf' },
  { name: 'Ethics Conversations: Building an Ethics-Based Culture', issuer: 'HRCI®', date: 'Sep 2025', credential: 'https://www.linkedin.com/learning/certificates/bff902cc7a45f682c6e1fe57b18dc0efa11a8c2e592a7741c01429cf1e5c0859' },
  { name: 'A Design Thinking Approach to Putting Customer First', issuer: 'LinkedIn Learning', date: 'Sep 2025', credential: 'https://www.linkedin.com/learning/certificates/e5c7650dde29fd5a36b12586e80c73b8941d7320d1f8f6101887653aaa23b474' },
  { name: 'Administrative Human Resources', issuer: 'LinkedIn Learning', date: 'Sep 2025', credential: 'https://www.linkedin.com/learning/certificates/3a4138b654a42259d67df8fb1d25e47a764ddff5bcf2504114a22328378bcb07' },
  { name: 'Business Development: Strategic Planning', issuer: 'LinkedIn Learning', date: 'Sep 2025', credential: 'https://www.linkedin.com/learning/certificates/456b5d870f9440b23d93b21ba92ad061a0b4bdafd6b154ca7891755afec22d52' },
  { name: 'Canva Essential Training', issuer: 'LinkedIn Learning', date: 'Sep 2025', credential: 'https://www.linkedin.com/learning/certificates/8e704fe9cfac9f2100c04ffafe5077a5697fc557702a56005a20b72d32b4265f' },
  { name: 'HR as a Strategic Business Partner', issuer: 'HRCI®', date: 'Aug 2025', credential: 'https://www.linkedin.com/learning/certificates/456b5d870f9440b23d93b21ba92ad061a0b4bdafd6b154ca7891755afec22d52' },
  { name: 'Microsoft 365: Administration', issuer: 'LinkedIn Learning', date: 'Aug 2025', credential: 'https://www.linkedin.com/learning/certificates/23cf63c052405fbaff230c83745e02031a3ca5fd9548c452bcaeb8cca93f36cd' },
  { name: 'Introduction to Cybersecurity Awareness', issuer: 'HP LIFE', date: 'Jul 2025', credential: 'https://www.life-global.org/certificate/ea4e81a7-a963-4e2e-ad07-f9622a2306b8' },
  { name: 'Career with AI', issuer: 'Grameenphone Ltd', date: 'Jul 2025', credential: 'https://www.life-global.org/certificate/ea4e81a7-a963-4e2e-ad07-f9622a2306b8' },
  { name: 'Effective Presentations', issuer: 'HP LIFE', date: 'May 2025', credential: 'https://www.life-global.org/certificate/5ffbf65c-6879-4c6f-aad4-ad6210279ef5' },
  { name: 'Gemini Certified Educator', issuer: 'Google', date: 'Jan 2025', credential: 'https://edu.google.accredible.com/c65ef36e-9649-4a90-a24c-95381c98658a#acc.yobiZlBw' },
  { name: 'Six Sigma Level 1', issuer: 'PRAN-RFL Group', date: 'Aug 2023' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

// Unique motion variants for each certificate card
const motionStyles = [
  { icon: Trophy, hover: { y: -8, rotateZ: -2, scale: 1.04 }, iconAnim: { rotate: [0, -15, 15, 0] }, glow: 'from-primary/40 to-secondary/40', accent: 'primary' },
  { icon: Medal, hover: { y: -6, rotateY: 12, scale: 1.03 }, iconAnim: { y: [0, -4, 0] }, glow: 'from-secondary/40 to-primary/40', accent: 'secondary' },
  { icon: Crown, hover: { y: -10, scale: 1.05 }, iconAnim: { scale: [1, 1.2, 1] }, glow: 'from-primary/50 to-primary/20', accent: 'primary' },
  { icon: Star, hover: { y: -5, rotateX: -8, scale: 1.03 }, iconAnim: { rotate: 360 }, glow: 'from-secondary/40 to-secondary/10', accent: 'secondary' },
  { icon: Zap, hover: { x: 4, y: -6, scale: 1.04 }, iconAnim: { scale: [1, 0.85, 1.15, 1] }, glow: 'from-primary/40 to-secondary/30', accent: 'primary' },
  { icon: Flame, hover: { y: -8, rotateZ: 3 }, iconAnim: { y: [0, -3, 0], rotate: [-5, 5, -5] }, glow: 'from-secondary/50 to-primary/20', accent: 'secondary' },
  { icon: Gem, hover: { y: -7, rotateY: -10, scale: 1.04 }, iconAnim: { rotate: [0, 180, 360] }, glow: 'from-primary/40 to-secondary/40', accent: 'primary' },
  { icon: Rocket, hover: { y: -12, rotateZ: -8 }, iconAnim: { y: [0, -5, 0], x: [0, 2, 0] }, glow: 'from-primary/50 to-secondary/30', accent: 'primary' },
  { icon: Sparkles, hover: { y: -6, scale: 1.05 }, iconAnim: { scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }, glow: 'from-secondary/40 to-primary/40', accent: 'secondary' },
  { icon: Target, hover: { y: -5, rotateX: 8, scale: 1.03 }, iconAnim: { rotate: [0, 90, 180, 270, 360] }, glow: 'from-primary/40 to-secondary/20', accent: 'primary' },
  { icon: Award, hover: { y: -8, rotateY: 8 }, iconAnim: { rotate: [0, 15, -15, 0] }, glow: 'from-secondary/40 to-primary/30', accent: 'secondary' },
  { icon: BadgeCheck, hover: { y: -6, scale: 1.04 }, iconAnim: { scale: [1, 1.15, 1] }, glow: 'from-primary/40 to-primary/10', accent: 'primary' },
];

const CertificatesSection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [lightboxOpen]);

  return (
    <section id="certificates" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-4">
            My <span className="text-gradient">Certificates</span>
          </h2>
          <p className="text-muted-foreground">
            <span className="text-3xl font-bold text-gradient">62+</span> Professional Certifications
          </p>
        </motion.div>

        {/* Government Certified Freelancer ID Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-14 flex justify-center"
        >
          <motion.div
            whileHover={{ y: -8, rotateX: 4, rotateY: -4, scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 180, damping: 16 }}
            className="relative w-full max-w-2xl group"
            style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
          >
            {/* Rotating conic halo */}
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-2 rounded-2xl opacity-60 blur-2xl"
              style={{
                background:
                  'conic-gradient(from 0deg, hsl(var(--primary)/0.55), hsl(var(--secondary)/0.55), hsl(var(--primary)/0.0), hsl(var(--primary)/0.55))',
              }}
            />

            {/* Pulsing soft glow */}
            <motion.div
              aria-hidden
              animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/40 via-secondary/30 to-primary/40 blur-2xl"
            />

            {/* Floating verified badge */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 12 }}
              className="absolute -top-3 -right-3 z-20"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full bg-secondary/50"
                />
                <div
                  className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-2 border-background"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <BadgeCheck className="w-6 h-6 text-primary-foreground" />
                </div>
              </motion.div>
            </motion.div>

            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card/60 backdrop-blur-xl shadow-2xl">
              {/* Shine sweep */}
              <motion.div
                aria-hidden
                initial={{ x: '-120%' }}
                animate={{ x: '120%' }}
                transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut' }}
                className="pointer-events-none absolute inset-y-0 w-1/3 z-10"
                style={{
                  background:
                    'linear-gradient(115deg, transparent 0%, hsl(var(--primary-foreground)/0.18) 50%, transparent 100%)',
                  filter: 'blur(2px)',
                }}
              />

              {/* Corner scan lines */}
              <motion.div
                aria-hidden
                animate={{ y: ['0%', '100%', '0%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute left-0 right-0 h-px z-10"
                style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--secondary)/0.7), transparent)' }}
              />

              <img
                src={freelancerIdCard}
                alt="MD. Amber Ali Khandoker — Bangladesh Government Certified Freelancer ID Card (Digital Marketing)"
                className="block w-full h-auto relative cursor-zoom-in"
                loading="lazy"
                decoding="async"
                onClick={() => setLightboxOpen(true)}
              />
              <motion.button
                type="button"
                onClick={() => setLightboxOpen(true)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                aria-label="View full-screen"
                className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full bg-background/70 backdrop-blur-md border border-border text-foreground hover:text-primary"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                Full view
              </motion.button>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-border bg-card/80">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                  <ShieldCheck className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span>Issued by Department of ICT, Government of Bangladesh</span>
                </div>
                <motion.a
                  href="https://www.freelancers.gov.bd/verify/a1c55d0c-8ea9-42d1-b819-821d74dab442-sh-1768654010-y-71ec91545d5f23dc2711da0539b750e76e30eab4-a-m-075db42fdd41b6d2b6b2b7f4c71e271a6e29244b"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full text-primary-foreground shadow-md"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Verify Credential
                  <ExternalLink className="w-3 h-3" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {certificates.map((cert, index) => {
            const style = motionStyles[index % motionStyles.length];
            const Icon = style.icon;
            const accentText = style.accent === 'primary' ? 'text-primary' : 'text-secondary';
            const accentBorder = style.accent === 'primary' ? 'hover:border-primary/50' : 'hover:border-secondary/50';
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={style.hover}
                transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
                className={`relative bg-card border border-border rounded-lg p-5 group ${accentBorder} transition-colors duration-300 overflow-hidden`}
              >
                {/* Unique animated glow per card */}
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className={`absolute -inset-px rounded-lg bg-gradient-to-br ${style.glow} blur-xl pointer-events-none`}
                />
                {/* Shine sweep on hover */}
                <motion.div
                  aria-hidden
                  initial={{ x: '-150%' }}
                  whileHover={{ x: '150%' }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                  className="pointer-events-none absolute inset-y-0 w-1/2 z-[1]"
                  style={{
                    background: 'linear-gradient(115deg, transparent 0%, hsl(var(--primary-foreground)/0.12) 50%, transparent 100%)',
                  }}
                />
                <div className="relative flex items-start gap-3 z-[2]">
                  <motion.div
                    animate={style.iconAnim}
                    transition={{ duration: 2.4 + (index % 5) * 0.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <Icon className={`w-5 h-5 ${accentText} transition-colors duration-300`} />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{cert.name}</h3>
                    <p className="text-muted-foreground text-xs mb-2">{cert.issuer}</p>
                    <div className="flex items-center justify-between gap-2">
                      <div className={`flex items-center gap-1 ${accentText} text-xs`}>
                        <Calendar className="w-3 h-3" />
                        <span>{cert.date}</span>
                      </div>
                      {cert.credential && (
                        <motion.a
                          href={cert.credential}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.08, x: 2 }}
                          whileTap={{ scale: 0.94 }}
                          className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${style.accent === 'primary' ? 'border-primary/30 text-primary hover:bg-primary/10' : 'border-secondary/30 text-secondary hover:bg-secondary/10'} transition-colors`}
                        >
                          Show credential
                          <ExternalLink className="w-3 h-3" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-background/90 backdrop-blur-md"
              onClick={() => setLightboxOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-label="Freelancer certificate full view"
            >
              <motion.button
                type="button"
                onClick={() => setLightboxOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-card/80 border border-border text-foreground hover:text-primary"
              >
                <X className="w-5 h-5" />
              </motion.button>
              <motion.img
                src={freelancerIdCard}
                alt="MD. Amber Ali Khandoker — Bangladesh Government Certified Freelancer ID Card (Digital Marketing)"
                initial={{ scale: 0.85, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 10 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-[95vw] max-h-[90vh] w-auto h-auto rounded-xl shadow-2xl border border-primary/30 object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CertificatesSection;
