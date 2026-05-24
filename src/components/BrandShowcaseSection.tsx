import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Briefcase, Heart, Building2, Palette, BarChart3, Network, Gauge, Zap } from 'lucide-react';
import linkedinBanner from '@/assets/brand-linkedin-banner.jpg';
import neonName from '@/assets/brand-neon-name.jpg';
import blessings from '@/assets/brand-blessings.jpg';
import lineart from '@/assets/brand-lineart-portrait.jpg';
import stepLogo from '@/assets/brand-stepmedia-logo.jpg';
import stepIllustration from '@/assets/brand-stepmedia-illustration.jpg';
import coreModules from '@/assets/brand-core-modules.jpg';
import techEcosystem from '@/assets/brand-tech-ecosystem.jpg';
import dataPrecision from '@/assets/brand-data-precision.jpg';

type Item = {
  img: string;
  title: string;
  caption: string;
  tag: string;
  icon: typeof Briefcase;
};

const items: Item[] = [
  {
    img: linkedinBanner,
    title: 'Professional LinkedIn Banner',
    caption: 'Driving organizational efficiency through HRM, ERP & HRIS systems — paired with SEO, AI, WordPress and Graphic Design expertise.',
    tag: 'Personal Brand',
    icon: Briefcase,
  },
  {
    img: neonName,
    title: 'AmMar Khandoker — Neon Identity',
    caption: 'Cinematic neon typography concept blending Makkah skyline with futuristic aesthetics. A creative signature piece.',
    tag: 'Creative',
    icon: Zap,
  },
  {
    img: blessings,
    title: 'Counting My Blessings',
    caption: '"Counting my blessings, and all of them are from Allah Subhanahutala." — a quiet reminder of gratitude.',
    tag: 'Faith',
    icon: Heart,
  },
  {
    img: lineart,
    title: 'Line-Art Portrait',
    caption: 'Minimalist black & white vector portrait — used as a signature avatar across creative platforms.',
    tag: 'Avatar',
    icon: Palette,
  },
  {
    img: stepLogo,
    title: 'Step Media Ltd — Brand Mark',
    caption: 'Premium metallic play-button mark designed for Step Media Ltd, where I serve as a key operations contributor.',
    tag: 'Branding',
    icon: Building2,
  },
  {
    img: stepIllustration,
    title: 'Step Media — Partnership Illustration',
    caption: 'Flat-style brand illustration symbolising teamwork & shelter — embodying Step Media\'s collaborative culture.',
    tag: 'Illustration',
    icon: Sparkles,
  },
  {
    img: coreModules,
    title: 'Core Operational Modules',
    caption: '99.5% ERP & MIS mastery · 200+ HR & Admin records · 500+ multichannel marketing campaigns — powered by AI integration.',
    tag: 'Capability',
    icon: BarChart3,
  },
  {
    img: techEcosystem,
    title: 'Integrated Technology Ecosystem',
    caption: 'HRIS · Data Backbone · Logistics · Digital & Creative — orchestrated around an AI & Automation core (o3, o4-mini, Prompt Engineering).',
    tag: 'Ecosystem',
    icon: Network,
  },
  {
    img: dataPrecision,
    title: '98.8% Lifetime Data Precision',
    caption: 'Chorka Textile 99.5% · PRAN-RFL 99% · Step Media 98% · Mahdeen Group 98% — 1,500+ critical records, zero compliance failures.',
    tag: 'Track Record',
    icon: Gauge,
  },
];

const BrandShowcaseSection = () => {
  const [selected, setSelected] = useState<Item | null>(null);

  return (
    <section id="brand-showcase" className="py-20 px-4" aria-label="Brand Showcase">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
            Visual Identity
          </span>
          <h2 className="section-title">
            Brand <span className="text-gradient">Showcase</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Personal branding, creative concepts and operational dashboards — the visual story behind the work.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.button
                key={it.title}
                onClick={() => setSelected(it)}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -6 }}
                className="group relative text-left glass-card rounded-2xl overflow-hidden hover:border-primary/40 transition-colors duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted/20">
                  <img
                    src={it.img}
                    alt={it.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium font-display backdrop-blur-md bg-background/60 border border-primary/30 text-primary">
                    <Icon className="w-3 h-3" />
                    {it.tag}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-base text-foreground leading-snug mb-1.5">{it.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{it.caption}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[60] bg-background/85 backdrop-blur-md flex items-center justify-center p-4"
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
              className="relative w-full max-w-4xl glass-card rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/80 hover:bg-background flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="overflow-auto bg-muted/10">
                <img src={selected.img} alt={selected.title} className="w-full h-auto" />
              </div>
              <div className="p-5 sm:p-6 border-t border-border/40 shrink-0">
                <span className="inline-block text-[10px] uppercase tracking-wider font-display text-secondary mb-1.5">
                  {selected.tag}
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-foreground mb-2">{selected.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{selected.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BrandShowcaseSection;
