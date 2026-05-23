import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Sparkles, Users, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Category = 'all' | 'hr' | 'digital' | 'achievement';

type Project = {
  title: string;
  category: Exclude<Category, 'all'>;
  short: string;
  description: string;
  tools: string[];
  highlights: string[];
  link?: string;
};

const projects: Project[] = [
  {
    title: 'HR & Payroll Management System',
    category: 'hr',
    short: 'End-to-end HR platform for a mid-size company.',
    description: 'Built a comprehensive HR management and payroll processing system streamlining employee onboarding, attendance tracking, and salary disbursement for 200+ employees.',
    tools: ['Excel', 'ERP Software', 'Google Sheets'],
    highlights: ['Automated payroll for 200+ staff', 'Reduced manual HR work by 60%', 'Real-time attendance tracking'],
  },
  {
    title: 'E-Commerce Social Media Campaign',
    category: 'digital',
    short: 'Full-funnel campaign across Meta + LinkedIn.',
    description: 'Designed and executed a multi-channel digital marketing campaign across Facebook, Instagram, and LinkedIn — driving significant brand awareness and qualified leads.',
    tools: ['Canva', 'Meta Ads', 'SEO', 'Content Strategy'],
    highlights: ['3.2x ROAS achieved', '+180% follower growth', '420+ qualified leads'],
  },
  {
    title: 'Inventory Data Digitization',
    category: 'hr',
    short: 'Digitized 10,000+ SKU inventory database.',
    description: 'Led the digitization of a 10,000+ product inventory from physical records into a structured digital database with real-time tracking and reporting.',
    tools: ['Microsoft Excel', 'Google Sheets', 'Data Entry'],
    highlights: ['10,000+ SKUs migrated', '99.7% data accuracy', 'Real-time stock visibility'],
  },
  {
    title: 'Corporate Branding & Design',
    category: 'digital',
    short: 'Complete visual identity for a startup.',
    description: 'Created an end-to-end branding package — logo, business cards, social media templates, and marketing collateral — for an early-stage startup.',
    tools: ['Canva', 'Graphic Design', 'WordPress'],
    highlights: ['Full brand system delivered', '20+ social templates', 'Live WordPress site'],
  },
  {
    title: 'Bangladesh Govt. Certified Freelancer',
    category: 'achievement',
    short: 'Officially certified by Bangladesh Government.',
    description: 'Earned official freelancer certification from the Bangladesh Government, recognizing professional standing and verified skill proficiency in digital services.',
    tools: ['Recognition'],
    highlights: ['Govt-verified credentials', 'Recognized digital professional'],
  },
  {
    title: '62+ Professional Certificates',
    category: 'achievement',
    short: 'Continuous learning across HR & digital domains.',
    description: 'Completed 62+ professional certifications spanning HR management, digital marketing, data tools, and AI automation — demonstrating ongoing skill development.',
    tools: ['Continuous Learning'],
    highlights: ['62+ verified certs', 'HR + digital + AI tracks'],
  },
];

const filters: { key: Category; label: string; icon: typeof Sparkles }[] = [
  { key: 'all', label: 'All', icon: Sparkles },
  { key: 'hr', label: 'HR Projects', icon: Users },
  { key: 'digital', label: 'Digital Campaigns', icon: TrendingUp },
  { key: 'achievement', label: 'Achievements', icon: Award },
];

const ProjectsSection = () => {
  const [active, setActive] = useState<Category>('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = active === 'all' ? projects : projects.filter(p => p.category === active);

  return (
    <section id="projects" className="py-20 px-4" aria-label="Projects">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Featured <span className="text-gradient">Projects</span>
        </motion.h2>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="tablist"
        >
          {filters.map(f => {
            const isActive = active === f.key;
            return (
              <motion.button
                key={f.key}
                onClick={() => setActive(f.key)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                role="tab"
                aria-selected={isActive}
                className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium font-display flex items-center gap-1.5 transition-colors min-h-[44px] ${
                  isActive
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground glass-card'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-bg"
                    transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--glow-indigo)' }}
                  />
                )}
                <f.icon className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">{f.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid sm:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.button
                key={p.title}
                layout
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelected(p)}
                whileHover={{ y: -6 }}
                className="group relative text-left glass-card rounded-2xl p-6 flex flex-col hover:border-primary/40 transition-colors duration-300 overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                     style={{ background: 'radial-gradient(400px circle at 50% 0%, hsl(244 80% 69% / 0.15), transparent 70%)' }} />

                <div className="relative z-10 flex-1">
                  <span className="inline-block text-[10px] uppercase tracking-wider font-display text-secondary mb-3">
                    {p.category === 'hr' ? 'HR Project' : p.category === 'digital' ? 'Digital Campaign' : 'Achievement'}
                  </span>
                  <h3 className="font-display font-bold text-lg mb-2 text-foreground">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.short}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tools.slice(0, 3).map(tool => (
                      <span key={tool} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-primary/10 text-primary border border-primary/20">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-1.5 text-xs text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Details <ExternalLink className="w-3 h-3" />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg glass-card rounded-2xl p-6 sm:p-7 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="inline-block text-[10px] uppercase tracking-wider font-display text-secondary mb-2">
                {selected.category === 'hr' ? 'HR Project' : selected.category === 'digital' ? 'Digital Campaign' : 'Achievement'}
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl mb-3 text-foreground pr-8">{selected.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{selected.description}</p>

              <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-display">Highlights</h4>
              <ul className="space-y-1.5 mb-5">
                {selected.highlights.map(h => (
                  <li key={h} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-display">Tools & Skills</h4>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {selected.tools.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    {t}
                  </span>
                ))}
              </div>

              {selected.link && (
                <Button asChild className="w-full" style={{ background: 'var(--gradient-primary)' }}>
                  <a href={selected.link} target="_blank" rel="noopener noreferrer">
                    Visit Project <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
