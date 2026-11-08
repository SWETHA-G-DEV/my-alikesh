import React, { useEffect } from 'react';
import { Project } from '../data/portfolio.ts';
import { X, ExternalLink, Github, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/audio.ts';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0E0E14] border border-white/10 rounded-2xl overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-10 flex flex-col">
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0E0E14]/90 backdrop-blur-md border-b border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="uppercase text-[#FF5500] font-semibold">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Banner */}
        <div className="relative w-full aspect-video sm:aspect-[21/9] bg-neutral-900 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E14] via-transparent to-transparent" />
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="font-body text-base text-[#FFA066] mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Key Metrics Strip (Tabular figures) */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-[#14141E] border border-white/[0.06]">
            {project.metrics.map((metric, i) => (
              <div key={i} className="text-left">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                  {metric.label}
                </span>
                <span className="text-lg sm:text-xl font-display font-bold text-white tabular-nums">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          {/* Detailed Story & Problem-Solution */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>Project Breakdown & Architecture</span>
            </h3>
            <p className="text-neutral-300 font-body text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
            <p className="text-neutral-400 font-body text-sm leading-relaxed">
              {project.fullStory}
            </p>
          </div>

          {/* Unboxed Tags (Zero-Pill Discipline) */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Technologies & Pipeline
            </h4>
            <div className="flex flex-wrap items-center gap-x-2 text-xs font-mono text-neutral-300">
              {project.tags.map((tag, idx) => (
                <React.Fragment key={tag}>
                  <span>{tag}</span>
                  {idx < project.tags.length - 1 && <span className="text-neutral-600" aria-hidden="true">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundFX.playHover()}
                onClick={() => soundFX.playClick()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5500] hover:bg-[#FF661A] text-white text-xs font-mono tracking-wider font-semibold rounded-lg transition-all"
              >
                <span>VISIT PRODUCTION</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundFX.playHover()}
                onClick={() => soundFX.playClick()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-mono tracking-wider font-semibold rounded-lg border border-white/[0.08] transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>SOURCE CODE</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
