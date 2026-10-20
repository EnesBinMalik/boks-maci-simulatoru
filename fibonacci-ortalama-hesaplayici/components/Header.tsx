/**
 * @file Header.tsx
 * @description Top Bar Contract (3 zones separated by gap-8):
 * Zone 1: Single text wordmark
 * Zone 2: Concise single-line navigation links
 * Zone 3: 1 primary action
 */

import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenArchitecture: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenArchitecture
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); setActiveTab('calculator'); }}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2.5 group"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-mono font-extrabold text-sm shadow-md shadow-amber-500/10 group-hover:scale-105 transition-transform">
            φ
          </span>
          <span className="font-semibold tracking-tight">
            Fibonacci<span className="text-amber-400">Studio</span>
          </span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'calculator' ? 'text-amber-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Hesaplama
          </button>
          <button
            onClick={() => setActiveTab('steps')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'steps' ? 'text-amber-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Adım Adım
          </button>
          <button
            onClick={() => setActiveTab('spiral')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'spiral' ? 'text-amber-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Altın Spiral
          </button>
          <button
            onClick={() => setActiveTab('digits')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'digits' ? 'text-amber-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Rakam Analizi
          </button>
          <button
            onClick={onOpenArchitecture}
            className="text-slate-300 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Mimari & SRP</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenArchitecture}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-lg shadow-sm shadow-amber-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enes Öztürk İmzası</span>
          </button>
        </div>
      </div>
    </header>
  );
};
