import React from 'react';
import { Terminal, ShieldCheck, Play } from 'lucide-react';

interface HeaderProps {
  activeTab: 'terminal' | 'visualizer' | 'code' | 'license';
  setActiveTab: (tab: 'terminal' | 'visualizer' | 'code' | 'license') => void;
  onRunDefaultExample: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onRunDefaultExample,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50">
      {/* Zone 1: Single text wordmark */}
      <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Terminal className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-tight text-white leading-none">
            SwapString CLI
          </span>
          <span className="text-[11px] text-cyan-400 font-medium tracking-wide mt-0.5">
            Enes Öztürk
          </span>
        </div>
      </div>

      {/* Zone 2: 4 single-line text navigation links with hover underlines */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => setActiveTab('terminal')}
          className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
            activeTab === 'terminal' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Konsol Terminal
        </button>
        <button
          onClick={() => setActiveTab('visualizer')}
          className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
            activeTab === 'visualizer' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Görsel İnceleme
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
            activeTab === 'code' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Kaynak Kodlar (C#, Py, Java)
        </button>
        <button
          onClick={() => setActiveTab('license')}
          className={`transition-colors whitespace-nowrap shrink-0 hover:text-white flex items-center gap-1.5 ${
            activeTab === 'license' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Telif & Lisans
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onRunDefaultExample}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-cyan-500/20 active:scale-95"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Örneği Çalıştır
        </button>
      </div>
    </header>
  );
};
