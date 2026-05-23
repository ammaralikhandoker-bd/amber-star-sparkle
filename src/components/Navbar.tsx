import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Briefcase, Award, Settings, Mail, Lightbulb, MessageSquare } from 'lucide-react';
import profileImage from '@/assets/profile.jpg';
import logoImage from '@/assets/logo-amber-ali.jpg';

const navItems = [
  { label: 'About', href: '#about', icon: User },
  { label: 'Experience', href: '#experience', icon: Briefcase },
  { label: 'Certificates', href: '#certificates', icon: Award },
  { label: 'Skills', href: '#skills', icon: Settings },
  { label: 'Reviews', href: '#testimonials', icon: MessageSquare },
  { label: 'Insights', href: '#insights', icon: Lightbulb },
  { label: 'Contact', href: '#contact', icon: Mail },
];

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const menuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeOut' as const, staggerChildren: 0.05 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
};

const menuItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/70 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-primary/5' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2"
          aria-label="Amber Ali — Home"
        >
          <img
            src={logoImage}
            alt="Amber Ali logo"
            className="h-9 md:h-10 w-auto"
            width={180}
            height={40}
          />
        </motion.a>

        <ul className="hidden md:flex items-center gap-0.5">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <motion.a
                  href={item.href}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg font-display text-xs tracking-wider text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </motion.a>
              </motion.li>
            );
          })}
          <motion.li
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="ml-2"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-full font-display text-xs font-semibold tracking-wider text-primary-foreground transition-all"
              style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--glow-indigo)' }}
            >
              HIRE ME
            </motion.a>
          </motion.li>
        </ul>

        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-foreground p-2"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <ul className="container mx-auto px-4 py-3 flex flex-col gap-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.li key={item.href} variants={menuItemVariants}>
                    <a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-lg font-display text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
