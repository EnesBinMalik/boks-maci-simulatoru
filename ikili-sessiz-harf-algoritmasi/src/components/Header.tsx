import React from 'react';
import { Terminal, ShieldCheck, Sparkles, Award, Code2 } from 'lucide-react';
import { OutputMode } from '../types/algorithm';

interface HeaderProps {
  outputMode: OutputMode;
  setOutputMode: (mode: OutputMode) => void;
  onOpenCertificate: () => void;
  activeTab: 'console' | 'visual' | 'code';
  setActiveTab: (tab: 'console' | 'visual' | 'code') => void;
}

export const Header: React.FC<HeaderProps> = ({
  outputMode,
  setOutputMode,
  onOpenCertificate,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Author */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-bold">
            <Terminal className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">
                İkili Sessiz Harf Algoritması
              </h1>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> v1.0
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-medium text-slate-300">Geliştirici:</span>
              <button
                onClick={onOpenCertificate}
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2 decoration-emerald-500/40 hover:decoration-emerald-400 transition-colors"
                title="Enes Öztürk Telif Hakları ve Lisans Belgesi"
              >
                <span>Enes Öztürk</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </button>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">© 2026 Tüm Hakları Saklıdır</span>
            </div>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-xl p-1 text-xs">
          <button
            onClick={() => setActiveTab('console')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'console'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal Konsolu</span>
          </button>

          <button
            onClick={() => setActiveTab('visual')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'visual'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Görsel İnceleme</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'code'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Kaynak Kodları (C#, Py, JS)</span>
          </button>
        </div>

        {/* Format Selector & Certificate Trigger */}
        <div className="flex items-center gap-2">
          <div className="flex items-center text-xs bg-slate-800/80 border border-slate-700/60 rounded-lg px-2.5 py-1.5 gap-2">
            <span className="text-slate-400">Çıktı Biçimi:</span>
            <select
              value={outputMode}
              onChange={(e) => setOutputMode(e.target.value as OutputMode)}
              className="bg-transparent text-emerald-400 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="tr-bool" className="bg-slate-900 text-slate-200">Doğru / Yanlış (TR)</option>
              <option value="en-bool" className="bg-slate-900 text-slate-200">true / false (Boolean)</option>
              <option value="pascal-bool" className="bg-slate-900 text-slate-200">True / False (C#)</option>
              <option value="binary" className="bg-slate-900 text-slate-200">1 / 0 (Binary)</option>
            </select>
          </div>

          <button
            onClick={onOpenCertificate}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border border-amber-500/30 hover:border-amber-500/60 text-amber-300 hover:text-amber-200 rounded-lg text-xs font-semibold transition-all shadow-sm"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Telif Belgesi</span>
          </button>
        </div>

      </div>
    </header>
  );
};
