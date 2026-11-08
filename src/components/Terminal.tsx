import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, Copy, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio.ts';
import { soundFX } from '../utils/audio.ts';

interface CommandOutput {
  command: string;
  output: string | React.ReactNode;
  timestamp: string;
}

export const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<CommandOutput[]>([]);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize terminal welcome
  useEffect(() => {
    setLogs([
      {
        command: 'welcome',
        timestamp: '10:42:01',
        output: (
          <div className="space-y-1.5 text-neutral-300">
            <p className="text-[#FF5500] font-semibold">
              Akilesh Zsh Interactive Shell v2.4 (x86_64-darwin)
            </p>
            <p className="text-neutral-400">
              Type a command or click a quick shortcut below to inspect portfolio internals.
            </p>
            <p className="text-xs text-neutral-500 font-mono">
              Available commands: <span className="text-[#FFA066]">whoami</span>, <span className="text-[#FFA066]">skills</span>, <span className="text-[#FFA066]">projects</span>, <span className="text-[#FFA066]">experience</span>, <span className="text-[#FFA066]">philosophy</span>, <span className="text-[#FFA066]">contact</span>, <span className="text-[#FFA066]">clear</span>
            </p>
          </div>
        ),
      },
    ]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    soundFX.playTerminalCommand();
    setHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    let result: React.ReactNode;

    switch (cmd) {
      case 'clear':
        setLogs([]);
        setInput('');
        return;

      case 'help':
        result = (
          <div className="space-y-1 text-xs">
            <p className="text-neutral-300 font-bold mb-1">AVAILABLE COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-neutral-400">
              <div><span className="text-[#FF5500] font-mono">whoami</span> — Identity, title & location</div>
              <div><span className="text-[#FF5500] font-mono">skills</span> — Technical proficiency breakdown</div>
              <div><span className="text-[#FF5500] font-mono">projects</span> — List production works & metrics</div>
              <div><span className="text-[#FF5500] font-mono">experience</span> — Career timeline & studios</div>
              <div><span className="text-[#FF5500] font-mono">philosophy</span> — Creative editing & coding tenets</div>
              <div><span className="text-[#FF5500] font-mono">contact</span> — Email and social coordinates</div>
              <div><span className="text-[#FF5500] font-mono">neofetch</span> — Display system & stack specs</div>
              <div><span className="text-[#FF5500] font-mono">clear</span> — Purge terminal history</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        result = (
          <div className="space-y-2 text-xs">
            <p className="text-white font-bold text-sm">{PORTFOLIO_DATA.name}</p>
            <p className="text-[#FFA066]">{PORTFOLIO_DATA.title}</p>
            <p className="text-neutral-400">Location: {PORTFOLIO_DATA.location}</p>
            <p className="text-neutral-400">Status: {PORTFOLIO_DATA.availability}</p>
            <p className="text-neutral-300 mt-2 leading-relaxed">
              &quot;Translating human attention dynamics into high-retention cinematic edits and high-performance digital engines.&quot;
            </p>
          </div>
        );
        break;

      case 'skills':
        result = (
          <div className="space-y-3 text-xs">
            {PORTFOLIO_DATA.skills.map((c) => (
              <div key={c.category} className="space-y-1">
                <p className="text-[#FFA066] font-semibold">{c.category}:</p>
                <div className="flex flex-wrap gap-x-3 text-neutral-300">
                  {c.skills.map((s) => (
                    <span key={s.name}>
                      {s.name} <span className="text-[#FF5500]">[{s.level}%]</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        result = (
          <div className="space-y-2 text-xs">
            <p className="text-white font-semibold">SELECTED PRODUCTIONS:</p>
            {PORTFOLIO_DATA.projects.map((p, i) => (
              <div key={p.id} className="border-b border-white/[0.06] pb-1.5 last:border-0">
                <div className="flex justify-between items-center text-neutral-200">
                  <span className="font-bold text-[#FFA066]">0{i + 1}. {p.title}</span>
                  <span className="text-neutral-500 tabular-nums">{p.year}</span>
                </div>
                <p className="text-neutral-400 mt-0.5">{p.subtitle}</p>
                <p className="text-[#FF5500] font-mono text-[11px] mt-0.5">
                  Reach: {p.metrics[0]?.value} · {p.tags.join(' / ')}
                </p>
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
        result = (
          <div className="space-y-3 text-xs">
            {PORTFOLIO_DATA.experience.map((exp) => (
              <div key={exp.period} className="space-y-1">
                <div className="flex justify-between text-neutral-200 font-bold">
                  <span>{exp.role} @ {exp.company}</span>
                  <span className="text-[#FF5500] font-mono">{exp.period}</span>
                </div>
                <p className="text-neutral-400">{exp.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'philosophy':
        result = (
          <div className="space-y-2 text-xs">
            <p className="text-white italic">&quot;{PORTFOLIO_DATA.philosophy.quote}&quot;</p>
            <div className="space-y-1.5 mt-2">
              {PORTFOLIO_DATA.philosophy.tenets.map((t) => (
                <div key={t.number} className="text-neutral-300">
                  <span className="text-[#FF5500] font-bold">{t.number}. {t.title}:</span>{' '}
                  <span className="text-neutral-400">{t.body}</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'contact':
        result = (
          <div className="space-y-2 text-xs">
            <p className="text-neutral-300">
              Email:{' '}
              <a href={`mailto:${PORTFOLIO_DATA.email}`} className="text-[#FF5500] underline">
                {PORTFOLIO_DATA.email}
              </a>
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-neutral-400">
              {PORTFOLIO_DATA.socials.map((s) => (
                <span key={s.name}>
                  {s.name}: <a href={s.url} target="_blank" rel="noreferrer" className="text-neutral-200 hover:text-[#FFA066]">{s.handle}</a>
                </span>
              ))}
            </div>
          </div>
        );
        break;

      case 'neofetch':
        result = (
          <div className="flex flex-col sm:flex-row gap-4 font-mono text-xs">
            <div className="text-[#FF5500] leading-none whitespace-pre select-none font-bold">
{`   ____ _  ___ _     
  / _  | |/ / | |    
 / /_| | ' /| | |___ 
/_/  |_|_|\\_\\_\\_____/`}
            </div>
            <div className="space-y-1 text-neutral-300">
              <p><span className="text-[#FFA066]">akilesh</span>@<span className="text-neutral-200">devstation</span></p>
              <p className="text-neutral-600">----------------------</p>
              <p><span className="text-neutral-500">OS:</span> macOS / Arch Linux</p>
              <p><span className="text-neutral-500">Host:</span> Custom Cinema Rig & M3 Max</p>
              <p><span className="text-neutral-500">NLE:</span> DaVinci Resolve Studio 19 / Premiere</p>
              <p><span className="text-neutral-500">Stack:</span> TypeScript · React · Next.js · Node</p>
              <p><span className="text-neutral-500">GPU:</span> Dual RTX 4090 (8K RED RAW Realtime)</p>
              <p><span className="text-neutral-500">Uptime:</span> 3,420 hrs (Creative Flow)</p>
            </div>
          </div>
        );
        break;

      default:
        result = (
          <div className="text-xs text-rose-400">
            command not found: {rawCmd}. Type <span className="text-[#FFA066] font-bold">help</span> for available commands.
          </div>
        );
    }

    setLogs((prev) => [
      ...prev,
      {
        command: rawCmd,
        timestamp: timeStr,
        output: result,
      },
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    soundFX.playTerminalKey();

    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex + 1 < history.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInput(history[history.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(history[history.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const copyTerminalText = () => {
    const text = logs.map((l) => `$ ${l.command}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickCommands = ['whoami', 'skills', 'projects', 'experience', 'philosophy', 'contact', 'neofetch', 'clear'];

  return (
    <section id="terminal" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-12 border-b border-white/[0.08]">
        <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#FF5500] block mb-2">
          Interactive CLI Environment
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Developer Terminal
        </h2>
        <p className="text-neutral-400 font-body text-base max-w-2xl mt-3">
          Direct terminal interface to query system specs, production case studies, and engineering philosophy.
        </p>
      </div>

      {/* Terminal Shell Box */}
      <div className="mt-12 rounded-2xl bg-[#0B0B10] border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col">
        {/* Title Bar */}
        <div className="px-5 py-3.5 bg-[#12121A] border-b border-white/[0.08] flex items-center justify-between select-none">
          {/* Mac window dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80 block" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 block" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]/80 block" />
            <span className="text-xs font-mono text-neutral-400 ml-3 hidden sm:inline">
              akilesh@devstation: ~ (zsh)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyTerminalText}
              title="Copy session output"
              className="p-1 rounded text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <span className="text-[11px] font-mono text-neutral-500">UTF-8</span>
          </div>
        </div>

        {/* Quick Command Suggestions */}
        <div className="px-5 py-2.5 bg-[#0E0E14] border-b border-white/[0.04] flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <span className="text-neutral-500 shrink-0">Quick run:</span>
          {quickCommands.map((qc) => (
            <button
              key={qc}
              onClick={() => handleCommand(qc)}
              onMouseEnter={() => soundFX.playHover()}
              className="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-[#FF5500]/20 text-neutral-300 hover:text-[#FFA066] border border-white/[0.06] hover:border-[#FF5500]/40 transition-colors whitespace-nowrap cursor-pointer"
            >
              {qc}
            </button>
          ))}
        </div>

        {/* Console Log Area */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="p-5 sm:p-6 font-mono text-xs sm:text-sm min-h-[340px] max-h-[500px] overflow-y-auto space-y-4"
        >
          {logs.map((item, idx) => (
            <div key={idx} className="space-y-1.5 animate-fadeIn">
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="text-[#FF5500] font-bold">akilesh@devstation:~$</span>
                <span className="text-white font-medium">{item.command}</span>
                <span className="text-neutral-600 text-[10px] ml-auto">{item.timestamp}</span>
              </div>
              <div className="pl-4 sm:pl-6 text-neutral-300">
                {item.output}
              </div>
            </div>
          ))}

          {/* Prompt line */}
          <div className="flex items-center gap-2 text-neutral-400 pt-2">
            <span className="text-[#FF5500] font-bold">akilesh@devstation:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help'..."
              className="flex-1 bg-transparent border-0 outline-none text-white font-mono text-xs sm:text-sm placeholder:text-neutral-600"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              onClick={() => handleCommand(input)}
              className="p-1 text-neutral-500 hover:text-[#FF5500] transition-colors"
              title="Submit command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </section>
  );
};
