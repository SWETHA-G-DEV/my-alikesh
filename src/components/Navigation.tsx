import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { soundFX } from '../utils/audio.ts';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFX.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { label: 'Work', href: '#projects' },
    { label: 'Skills', href: '#capabilities' },
    { label: 'Terminal', href: '#terminal' },
    { label: 'Timeline', href: '#experience' },
    { label: 'Philosophy', href: '#philosophy' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070709]/80 backdrop-blur-md border-b border-white/[0.08] py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#hero"
            onMouseEnter={() => soundFX.playHover()}
            onClick={() => soundFX.playClick()}
            className="font-display text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group flex items-center gap-1.5"
          >
            <span>AKIL</span>
            <span className="text-[#FF5500] group-hover:text-[#FFA066] transition-colors">ESH</span>
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-neutral-400">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => soundFX.playHover()}
                onClick={() => soundFX.playClick()}
                className="hover:text-white transition-colors relative py-1 whitespace-nowrap shrink-0 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#FF5500] group-hover:w-full transition-all duration-200" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Audio Toggle & Primary CTA Button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Audio Toggle Button */}
            <button
              onClick={toggleSound}
              onMouseEnter={() => soundFX.playHover()}
              title={isMuted ? 'Unmute atmospheric SFX' : 'Mute atmospheric SFX'}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.08] transition-all cursor-pointer"
              aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-neutral-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#FF5500]" />
              )}
            </button>

            {/* Primary Action CTA */}
            <a
              href="#contact"
              onMouseEnter={() => soundFX.playHover()}
              onClick={() => soundFX.playClick()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider font-semibold text-white bg-[#FF5500] hover:bg-[#FF661A] rounded-lg transition-all shadow-[0_0_20px_rgba(255,85,0,0.25)] whitespace-nowrap shrink-0"
            >
              <span>GET IN TOUCH</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white rounded-lg border border-white/[0.08]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#070709]/95 backdrop-blur-xl md:hidden pt-24 px-8 flex flex-col gap-6">
          <nav className="flex flex-col gap-5 text-base font-display">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  soundFX.playClick();
                  setMobileMenuOpen(false);
                }}
                className="text-neutral-300 hover:text-white py-2 border-b border-neutral-800 text-lg flex justify-between items-center"
              >
                <span>{link.label}</span>
                <span className="text-[#FF5500] text-xs font-mono">0{navLinks.indexOf(link) + 1}</span>
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            onClick={() => {
              soundFX.playClick();
              setMobileMenuOpen(false);
            }}
            className="w-full text-center py-3 bg-[#FF5500] text-white font-mono text-xs uppercase tracking-widest font-semibold rounded-lg mt-4"
          >
            Initiate Contact
          </a>
        </div>
      )}
    </>
  );
};
