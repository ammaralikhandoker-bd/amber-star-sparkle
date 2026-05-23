import { motion } from 'framer-motion';
import { Briefcase, Package, Users, Monitor, Database, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const experiences = [
  {
    period: '2025 - Present', title: 'Executive (Store & Inventory Management)', company: 'Step Media Limited',
    description: 'Overseeing store operations, inventory management, and logistics optimization for maximum efficiency.', current: true,
    icon: Package, accent: 'hsl(var(--secondary))',
    iconAnim: { y: [0, -4, 0], rotate: [-3, 3, -3] },
    glow: 'radial-gradient(circle at 30% 30%, hsl(var(--secondary) / 0.45), transparent 70%)',
  },
  {
    period: '1.5 Years', title: 'Junior Executive (HR & Admin)', company: 'RFL Electronics Limited',
    description: 'Managed HR functions, employee data, ERP systems, and internal communications.', current: false,
    icon: Users, accent: 'hsl(var(--primary))',
    iconAnim: { scale: [1, 1.15, 1] },
    glow: 'radial-gradient(circle at 70% 30%, hsl(var(--primary) / 0.45), transparent 70%)',
  },
  {
    period: '0.8 Years', title: 'Data Entry Operator', company: 'Chorka Apparels Limited',
    description: 'Accurate data entry and maintaining production records, building foundational skills.', current: false,
    icon: Database, accent: 'rgb(34 197 94)',
    iconAnim: { y: [0, -3, 0], scale: [1, 1.08, 1] },
    glow: 'radial-gradient(circle at 70% 70%, rgb(34 197 94 / 0.4), transparent 70%)',
  },
  {
    period: '1.1 Years', title: 'Computer Operator & IT Support', company: 'Mahdeen Group',
    description: 'Handled data entry, production finishing records, and IT support with high accuracy.', current: false,
    icon: Monitor, accent: 'rgb(168 85 247)',
    iconAnim: { rotate: [0, -8, 8, 0] },
    glow: 'radial-gradient(circle at 30% 70%, rgb(168 85 247 / 0.4), transparent 70%)',
  },
];

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const cardVariants = {
  hidden: (isEven: boolean) => ({
    opacity: 0,
    x: isEven ? -40 : 40,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 15, delay: 0.2 },
  },
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const ExperienceSection = () => {
  const isMobile = useIsMobile();
  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Career <span className="text-gradient">Journey</span>
        </motion.h2>

        <motion.div
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Timeline line */}
          <motion.div
            variants={lineVariants}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary transform md:-translate-x-1/2 origin-top"
          />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              custom={index % 2 === 0}
              variants={cardVariants}
              className={`relative mb-10 md:mb-14 ${
                index % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%]'
              }`}
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Timeline dot */}
              <motion.div
                variants={dotVariants}
                className={`absolute left-6 md:left-1/2 top-1 w-3 h-3 rounded-full transform -translate-x-1/2 z-10 ${
                  exp.current ? 'bg-secondary glow-gold' : 'bg-primary glow-blue'
                }`}
              />
              
              <div className={`ml-14 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                <motion.div
                  whileHover={isMobile ? undefined : { y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className={`relative glass-card rounded-xl p-6 overflow-hidden ${
                    exp.current ? 'hover:border-secondary/60' : 'hover:border-primary/40'
                  } transition-colors duration-300`}
                >
                  {/* Unique animated glow per card — desktop only (blur is GPU-expensive on mobile) */}
                  {!isMobile && (
                    <motion.div
                      aria-hidden
                      animate={{ opacity: [0.25, 0.55, 0.25] }}
                      transition={{ duration: 5 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="pointer-events-none absolute -inset-1 rounded-xl blur-xl"
                      style={{ background: exp.glow, willChange: 'opacity' }}
                    />
                  )}
                  {/* Static soft glow on mobile (no animation, no blur) */}
                  {isMobile && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-xl opacity-40"
                      style={{ background: exp.glow }}
                    />
                  )}
                  {/* Shine sweep on hover */}
                  <motion.div
                    aria-hidden
                    initial={{ x: '-120%' }}
                    whileHover={{ x: '220%' }}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                    className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 hidden md:block"
                    style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--secondary) / 0.18), transparent)' }}
                  />
                  {exp.current && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
                      className="relative inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20 mb-3"
                    >
                      <Sparkles className="w-3 h-3" />
                      Current Role
                    </motion.span>
                  )}
                  <div className="relative flex items-center gap-2 mb-2" style={{ color: exp.accent }}>
                    <motion.div
                      animate={isMobile ? undefined : exp.iconAnim}
                      transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center border"
                      style={{ background: `${exp.accent.replace(')', ' / 0.12)')}`, borderColor: `${exp.accent.replace(')', ' / 0.35)')}`, willChange: 'transform' }}
                    >
                      <exp.icon className="w-4 h-4" />
                    </motion.div>
                    <Briefcase className="w-3.5 h-3.5 opacity-70" />
                    <span className="text-sm font-display font-medium">{exp.period}</span>
                  </div>
                  <h3 className="relative text-lg font-bold font-display mb-1 text-foreground">{exp.title}</h3>
                  <p className="relative text-sm font-medium mb-2" style={{ color: exp.accent }}>{exp.company}</p>
                  <p className="relative text-muted-foreground text-sm leading-relaxed">{exp.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
