import React from 'react';
import { Terminal, Play } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRunDefaultExample: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onRunDefaultExample,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
      {/* Zone 1: Brand Wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Terminal className="w-4 h-4" />
        </div>
        <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
          Algoritma 67 <span className="text-slate-400 font-normal">· Enes Öztürk</span>
        </span>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => setActiveTab('console')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'console' ? 'text-cyan-400' : ''
          }`}
        >
          Console Terminal
        </button>
        <button
          onClick={() => setActiveTab('breakdown')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'breakdown' ? 'text-cyan-400' : ''
          }`}
        >
          Adım Adım Analiz
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'code' ? 'text-cyan-400' : ''
          }`}
        >
          Kaynak Kodları
        </button>
        <button
          onClick={() => setActiveTab('copyright')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'copyright' ? 'text-cyan-400' : ''
          }`}
        >
          İmza & Telif Hakkı
        </button>
      </nav>

      {/* Zone 3: 1 Primary Action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onRunDefaultExample}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-cyan-500/20 active:scale-95"
          title="56 45 68 77 örneğini çalıştır"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Örneği Çalıştır (33 101)</span>
        </button>
      </div>
    </header>
  );
};
