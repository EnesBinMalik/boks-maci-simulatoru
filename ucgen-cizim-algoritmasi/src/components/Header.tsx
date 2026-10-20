/**
 * @license
 * Telif Hakkı © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 */

import React from 'react';
import { Terminal, ShieldCheck, Code2, BookOpen } from 'lucide-react';
import { AUTHOR_SIGNATURE } from '../core/types';

interface HeaderProps {
  activeTab: 'console' | 'code' | 'architecture' | 'tests';
  setActiveTab: (tab: 'console' | 'code' | 'architecture' | 'tests') => void;
  onOpenCopyright: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenCopyright }) => {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single element) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-neutral-100 whitespace-nowrap block">
              Üçgen Çizim Algoritması
            </span>
            <span className="text-xs text-neutral-400 whitespace-nowrap block">
              Geliştirici: {AUTHOR_SIGNATURE.author}
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links / Segmented Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-900/90 p-1 rounded-lg border border-neutral-800">
          <button
            onClick={() => setActiveTab('console')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'console'
                ? 'bg-neutral-800 text-emerald-400 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Konsol & Çizim</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'code'
                ? 'bg-neutral-800 text-emerald-400 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Kaynak Kodları (C# / Java / TS)</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'architecture'
                ? 'bg-neutral-800 text-emerald-400 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>SRP & DRY Analizi</span>
          </button>

          <button
            onClick={() => setActiveTab('tests')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'tests'
                ? 'bg-neutral-800 text-emerald-400 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Birim Testler</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action - Enes Öztürk Telif Hakları & Sertifika */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCopyright}
            className="px-3.5 py-2 text-xs font-medium text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5"
            title="Telif Hakları ve Lisans Belgesi"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Telif Hakları: Enes Öztürk</span>
          </button>
        </div>
      </div>
    </header>
  );
};
