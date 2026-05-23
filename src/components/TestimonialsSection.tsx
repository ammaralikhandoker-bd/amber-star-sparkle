import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

type Testimonial = {
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  initials: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Tariq Hasan',
    role: 'HR Manager',
    company: 'RFL Electronics Ltd.',
    rating: 5,
    text: "Amber's attention to detail in HR operations and ERP systems was exceptional. He streamlined our employee onboarding and reduced administrative overhead noticeably.",
    initials: 'TH',
  },
  {
    name: 'Nadia Rahman',
    role: 'Marketing Director',
    company: 'Nova Digital Agency',
    rating: 5,
    text: 'Working with Amber on our social campaigns was a delight. He understands both the creative and analytical side — our engagement nearly doubled in two months.',
    initials: 'NR',
  },
  {
    name: 'Mahbubur Rahman',
    role: 'Operations Lead',
    company: 'Step Media Limited',
    rating: 5,
    text: 'Reliable, organized, and proactive. Amber handles inventory and store operations with precision, and his digital skills are a big plus for the team.',
    initials: 'MR',
  },
  {
    name: 'Sarah Ahmed',
    role: 'Founder',
    company: 'Bloom Boutique',
    rating: 5,
    text: 'He built our entire brand identity and managed our social presence end-to-end. Professional, responsive, and genuinely talented — highly recommended.',
    initials: 'SA',
  },
];

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % testimonials.length), 5500);
    return () => clearTimeout(t);
  }, [index, paused]);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  const t = testimonials[index];

  return (
    <section id="testimonials" className="py-20 px-4" aria-label="Testimonials">
      <div className="container mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          What People <span className="text-gradient">Say</span>
        </motion.h2>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative glass-card rounded-2xl p-6 sm:p-10 overflow-hidden min-h-[280px]">
            {/* Decorative quote */}
            <Quote className="absolute top-5 right-5 w-16 h-16 text-primary/10" aria-hidden="true" />

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative z-10"
              >
                <div className="flex gap-0.5 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>

                <p className="text-foreground/90 text-base sm:text-lg leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm text-primary-foreground shrink-0"
                    style={{ background: 'var(--gradient-primary)' }}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-5">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors min-h-[44px] min-w-[44px]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2" role="tablist">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-selected={i === index}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === index ? 28 : 8,
                    background: i === index ? 'var(--gradient-primary)' : 'hsl(var(--muted))',
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors min-h-[44px] min-w-[44px]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
