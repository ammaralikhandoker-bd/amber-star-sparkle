import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, hsl(217 91% 60%), hsl(43 96% 56%), hsl(217 91% 60%))',
        backgroundSize: '200% 100%',
      }}
      animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
    />
  );
};

export default ScrollProgress;
