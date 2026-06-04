import { motion } from 'framer-motion';
import { Download, BadgeCheck, Award, Briefcase, Users, ArrowRight, Sparkles } from 'lucide-react';
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
              className="font-display mb-4 flex flex-col items-center lg:items-start gap-1"
            >
              {/* Kicker */}
              <span
                className="text-[10px] md:text-xs font-semibold tracking-[0.35em] uppercase"
                style={{ color: 'hsl(43 96% 65%)' }}
              >
                — Hello, I am
              </span>

              {/* MD. Amber — refined metallic */}
              <span className="relative inline-block leading-[0.95]">
                <span
                  aria-hidden
                  className="absolute inset-0 text-[2rem] md:text-6xl lg:text-7xl font-extrabold tracking-tight select-none pointer-events-none"
                  style={{
                    color: 'hsl(43 96% 55%)',
                    transform: 'translate(2px, 3px)',
                    filter: 'blur(6px)',
                    opacity: 0.55,
                  }}
                >
                  MD. Amber
                </span>
                <span
                  className="relative text-[2rem] md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 95%) 50%, hsl(220 25% 75%) 100%)',
                    textShadow: '0 2px 18px hsl(220 80% 50% / 0.25)',
                  }}
                >
                  MD. Amber
                </span>
              </span>

              {/* Khandoker — elegant gradient signature */}
              <span className="relative inline-block leading-[0.95] mt-1">
                <span
                  aria-hidden
                  className="absolute inset-0 text-[2.25rem] md:text-7xl lg:text-8xl font-black italic tracking-tight select-none pointer-events-none"
                  style={{
                    color: 'hsl(195 100% 55%)',
                    transform: 'translate(3px, 4px)',
                    filter: 'blur(10px)',
                    opacity: 0.5,
                  }}
                >
                  Khandoker
                </span>
                <span
                  className="relative text-[2.25rem] md:text-7xl lg:text-8xl font-black italic tracking-tight bg-clip-text text-transparent animate-name-shimmer"
                  style={{
                    backgroundImage:
                      'linear-gradient(110deg, hsl(220 95% 80%) 0%, hsl(195 100% 65%) 35%, hsl(43 96% 62%) 70%, hsl(220 95% 80%) 100%)',
                    backgroundSize: '200% 100%',
                  }}
                >
                  Khandoker
                </span>
                {/* underline accent */}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, hsl(43 96% 56%) 30%, hsl(195 100% 60%) 70%, transparent 100%)',
                    opacity: 0.8,
                  }}
                />
                <Sparkles className="absolute -top-3 -right-6 w-4 h-4 text-[hsl(43_96%_62%)] animate-pulse" />
              </span>
            </motion.h1>


            {/* Govt Verified badge */}
            <motion.div variants={itemVariants} className="mb-4 flex flex-wrap gap-2 justify-center lg:justify-start">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
                style={{
                  background: 'hsl(43 96% 56% / 0.12)',
                  borderColor: 'hsl(43 96% 56% / 0.35)',
                  color: 'hsl(43 96% 70%)',
                }}
              >
                <BadgeCheck className="w-3.5 h-3.5" />
                Govt. Verified Freelancer · BD
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl font-medium text-foreground mb-3"
            >
              HR &amp; Admin · Digital Marketing · Data Entry Expert
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-base md:text-lg mb-5 max-w-xl mx-auto lg:mx-0"
            >
              5+ years streamlining HR operations, ERP data &amp; growth campaigns for teams across Bangladesh.
            </motion.p>

            {/* Mini trust stats */}
            <motion.div
              variants={itemVariants}
              className="mb-6 flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              {[
                { Icon: Award, label: '62+ Certifications' },
                { Icon: Briefcase, label: '5+ Years Experience' },
                { Icon: Users, label: '7K+ LinkedIn Network' },
              ].map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 border border-primary/20 text-primary"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </span>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-muted-foreground text-base md:text-lg mb-8 min-h-[2rem]"
            >
              <TypewriterText texts={roles} />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center"
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  size="lg"
                  className="font-display font-semibold tracking-wide text-background hover:opacity-90"
                  style={{
                    background: 'linear-gradient(135deg, hsl(43 96% 56%), hsl(38 92% 50%))',
                    boxShadow: '0 10px 30px -10px hsl(43 96% 56% / 0.55)',
                  }}
                  aria-label="Hire Me"
                >
                  <a href="#contact">
                    Hire Me
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary/40 text-primary hover:bg-primary/10 hover:text-primary font-display font-semibold tracking-wide backdrop-blur-sm"
                  aria-label="Download CV"
                >
                  <a href="/cv.pdf" download="CV of Md. Amber Khandoker.pdf">
                    <Download className="mr-2 h-5 w-5" />
                    Download CV
                  </a>
                </Button>
              </motion.div>

              <a
                href="#projects"
                className="text-sm font-medium text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-colors"
              >
                View Work →
              </a>
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
                    alt="MD. Amber Khandoker — HR Specialist & Digital Professional"
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
