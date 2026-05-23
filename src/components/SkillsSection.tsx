import { motion } from 'framer-motion';
import { Users, TrendingUp, Sparkles } from 'lucide-react';

type Skill = { name: string; level: number };

const hrSkills: Skill[] = [
  { name: 'HRIS / ERP Operations', level: 92 },
  { name: 'Employee Onboarding & Records', level: 90 },
  { name: 'Attendance & HR Reporting', level: 88 },
  { name: 'Office Administration', level: 86 },
  { name: 'Inventory & Stock Reconciliation', level: 85 },
  { name: 'MIS Reporting & Documentation', level: 88 },
];

const digitalSkills: Skill[] = [
  { name: 'SEO & Google Ads', level: 86 },
  { name: 'Meta Ads (Facebook / Instagram)', level: 88 },
  { name: 'Social Media Management', level: 90 },
  { name: 'Lead Generation', level: 87 },
  { name: 'Canva & Graphic Design', level: 92 },
  { name: 'WordPress & Web Design', level: 82 },
];

const aiSkills: Skill[] = [
  { name: 'Prompt Engineering', level: 92 },
  { name: 'ChatGPT / OpenAI Models', level: 90 },
  { name: 'Google Gemini (Pro)', level: 88 },
  { name: 'Claude (Pro)', level: 86 },
  { name: 'AI Agents & Automation', level: 84 },
  { name: 'Canva AI — Creative Design', level: 90 },
];

const tools = [
  'HRIS', 'ERP Software', 'MS Excel', 'MS Word', 'PowerPoint', 'Outlook',
  'Google Workspace', 'Canva', 'Freepik', 'WordPress', 'Video Editing',
  'Meta Business Suite', 'Google Ads', 'ChatGPT', 'Gemini', 'Claude',
];

const titleVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6 } },
};

const SkillBar = ({ skill, accent, index }: { skill: Skill; accent: 'indigo' | 'cyan'; index: number }) => {
  const barColor = accent === 'indigo' ? 'hsl(244 80% 69%)' : 'hsl(190 100% 50%)';
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
          {/* HR Skills */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">HR Skills</h3>
                <p className="text-xs text-muted-foreground">People · Process · Compliance</p>
              </div>
            </div>
            <div className="space-y-4">
              {hrSkills.map((s, i) => <SkillBar key={s.name} skill={s} accent="indigo" index={i} />)}
            </div>
          </motion.div>

          {/* Digital Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-secondary/15 border border-secondary/30 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">Digital Skills</h3>
                <p className="text-xs text-muted-foreground">Marketing · Content · Growth</p>
              </div>
            </div>
            <div className="space-y-4">
              {digitalSkills.map((s, i) => <SkillBar key={s.name} skill={s} accent="cyan" index={i} />)}
            </div>
          </motion.div>
        </div>

        {/* AI Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-6 md:p-8 mb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-foreground">AI Skills</h3>
              <p className="text-xs text-muted-foreground">Prompt Engineering · Pro AI Tools · Creative Design</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {aiSkills.map((s, i) => (
              <SkillBar key={s.name} skill={s} accent={i % 2 === 0 ? 'indigo' : 'cyan'} index={i} />
            ))}
          </div>
        </motion.div>

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
