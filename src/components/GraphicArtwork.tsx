import React from 'react';
import { motion } from 'motion/react';
import { PortfolioProject } from '../data/portfolioData';

interface GraphicArtworkProps {
  type: PortfolioProject['artworkType'];
  showGrid?: boolean;
  interactive?: boolean;
  className?: string;
}

export const GraphicArtwork: React.FC<GraphicArtworkProps> = ({
  type,
  showGrid = false,
  className = '',
}) => {
  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      {type === 'roast-rhythm-cafe' && (
        <div className="w-full h-full bg-[#545333] text-[#FDFBD4] p-6 md:p-12 flex flex-col justify-between relative">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#D9D7B6] border-b border-[#FDFBD4]/25 pb-4 tabular-nums">
            <span>03 / THE LOGO &amp; TYPOGRAPHY</span>
            <span>A MODERN MEHFIL</span>
            <span className="text-[#FDFBD4]">EST. 2026</span>
          </div>

          <div className="my-auto py-6 grid grid-cols-12 gap-6 items-center max-w-6xl mx-auto w-full">
            <div className="col-span-12 lg:col-span-7 bg-[#FDFBD4] text-[#18383C] p-6 md:p-8 border border-[#D9D7B6] shadow-2xl">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[#878672] pb-3 border-b border-[#D9D7B6]">
                <span>PRIMARY DISPLAY · IMPACT REGULAR</span>
                <span>SECONDARY · ARIAL BOLD</span>
              </div>
              <div className="font-display text-4xl md:text-6xl font-bold tracking-tight text-[#18383C] mt-4 leading-[0.92]">
                Roast <span className="text-[#545333] font-serif italic">&amp;</span> Rhythm
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#545333] mt-3">
                GOOD COFFEE. GOOD RHYTHM. · COFFEE AUR GUFTAGU.
              </p>

              <div className="mt-6 pt-4 border-t border-[#D9D7B6] grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-[#D9D7B6]/35 border border-[#D9D7B6]">
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-[#878672]">
                    PRIMARY LOGO
                  </span>
                  <span className="block font-display text-lg font-bold text-[#18383C] mt-1">
                    Roast &amp; Rhythm
                  </span>
                </div>
                <div className="p-3 bg-[#D9D7B6]/35 border border-[#D9D7B6]">
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-[#878672]">
                    MONOGRAM
                  </span>
                  <span className="block font-display text-lg font-bold text-[#18383C] mt-1">
                    R&amp;R
                  </span>
                </div>
                <div className="p-3 bg-[#D9D7B6]/35 border border-[#D9D7B6]">
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-[#878672]">
                    CHARACTER
                  </span>
                  <span className="block font-display text-lg font-bold text-[#18383C] mt-1">
                    Mehfil Cup
                  </span>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 flex justify-center">
              <svg viewBox="0 0 220 220" className="w-44 md:w-56 h-auto">
                <circle cx="110" cy="110" r="98" fill="#18383C" stroke="#D9D7B6" strokeWidth="2" />
                <circle cx="110" cy="110" r="80" fill="none" stroke="#878672" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="110" cy="110" r="60" fill="none" stroke="#D9D7B6" strokeWidth="1" />
                <circle cx="110" cy="110" r="38" fill="#FDFBD4" />
                <text
                  x="110"
                  y="108"
                  textAnchor="middle"
                  className="font-display text-[15px] font-bold fill-[#18383C] tracking-wider"
                >
                  R&amp;R
                </text>
                <text
                  x="110"
                  y="122"
                  textAnchor="middle"
                  className="font-mono text-[7px] fill-[#545333] tracking-widest"
                >
                  MEHFIL · 2026
                </text>
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#D9D7B6] border-t border-[#FDFBD4]/25 pt-4 tabular-nums">
            <span>DESIGNED BY FATIMAH GHANI</span>
            <span className="text-[#FDFBD4]">BEHANCE GALLERY · 254960309</span>
          </div>
        </div>
      )}

      {type === 'swiss-poster' && (
        <div className="w-full h-full bg-[#545333] text-[#FDFBD4] p-6 md:p-8 flex flex-col justify-between relative">
          <div className="grid grid-cols-4 gap-3 border-b border-[#FDFBD4]/25 pb-4 text-[11px] font-mono tracking-tight text-[#D9D7B6] tabular-nums">
            <span>KUNSTHALLE</span>
            <span>BASEL 2026</span>
            <span>240×320MM</span>
            <span className="text-right text-[#FDFBD4]">PLATE 01</span>
          </div>

          <div className="my-auto py-6 grid grid-cols-12 gap-3 items-center">
            <div className="col-span-7 space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="font-display text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight text-[#FDFBD4]"
              >
                FORM
                <br />
                &amp; SILENCE
              </motion.div>
              <p className="text-xs text-[#D9D7B6] font-mono pt-2 tabular-nums">
                MONOLITHIC CIVIC ARCHITECTURE 1958–1984
              </p>
            </div>

            <div className="col-span-5 flex justify-end">
              <svg viewBox="0 0 180 220" className="w-36 md:w-44 h-auto overflow-visible">
                <motion.rect
                  x="10"
                  y="10"
                  width="110"
                  height="150"
                  fill="#FDFBD4"
                  initial={{ opacity: 0.9 }}
                  whileHover={{ x: 4, y: -4 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.rect
                  x="50"
                  y="50"
                  width="115"
                  height="155"
                  fill="#D9D7B6"
                  initial={{ opacity: 0.95 }}
                  whileHover={{ x: -4, y: 4 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.circle
                  cx="108"
                  cy="128"
                  r="42"
                  fill="#878672"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.2 }}
                />
                <line x1="10" y1="128" x2="165" y2="128" stroke="#545333" strokeWidth="2" />
                <line x1="108" y1="50" x2="108" y2="205" stroke="#545333" strokeWidth="2" />
              </svg>
            </div>
          </div>

          <div className="pt-4 border-t border-[#FDFBD4]/25 flex items-center justify-between text-xs font-mono text-[#D9D7B6] tabular-nums">
            <span>EDITION OF 12,500</span>
            <span>SMYTH-SEWN LINEN</span>
            <span className="text-[#FDFBD4]">ISBN 978-3-03860</span>
          </div>
        </div>
      )}

      {type === 'wine-label' && (
        <div className="w-full h-full bg-[#878672] text-[#FDFBD4] p-6 md:p-8 flex flex-col justify-between relative">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#FDFBD4]/85 border-b border-[#FDFBD4]/25 pb-3 tabular-nums">
            <span>CÔTE DE NUITS · FRANCE</span>
            <span>PARCELLE N° 08</span>
          </div>

          <div className="my-auto flex items-center justify-center py-4">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-[290px] bg-[#FDFBD4] text-[#545333] p-5 shadow-md border border-[#D9D7B6] relative"
            >
              <div className="w-11 h-11 rounded-full bg-[#545333] text-[#FDFBD4] flex items-center justify-center font-mono text-[10px] font-semibold tracking-wider float-right -mt-2 -mr-2 border-2 border-[#D9D7B6] tabular-nums">
                DV·26
              </div>

              <div className="text-[10px] font-mono tracking-widest text-[#878672] uppercase">
                GRAND CRU ARCHIVE
              </div>
              <div className="font-display text-2xl font-bold tracking-tight text-[#545333] mt-1">
                Domaine Vespera
              </div>
              <div className="my-3 h-px bg-[#D9D7B6]" />
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#878672] tabular-nums">
                <div>
                  <span className="block text-[#545333] font-semibold">HARVEST</span>
                  <span>OCT 2024</span>
                </div>
                <div>
                  <span className="block text-[#545333] font-semibold">BOTTLE</span>
                  <span>0418 / 1200</span>
                </div>
                <div>
                  <span className="block text-[#545333] font-semibold">SOIL</span>
                  <span>LIMESTONE MARL</span>
                </div>
                <div>
                  <span className="block text-[#545333] font-semibold">CERTIFIED</span>
                  <span>BIODYNAMIC</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#FDFBD4]/85 border-t border-[#FDFBD4]/25 pt-3 tabular-nums">
            <span>GMUND COTTON 300GSM</span>
            <span>SEAL #545333</span>
          </div>
        </div>
      )}

      {type === 'botanical-packaging' && (
        <div className="w-full h-full bg-[#D9D7B6] text-[#545333] p-6 md:p-8 flex flex-col justify-between relative">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#545333]/80 border-b border-[#545333]/15 pb-3 tabular-nums">
            <span>VERIDIAN FORMULATION AG</span>
            <span>ZÜRICH LAB</span>
          </div>

          <div className="my-auto py-4 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-7 bg-[#FDFBD4] p-4 border border-[#878672]/40">
              <div className="flex justify-between items-center text-[10px] font-mono text-[#878672] pb-2 border-b border-[#D9D7B6] tabular-nums">
                <span>SERUM CONCENTRATE</span>
                <span>50 ML</span>
              </div>
              <div className="font-display text-xl font-bold text-[#545333] mt-2">
                Phyto-Retinol 03
              </div>
              <p className="text-[11px] text-[#878672] mt-1 leading-relaxed">
                Cold-pressed alpine gentian &amp; botanical complex.
              </p>
              <div className="mt-4 h-3 w-full flex">
                <div className="bg-[#545333] w-3/4 h-full" />
                <div className="bg-[#878672] w-1/4 h-full" />
              </div>
            </div>

            <div className="col-span-5 flex justify-center">
              <svg viewBox="0 0 100 180" className="w-24 h-auto">
                <rect x="34" y="8" width="32" height="24" fill="#545333" />
                <rect x="28" y="32" width="44" height="10" fill="#D9D7B6" stroke="#545333" strokeWidth="1.5" />
                <rect x="18" y="42" width="64" height="128" rx="6" fill="#545333" />
                <rect x="18" y="82" width="64" height="48" fill="#FDFBD4" />
                <line x1="26" y1="96" x2="74" y2="96" stroke="#545333" strokeWidth="3" />
                <line x1="26" y1="108" x2="58" y2="108" stroke="#878672" strokeWidth="2" />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#545333]/80 border-t border-[#545333]/15 pt-3 tabular-nums">
            <span>ORIGAMI DIE-LINE · 0% GLUE</span>
            <span className="text-[#545333] font-semibold">SOY INK #545333</span>
          </div>
        </div>
      )}

      {type === 'type-foundry' && (
        <div className="w-full h-full bg-[#FDFBD4] text-[#545333] p-6 md:p-8 flex flex-col justify-between border border-[#D9D7B6] relative">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#878672] border-b border-[#D9D7B6] pb-3 tabular-nums">
            <span>KLARHEIT GROTESK</span>
            <span>6 WEIGHTS · 640 GLYPHS</span>
          </div>

          <div className="my-auto py-3 flex items-baseline justify-between gap-4">
            <div className="font-display text-7xl md:text-8xl font-bold tracking-tighter leading-none text-[#545333] select-none">
              Ag
            </div>
            <div className="text-right font-mono text-[11px] space-y-1 text-[#878672] tabular-nums">
              <div className="text-[#545333] font-semibold">OPTICAL INK TRAP 14°</div>
              <div>CAP HEIGHT · 720 UPM</div>
              <div>X-HEIGHT · 535 UPM</div>
              <div className="text-[#545333] font-semibold">TABULAR NUMERAL GRID</div>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-1 pt-3 border-t border-[#D9D7B6] font-mono text-xs text-center tabular-nums">
            <span className="py-1 bg-[#D9D7B6] text-[#545333]">Aa</span>
            <span className="py-1 bg-[#D9D7B6] text-[#545333]">Bb</span>
            <span className="py-1 bg-[#545333] text-[#FDFBD4]">Gg</span>
            <span className="py-1 bg-[#D9D7B6] text-[#545333]">Qq</span>
            <span className="py-1 bg-[#878672] text-[#FDFBD4]">Rr</span>
            <span className="py-1 bg-[#D9D7B6] text-[#545333]">09</span>
          </div>
        </div>
      )}

      {type === 'architectural-wayfinding' && (
        <div className="w-full h-full bg-[#FDFBD4] text-[#545333] p-6 md:p-8 flex flex-col justify-between border border-[#D9D7B6] relative">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#878672] border-b border-[#D9D7B6] pb-3 tabular-nums">
            <span>OSLO CHAMBER PHILHARMONIC</span>
            <span>2026 / 2027 SEASON</span>
          </div>

          <div className="my-auto py-6 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-5 space-y-2">
              <div className="text-xs font-mono text-[#878672] uppercase tracking-wider">
                HARMONIC SERIES IV
              </div>
              <div className="font-display text-2xl md:text-3xl font-bold tracking-tight leading-tight text-[#545333]">
                Acoustic Geometry in B-Minor
              </div>
              <p className="text-xs text-[#878672] font-mono pt-1 tabular-nums">
                B1 SILKSCREEN · 700×1000MM
              </p>
            </div>

            <div className="col-span-7 flex items-end justify-between h-36 gap-1.5 px-4 py-3 bg-[#D9D7B6]/60">
              {[72, 95, 58, 100, 84, 46, 92, 68, 100, 76, 52, 88].map((heightPct, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0.4 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  style={{ height: `${heightPct}%`, transformOrigin: 'bottom' }}
                  className={`flex-1 ${
                    i % 2 === 0 ? 'bg-[#545333]' : 'bg-[#878672]'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#878672] border-t border-[#D9D7B6] pt-3 tabular-nums">
            <span>18 CONCERT POSTERS</span>
            <span className="text-[#545333] font-semibold">180G VINYL GATEFOLD</span>
          </div>
        </div>
      )}

      {showGrid && (
        <div className="absolute inset-0 pointer-events-none grid grid-cols-12 gap-2 px-6 opacity-35">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div key={idx} className="h-full border-x border-[#878672]/60" />
          ))}
        </div>
      )}
    </div>
  );
};
