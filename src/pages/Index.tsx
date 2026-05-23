import { lazy, Suspense, useEffect, useState } from 'react';
import NetworkBackground from '@/components/NetworkBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ScrollProgress from '@/components/ScrollProgress';

// Lazy load below-the-fold sections
const SocialProofSection = lazy(() => import('@/components/SocialProofSection'));
const StatsSection = lazy(() => import('@/components/StatsSection'));
const AboutSection = lazy(() => import('@/components/AboutSection'));
const GallerySection = lazy(() => import('@/components/GallerySection'));
const ExperienceSection = lazy(() => import('@/components/ExperienceSection'));
const CertificatesSection = lazy(() => import('@/components/CertificatesSection'));
const SkillsSection = lazy(() => import('@/components/SkillsSection'));
const ServicesSection = lazy(() => import('@/components/ServicesSection'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const InsightsSection = lazy(() => import('@/components/InsightsSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));
const BackToTop = lazy(() => import('@/components/BackToTop'));
const WhatsAppWidget = lazy(() => import('@/components/WhatsAppWidget'));
const AIChatbot = lazy(() => import('@/components/AIChatbot'));

const SectionSkeleton = () => (
  <div className="py-20 px-4" aria-hidden="true">
    <div className="container mx-auto max-w-5xl">
      <div className="h-40 rounded-xl bg-muted/10 animate-pulse" />
    </div>
  </div>
);

// Wraps each section so they stream/hydrate independently (faster TTI)
const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<SectionSkeleton />}>{children}</Suspense>
);

const Index = () => {
  // Defer floating widgets until browser is idle — keeps main thread free at first paint
  const [showWidgets, setShowWidgets] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const schedule = w.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1500));
    const id = schedule(() => setShowWidgets(true));
    return () => {
      if (typeof id === 'number') clearTimeout(id);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <NetworkBackground />
      <Navbar />
      <main>
        <HeroSection />
        <LazySection><SocialProofSection /></LazySection>
        <LazySection><StatsSection /></LazySection>
        <LazySection><AboutSection /></LazySection>
        <LazySection><GallerySection /></LazySection>
        <LazySection><ExperienceSection /></LazySection>
        <LazySection><CertificatesSection /></LazySection>
        <LazySection><SkillsSection /></LazySection>
        <LazySection><ServicesSection /></LazySection>
        <LazySection><ProjectsSection /></LazySection>
        <LazySection><TestimonialsSection /></LazySection>
        <LazySection><InsightsSection /></LazySection>
        <LazySection><ContactSection /></LazySection>
      </main>
      <Suspense fallback={null}>
        <Footer />
        {showWidgets && (
          <>
            <BackToTop />
            <WhatsAppWidget />
            <AIChatbot />
          </>
        )}
      </Suspense>
    </div>
  );
};

export default Index;
