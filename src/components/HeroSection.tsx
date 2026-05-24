import { motion } from 'framer-motion';
import { Download, BadgeCheck, Award, Briefcase, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TypewriterText from './TypewriterText';
import profileImage from '@/assets/profile.jpg';


const roles = [
  'HR Specialist',
  'Data Entry Expert',
  'Digital Marketing',
  'Canva Designer',
  'Web Designer',
  'SEO Expert',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], delay: 0.3 },
  },
};

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4" aria-label="Hero">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-secondary"
              />
              <span className="text-sm font-medium text-primary">Available for Opportunities</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 text-foreground"
            >
              MD. AMBER ALI
            </motion.h1>
            
            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4"
            >
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, hsl(244 80% 69%), hsl(220 80% 65%), hsl(190 100% 55%), hsl(180 95% 50%), hsl(190 100% 50%))' }}>KHANDOKER</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl font-medium text-foreground mb-2"
            >
              HR &amp; Admin · Digital Marketing · Data Entry Expert
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-base md:text-lg mb-4"
            >
              5+ years streamlining HR operations, ERP data &amp; growth campaigns. Government Verified Freelancer (ICT Division, Bangladesh).
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="text-muted-foreground text-lg md:text-xl mb-8 min-h-[2rem]"
            >
              <TypewriterText texts={roles} />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  size="lg"
                  className="text-primary-foreground font-display font-semibold tracking-wide hover:opacity-90"
                  style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--glow-indigo)' }}
                  aria-label="Download CV"
                >
                  <a href="/cv.pdf" download="CV of Md. Amber Ali Khandoker.pdf">
                    <Download className="mr-2 h-5 w-5" />
                    Download CV
                  </a>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-secondary/60 text-secondary hover:bg-secondary/10 hover:text-secondary font-display font-semibold tracking-wide backdrop-blur-sm"
                  aria-label="Contact Me"
                >
                  <a href="#contact">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contact Me
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Scanning beam — inside the circle only */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none mix-blend-screen z-10">
                <motion.div
                  animate={{ y: ['-110%', '110%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
                  className="absolute inset-x-0 h-10"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent 0%, hsl(190 100% 65% / 0.5) 50%, transparent 100%)',
                    filter: 'blur(2px)',
                  }}
                />
              </div>

              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full p-1 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-card">
                  <img
                    src={profileImage}
                    alt="MD. Amber Ali Khandoker — HR Specialist & Digital Professional"
                    className="w-full h-full object-cover object-[center_15%] scale-[1.05]"
                    loading="eager"
                    width={384}
                    height={384}
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
