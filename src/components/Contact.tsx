import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio.ts';
import { Mail, Copy, Check, Send, ArrowUpRight, Github, Linkedin, Instagram, Youtube, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/audio.ts';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'commercial-video',
    budget: '$5k - $15k',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.email);
    soundFX.playClick();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();
    setIsSubmitting(true);

    // Simulated robust submission response
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-12 border-b border-white/[0.08]">
        <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#FF5500] block mb-2">
          Start a Conversation
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let&apos;s Build & Create
        </h2>
        <p className="text-neutral-400 font-body text-base max-w-2xl mt-3">
          Available for bespoke commercial video editing, narrative post-production, and high-performance full-stack web builds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
        {/* Left: Contact Info & Direct Links */}
        <div className="lg:col-span-5 space-y-8">
          {/* Quick Email Card */}
          <div className="p-7 rounded-2xl bg-[#0E0E14] border border-white/[0.08] space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
              Direct Inquiries
            </span>

            <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#14141E] border border-white/[0.06]">
              <a
                href={`mailto:${PORTFOLIO_DATA.email}`}
                className="font-mono text-sm sm:text-base text-white hover:text-[#FFA066] transition-colors truncate"
              >
                {PORTFOLIO_DATA.email}
              </a>

              <button
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer shrink-0"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-2">
              <span>LOCATION: {PORTFOLIO_DATA.location}</span>
              <span className="text-emerald-400 font-semibold">● ACTIVE</span>
            </div>
          </div>

          {/* Social Links List */}
          <div className="p-7 rounded-2xl bg-[#0E0E14] border border-white/[0.08] space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
              Social Coordinates
            </span>

            <div className="space-y-2">
              {PORTFOLIO_DATA.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => soundFX.playHover()}
                  onClick={() => soundFX.playClick()}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#14141E] border border-white/[0.04] hover:border-[#FF5500]/40 text-neutral-300 hover:text-white transition-all group"
                >
                  <span className="font-display font-medium text-sm">{social.name}</span>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 group-hover:text-[#FFA066]">
                    <span>{social.handle}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Interactive Project Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="p-7 sm:p-10 rounded-2xl bg-[#0E0E14] border border-white/[0.08]">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-[#FF5500]/20 border border-[#FF5500] text-[#FF5500] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                  Transmission Received
                </h3>
                <p className="text-neutral-400 font-body text-sm max-w-md mx-auto">
                  Thank you for reaching out. I review all inquiries personally and will respond within 24 business hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-5 py-2 text-xs font-mono text-neutral-400 hover:text-white underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-[#14141E] border border-white/[0.08] focus:border-[#FF5500] text-white font-body text-sm outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#14141E] border border-white/[0.08] focus:border-[#FF5500] text-white font-body text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Project Type */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                      Discipline Needed
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#14141E] border border-white/[0.08] focus:border-[#FF5500] text-white font-body text-sm outline-none transition-colors cursor-pointer"
                    >
                      <option value="commercial-video">Commercial Video Editing</option>
                      <option value="narrative-color">Narrative Film & Color Grading</option>
                      <option value="motion-3d">3D Motion & Title Sequences</option>
                      <option value="full-stack-web">Full-Stack Web Development</option>
                      <option value="consulting">Creative Tech & Tooling</option>
                    </select>
                  </div>

                  {/* Budget Range */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                      Estimated Scope
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#14141E] border border-white/[0.08] focus:border-[#FF5500] text-white font-body text-sm outline-none transition-colors cursor-pointer"
                    >
                      <option value="under-5k">&lt; $5,000 (Short Reel / Module)</option>
                      <option value="5k-15k">$5,000 — $15,000 (Full Production)</option>
                      <option value="15k-plus">$15,000+ (Comprehensive Brand Suite)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Project Vision & Objectives
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your timeline, targets, and creative deliverables..."
                    className="w-full px-4 py-3 rounded-xl bg-[#14141E] border border-white/[0.08] focus:border-[#FF5500] text-white font-body text-sm outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-[#FF5500] hover:bg-[#FF661A] text-white font-mono text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-[0_0_25px_rgba(255,85,0,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>DISPATCHING INQUIRY...</span>
                  ) : (
                    <>
                      <span>TRANSMIT INQUIRY</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
