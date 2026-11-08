import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader.tsx';
import { Navigation } from './components/Navigation.tsx';
import { CanvasScroller } from './components/CanvasScroller.tsx';
import { Portfolio } from './components/Portfolio.tsx';
import { Capabilities } from './components/Capabilities.tsx';
import { Terminal } from './components/Terminal.tsx';
import { Experience } from './components/Experience.tsx';
import { Philosophy } from './components/Philosophy.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';
import { initSmoothScroll } from './utils/smoothScroll.ts';

export default function App() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return () => cleanup();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070709] text-neutral-100 selection:bg-[#FF5500]/30 selection:text-white font-body">
      {/* Custom Mouse Cursor */}
      <CustomCursor />

      {/* Preloader with progress counter */}
      <Preloader
        progress={loadProgress}
        isReady={isReady}
      />

      {/* Top Fixed Glass Navigation */}
      <Navigation />

      <main className="relative z-10">
        {/* Full-screen Scrollytelling Hero Canvas (0% to 100% -> Frame 1 to 180) */}
        <CanvasScroller
          onLoadingProgress={(pct) => setLoadProgress(pct)}
          onLoaded={() => setIsReady(true)}
        />

        {/* Selected Works / Projects with Detail Modal */}
        <Portfolio />

        {/* Technical & Creative Capabilities */}
        <Capabilities />

        {/* Interactive Developer ZSH Terminal */}
        <Terminal />

        {/* Career Timeline & Studio Deliverables */}
        <Experience />

        {/* Creative Philosophy & About Akilesh */}
        <Philosophy />

        {/* Contact & Inquiries */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
