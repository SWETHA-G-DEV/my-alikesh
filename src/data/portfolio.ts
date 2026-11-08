export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'video' | 'fullstack' | 'motion' | 'ai';
  year: string;
  image: string;
  description: string;
  fullStory: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; level: number; highlight?: string }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  deliverables: string[];
  tools: string[];
}

export const PORTFOLIO_DATA = {
  name: "AKILESH",
  title: "Video Editor & Full Stack Developer",
  tagline: "BUILDS | EDITS | CREATES",
  email: "akilesh.craft@gmail.com",
  location: "San Francisco / Remote",
  availability: "Available for Select Projects & Collaborations",

  hero: {
    badge: "CINEMATIC SCROLLYTELLING SHOWCASE",
    subtitles: {
      step0: {
        eyebrow: "DIRECTOR & ARCHITECT",
        headline: "AKILESH",
        descriptor: "Video Editor & Full Stack Developer",
      },
      step30: {
        eyebrow: "CORE PHILOSOPHY",
        headline: "BUILDS · EDITS · CREATES",
        descriptor: "Translating bold creative concepts into high-retention cinematic edits and high-performance digital engines.",
      },
      step60: {
        eyebrow: "THE HYBRID EDGE",
        headline: "FRAME PRECISION × SUB-MILLISECOND CODE",
        descriptor: "Where 24-fps pacing meets reactive state machines, WebGL shaders, and fluid user experiences.",
      },
      step90: {
        eyebrow: "THE VAULT",
        headline: "EXPLORE THE WORK",
        descriptor: "Scrub down to unlock selected productions, full-stack architectures, interactive terminals, and capabilities.",
      },
    },
  },

  socials: [
    {
      name: "GitHub",
      url: "https://github.com",
      handle: "@akilesh-dev",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      handle: "in/akilesh-creator",
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      handle: "@akilesh.edits",
    },
    {
      name: "YouTube",
      url: "https://youtube.com",
      handle: "@AkileshVisuals",
    },
  ],

  projects: [
    {
      id: "redline-cyberpunk",
      title: "REDLINE: Cyberpunk Narrative Reel",
      subtitle: "High-retention cinematic edit & anamorphic color grading",
      category: "video",
      year: "2024",
      image: "/src/assets/images/project_cinematic_reel_1794157384856.jpg",
      description:
        "A hyper-kinetic sci-fi visual narrative edited at 24fps with custom anamorphic flares, dynamic sound design, and sound-to-cut synchronization that drove viral engagement.",
      fullStory:
        "Built to demonstrate master-class pacing in modern short-form cinema. Created custom LUT passes in DaVinci Resolve, matched lighting transients to sub-bass impacts, and built an automated multi-cam cutting workflow using custom scripting.",
      metrics: [
        { label: "Audience Reach", value: "18.4M+" },
        { label: "Avg Retention", value: "86.2%" },
        { label: "Render Delivery", value: "8K HDR" },
      ],
      tags: ["DaVinci Resolve", "Sound Design", "Color Grading", "Film Pacing", "After Effects"],
      liveUrl: "https://youtube.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: "aether-synth",
      title: "AETHER: Audio-Visual Production Studio",
      subtitle: "Full-stack real-time waveform engine and media asset suite",
      category: "fullstack",
      year: "2024",
      image: "/src/assets/images/project_web_synth_1794157386663.jpg",
      description:
        "High-performance web workstation featuring real-time Web Audio API frequency analysis, low-latency waveform scrubbing, and zero-flicker timeline rendering.",
      fullStory:
        "Bridging my editing background with web engineering. Aether enables video creators to generate synchronized audio markers and export directly to EDL / XML timeline formats, decreasing pre-editing sound prep time by 70%.",
      metrics: [
        { label: "Active Creators", value: "12,000+" },
        { label: "Frame Rate", value: "60 FPS locked" },
        { label: "Export Speed", value: "< 240ms" },
      ],
      tags: ["React", "TypeScript", "Web Audio API", "HTML5 Canvas", "Tailwind CSS"],
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: "kinetic-flow",
      title: "KINETIC MOMENTUM: Brand Package",
      subtitle: "3D typography fluid simulation & kinetic identity design",
      category: "motion",
      year: "2023",
      image: "/src/assets/images/project_brand_motion_1794157386620.jpg",
      description:
        "A commercial identity system blending molten obsidian textures with fiery chromatic highlights, fluid dynamics, and rhythmic typography for global campaigns.",
      fullStory:
        "Executed for an extreme sports luxury lifestyle brand. Modeled in Blender and rendered with Octane, then composited in After Effects with custom optical lens distorts and directional motion blur.",
      metrics: [
        { label: "Commercial Airing", value: "Global TV & Digital" },
        { label: "Asset Variations", value: "48 Deliverables" },
        { label: "Brand Recall Lift", value: "+34%" },
      ],
      tags: ["Blender 3D", "After Effects", "Fluid Simulation", "Motion Graphics", "Typography"],
      liveUrl: "https://instagram.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: "chronos-pipeline",
      title: "CHRONOS: Generative AI Video Engine",
      subtitle: "Automated neural frame interpolator & timeline assistant",
      category: "ai",
      year: "2024",
      image: "/src/assets/images/project_ai_engine_1794157387270.jpg",
      description:
        "An experimental full-stack video platform that integrates neural models with node-based timelines to auto-detect beat markers and generate smooth frame transitions.",
      fullStory:
        "Designed to solve the bottleneck of manual b-roll synchronization. Chronos parses video transcripts, clusters emotional peaks through audio energy histograms, and suggests optimum cut points at sub-frame accuracy.",
      metrics: [
        { label: "Render Acceleration", value: "4.2x Faster" },
        { label: "Cut Accuracy", value: "98.7%" },
        { label: "Processed Hours", value: "2,400+ Hrs" },
      ],
      tags: ["Python", "Node.js", "FFmpeg", "Next.js", "Gemini API", "Tailwind"],
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: false,
    },
  ] as Project[],

  skills: [
    {
      category: "Video Editing & Motion",
      description: "Mastery of visual pacing, cinematic rhythm, multi-track audio choreography, and color science.",
      skills: [
        { name: "DaVinci Resolve & Color Grading", level: 96, highlight: "Color Wheels, ACES, HDR" },
        { name: "Adobe Premiere Pro", level: 94, highlight: "High-volume narrative pacing" },
        { name: "After Effects & Motion Design", level: 92, highlight: "VFX, Tracking, Kinetic Type" },
        { name: "Sound Design & Audio Mastering", level: 88, highlight: "Sub-bass hits, Foley, Ducking" },
        { name: "3D Motion & Camera Tracking", level: 82, highlight: "Blender, Syntheyes, Parallax" },
      ],
    },
    {
      category: "Full Stack Engineering",
      description: "Building production web applications with bulletproof state architecture and fast runtime execution.",
      skills: [
        { name: "TypeScript & Modern JavaScript", level: 95, highlight: "Strict typing, functional patterns" },
        { name: "React & Next.js", level: 92, highlight: "App router, SSR, reactive state" },
        { name: "Tailwind CSS & Design Systems", level: 96, highlight: "Component design, responsive UI" },
        { name: "Node.js & Express / REST APIs", level: 88, highlight: "Microservices, streams, auth" },
        { name: "HTML5 Canvas & WebGL", level: 85, highlight: "60fps particle engines, frame scrubbing" },
      ],
    },
    {
      category: "Creative Tech & Pipelines",
      description: "Custom automations, video transcoding, and performance profiling to eliminate creative bottlenecks.",
      skills: [
        { name: "FFmpeg Transcoding Automations", level: 90, highlight: "Batch encoding, ProRes/H.265" },
        { name: "Git, CI/CD & Cloud Deployment", level: 88, highlight: "GitHub Actions, Docker, Cloud Run" },
        { name: "Generative AI & Gemini API", level: 86, highlight: "Multimodal pipelines, prompt engineering" },
        { name: "Audio Synthesis & Web Audio API", level: 84, highlight: "Oscillators, filters, audio nodes" },
      ],
    },
  ] as SkillCategory[],

  experience: [
    {
      period: "2024 — PRESENT",
      role: "Lead Creative Technologist & Video Producer",
      company: "Studio Pulse Media",
      location: "San Francisco, CA (Hybrid)",
      description:
        "Spearheading cross-discipline video campaigns and building custom web applications for client review portals and automated media delivery.",
      deliverables: [
        "Directed and edited 40+ high-retention commercial reels surpassing 45M collective views.",
        "Engineered an in-house browser review tool using React and Web Audio API that reduced client revision turnaround by 35%.",
        "Created real-time automated rendering scripts leveraging FFmpeg and Node.js for rapid aspect-ratio re-formatting.",
      ],
      tools: ["DaVinci Resolve", "TypeScript", "React", "After Effects", "FFmpeg"],
    },
    {
      period: "2022 — 2024",
      role: "Full Stack Developer & Motion Designer",
      company: "Apex Media Group",
      location: "Remote",
      description:
        "Developed bespoke client web experiences while delivering dynamic motion graphics for brand launches and venture-backed startups.",
      deliverables: [
        "Architected responsive Next.js web applications with smooth scrollytelling and micro-interactions.",
        "Produced 3D kinetic typography packages and visual asset libraries for top-tier SaaS product launches.",
        "Maintained 99.9% uptime across production sites and maintained 60 FPS scroll performance.",
      ],
      tools: ["Next.js", "Tailwind CSS", "Blender", "Node.js", "Motion"],
    },
    {
      period: "2021 — 2022",
      role: "Freelance Visual Storyteller & Web Engineer",
      company: "Independent Practice",
      location: "Global Remote",
      description:
        "Partnered directly with content creators, independent directors, and early-stage founders to craft memorable digital narratives.",
      deliverables: [
        "Edited YouTube long-form documentaries and viral TikTok/Reels edits resulting in 500k+ organic subscriber growth.",
        "Built responsive portfolio and marketing sites for independent creatives and agencies.",
      ],
      tools: ["Premiere Pro", "JavaScript", "HTML5 Canvas", "Photoshop"],
    },
  ] as ExperienceItem[],

  philosophy: {
    quote: "Every frame is an emotional contract; every millisecond of code is a commitment to the user's attention.",
    tenets: [
      {
        number: "01",
        title: "Pacing is Everything",
        body: "Whether it's the heartbeat rhythm of an edit or the interaction latency of a web button, human retention hinges on intentional timing.",
      },
      {
        number: "02",
        title: "Dual-Discipline Synergy",
        body: "Being an editor makes me a more empathetic developer. Being a developer gives me algorithmic precision over timeline workflows.",
      },
      {
        number: "03",
        title: "Tactile Sensory Polish",
        body: "Haptic visual feedback, responsive micro-animations, and nuanced sound cues transform a generic webpage into an unforgettable sensory journey.",
      },
      {
        number: "04",
        title: "Ruthless Elimination of Fluff",
        body: "Cut the unneeded second in the edit; delete the redundant bundle in the code. What remains must carry maximum impact.",
      },
    ],
    stats: [
      { value: "45M+", label: "Audience Views Generated" },
      { value: "180+", label: "Cinematic Sequence Frames" },
      { value: "60 FPS", label: "Smoothed Hardware Render" },
      { value: "99.8%", label: "Client Satisfaction Score" },
    ],
  },
};
