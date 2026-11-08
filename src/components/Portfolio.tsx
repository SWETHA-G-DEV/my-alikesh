import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolio.ts';
import { ProjectModal } from './ProjectModal.tsx';
import { ArrowUpRight, Play } from 'lucide-react';
import { soundFX } from '../utils/audio.ts';

export const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Works' },
    { id: 'video', label: 'Video & Film' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'motion', label: 'Motion & 3D' },
    { id: 'ai', label: 'AI Pipelines' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#FF5500] block mb-2">
            Selected Works
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured Productions
          </h2>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-[#14141E] rounded-xl border border-white/[0.08] overflow-x-auto">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFX.playClick();
                  setActiveFilter(tab.id);
                }}
                onMouseEnter={() => soundFX.playHover()}
                className={`px-3.5 py-1.5 text-xs font-mono tracking-wider transition-all rounded-lg whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#FF5500] text-white shadow-[0_0_15px_rgba(255,85,0,0.3)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            onClick={() => {
              soundFX.playClick();
              setSelectedProject(project);
            }}
            onMouseEnter={() => soundFX.playHover()}
            className="group relative bg-[#0E0E14] border border-white/[0.08] hover:border-[#FF5500]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_rgba(255,85,0,0.12)] cursor-pointer flex flex-col"
          >
            {/* Project Image Frame */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E14] via-black/20 to-transparent" />

              {/* Play / Expand Icon Overlay */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#FF5500] group-hover:border-[#FF5500] transition-colors">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              {/* Video category marker */}
              {project.category === 'video' && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-mono text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                  <Play className="w-3 h-3 text-[#FF5500] fill-current" />
                  <span>24 FPS REEL</span>
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                {/* Zero-Pill Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
                  <span className="uppercase text-[#FF5500] font-semibold">{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{project.metrics[0]?.value}</span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#FFA066] transition-colors tracking-tight">
                  {project.title}
                </h3>

                <p className="font-body text-sm text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tags inline */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-400">
                <div className="flex flex-wrap items-center gap-x-2">
                  {project.tags.slice(0, 3).map((tag, tIdx) => (
                    <React.Fragment key={tag}>
                      <span>{tag}</span>
                      {tIdx < 2 && <span className="text-neutral-600">·</span>}
                    </React.Fragment>
                  ))}
                </div>
                <span className="text-[#FF5500] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  View Case Study →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
