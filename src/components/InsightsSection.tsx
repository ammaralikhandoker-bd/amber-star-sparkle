import { motion } from 'framer-motion';
import { Quote, ExternalLink } from 'lucide-react';

const insights = [
  { quote: "Success in inventory management isn't about counting products — it's about creating systems that count for you.", category: 'Operations' },
  { quote: "AI doesn't replace professionals. It empowers them to achieve 10x more in the same time.", category: 'AI & Automation' },
  { quote: "Your career isn't a ladder — it's a portfolio of skills. Every role adds a new dimension to your professional value.", category: 'Career Growth' },
  { quote: "Data entry taught me precision. HR taught me people. Inventory taught me systems. Every step matters.", category: 'Personal Journey' },
  { quote: "Digital skills aren't optional anymore. They're the baseline for professional success in every industry.", category: 'Digital Skills' },
  { quote: "The best ERP system is only as good as the professional operating it. Invest in yourself first.", category: 'ERP & Systems' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, rotateX: 10 },
  visible: {
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const InsightsSection = () => {
  return (
    <section id="insights" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Professional <span className="text-gradient">Insights</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="bg-card border border-border rounded-xl p-6 group hover:border-primary/30 transition-colors duration-300 perspective-1000"
            >
              <motion.div
                whileHover={{ rotate: 15, scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Quote className="w-5 h-5 text-primary/40 mb-3 group-hover:text-primary/70 transition-colors duration-300" />
              </motion.div>
              <p className="text-foreground text-sm leading-relaxed mb-4 italic">
                "{insight.quote}"
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  {insight.category}
                </span>
                <motion.a
                  href="https://www.linkedin.com/in/mdamberalikhandoker/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InsightsSection;
