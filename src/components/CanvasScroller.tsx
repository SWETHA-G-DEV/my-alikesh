import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio.ts';
import { ChevronDown, Film, Play, Sparkles } from 'lucide-react';

interface CanvasScrollerProps {
  onLoadingProgress: (pct: number) => void;
  onLoaded: () => void;
}

const TOTAL_FRAMES = 180;

export const CanvasScroller: React.FC<CanvasScrollerProps> = ({
  onLoadingProgress,
  onLoaded,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Inertia and frame state
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Cached images
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const [usingProcedural, setUsingProcedural] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [displayFrame, setDisplayFrame] = useState<number>(1);

  // Timecode calculation (24 fps)
  const formatTimecode = (frameIndex: number) => {
    const totalSeconds = Math.floor(frameIndex / 24);
    const frames = frameIndex % 24;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
  };

  // Procedural frame renderer (Used when local sequence files are missing or loading)
  const drawProceduralFrame = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, frame: number) => {
    const progress = Math.max(0, Math.min(1, frame / (TOTAL_FRAMES - 1)));

    // Dark cinematic gradient background
    const bgGrad = ctx.createRadialGradient(
      width / 2, height / 2, 50,
      width / 2, height / 2, Math.max(width, height) * 0.85
    );
    bgGrad.addColorStop(0, '#110D12');
    bgGrad.addColorStop(0.4, '#0A080C');
    bgGrad.addColorStop(1, '#040406');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    // 1. Perspective grid / timeline tracks receding into depth
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 85, 0, 0.08)';
    ctx.lineWidth = 1;
    const fov = 400 + progress * 200;
    const gridCount = 14;
    for (let i = -gridCount; i <= gridCount; i++) {
      const x = centerX + i * 80 * (width / 1440);
      ctx.beginPath();
      ctx.moveTo(x, centerY + 30);
      ctx.lineTo(centerX + (x - centerX) * 4, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, centerY - 30);
      ctx.lineTo(centerX + (x - centerX) * 4, 0);
      ctx.stroke();
    }

    // Horizontal depth rings
    const ringCount = 8;
    for (let r = 1; r <= ringCount; r++) {
      const ringOffset = ((r * 0.12 + progress * 0.5) % 1);
      const ringYTop = centerY - ringOffset * centerY * 0.9;
      const ringYBottom = centerY + ringOffset * centerY * 0.9;

      ctx.strokeStyle = `rgba(255, 85, 0, ${0.04 + ringOffset * 0.1})`;
      ctx.beginPath();
      ctx.moveTo(0, ringYTop);
      ctx.lineTo(width, ringYTop);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, ringYBottom);
      ctx.lineTo(width, ringYBottom);
      ctx.stroke();
    }
    ctx.restore();

    // 2. 3D Floating Camera Aperture / HUD Geometry
    ctx.save();
    ctx.translate(centerX, centerY);

    // Dynamic camera rotation based on scroll inertia
    const angle = (progress * Math.PI * 2 * 0.35) - 0.2;
    ctx.rotate(angle);

    // Zoom scale: zooms into the scene as user scrolls
    const scale = 0.8 + progress * 0.9;
    ctx.scale(scale, scale);

    // Glowing outer ring
    ctx.beginPath();
    ctx.arc(0, 0, 160, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 85, 0, 0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Inner aperture blades
    const blades = 7;
    ctx.strokeStyle = 'rgba(255, 120, 40, 0.4)';
    ctx.lineWidth = 1.5;
    for (let b = 0; b < blades; b++) {
      const bladeAngle = (b / blades) * Math.PI * 2 + progress * 1.2;
      const rInner = 45 + Math.sin(progress * Math.PI + b) * 15;
      const rOuter = 155;
      ctx.beginPath();
      ctx.moveTo(Math.cos(bladeAngle) * rInner, Math.sin(bladeAngle) * rInner);
      ctx.lineTo(Math.cos(bladeAngle + 0.8) * rOuter, Math.sin(bladeAngle + 0.8) * rOuter);
      ctx.stroke();
    }

    // Center focal point
    const coreGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, 80);
    coreGrad.addColorStop(0, 'rgba(255, 140, 0, 0.7)');
    coreGrad.addColorStop(0.3, 'rgba(255, 85, 0, 0.3)');
    coreGrad.addColorStop(1, 'rgba(255, 85, 0, 0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 80, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // 3. Anamorphic Lens Flare Line (Cinematic amber streak)
    ctx.save();
    const flareGrad = ctx.createLinearGradient(0, centerY, width, centerY);
    const flareIntensity = 0.25 + Math.sin(progress * Math.PI * 3) * 0.15;
    flareGrad.addColorStop(0, 'rgba(255, 85, 0, 0)');
    flareGrad.addColorStop(0.3, `rgba(255, 110, 20, ${flareIntensity * 0.4})`);
    flareGrad.addColorStop(0.5, `rgba(255, 230, 200, ${flareIntensity})`);
    flareGrad.addColorStop(0.7, `rgba(255, 110, 20, ${flareIntensity * 0.4})`);
    flareGrad.addColorStop(1, 'rgba(255, 85, 0, 0)');

    ctx.fillStyle = flareGrad;
    ctx.fillRect(0, centerY - 1.5, width, 3);
    ctx.restore();

    // 4. Floating 3D Embers / Bokeh Particles
    ctx.save();
    const particleCount = 45;
    for (let p = 0; p < particleCount; p++) {
      const seed = p * 137.5;
      const px = (Math.sin(seed + progress * 2) * 0.5 + 0.5) * width;
      const py = (Math.cos(seed * 0.7 + progress * 3) * 0.5 + 0.5) * height;
      const size = (Math.sin(seed) * 0.5 + 0.5) * 3 + 1;
      const alpha = (Math.sin(seed * 2 + progress * 5) * 0.5 + 0.5) * 0.45;

      ctx.fillStyle = `rgba(255, 115, 30, ${alpha})`;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 5. Film framing mask (2.39:1 Anamorphic Cinema scope letterbox)
    const scopeHeight = width / 2.39;
    const barHeight = Math.max(0, (height - scopeHeight) / 2);
    if (barHeight > 0) {
      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, width, barHeight);
      ctx.fillRect(0, height - barHeight, width, barHeight);

      // Fine golden ratio crop lines
      ctx.strokeStyle = 'rgba(255, 85, 0, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, barHeight);
      ctx.lineTo(width, barHeight);
      ctx.moveTo(0, height - barHeight);
      ctx.lineTo(width, height - barHeight);
      ctx.stroke();
    }

    // 6. Film grain overlay simulation
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
    for (let g = 0; g < 400; g++) {
      const gx = Math.random() * width;
      const gy = Math.random() * height;
      ctx.fillRect(gx, gy, 1.5, 1.5);
    }
    ctx.restore();
  }, []);

  // Draw current frame to canvas (Object-fit: cover with retina handling)
  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const img = imagesRef.current[frameIdx];

    if (img && img.complete && img.naturalWidth > 0) {
      // Draw loaded image with object-fit: cover
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;
      let drawW, drawH, offX, offY;

      if (canvasRatio > imgRatio) {
        drawW = width;
        drawH = width / imgRatio;
        offX = 0;
        offY = (height - drawH) / 2;
      } else {
        drawW = height * imgRatio;
        drawH = height;
        offX = (width - drawW) / 2;
        offY = 0;
      }

      ctx.fillStyle = '#070709';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, offX, offY, drawW, drawH);

      // Subtle fiery vignette
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, width * 0.3,
        width / 2, height / 2, width * 0.75
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.65)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    } else {
      // Draw cinematic procedural simulation
      drawProceduralFrame(ctx, width, height, frameIdx);
    }
  }, [drawProceduralFrame]);

  // Spring inertia render loop at 60 FPS
  useEffect(() => {
    let active = true;

    const loop = () => {
      if (!active) return;

      // Spring inertia lerp smoothing factor (0.12 provides responsive yet buttery scrub)
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * 0.12;

      const roundedFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameRef.current)));
      renderFrame(roundedFrame);
      setDisplayFrame(roundedFrame + 1);

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      active = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [renderFrame]);

  // Canvas resize and retina DPI handling
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    renderFrame(Math.round(currentFrameRef.current));
  }, [renderFrame]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Progressive frame loader: Frame 1 first for instant paint, then rest
  useEffect(() => {
    let isCancelled = false;

    const loadSingleFrame = (index: number): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        const frameNum = String(index + 1).padStart(3, '0');
        const img = new Image();
        img.src = `/sequence/frame_${frameNum}.webp`;

        img.onload = () => {
          imagesRef.current[index] = img;
          resolve(img);
        };

        img.onerror = () => {
          // Try .jpg fallback
          const jpg = new Image();
          jpg.src = `/sequence/frame_${frameNum}.jpg`;
          jpg.onload = () => {
            imagesRef.current[index] = jpg;
            resolve(jpg);
          };
          jpg.onerror = () => {
            // Neither found; fallback to procedural
            resolve(null);
          };
        };
      });
    };

    // Immediate Frame 1 load
    loadSingleFrame(0).then((firstImg) => {
      if (isCancelled) return;
      if (!firstImg) {
        setUsingProcedural(true);
      }
      onLoadingProgress(15);
      renderFrame(0);

      // Progressively load remaining frames in small batches
      let loadedCount = 1;
      const batchSize = 10;
      let currentIndex = 1;

      const loadNextBatch = () => {
        if (isCancelled || currentIndex >= TOTAL_FRAMES) {
          onLoadingProgress(100);
          onLoaded();
          return;
        }

        const batchPromises: Promise<HTMLImageElement | null>[] = [];
        for (let i = 0; i < batchSize && currentIndex + i < TOTAL_FRAMES; i++) {
          batchPromises.push(loadSingleFrame(currentIndex + i));
        }

        Promise.all(batchPromises).then(() => {
          if (isCancelled) return;
          loadedCount += batchPromises.length;
          const pct = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
          onLoadingProgress(pct);

          currentIndex += batchSize;
          if (currentIndex < TOTAL_FRAMES) {
            // Give browser breathing room
            setTimeout(loadNextBatch, 16);
          } else {
            onLoadingProgress(100);
            onLoaded();
          }
        });
      };

      loadNextBatch();
    });

    return () => {
      isCancelled = true;
    };
  }, [onLoadingProgress, onLoaded, renderFrame]);

  // Handle scroll progress within the Hero 500vh track
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      setScrollProgress(progress);
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate opacity and transform for the 4 key stages: 0%, 30%, 60%, 90%
  const getStageOpacity = (center: number, spread = 0.12) => {
    const dist = Math.abs(scrollProgress - center);
    if (dist > spread) return 0;
    return 1 - dist / spread;
  };

  const stage0Opacity = getStageOpacity(0.04, 0.14);
  const stage30Opacity = getStageOpacity(0.32, 0.14);
  const stage60Opacity = getStageOpacity(0.62, 0.14);
  const stage90Opacity = getStageOpacity(0.92, 0.12);

  const scrollToNext = () => {
    const container = containerRef.current;
    if (container) {
      const nextY = container.offsetTop + container.offsetHeight;
      window.scrollTo({ top: nextY, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full h-[450vh] bg-[#070709]"
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />

        {/* Ambient Top & Bottom Gradients for cinematic immersion */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#070709]/90 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#070709] via-[#070709]/60 to-transparent pointer-events-none" />

        {/* Cinematic HUD Corner Markers */}
        <div className="absolute top-24 left-8 hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400 select-none">
          <Film className="w-3.5 h-3.5 text-[#FF5500]" />
          <span>REEL_RAW // 4K 24FPS</span>
        </div>

        <div className="absolute top-24 right-8 hidden sm:flex items-center gap-3 text-xs font-mono select-none">
          <span className="text-neutral-400">FPS: <span className="text-[#FF5500] font-semibold">60 LERP</span></span>
          <span className="text-neutral-600">·</span>
          <span className="text-neutral-400">ENGINE: <span className="text-neutral-300">{usingProcedural ? 'HYBRID SHADER' : 'FRAME SEQUENCE'}</span></span>
        </div>

        {/* ================= STAGE OVERLAYS (0%, 30%, 60%, 90%) ================= */}

        {/* Stage 0%: AKILESH Identity */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: stage0Opacity,
            transform: `translateY(${(1 - stage0Opacity) * -20}px)`,
            visibility: stage0Opacity > 0.01 ? 'visible' : 'hidden',
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full glass-panel text-xs font-mono tracking-widest text-[#FFA066]">
            <Sparkles className="w-3 h-3 text-[#FF5500]" />
            <span>{PORTFOLIO_DATA.hero.badge}</span>
          </div>

          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white uppercase">
            AKIL<span className="text-gradient-fire">ESH</span>
          </h1>

          <p className="font-display text-lg sm:text-2xl font-medium text-neutral-300 mt-4 max-w-xl tracking-tight">
            {PORTFOLIO_DATA.title}
          </p>

          <p className="text-xs sm:text-sm font-mono tracking-widest text-neutral-400 mt-3 uppercase">
            SCROLL DOWN TO SCRUB THE TIMELINE
          </p>
        </div>

        {/* Stage 30%: Tagline */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: stage30Opacity,
            transform: `translateY(${(1 - stage30Opacity) * -20}px)`,
            visibility: stage30Opacity > 0.01 ? 'visible' : 'hidden',
          }}
        >
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#FF5500] mb-3">
            {PORTFOLIO_DATA.hero.subtitles.step30.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight">
            {PORTFOLIO_DATA.hero.subtitles.step30.headline}
          </h2>
          <p className="font-body text-base sm:text-lg text-neutral-300 max-w-2xl mt-5 leading-relaxed">
            {PORTFOLIO_DATA.hero.subtitles.step30.descriptor}
          </p>
        </div>

        {/* Stage 60%: The Hybrid Edge */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: stage60Opacity,
            transform: `translateY(${(1 - stage60Opacity) * -20}px)`,
            visibility: stage60Opacity > 0.01 ? 'visible' : 'hidden',
          }}
        >
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#FF5500] mb-3">
            {PORTFOLIO_DATA.hero.subtitles.step60.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight max-w-4xl">
            {PORTFOLIO_DATA.hero.subtitles.step60.headline}
          </h2>
          <p className="font-body text-base sm:text-lg text-neutral-300 max-w-2xl mt-5 leading-relaxed">
            {PORTFOLIO_DATA.hero.subtitles.step60.descriptor}
          </p>
        </div>

        {/* Stage 90%: The Vault / Call to Explore */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-300"
          style={{
            opacity: stage90Opacity,
            transform: `translateY(${(1 - stage90Opacity) * -20}px)`,
            visibility: stage90Opacity > 0.01 ? 'visible' : 'hidden',
            pointerEvents: stage90Opacity > 0.5 ? 'auto' : 'none',
          }}
        >
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#FF5500] mb-3">
            {PORTFOLIO_DATA.hero.subtitles.step90.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            {PORTFOLIO_DATA.hero.subtitles.step90.headline}
          </h2>
          <p className="font-body text-base sm:text-lg text-neutral-300 max-w-xl mt-4 leading-relaxed">
            {PORTFOLIO_DATA.hero.subtitles.step90.descriptor}
          </p>

          <button
            onClick={scrollToNext}
            className="mt-8 px-6 py-3 bg-[#FF5500] hover:bg-[#FF661A] text-white font-medium text-sm rounded-lg transition-all shadow-[0_0_25px_rgba(255,85,0,0.35)] flex items-center gap-2 group cursor-pointer"
          >
            <span>Enter Portfolio</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom Interactive Playhead & Scrubber HUD */}
        <div className="absolute bottom-6 inset-x-0 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 z-20 pointer-events-auto">
          {/* Timecode display */}
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 bg-[#0E0E14]/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
            <span className="text-white font-medium tabular-nums">{formatTimecode(displayFrame)}</span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-400 tabular-nums">00:00:07:12</span>
          </div>

          {/* Interactive Scrub Track Bar */}
          <div className="flex-1 max-w-xl w-full flex items-center gap-3">
            <span className="text-[11px] font-mono text-neutral-400 shrink-0 tabular-nums">
              FRM {String(displayFrame).padStart(3, '0')}
            </span>
            <div
              className="relative flex-1 h-2 bg-neutral-800/80 rounded-full overflow-hidden cursor-pointer group"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                const container = containerRef.current;
                if (container) {
                  const targetScroll = container.offsetTop + ratio * (container.offsetHeight - window.innerHeight);
                  window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                }
              }}
            >
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FF3B00] via-[#FF5500] to-[#FFA066] transition-all duration-75"
                style={{ width: `${scrollProgress * 100}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#FF5500] -translate-x-1/2 transition-all duration-75 opacity-0 group-hover:opacity-100"
                style={{ left: `${scrollProgress * 100}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-neutral-400 shrink-0 tabular-nums">
              180
            </span>
          </div>

          {/* Scroll nudge indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400 bg-[#0E0E14]/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10">
            <span>SCRUB 01-180</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#FF5500] animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};
