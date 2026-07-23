import { motion } from 'framer-motion';
import { Users, Package, Sparkles, TrendingUp, Code2 } from 'lucide-react';

type Skill = { name: string; level: number };
type Accent = 'indigo' | 'gold' | 'emerald' | 'cyan';

const hrSkills: Skill[] = [
  { name: 'Oracle ERP / HRIS Operations', level: 92 },
  { name: 'Employee Onboarding & Records', level: 90 },
  { name: 'Attendance & HR Reporting', level: 88 },
  { name: 'Office Administration', level: 86 },
  { name: 'Payroll Processing', level: 84 },
  { name: 'MIS Reporting & Documentation', level: 88 },
];

const inventorySkills: Skill[] = [
  { name: 'Store Operations & Management', level: 88 },
  { name: 'ERP Data Entry & Maintenance', level: 90 },
  { name: 'Inventory & Stock Reconciliation', level: 85 },
  { name: 'Stock Auditing & Reporting', level: 86 },
  { name: 'Purchase & Procurement', level: 82 },
  { name: 'Warehouse Organization', level: 84 },
];

const aiSkills: Skill[] = [
  { name: 'Prompt Engineering', level: 92 },
  { name: 'ChatGPT / OpenAI Models', level: 90 },
  { name: 'Google Gemini (Pro)', level: 88 },
  { name: 'Claude (Pro)', level: 86 },
  { name: 'AI Agents & Automation', level: 84 },
  { name: 'Canva AI — Creative Design', level: 90 },
];

const marketingSkills: Skill[] = [
  { name: 'SEO & Google Ads', level: 86 },
  { name: 'Meta Ads (Facebook / Instagram)', level: 88 },
  { name: 'Social Media Management', level: 90 },
  { name: 'Lead Generation', level: 87 },
  { name: 'Canva & Graphic Design', level: 92 },
  { name: 'WordPress & Web Design', level: 82 },
];

const webDevSkills: Skill[] = [
  { name: 'AI-Powered Web Development', level: 88 },
  { name: 'Vibe Coding (AI-first workflow)', level: 90 },
  { name: 'React + Tailwind + TypeScript', level: 82 },
  { name: 'Supabase / Backend Basics', level: 80 },
  { name: 'n8n Automation & AI Agents', level: 82 },
  { name: 'API & Webhook Integrations', level: 78 },
];

const tools = [
  'Lovable AI', 'n8n', 'Supabase', 'React', 'Tailwind', 'GitHub',
  'Oracle ERP', 'HRIS Software', 'MS Excel', 'Google Workspace', 'Canva',
  'WordPress', 'Meta Business Suite', 'Google Ads', 'ChatGPT', 'Gemini', 'Claude',
];

const titleVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6 } },
};

const accentMap: Record<Accent, string> = {
  indigo: 'hsl(244 80% 69%)',
  gold: 'hsl(45 95% 55%)',
  emerald: 'hsl(142 76% 55%)',
  cyan: 'hsl(190 100% 50%)',
};

const SkillBar = ({ skill, accent, index }: { skill: Skill; accent: Accent; index: number }) => {
  const barColor = accentMap[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-foreground font-medium">{skill.name}</span>
        <span className="text-xs text-muted-foreground tabular-nums font-display">{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted/60 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 + index * 0.07 }}
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${barColor}, hsl(190 100% 50%))`,
            boxShadow: `0 0 12px ${barColor}88`,
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkillCard = ({
  title,
  subtitle,
  icon: Icon,
  skills,
  accent,
  delay = 0,
  iconColor,
  borderColor,
}: {
  title: string;
  subtitle: string;
  icon: typeof Users;
  skills: Skill[];
  accent: Accent;
  delay?: number;
  iconColor: string;
  borderColor: string;
}) => (
  <motion.div
    initial={{ opacity:  0, y: 30, filter: 'blur(6px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay }}
    className="glass-card rounded-2xl p-6 md:p-8"
  >
    <div className="flex items-center gap-3 mb-6">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center border"
        style={{
          background: `${iconColor.replace(')', ' / 0.12)')}`,
          borderColor: `${iconColor.replace(')', ' / 0.35)')}`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: iconColor }} />
      </div>
      <div>
        <h3 className="font-display font-bold text-lg text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
    <div className="space-y-4">
      {skills.map((s, i) => (
        <SkillBar key={s.name} skill={s} accent={accent} index={i} />
      ))}
    </div>
  </motion.div>
);

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 px-4" aria-label="Skills & Expertise">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="section-title"
        >
          Skills & <span className="text-gradient">Expertise</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* 1. HR Skills */}
          <SkillCard
            title="HR Skills"
            subtitle="People · Process · Compliance"
            icon={Users}
            skills={hrSkills}
            accent="indigo"
            delay={0}
            iconColor="hsl(244 80% 69%)"
            borderColor="hsl(244 80% 69% / 0.35)"
          />

          {/* 2. Inventory & Store Management */}
          <SkillCard
            title="Inventory & Store Management"
            subtitle="Stock · Systems · Operations"
            icon={Package}
            skills={inventorySkills}
            accent="gold"
            delay={0.1}
            iconColor="hsl(45 95% 55%)"
            borderColor="hsl(45 95% 55% / 0.35)"
          />

          {/* 3. AI Skills */}
          <SkillCard
            title="AI Skills"
            subtitle="Prompt Engineering · Pro AI Tools · Creative Design"
            icon={Sparkles}
            skills={aiSkills}
            accent="emerald"
            delay={0.2}
            iconColor="hsl(142 76% 55%)"
            borderColor="hsl(142 76% 55% / 0.35)"
          />

          {/* 4. Digital Marketing */}
          <SkillCard
            title="Digital Marketing"
            subtitle="Marketing · Content · Growth"
            icon={TrendingUp}
            skills={marketingSkills}
            accent="cyan"
            delay={0.3}
            iconColor="hsl(190 100% 50%)"
            borderColor="hsl(190 100% 50% / 0.35)"
          />
        </div>

        {/* Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Tools I work with</p>
          <div className="flex flex-wrap justify-center gap-2">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, type: 'spring', stiffness: 200, damping: 14 }}
                whileHover={{ y: -3, scale: 1.05 }}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium glass-card text-foreground/80 hover:text-foreground hover:border-primary/40 transition-colors"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
