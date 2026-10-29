/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
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

export default function App() {
  const [activeNav, setActiveNav] = useState<'home' | 'project' | 'about' | 'services'>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showFloatingHeader, setShowFloatingHeader] = useState<boolean>(false);

  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [projectNotes, setProjectNotes] = useState<string>('');
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setShowFloatingHeader(y > window.innerHeight * 0.65);
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

  const handleSelectScopeFromModal = (discipline: ProjectDiscipline, projectTitle: string) => {
    setSelectedProjectId(null);
    setProjectNotes(`Inquiring about a ${discipline} project similar to "${projectTitle}".`);
    setActiveNav('services');
    const contactEl = document.getElementById('contact-form');
    contactEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;
    setInquirySubmitted(true);
  };

  const scrollToSection = (sectionId: 'home' | 'project' | 'about' | 'services' | 'posters' | 'process') => {
    if (sectionId === 'home' || sectionId === 'project' || sectionId === 'about' || sectionId === 'services') {
      setActiveNav(sectionId);
    }
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFBD4] text-[#18383C] flex flex-col selection:bg-[#18383C] selection:text-[#FDFBD4]">
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
            <nav aria-label="Floating navigation" className="hidden md:flex items-center gap-9">
              {(
                [
                  { id: 'project', label: 'Selected Work' },
                  { id: 'process', label: 'Process' },
                  { id: 'about', label: 'About' },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="group relative py-1 font-sans font-medium text-[11px] tracking-[0.18em] uppercase text-[#FDFBD4]/85 hover:text-[#FDFBD4] transition-colors cursor-pointer"
                >
                  <span>{item.label}</span>
                  <span className="absolute inset-x-0 -bottom-0.5 h-px bg-[#FDFBD4] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </button>
              ))}
            </nav>

            {/* Right Studio Inquiry Action */}
            <button
              type="button"
              onClick={() => {
                const contactEl = document.getElementById('contact-form');
                contactEl?.scrollIntoView({ behavior: 'smooth' });
              }}
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
        <div id="home">
          <ReadingNookHero
            activeNav={activeNav}
            onSelectNav={(section) => scrollToSection(section)}
            onEmailClick={() => {
              setActiveNav('services');
              const contactEl = document.getElementById('contact-form');
              contactEl?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>

        {/* 2. POSTER SECTION (01 · POSTER ARCHIVE) — SEAMLESSLY MELTS OUT OF HERO */}
        <PosterSection />

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
        <ProjectsSection onSelectProject={(id) => setSelectedProjectId(id)} />

        {/* 4. PROCESS SECTION (03 · THE PROCESS) */}
        <ProcessSection />

        {/* 5. ABOUT ME SECTION (04 · THE DESIGNER) */}
        <AboutSection
          onContactClick={() => {
            const contactEl = document.getElementById('contact-form');
            contactEl?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 6. SERVICES & STUDIO INQUIRY FINALE (05 · CAPABILITIES & 06 · INITIATE A PROJECT) */}
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
