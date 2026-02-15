import React, { lazy, Suspense } from 'react';
import Navbar from '../../components/student/Navbar';
import Hero from '../../components/student/Hero';
import Footer from '../../components/student/Footer';

// Lazy load below-fold sections
const ProblemSolution = lazy(() => import('../../components/student/ProblemSolution'));
const KeyFeatures = lazy(() => import('../../components/student/KeyFeatures'));
const Outcomes = lazy(() => import('../../components/student/Outcomes'));
const Testimonials = lazy(() => import('../../components/student/Testimonials'));
const Pricing = lazy(() => import('../../components/student/Pricing'));
const FinalCTA = lazy(() => import('../../components/student/FinalCTA'));

const SectionFallback = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-3 border-[#1A1B24] border-t-transparent rounded-full animate-spin" />
  </div>
);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <ProblemSolution />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <KeyFeatures />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Outcomes />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Pricing />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FinalCTA />
      </Suspense>
      <Footer />
    </div>
  );
};

export default HomePage;
