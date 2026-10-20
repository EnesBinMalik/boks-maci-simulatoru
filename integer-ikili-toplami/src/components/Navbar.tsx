/**
 * @license
 * Enes Öztürk Özel Algoritma Platformu
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 */

import React from 'react';
import { Award, CheckCircle, Code2, Cpu, HelpCircle, Shield, Volume2, VolumeX } from 'lucide-react';
import { MathMode } from '../types';
import { sounds } from '../utils/audio';

interface Props {
  mode: MathMode;
  onModeChange: (mode: MathMode) => void;
  onOpenCertificate: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  activeTab: 'console' | 'visualizer' | 'code';
  onTabChange: (tab: 'console' | 'visualizer' | 'code') => void;
}

export const Navbar: React.FC<Props> = ({
  mode,
  onModeChange,
  onOpenCertificate,
  isMuted,
  onToggleMute,
  activeTab,
  onTabChange,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Sol: Logo ve Geliştirici İmzası */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-emerald-400 p-[1.5px] shadow-lg shadow-amber-500/10">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                  Integer İkililerin Toplamı
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle className="w-3 h-3" /> Doğrulanmış
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Geliştirici & Eser Sahibi:</span>
                <span className="font-semibold text-amber-300 hover:text-amber-200 transition">
                  Enes Öztürk
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-[11px] text-slate-400">© 2026 Telif Hakkı Korumalı</span>
              </div>
            </div>
          </div>

          {/* Orta / Navigasyon Sekmeleri */}
          <nav className="hidden md:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-inner">
            <button
              onClick={() => {
                sounds.playKeyClick();
                onTabChange('console');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'console'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Konsol Terminali
            </button>
            <button
              onClick={() => {
                sounds.playKeyClick();
                onTabChange('visualizer');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'visualizer'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Adım Adım Simülasyon
            </button>
            <button
              onClick={() => {
                sounds.playKeyClick();
                onTabChange('code');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'code'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Kaynak Kodları (C#, Py, TS)
            </button>
          </nav>

          {/* Sağ Aksiyonlar: Telif Mührü, Mod Değiştirici ve Ses Butonu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Telif Hakkı Sertifikası Butonu */}
            <button
              onClick={() => {
                sounds.playKeyClick();
                onOpenCertificate();
              }}
              className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border border-amber-500/30 text-amber-300 hover:text-amber-200 hover:border-amber-400 transition shadow-sm"
              title="Enes Öztürk Telif ve Lisans Belgesini Görüntüle"
            >
              <Award className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-semibold hidden sm:inline">Telif Sertifikası</span>
              <Shield className="w-3 h-3 text-emerald-400 ml-0.5" />
            </button>

            {/* Mod Seçimi (Açıklamalı) */}
            <div className="relative hidden lg:flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
              <button
                onClick={() => {
                  sounds.playKeyClick();
                  onModeChange('sample_match_81');
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  mode === 'sample_match_81'
                    ? 'bg-emerald-600/90 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Sayılar eşit olduğunda (a × b)² = 81 hesaplar (Soru metnindeki örnek çıktıya tam uyar)"
              >
                Örnek Modu (81)
              </button>
              <button
                onClick={() => {
                  sounds.playKeyClick();
                  onModeChange('strict_sum_square_36');
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  mode === 'strict_sum_square_36'
                    ? 'bg-indigo-600/90 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Sayılar eşit olduğunda (a + b)² = 36 hesaplar (Sözel metnin tam matematik karşılığı)"
              >
                Matematiksel Mod (36)
              </button>
            </div>

            {/* Ses Aç/Kapat */}
            <button
              onClick={() => {
                onToggleMute();
                sounds.playKeyClick();
              }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
              aria-label={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>

        </div>

        {/* Mobil Sekme Çubuğu */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800/80 text-xs">
          <button
            onClick={() => onTabChange('console')}
            className={`py-1 px-3 rounded-lg font-medium ${
              activeTab === 'console' ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-slate-400'
            }`}
          >
            Konsol
          </button>
          <button
            onClick={() => onTabChange('visualizer')}
            className={`py-1 px-3 rounded-lg font-medium ${
              activeTab === 'visualizer' ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-slate-400'
            }`}
          >
            Simülasyon
          </button>
          <button
            onClick={() => onTabChange('code')}
            className={`py-1 px-3 rounded-lg font-medium ${
              activeTab === 'code' ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-slate-400'
            }`}
          >
            Kodlar
          </button>
        </div>
      </div>
    </header>
  );
};
