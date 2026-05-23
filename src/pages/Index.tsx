import { lazy, Suspense } from 'react';
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
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const InsightsSection = lazy(() => import('@/components/InsightsSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));
const BackToTop = lazy(() => import('@/components/BackToTop'));
const WhatsAppWidget = lazy(() => import('@/components/WhatsAppWidget'));
const AIChatbot = lazy(() => import('@/components/AIChatbot'));

const SectionSkeleton = () => (
  <div className="py-20 px-4">
    <div className="container mx-auto max-w-5xl space-y-6">
      <div className="h-10 w-64 mx-auto rounded-lg bg-muted/30 animate-pulse" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-40 rounded-xl bg-muted/20 animate-pulse" />
        ))}
      </div>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <NetworkBackground />
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={<SectionSkeleton />}>
          <SocialProofSection />
          <StatsSection />
          <AboutSection />
          <GallerySection />
          <ExperienceSection />
          <CertificatesSection />
          <SkillsSection />
          <ProjectsSection />
          <TestimonialsSection />
          <InsightsSection />
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <BackToTop />
        <WhatsAppWidget />
        <AIChatbot />
      </Suspense>
    </div>
  );
};

export default Index;
