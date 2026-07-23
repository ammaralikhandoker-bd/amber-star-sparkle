import { motion } from 'framer-motion';
import { Database, FileSpreadsheet, TrendingUp, Palette, Sparkles, Briefcase, ArrowRight, Code2, Workflow } from 'lucide-react';

type Service = {
  title: string;
  description: string;
  icon: typeof Database;
  features: string[];
  color: string;
  gradient: string;
};

const services: Service[] = [
  {
    title: 'AI-Powered Web Development',
    description: 'Full-stack web apps and dashboards built with an AI-first, vibe-coding workflow — ERP, admin panels, portfolios, and business tools.',
    icon: Code2,
    features: ['React + Supabase Apps', 'ERP & Dashboards', 'Vibe Coding Workflow'],
    color: 'hsl(210 100% 60%)',
    gradient: 'linear-gradient(135deg, hsl(210 100% 60%), hsl(244 80% 69%))',
  },
  {
    title: 'n8n Automation & AI Agents',
    description: 'Basic-level n8n agent workflows — connect apps, trigger AI actions, and automate repetitive HR, lead, and marketing tasks end-to-end.',
    icon: Workflow,
    features: ['n8n Workflows', 'AI Agents', 'App Integrations'],
    color: 'hsl(320 80% 65%)',
    gradient: 'linear-gradient(135deg, hsl(320 80% 65%), hsl(280 80% 65%))',
  },
  {
    title: 'HRIS & ERP Systems',
    description: 'End-to-end Oracle ERP and HRIS operations — employee data, payroll, attendance, and HR reporting.',
    icon: Database,
    features: ['Oracle ERP', 'HRIS Setup', 'Payroll Automation'],
    color: 'hsl(244 80% 69%)',
    gradient: 'linear-gradient(135deg, hsl(244 80% 69%), hsl(260 80% 65%))',
  },
  {
    title: 'Data Entry & MIS Reporting',
    description: 'Accurate, high-volume data entry and structured MIS reports that turn raw data into decisions.',
    icon: FileSpreadsheet,
    features: ['Advanced Excel', 'MIS Dashboards', '99%+ Accuracy'],
    color: 'hsl(190 100% 50%)',
    gradient: 'linear-gradient(135deg, hsl(190 100% 50%), hsl(210 100% 55%))',
  },
  {
    title: 'Digital Marketing & SEO',
    description: 'Full-funnel campaigns across Meta, Google, and LinkedIn — built for measurable ROAS and growth.',
    icon: TrendingUp,
    features: ['Meta & Google Ads', 'SEO Strategy', 'Lead Generation'],
    color: 'hsl(142 76% 55%)',
    gradient: 'linear-gradient(135deg, hsl(142 76% 55%), hsl(160 76% 50%))',
  },
  {
    title: 'Content Design (Canva)',
    description: 'On-brand social, print, and ad creatives crafted in Canva — fast turnaround, polished output.',
    icon: Palette,
    features: ['Social Templates', 'Brand Kits', 'Ad Creatives'],
    color: 'hsl(45 95% 55%)',
    gradient: 'linear-gradient(135deg, hsl(45 95% 55%), hsl(30 95% 55%))',
  },
  {
    title: 'AI Workflows & Prompt Engineering',
    description: 'Prompt engineering and AI agent design using ChatGPT, Gemini, and Claude — automate the busywork.',
    icon: Sparkles,
    features: ['Prompt Engineering', 'ChatGPT / Gemini / Claude', 'Workflow Automation'],
    color: 'hsl(280 80% 65%)',
    gradient: 'linear-gradient(135deg, hsl(280 80% 65%), hsl(310 80% 60%))',
  },
  {
    title: 'Freelance & Consultation',
    description: 'Available for project-based engagements, retainers, and 1-on-1 consultation — globally remote.',
    icon: Briefcase,
    features: ['Project-Based', 'Retainer', 'Consultation'],
    color: 'hsl(0 80% 65%)',
    gradient: 'linear-gradient(135deg, hsl(0 80% 65%), hsl(20 90% 60%))',
  },
];

const titleVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6 } },
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 px-4" aria-label="Services">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="section-title"
        >
          Services I <span className="text-gradient">Offer</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 -mt-6 text-sm md:text-base"
        >
          End-to-end HR, data, and digital growth services — delivered with 5+ years of hands-on experience.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -6, rotateX: 4, rotateY: -2 }}
                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                className="group relative glass-card rounded-2xl p-6 overflow-hidden transition-colors hover:border-primary/40"
              >
                {/* Hover glow */}
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(400px circle at 50% 0%, ${service.color.replace(')', ' / 0.15)')}, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border"
                    style={{
                      background: service.color.replace(')', ' / 0.12)'),
                      borderColor: service.color.replace(')', ' / 0.35)'),
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: service.color }} />
                  </div>

                  <h3 className="font-display font-bold text-lg mb-2 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-1.5 mb-5">
                    {service.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-foreground/80">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: service.color }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-display font-semibold tracking-wider transition-colors"
                    style={{ color: service.color }}
                  >
                    HIRE FOR THIS
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 glass-card rounded-2xl p-6 md:p-8 text-center"
        >
          <p className="text-sm md:text-base text-muted-foreground mb-4">
            Need something custom? Let's discuss your project.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display text-sm font-semibold tracking-wider text-primary-foreground transition-transform hover:scale-105"
            style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--glow-indigo)' }}
          >
            START A CONVERSATION
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
