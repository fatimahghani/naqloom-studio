import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Mail } from 'lucide-react';

interface ReadingNookHeroProps {
  activeNav?: 'home' | 'project' | 'about' | 'services';
  onSelectNav?: (section: 'home' | 'project' | 'about' | 'services') => void;
  onEmailClick?: () => void;
}

interface HeroReelCardItem {
  id: string;
  kind: 'service' | 'toolkit' | 'availability';
  label: string;
  title: string;
  subtitle?: string;
  variant: 'cream' | 'sage' | 'olive' | 'teal-cream';
}

const HERO_REEL_CARDS: HeroReelCardItem[] = [
  {
    id: 'service-01',
    kind: 'service',
    label: 'SERVICE 01',
    title: 'Brand Identity',
    subtitle: 'Logos, color, type and guidelines',
    variant: 'cream',
  },
  {
    id: 'service-02',
    kind: 'service',
    label: 'SERVICE 02',
    title: 'Packaging Design',
    subtitle: 'Labels, boxes and mockups',
    variant: 'sage',
  },
  {
    id: 'service-03',
    kind: 'service',
    label: 'SERVICE 03',
    title: 'UI/UX Design',
    subtitle: 'Web and app screens in Figma',
    variant: 'olive',
  },
  {
    id: 'service-04',
    kind: 'service',
    label: 'SERVICE 04',
    title: 'Motion Graphics',
    subtitle: 'Logo animations and social reels',
    variant: 'cream',
  },
  {
    id: 'toolkit',
    kind: 'toolkit',
    label: 'TOOLKIT',
    title: 'Affinity · Figma · Illustrator · After Effects',
    subtitle: 'Vector, interface & motion workflow',
    variant: 'sage',
  },
  {
    id: 'availability',
    kind: 'availability',
    label: 'AVAILABILITY',
    title: 'Open for freelance and junior design work',
    variant: 'teal-cream',
  },
];

const NAQLOOM_LETTERS = [
  { char: 'N', rot: -1.4, ox: -5, oy: 4 },
  { char: 'A', rot: 1.1, ox: 4, oy: -4 },
  { char: 'Q', rot: -1.0, ox: -4, oy: 4 },
  { char: 'L', rot: 1.3, ox: 5, oy: 3 },
  { char: 'O', rot: -1.2, ox: -5, oy: -3 },
  { char: 'O', rot: 1.0, ox: 4, oy: 4 },
  { char: 'M', rot: -1.1, ox: -4, oy: 4 },
];

const STUDIO_LETTERS = [
  { char: 'S', rot: 1.2, ox: -4, oy: 4 },
  { char: 'T', rot: -1.2, ox: 4, oy: -3 },
  { char: 'U', rot: 1.0, ox: -4, oy: 4 },
  { char: 'D', rot: -1.3, ox: 4, oy: 4 },
  { char: 'I', rot: 1.4, ox: -3, oy: -4 },
  { char: 'O', rot: -1.1, ox: 4, oy: 3 },
];

