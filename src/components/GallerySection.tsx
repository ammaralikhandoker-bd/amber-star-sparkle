import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';

const photos = [
  {
    src: gallery2,
    caption: 'Park Portrait',
    tag: 'Lifestyle',
    span: 'md:row-span-2',
    position: 'object-center',
    initial: { opacity: 0, x: -60, rotate: -6, scale: 0.9 },
    hover: { y: -10, rotate: -1, scale: 1.02 },
    glow: 'from-primary/40 via-secondary/30 to-primary/40',
  },
  {
    src: gallery1,
    caption: 'Professional',
    tag: 'Corporate',
    span: '',
    position: 'object-top',
    initial: { opacity: 0, y: -60, rotate: 4, scale: 0.92 },
    hover: { y: -8, rotateY: 10, scale: 1.03 },
    glow: 'from-secondary/40 via-primary/30 to-secondary/40',
  },
  {
    src: gallery4,
    caption: 'At Work',
    tag: 'Office',
    span: '',
    position: 'object-center',
    initial: { opacity: 0, y: 60, rotate: -4, scale: 0.92 },
    hover: { y: -8, rotateX: -8, scale: 1.03 },
    glow: 'from-primary/40 via-primary/20 to-secondary/40',
  },
  {
    src: gallery3,
    caption: 'On the Move',
    tag: 'Casual',
    span: 'md:col-span-2',
    position: 'object-top',
    initial: { opacity: 0, x: 80, rotate: 6, scale: 0.9 },
    hover: { y: -10, rotate: 1, scale: 1.02 },
    glow: 'from-secondary/40 via-primary/30 to-secondary/40',
  },
];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;
  const isMobile = useIsMobile();
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const swipeLocked = useRef<'h' | 'v' | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    []
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    []
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, next, prev]);

  // Lock body scroll while lightbox open (prevents scroll conflict on mobile)
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'contain';
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.overscrollBehavior = prevOverscroll;
    };
  }, [isOpen]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
    swipeLocked.current = null;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const t = e.touches[0];
    const dx = t.clientX - touchStartX.current;
    const dy = t.clientY - touchStartY.current;
    if (!swipeLocked.current && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
      swipeLocked.current = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX.current;
    const dy = t.clientY - touchStartY.current;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    touchStartX.current = null;
    touchStartY.current = null;
    const wasH = swipeLocked.current === 'h';
    swipeLocked.current = null;
    if (wasH && absX > 50 && absX > absY) {
      if (dx < 0) next();
      else prev();
    } else if (!wasH && absY > 80 && absY > absX) {
      close();
    }
  };

  return (
    <section id="gallery" className="py-20 px-4" aria-label="Photo Gallery" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
            Gallery
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Moments &{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--gradient-primary)' }}>
              Memories
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A glimpse into my professional journey and lifestyle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[220px] md:auto-rows-[260px] [perspective:1200px]">
          {photos.map((photo, idx) => (
            <motion.div
              key={idx}
              initial={isMobile ? { opacity: 0, y: 20 } : photo.initial}
              animate={inView ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 } : {}}
              transition={{
                duration: isMobile ? 0.45 : 0.8,
                delay: idx * (isMobile ? 0.06 : 0.15),
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={isMobile ? undefined : { ...photo.hover, transition: { type: 'spring', stiffness: 220, damping: 18 } }}
              onClick={() => setActiveIndex(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveIndex(idx);
                }
              }}
              style={{ transformStyle: 'preserve-3d', willChange: 'transform, opacity' }}
              className={`group relative overflow-hidden rounded-2xl glass-card cursor-pointer ${photo.span}`}
            >
              {/* Animated gradient glow (desktop only) */}
              {!isMobile && (
                <motion.div
                  aria-hidden
                  className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${photo.glow} opacity-0 group-hover:opacity-70 blur-2xl transition-opacity duration-700 pointer-events-none`}
                />
              )}

              <img
                src={photo.src}
                alt={photo.caption}
                loading={idx < 2 ? 'eager' : 'lazy'}
                decoding="async"
                {...(idx < 2 ? { fetchPriority: 'high' as const } : {})}
                className={`absolute inset-0 w-full h-full object-cover ${photo.position} ${isMobile ? '' : 'transition-transform duration-[900ms] ease-out group-hover:scale-110'}`}
              />

              {/* Shine sweep on hover (desktop only) */}
              {!isMobile && (
                <motion.div
                  aria-hidden
                  initial={{ x: '-120%' }}
                  whileHover={{ x: '160%' }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                  className="absolute inset-y-0 w-1/2 pointer-events-none"
                  style={{ background: 'linear-gradient(115deg, transparent 0%, hsl(0 0% 100% / 0.18) 50%, transparent 100%)' }}
                />
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Glow border on hover (desktop only) */}
              {!isMobile && (
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: '0 0 0 1px hsl(244 80% 69% / 0.5), 0 0 40px hsl(244 80% 69% / 0.35), 0 0 80px hsl(190 100% 50% / 0.2)' }}
                />
              )}

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-xs font-medium text-secondary mb-2 backdrop-blur-sm">
                  {photo.tag}
                </span>
                <h3 className="font-display text-lg md:text-xl font-bold text-foreground">
                  {photo.caption}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={(o) => !o && close()}>
        <DialogContent className={`max-w-5xl w-[95vw] p-0 border-border/40 bg-background/95 overflow-hidden ${isMobile ? '' : 'backdrop-blur-xl'} ${isMobile ? 'duration-100' : ''}`}>
          {activeIndex !== null && (
            <>
              <DialogTitle className="sr-only">{photos[activeIndex].caption}</DialogTitle>
              <DialogDescription className="sr-only">
                Image {activeIndex + 1} of {photos.length} — {photos[activeIndex].tag}
              </DialogDescription>

              <div
                className="relative w-full bg-background flex items-center justify-center max-h-[80vh] overflow-hidden touch-pan-y select-none"
                style={{ touchAction: 'pan-y' }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <img
                  src={photos[activeIndex].src}
                  alt={photos[activeIndex].caption}
                  decoding="async"
                  fetchPriority="high"
                  draggable={false}
                  className="block w-auto h-auto max-w-full max-h-[80vh] object-contain"
                />

                <button
                  onClick={prev}
                  aria-label="Previous image"
                  className={`absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background/80 hover:bg-background border border-border/60 ${isMobile ? '' : 'backdrop-blur-md'} flex items-center justify-center text-foreground transition-colors hover:scale-110`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next image"
                  className={`absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background/80 hover:bg-background border border-border/60 ${isMobile ? '' : 'backdrop-blur-md'} flex items-center justify-center text-foreground transition-colors hover:scale-110`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <button
                  onClick={close}
                  aria-label="Close"
                  className={`absolute top-3 right-3 h-10 w-10 rounded-full bg-background/80 hover:bg-background border border-border/60 ${isMobile ? '' : 'backdrop-blur-md'} flex items-center justify-center text-foreground transition-colors hover:scale-110`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-6 py-5 border-t border-border/40 flex items-center justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-xs font-medium text-secondary mb-2">
                    {photos[activeIndex].tag}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    {photos[activeIndex].caption}
                  </h3>
                </div>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {activeIndex + 1} / {photos.length}
                </span>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GallerySection;
