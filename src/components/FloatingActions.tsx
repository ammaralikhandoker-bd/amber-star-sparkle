import { lazy, Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const WhatsAppWidget = lazy(() => import('@/components/WhatsAppWidget'));
const AIChatbot = lazy(() => import('@/components/AIChatbot'));

const FloatingActions = () => {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);

  // Desktop: render both widgets as-is (they position themselves)
  if (!isMobile) {
    return (
      <Suspense fallback={null}>
        <WhatsAppWidget />
        <AIChatbot />
      </Suspense>
    );
  }

  // Mobile: single expandable FAB
  return (
    <>
      {/* Always render AIChatbot so its window can open; hide its own toggle via wrapper */}
      <Suspense fallback={null}>
        <div id="ai-chatbot-mount">
          <AIChatbot />
        </div>
      </Suspense>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {expanded && (
            <>
              {/* WhatsApp action */}
              <motion.a
                key="wa"
                href="https://wa.me/8801716861353"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.6 }}
                transition={{ duration: 0.18 }}
                onClick={() => setExpanded(false)}
                className="w-11 h-11 rounded-full flex items-center justify-center shadow-xl ring-2 ring-white/20"
                style={{
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  boxShadow: '0 4px 20px rgba(37,211,102, 0.45)',
                }}
                aria-label="Chat on WhatsApp"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </motion.a>

              {/* AI action - triggers the chatbot's own button */}
              <motion.button
                key="ai"
                initial={{ opacity: 0, y: 10, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.6 }}
                transition={{ duration: 0.18, delay: 0.04 }}
                onClick={() => {
                  setExpanded(false);
                  const btn = document.querySelector<HTMLButtonElement>(
                    '#ai-chatbot-mount button[aria-label="Open AI Chat"]'
                  );
                  btn?.click();
                }}
                className="w-11 h-11 rounded-full flex items-center justify-center shadow-xl ring-2 ring-white/20"
                style={{
                  background: 'linear-gradient(135deg, hsl(244 80% 69%), hsl(190 100% 50%))',
                  boxShadow: '0 4px 20px hsl(244 80% 69% / 0.45)',
                }}
                aria-label="Open AI Assistant"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
                </svg>
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* Main toggle */}
        <motion.button
          onClick={() => setExpanded((v) => !v)}
          whileTap={{ scale: 0.92 }}
          animate={{ rotate: expanded ? 45 : 0 }}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl ring-2 ring-white/20"
          style={{
            background: 'linear-gradient(135deg, hsl(244 80% 69%), hsl(190 100% 50%))',
            boxShadow: '0 4px 20px hsl(244 80% 69% / 0.5)',
          }}
          aria-label={expanded ? 'Close actions' : 'Open actions'}
          aria-expanded={expanded}
        >
          {expanded ? <X className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-white" />}
        </motion.button>
      </div>

      {/* Hide the AIChatbot's own floating toggle on mobile (we use FAB) */}
      <style>{`
        @media (max-width: 767px) {
          #ai-chatbot-mount > button[aria-label="Open AI Chat"] { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default FloatingActions;
