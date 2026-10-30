/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  PORTFOLIO_PROJECTS,
  ProjectDiscipline,
} from './data/portfolioData';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ReadingNookHero } from './components/ReadingNookHero';
import { ProcessSection } from './components/ProcessSection';
import { ProjectsSection } from './components/ProjectsSection';
import { PosterSection } from './components/PosterSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';

type NavSectionId = 'home' | 'project' | 'about' | 'services' | 'posters' | 'process' | 'contact-form';

export default function App() {
  const [activeNav, setActiveNav] = useState<'home' | 'project' | 'about' | 'services'>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showFloatingHeader, setShowFloatingHeader] = useState<boolean>(false);

  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [projectNotes, setProjectNotes] = useState<string>('');
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);

  // Quick retro glow transition state when clicking any section from the top header
  const [activeTransitionKey, setActiveTransitionKey] = useState<number | null>(null);
  const [revealedSection, setRevealedSection] = useState<{
    id: string;
    key: number;
  } | null>(null);
  const transitionTimersRef = useRef<number[]>([]);

  const clearTransitionTimers = useCallback(() => {
    transitionTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    transitionTimersRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearTransitionTimers();
  }, [clearTransitionTimers]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setShowFloatingHeader(y > window.innerHeight * 0.65);

      // Keep active top-header indicator synced with scroll position
      const sections: Array<{ id: 'home' | 'project' | 'about' | 'services'; el: HTMLElement | null }> = [
        { id: 'home', el: document.getElementById('home') },
        { id: 'project', el: document.getElementById('project') },
        { id: 'about', el: document.getElementById('about') },
        { id: 'services', el: document.getElementById('services') },
      ];
      const viewportMid = window.scrollY + window.innerHeight * 0.38;
      for (let i = sections.length - 1; i >= 0; i--) {
        const item = sections[i];
        if (item.el && item.el.offsetTop <= viewportMid) {
          setActiveNav(item.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeModalProject = useMemo(
    () => PORTFOLIO_PROJECTS.find((p) => p.id === selectedProjectId) || null,
    [selectedProjectId]
  );

  const handleNextModalProject = () => {
    if (!selectedProjectId) return;
    const idx = PORTFOLIO_PROJECTS.findIndex((p) => p.id === selectedProjectId);
    const nextIdx = (idx + 1) % PORTFOLIO_PROJECTS.length;
    setSelectedProjectId(PORTFOLIO_PROJECTS[nextIdx].id);
  };

  const handlePrevModalProject = () => {
    if (!selectedProjectId) return;
    const idx = PORTFOLIO_PROJECTS.findIndex((p) => p.id === selectedProjectId);
    const prevIdx = (idx - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length;
    setSelectedProjectId(PORTFOLIO_PROJECTS[prevIdx].id);
  };

  const scrollToSection = useCallback(
    (sectionId: NavSectionId) => {
      if (
        sectionId === 'home' ||
        sectionId === 'project' ||
        sectionId === 'about' ||
        sectionId === 'services'
      ) {
        setActiveNav(sectionId);
      } else if (sectionId === 'contact-form') {
        setActiveNav('services');
      }

      clearTransitionTimers();
      const transitionKey = Date.now();
      setActiveTransitionKey(transitionKey);

      // Snap to target section immediately as the center-outward reveal begins
      const scrollTimer = window.setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top, behavior: 'auto' });
        }
        const wrapperId = sectionId === 'contact-form' ? 'services' : sectionId;
        setRevealedSection({ id: wrapperId, key: transitionKey });
      }, 16);

      // Clear overlay right after the quick center reveal completes
      const endTimer = window.setTimeout(() => {
        setActiveTransitionKey(null);
      }, 310);

      const clearRevealTimer = window.setTimeout(() => {
        setRevealedSection(null);
      }, 420);

      transitionTimersRef.current.push(scrollTimer, endTimer, clearRevealTimer);
    },
    [clearTransitionTimers]
  );

  const handleSelectScopeFromModal = (discipline: ProjectDiscipline, projectTitle: string) => {
    setSelectedProjectId(null);
    setProjectNotes(`Inquiring about a ${discipline} project similar to "${projectTitle}".`);
    scrollToSection('contact-form');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;
    setInquirySubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBD4] text-[#18383C] flex flex-col selection:bg-[#18383C] selection:text-[#FDFBD4]">
      {/* QUICK CENTER-OUTWARD REVEALING VINTAGE GRAINY GLOW TRANSITION (NO TEXT, NO GRAPHICS) */}
      <AnimatePresence mode="wait">
        {activeTransitionKey !== null && (
          <motion.div
            key={activeTransitionKey}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            className="fixed inset-0 z-[950] pointer-events-none flex items-center justify-center overflow-hidden"
            aria-hidden="true"
          >
            {/* Expanding Center Reveal Aperture: transparent inside, warm glowing rim, vintage curtain outside */}
            <motion.div
              initial={{ scale: 0.02 }}
              animate={{ scale: 2.45 }}
              exit={{ scale: 2.75, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[75vmax] h-[75vmax] rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(253, 251, 212, 0) 0%, rgba(253, 251, 212, 0) 42%, rgba(253, 251, 212, 0.88) 58%, rgba(217, 215, 182, 0.78) 68%, rgba(217, 155, 60, 0.55) 78%, rgba(18, 38, 41, 0.94) 92%, rgba(18, 38, 41, 0.98) 100%)',
                boxShadow: '0 0 0 160vmax rgba(18, 38, 41, 0.96)',
                filter: 'blur(8px)',
              }}
            />

            {/* Outward-Moving Warm Cream & Amber Flash Wave from Center */}
            <motion.div
              initial={{ scale: 0.08, opacity: 0.95 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[70vmax] h-[70vmax] rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(253, 251, 212, 0.95) 0%, rgba(253, 251, 212, 0.65) 38%, rgba(217, 155, 60, 0.35) 68%, rgba(18, 38, 41, 0) 100%)',
                filter: 'blur(10px)',
              }}
            />

            {/* Fine Analog 35mm Film Grain Sweeping Outward with the Reveal */}
            <motion.div
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="retro-grain-layer mix-blend-overlay"
            />

            {/* Coarse Vintage Halide Speckle & Dust Grain Layer */}
            <motion.div
              initial={{ opacity: 0.65 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="retro-grain-layer-coarse mix-blend-multiply"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* PERSISTENT ARCHITECTURAL STUDIO HEADER ON SCROLL */}
      <header
        aria-label="Site header"
        className={`fixed top-0 inset-x-0 z-[700] transition-all duration-500 ${
          showFloatingHeader && !selectedProjectId
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
      >
        <div className="relative bg-[#122629]/95 backdrop-blur-md text-[#FDFBD4] border-b border-[#FDFBD4]/15 shadow-[0_10px_30px_rgba(18,38,41,0.18)]">
          <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-6">
            {/* Left Brand Identity Lockup */}
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="group flex items-center gap-3.5 text-left cursor-pointer"
            >
              <span className="font-display text-base sm:text-[17px] tracking-[0.16em] uppercase text-[#FDFBD4] group-hover:text-[#D9D7B6] transition-colors">
                Naqloom Studio
              </span>
              <span className="hidden sm:inline-block h-3.5 w-px bg-[#FDFBD4]/20" />
              <span className="hidden lg:inline-block font-serif italic text-xs tracking-[0.04em] text-[#D9D7B6]/75">
                Fatimah Ghani
              </span>
            </button>

            {/* Center Editorial Section Index */}
            <nav aria-label="Floating navigation" className="hidden md:flex items-center gap-8">
              {(
                [
                  { id: 'home', label: 'Home' },
                  { id: 'project', label: 'Selected Work' },
                  { id: 'process', label: 'Process' },
                  { id: 'about', label: 'About' },
                  { id: 'services', label: 'Services' },
                ] as const
              ).map((item) => {
                const isCurrent = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`group relative py-1 font-sans font-medium text-[11px] tracking-[0.18em] uppercase transition-colors cursor-pointer ${
                      isCurrent ? 'text-[#FDFBD4]' : 'text-[#FDFBD4]/75 hover:text-[#FDFBD4]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-px bg-[#FDFBD4] transition-transform origin-left duration-300 ${
                        isCurrent ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            {/* Right Studio Inquiry Action */}
            <button
              type="button"
              onClick={() => scrollToSection('contact-form')}
              className="group inline-flex items-center gap-2 px-4 py-2 bg-[#FDFBD4] text-[#122629] hover:bg-[#D9D7B6] transition-colors cursor-pointer"
            >
              <span className="font-sans font-semibold text-[10px] sm:text-[11px] uppercase tracking-[0.2em]">
                Start a Project
              </span>
              <span className="font-mono text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 1. HOME SECTION — FULL-SCREEN RETRO DESIGN STUDIO + IN-PICTURE TOP NAV + HAND-DRAWN TITLE + ROLLING REEL */}
        <div
          id="home"
          className={revealedSection?.id === 'home' ? 'section-reveal-active' : undefined}
        >
          <ReadingNookHero
            activeNav={activeNav}
            onSelectNav={(section) => scrollToSection(section)}
            onEmailClick={() => scrollToSection('contact-form')}
          />
        </div>

        {/* 2. POSTER SECTION (01 · POSTER ARCHIVE) — SEAMLESSLY MELTS OUT OF HERO */}
        <div className={revealedSection?.id === 'posters' ? 'section-reveal-active' : undefined}>
          <PosterSection />
        </div>

        {/* SEAMLESS ATMOSPHERIC EDITORIAL BRIDGE BETWEEN POSTER ARCHIVE (#122629) & SELECTED CASE STUDIES (#24110E) */}
        <section
          aria-label="Editorial Bridge"
          className="relative min-h-screen w-full flex flex-col justify-between bg-gradient-to-b from-[#122629] via-[#161F20] to-[#24110E] text-[#FDFBD4] py-20 sm:py-28 px-6 sm:px-10 md:px-16 lg:px-24 overflow-hidden"
        >
          {/* Continuous Vertical Architectural Studio Margin Lines */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-6 sm:left-10 lg:left-16 w-px bg-[#FDFBD4]/[0.07]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-6 sm:right-10 lg:right-16 w-px bg-[#FDFBD4]/[0.07]"
          />
          {/* Subtle Warm Candlelit Radial Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(750px_circle_at_50%_55%,rgba(217,155,60,0.08),transparent_70%)]"
          />

          {/* Top Vertical Connecting Thread from Poster Archive */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <span className="h-20 sm:h-24 w-px bg-gradient-to-b from-[#FDFBD4]/10 via-[#FDFBD4]/35 to-[#FDFBD4]/10" />
          </div>

          {/* Center Editorial Content */}
          <div className="relative z-10 max-w-5xl w-full mx-auto my-auto py-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-10 border-b border-[#FDFBD4]/15">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#D9D7B6]/70">
                02 · FROM PRINT STUDY TO BRAND WORLD
              </span>
              <span className="font-serif italic text-base sm:text-lg tracking-[0.02em] text-[#D9D7B6]/85">
                Selected Identity &amp; Packaging Case Studies ↓
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
              <div className="md:col-span-5">
                <h2 className="font-display text-2xl sm:text-3xl md:text-[32px] leading-[1.28] tracking-[-0.01em] text-[#FDFBD4] font-normal">
                  Translating visual atmosphere into{' '}
                  <span className="font-serif italic text-[#D9D7B6]">
                    tactile brand systems.
                  </span>
                </h2>
              </div>

              <div className="md:col-span-7">
                <p className="font-sans text-base sm:text-[17px] leading-[1.8] text-[#D9D7B6]/85 font-normal max-w-[62ch]">
                  Every visual artifact begins as a quiet study in light, texture, and cultural memory—before expanding into a living brand ecosystem. Where the poster archive captures distilled moments of atmosphere, the following case studies unfold the complete tactile narrative: from bespoke vessel architecture and material finish to packaging rituals crafted to be held and remembered.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Vertical Connecting Thread into First Case Study */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <span className="h-20 sm:h-24 w-px bg-gradient-to-b from-[#FDFBD4]/35 to-transparent" />
          </div>
        </section>

        {/* 3. PROJECTS SECTION (02 · SELECTED CASE STUDIES) */}
        <div className={revealedSection?.id === 'project' ? 'section-reveal-active' : undefined}>
          <ProjectsSection onSelectProject={(id) => setSelectedProjectId(id)} />
        </div>

        {/* 4. PROCESS SECTION (03 · THE PROCESS) */}
        <div className={revealedSection?.id === 'process' ? 'section-reveal-active' : undefined}>
          <ProcessSection />
        </div>

        {/* 5. ABOUT ME SECTION (04 · THE DESIGNER) */}
        <div className={revealedSection?.id === 'about' ? 'section-reveal-active' : undefined}>
          <AboutSection onContactClick={() => scrollToSection('contact-form')} />
        </div>

        {/* 6. SERVICES & STUDIO INQUIRY FINALE (05 · CAPABILITIES & 06 · INITIATE A PROJECT) */}
        <div className={revealedSection?.id === 'services' ? 'section-reveal-active' : undefined}>
          <ServicesSection
            clientName={clientName}
            setClientName={setClientName}
            clientEmail={clientEmail}
            setClientEmail={setClientEmail}
            projectNotes={projectNotes}
            setProjectNotes={setProjectNotes}
            inquirySubmitted={inquirySubmitted}
            setInquirySubmitted={setInquirySubmitted}
            onSubmitInquiry={handleFormSubmit}
          />
        </div>
      </main>

      <CaseStudyModal
        project={activeModalProject}
        onClose={() => setSelectedProjectId(null)}
        onNextProject={handleNextModalProject}
        onPrevProject={handlePrevModalProject}
        onSelectScope={handleSelectScopeFromModal}
      />
    </div>
  );
}