export const ReadingNookHero: React.FC<ReadingNookHeroProps> = ({
  activeNav = 'home',
  onSelectNav,
  onEmailClick,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Duplicate 4x (even multiple) for a mathematically seamless -50% full-bleed infinite rolling reel
  const reelItems: HeroReelCardItem[] = [
    ...HERO_REEL_CARDS,
    ...HERO_REEL_CARDS,
    ...HERO_REEL_CARDS,
    ...HERO_REEL_CARDS,
  ];

  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.muted = true;
      vid.playbackRate = 1.0;
      vid.play().catch(() => {});
    }
  }, []);

  const strokeJitterA = { x: -2.0, y: -1.5, r: -0.6 };
  const strokeJitterB = { x: 2.2, y: 1.8, r: 0.7 };
  const strokeJitterC = { x: -1.4, y: 2.0, r: 0.5 };

  const renderHandDrawnLetter = (
    item: { char: string; rot: number; ox: number; oy: number },
    idx: number,
    rowPrefix: string,
    baseDelay: number,
    fontSize: string
  ) => (
    <motion.div
      key={`${rowPrefix}-${idx}`}
      initial={{ opacity: 0, scale: 0.78, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: baseDelay + idx * 0.08,
        duration: 0.65,
        type: 'spring',
        stiffness: 145,
        damping: 15,
      }}
      style={{
        transform: `rotate(${item.rot}deg)`,
        fontFamily: "'Anton', 'Oswald', sans-serif",
        fontSize,
        lineHeight: 0.88,
      }}
      className="relative inline-block uppercase tracking-tight"
    >
      {/* 1. Misregistered Solid Fill Block (Warm Cream #FDFBD4 with Deep Teal #18383C shadow) */}
      <span
        style={{
          transform: `translate(${item.ox}px, ${item.oy}px)`,
          color: '#FDFBD4',
          filter: 'url(#ae-hand-drawn-fill)',
          textShadow: '4px 5px 0px #18383C, 0px 8px 22px rgba(24, 56, 60, 0.55)',
        }}
        className="block select-none"
      >
        {item.char}
      </span>

      {/* 2. Hand-Drawn Sketch Outline 1 (Deep Teal #18383C) */}
      <span
        aria-hidden="true"
        style={{
          transform: `translate(${strokeJitterA.x}px, ${strokeJitterA.y}px) rotate(${strokeJitterA.r}deg)`,
          WebkitTextStroke: '3.5px #18383C',
          color: 'transparent',
          filter: 'url(#ae-hand-drawn-1)',
        }}
        className="pointer-events-none absolute inset-0 block"
      >
        {item.char}
      </span>

      {/* 3. Hand-Drawn Sketch Outline 2 (Deep Teal #18383C Second Pass) */}
      <span
        aria-hidden="true"
        style={{
          transform: `translate(${strokeJitterB.x}px, ${strokeJitterB.y}px) rotate(${strokeJitterB.r}deg)`,
          WebkitTextStroke: '2.2px #18383C',
          color: 'transparent',
          filter: 'url(#ae-hand-drawn-2)',
        }}
        className="pointer-events-none absolute inset-0 block"
      >
        {item.char}
      </span>

      {/* 4. Hand-Drawn Sketch Outline 3 (Warm Cream #FDFBD4 Fine Counter-Accent Line) */}
      <span
        aria-hidden="true"
        style={{
          transform: `translate(${strokeJitterC.x}px, ${strokeJitterC.y}px) rotate(${strokeJitterC.r}deg)`,
          WebkitTextStroke: '1.4px #FDFBD4',
          color: 'transparent',
          filter: 'url(#ae-hand-drawn-1)',
        }}
        className="pointer-events-none absolute inset-0 block opacity-85"
      >
        {item.char}
      </span>
    </motion.div>
  );

  const renderTicketReelCard = (card: HeroReelCardItem, idx: number) => {
    // Card surface styles matching the cream paper + olive/sage/deep-teal courtyard theme
    const isOlive = card.variant === 'olive';
    const isSage = card.variant === 'sage';
    const isTealCream = card.variant === 'teal-cream';

    const containerClasses = isOlive
      ? 'bg-[#545333] text-[#FDFBD4]'
      : isSage
        ? 'bg-[#D9D7B6] text-[#18383C]'
        : isTealCream
          ? 'bg-[#FDFBD4] text-[#18383C]'
          : 'bg-[#FDFBD4] text-[#545333]';

    const dividerClasses = isOlive
      ? 'border-[#FDFBD4]/25'
      : isSage
        ? 'border-[#545333]/20'
        : 'border-[#D9D7B6]';

    const labelClasses = isOlive
      ? 'text-[#D9D7B6]'
      : isSage
        ? 'text-[#545333]'
        : 'text-[#878672]';

    const titleClasses = isOlive
      ? 'text-[#FDFBD4]'
      : isSage || isTealCream
        ? 'text-[#18383C]'
        : 'text-[#545333]';

    const subtitleClasses = isOlive
      ? 'text-[#D9D7B6]'
      : isSage
        ? 'text-[#545333]'
        : 'text-[#878672]';

    const handleCardClick = () => {
      if (card.kind === 'availability') {
        onEmailClick?.();
      } else {
        onSelectNav?.('services');
      }
    };

    return (
      <div
        key={`${card.id}-${idx}`}
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        style={{
          mask: 'url(#ticket-stamp-mask)',
          WebkitMask: 'url(#ticket-stamp-mask)',
        }}
        className={`group relative w-[295px] sm:w-[340px] md:w-[380px] h-[176px] sm:h-[190px] md:h-[202px] shrink-0 px-6 py-5 flex flex-col justify-between transition-transform duration-200 hover:scale-[1.015] text-left cursor-pointer overflow-hidden ${containerClasses}`}
      >
        {/* Top Monospace Label Row + Thin Divider Line */}
        <div
          className={`flex items-center justify-between border-b pb-2 text-[11px] font-mono tracking-wider uppercase tabular-nums ${dividerClasses} ${labelClasses}`}
        >
          <span>{card.label}</span>
          <span className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            {card.kind === 'service' && (
              <>
                <span>SERVICES</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </>
            )}
            {card.kind === 'toolkit' && <span>STACK</span>}
            {card.kind === 'availability' && <span>STATUS</span>}
          </span>
        </div>

        {/* Middle Bold Title & Short Line */}
        <div className="my-auto py-1.5">
          {card.kind === 'toolkit' ? (
            <div className="space-y-1">
              <div
                className={`font-display text-lg sm:text-xl font-semibold leading-snug tracking-tight ${titleClasses}`}
              >
                {card.title}
              </div>
              {card.subtitle && (
                <p className={`font-serif italic text-sm sm:text-base ${subtitleClasses}`}>
                  {card.subtitle}
                </p>
              )}
            </div>
          ) : card.kind === 'availability' ? (
            <div className="flex items-center justify-between gap-3">
              <div
                className={`font-display text-base sm:text-lg font-semibold leading-snug tracking-tight ${titleClasses}`}
              >
                {card.title}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEmailClick?.();
                }}
                className="px-3.5 py-2 rounded-md bg-[#18383C] hover:bg-[#545333] text-[#FDFBD4] text-xs font-sans font-medium tracking-wide transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email me</span>
              </button>
            </div>
          ) : (
            <div className="space-y-0.5">
              <div
                className={`font-display text-xl sm:text-2xl font-semibold leading-tight tracking-tight ${titleClasses}`}
              >
                {card.title}
              </div>
              {card.subtitle && (
                <p className={`font-serif italic text-base sm:text-[17px] leading-snug ${subtitleClasses}`}>
                  {card.subtitle}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Bottom Thin Divider Line + Subtle Archival Footer Bar */}
        <div
          className={`pt-2 border-t flex items-center justify-between text-[10px] font-mono tabular-nums ${dividerClasses} ${labelClasses}`}
        >
          <span>NAQLOOM STUDIO</span>
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-1.5 bg-[#18383C]" />
            <span className="inline-block w-3 h-1.5 bg-[#545333]" />
            <span className="inline-block w-3 h-1.5 bg-[#878672]" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative w-screen h-screen bg-[#18383C] overflow-hidden flex flex-col justify-between select-none">
      {/* SVG Filters & Transparent Postage-Stamp Ticket Cutout Mask */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <mask id="ticket-stamp-mask" maskContentUnits="objectBoundingBox">
            <rect x="0" y="0" width="1" height="1" fill="white" />
            {/* Top & Bottom transparent circular cutouts */}
            {Array.from({ length: 18 }).map((_, i) => {
              const cx = (i + 0.5) / 18;
              return (
                <g key={`tb-hole-${i}`}>
                  <ellipse cx={cx} cy={0} rx={0.014} ry={0.026} fill="black" />
                  <ellipse cx={cx} cy={1} rx={0.014} ry={0.026} fill="black" />
                </g>
              );
            })}
            {/* Left & Right transparent circular cutouts */}
            {Array.from({ length: 10 }).map((_, i) => {
              const cy = (i + 0.5) / 10;
              return (
                <g key={`lr-hole-${i}`}>
                  <ellipse cx={0} cy={cy} rx={0.014} ry={0.026} fill="black" />
                  <ellipse cx={1} cy={cy} rx={0.014} ry={0.026} fill="black" />
                </g>
              );
            })}
          </mask>

          <filter id="ae-hand-drawn-1" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.022 0.028"
              numOctaves="2"
              seed={5}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3.8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter id="ae-hand-drawn-2" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.026 0.022"
              numOctaves="2"
              seed={14}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="4.2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter id="ae-hand-drawn-fill" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.016"
              numOctaves="2"
              seed={3}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* FULL-SCREEN LOOPING RETRO VINTAGE GRAPHIC DESIGN & LETTERPRESS STUDIO ANIMATION */}
      <motion.video
        ref={videoRef}
        src={`${import.meta.env.BASE_URL}assets/aistudio/retro_design_studio_loop.mp4`}
        poster={`${import.meta.env.BASE_URL}assets/aistudio/retro_design_studio_poster.jpg`}
        preload="auto"
        autoPlay
        loop
        muted
        playsInline
        initial={{ scale: 1.04, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* RETRO ANALOG 35MM FILM GRAIN & WARM STUDIO VIGNETTE OVERLAY */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(24,56,60,0.14)_0%,rgba(18,34,37,0.56)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.14] mix-blend-overlay bg-[radial-gradient(#FDFBD4_1px,transparent_1px)] [background-size:3px_3px]"
      />
      {/* SEAMLESS BOTTOM ATMOSPHERIC MELT INTO POSTER ARCHIVE (#122629) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-20 bg-gradient-to-b from-transparent via-[#122629]/55 to-[#122629]"
      />

      {/* 1. SIMPLE TOP NAVIGATION TEXT DIRECTLY INSIDE THE PICTURE */}
      <nav
        aria-label="Primary navigation"
        className="relative z-30 pt-6 sm:pt-7 flex items-center justify-center gap-8 sm:gap-12 px-6 shrink-0"
      >
        {(
          [
            { id: 'home', label: 'Home' },
            { id: 'project', label: 'Project' },
            { id: 'about', label: 'About' },
            { id: 'services', label: 'Services' },
          ] as const
        ).map((navItem) => {
          const isActive = activeNav === navItem.id;
          return (
            <a
              key={navItem.id}
              href={`#${navItem.id}`}
              onClick={(e) => {
                e.preventDefault();
                onSelectNav?.(navItem.id);
              }}
              className={`font-sans text-sm sm:text-base font-medium tracking-wide text-[#FDFBD4] drop-shadow-[0_1px_4px_rgba(24,56,60,0.65)] transition-opacity whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'opacity-100 underline decoration-[#FDFBD4] underline-offset-6'
                  : 'opacity-80 hover:opacity-100'
              }`}
            >
              {navItem.label}
            </a>
          );
        })}
      </nav>

      {/* 2. HAND-DRAWN TITLE IN MIDDLE OF THE COURTYARD */}
      <div className="relative z-20 my-auto flex flex-col items-center justify-center px-4 py-4">
        {/* ROW 1: "NAQLOOM" */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-2.5">
          {NAQLOOM_LETTERS.map((item, idx) =>
            renderHandDrawnLetter(item, idx, 'naqloom', 0, 'clamp(4.2rem, 13.5vw, 11.2rem)')
          )}
        </div>

        {/* ROW 2: "STUDIO" */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3 mt-2 sm:mt-3">
          {STUDIO_LETTERS.map((item, idx) =>
            renderHandDrawnLetter(item, idx, 'studio', 0.42, 'clamp(3.1rem, 9.8vw, 7.8rem)')
          )}
        </div>
      </div>

      {/* 3. FULL-WIDTH EDGE-TO-EDGE PERFORATED TICKET / STAMP ROLLING REEL AT BOTTOM OF HERO (NO BACKGROUND BOX) */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        role="region"
        aria-label="Studio services, toolkit, and availability ticket reel"
        aria-roledescription="carousel"
        className="relative z-30 w-screen pb-5 sm:pb-7 overflow-hidden shrink-0"
      >
        <div className="animate-marquee flex items-start gap-4 pr-4">
          {reelItems.map((card, idx) => renderTicketReelCard(card, idx))}
        </div>
      </motion.div>
    </section>
  );
};
