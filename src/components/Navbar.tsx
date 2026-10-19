import React from 'react';
import { Volume2, VolumeX, Swords } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  activeTab: 'ring' | 'code' | 'montecarlo' | 'author';
  setActiveTab: (tab: 'ring' | 'code' | 'montecarlo' | 'author') => void;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  onQuickStart: () => void;
  isMatchRunning: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isMuted,
  setIsMuted,
  onQuickStart,
  isMatchRunning,
}) => {
  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.isMuted = nextMuted;
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line, no decorative tags) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Swords className="w-5 h-5" />
          </div>
          <button
            onClick={() => setActiveTab('ring')}
            className="text-left group cursor-pointer"
          >
            <span className="text-base font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors whitespace-nowrap">
              Boks Maçı Simülatörü
            </span>
          </button>
        </div>

        {/* Zone 2: 4 clean single-line nav tabs */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('ring')}
            className={`whitespace-nowrap transition-colors pb-0.5 ${
              activeTab === 'ring'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ring & Simülasyon
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`whitespace-nowrap transition-colors pb-0.5 ${
              activeTab === 'code'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Java Kaynak Kodları
          </button>
          <button
            onClick={() => setActiveTab('montecarlo')}
            className={`whitespace-nowrap transition-colors pb-0.5 ${
              activeTab === 'montecarlo'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            %50 Olasılık Testi
          </button>
          <button
            onClick={() => setActiveTab('author')}
            className={`whitespace-nowrap transition-colors pb-0.5 ${
              activeTab === 'author'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ödev & İmza
          </button>
        </nav>

        {/* Zone 3: 1 primary action & utility */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleSound}
            title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Ses Kontrolü"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-amber-400" />}
          </button>

          <button
            onClick={onQuickStart}
            disabled={isMatchRunning}
            className="px-4 py-2 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer active:scale-95"
          >
            {isMatchRunning ? 'Maç Sürüyor...' : 'Maçı Başlat'}
          </button>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="md:hidden flex items-center justify-around px-3 py-2 bg-slate-900 border-t border-slate-800 text-xs font-medium">
        <button
          onClick={() => setActiveTab('ring')}
          className={`py-1 px-2 whitespace-nowrap ${activeTab === 'ring' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          Ring
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`py-1 px-2 whitespace-nowrap ${activeTab === 'code' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          Java Kodu
        </button>
        <button
          onClick={() => setActiveTab('montecarlo')}
          className={`py-1 px-2 whitespace-nowrap ${activeTab === 'montecarlo' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          %50 Analiz
        </button>
        <button
          onClick={() => setActiveTab('author')}
          className={`py-1 px-2 whitespace-nowrap ${activeTab === 'author' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          İmza
        </button>
      </div>
    </header>
  );
};
