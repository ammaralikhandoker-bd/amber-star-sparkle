import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterTextProps {
  texts: string[];
  className?: string;
}

const TypewriterText = ({ texts, className = '' }: TypewriterTextProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const colors = [
    'from-cyan-400 to-blue-500',
    'from-violet-400 to-purple-500',
    'from-amber-400 to-orange-500',
    'from-emerald-400 to-green-500',
    'from-rose-400 to-pink-500',
  ];

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    const typingSpeed = isDeleting ? 30 : 80;
    const pauseDuration = 2500;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, texts]);

  const currentColor = colors[currentTextIndex % colors.length];

  return (
    <span className={`relative inline-flex items-center ${className}`}>
      {/* Glow behind text */}
      <span className={`absolute inset-0 bg-gradient-to-r ${currentColor} opacity-20 blur-xl rounded-full transition-all duration-700`} />
      
      {/* Gradient text */}
      <span className={`relative bg-gradient-to-r ${currentColor} bg-clip-text text-transparent font-semibold transition-all duration-500`}>
        {displayText}
      </span>

      {/* Animated cursor */}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse' }}
        className={`relative bg-gradient-to-b ${currentColor} bg-clip-text text-transparent font-light ml-0.5`}
      >
        ▌
      </motion.span>
    </span>
  );
};

export default TypewriterText;
