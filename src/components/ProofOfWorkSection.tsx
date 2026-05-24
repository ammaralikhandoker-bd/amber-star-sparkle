import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, TrendingUp, FileSpreadsheet, Star, BadgeCheck } from 'lucide-react';
import sproutPerf from '@/assets/proof-sproutgigs-performance.jpg';
import sproutSuccess from '@/assets/proof-sproutgigs-success.jpg';
import stepStock from '@/assets/proof-stepmedia-stock.jpg';
import rflAttendance from '@/assets/proof-rfl-attendance.jpg';
import rflContractual from '@/assets/proof-rfl-contractual.jpg';
import rflPiecemeal from '@/assets/proof-rfl-piecemeal.jpg';
import rflHr from '@/assets/proof-rfl-hr.jpg';

type Proof = {
  title: string;
  client: string;
  tag: string;
  icon: typeof Briefcase;
  img: string;
  highlights: string[];
};

const proofs: Proof[] = [
  {
    title: 'SproutGigs — Freelancer Performance',
    client: 'sproutgigs.com',
    tag: 'Level 7 · Advanced',
    icon: TrendingUp,
    img: sproutPerf,
    highlights: ['1,256 tasks completed', '1,191 satisfied (95%)', '$101.56+ earned', 'Verified Advanced level'],
  },
  {
    title: 'SproutGigs — Success Rate',
    client: 'sproutgigs.com',
    tag: '95% / 100%',
    icon: Star,
    img: sproutSuccess,
    highlights: ['95% all-time success rate', '100% recent success rate', 'Eligible to submit any task'],
  },
  {
    title: 'Step Media Ltd — Board Stock Maintain',
    client: 'Step Media Ltd',
    tag: 'Inventory · Excel',
    icon: FileSpreadsheet,
    img: stepStock,
    highlights: ['Daily stock register for full board catalog', 'Multi-variant SKU tracking (MDF, Veneer, Melamine)', 'Date-wise add/issue ledger'],
  },
  {
    title: 'PRAN-RFL — Daily Attendance Report',
    client: 'PRAN-RFL Group · DIP THA',
    tag: 'Attendance · Excel',
    icon: FileSpreadsheet,
    img: rflAttendance,
    highlights: ['Daily Present / Absent / Day-Off / Leave tracking', 'Department, section & shift-wise breakdown', 'Male/Female manpower summary (203 staff)', 'Multi-sheet: Total MP, Outgoing, Daily Basis Summary'],
  },
  {
    title: 'PRAN-RFL — Contractual Manpower Attendance',
    client: 'PRAN-RFL Group · DIP RFL THA',
    tag: 'Contractual · Excel',
    icon: FileSpreadsheet,
    img: rflContractual,
    highlights: ['Daily basic bill — Sept 2024 (Contractor: Habiba+Babul+Shohel+Akbar)', 'Per-worker date-wise hours (12h shifts)', 'Shift timing (8am–8pm / 8pm–8am)', 'Multi-tab: Pay Bill, Detail, Summary, OPM Wise'],
  },
  {
    title: 'PRAN-RFL — Piece Meal Data Sheet',
    client: 'PRAN-RFL Group · REL THA',
    tag: 'Piece-rate · Excel',
    icon: FileSpreadsheet,
    img: rflPiecemeal,
    highlights: ['Total OT calculation with VLOOKUP automation', 'Per-day salary + 4hr OT amount tracking', 'Attendance hour & income by date/shift', 'Designation, gender, job location breakdown'],
  },
  {
    title: 'PRAN-RFL — HR Confirmation Justify Sheet',
    client: 'PRAN-RFL Group · DIP',
    tag: 'HR · Payroll',
    icon: Briefcase,
    img: rflHr,
    highlights: ['Attendance scoring & grading procedure', 'Performance valuation (Job, VIVA, Dept. Head)', 'Salary increment proposal automation'],
  },
];

const ProofOfWorkSection = () => {
  const [selected, setSelected] = useState<Proof | null>(null);

  return (
    <section id="proof-of-work" className="py-20 px-4" aria-label="Proof of Work">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Proof of <span className="text-gradient">Work</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mb-10"
        >
          Verified freelancer performance and real corporate deliverables — SproutGigs, PRAN-RFL Group, and Step Media Ltd.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {proofs.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.button
                key={p.title}
                onClick={() => setSelected(p)}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -6 }}
                className="group relative text-left glass-card rounded-2xl overflow-hidden hover:border-primary/40 transition-colors duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted/20">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium font-display backdrop-blur-md bg-background/60 border border-primary/30 text-primary">
                    <Icon className="w-3 h-3" />
                    {p.tag}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <BadgeCheck className="w-3.5 h-3.5 text-secondary" />
                    <span className="text-[10px] uppercase tracking-wider font-display text-secondary">{p.client}</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-foreground leading-snug">{p.title}</h3>
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
              <div className="overflow-auto">
                <img src={selected.img} alt={selected.title} className="w-full h-auto" />
              </div>
              <div className="p-5 sm:p-6 border-t border-border/40 shrink-0">
                <span className="inline-block text-[10px] uppercase tracking-wider font-display text-secondary mb-1.5">
                  {selected.client}
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-foreground mb-3">{selected.title}</h3>
                <ul className="grid sm:grid-cols-2 gap-1.5">
                  {selected.highlights.map(h => (
                    <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProofOfWorkSection;
