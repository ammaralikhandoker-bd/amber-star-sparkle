import { motion } from 'framer-motion';
import { Linkedin, Mail, MessageCircle, Facebook } from 'lucide-react';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/ammar-khandoker-bd', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://www.facebook.com/share/187NdGsk4e/', label: 'Facebook' },
  { icon: Mail, href: 'mailto:mdamberalikhandoker@outlook.com', label: 'Email' },
  { icon: MessageCircle, href: 'https://wa.me/8801716861353', label: 'WhatsApp' },
];

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-12 px-4 border-t border-border/60 mt-10"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-display font-bold text-lg text-foreground mb-2">
              MD. AMBER <span className="text-gradient">ALI KHANDOKER</span>
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              HR Specialist, Digital Marketing & Data Entry Professional. Government Verified Freelancer (ICT Division, Bangladesh).
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-display mb-3">Quick Links</p>
            <ul className="grid grid-cols-2 gap-y-1.5 gap-x-3">
              {quickLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-xs text-foreground/70 hover:text-primary transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-display mb-3">Connect</p>
            <div className="flex gap-2">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center pt-6 border-t border-border/40">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} MD. Amber Ali Khandoker. All Rights Reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
