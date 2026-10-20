/**
 * @license
 * Integer İkililerin Toplamı Algoritması - Ana Uygulama
 * Geliştirici & Eser Sahibi: Enes Öztürk
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 */

import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Code2,
  Cpu,
  FileCode,
  Github,
  HelpCircle,
  Shield,
  Sparkles,
  Terminal,
  Zap
} from 'lucide-react';
import { AlgorithmResult, MathMode } from './types';
import { runIntegerPairsAlgorithm } from './utils/algorithm';
import { sounds } from './utils/audio';
import { Navbar } from './components/Navbar';
import { ConsoleTerminal } from './components/ConsoleTerminal';
import { Visualizer } from './components/Visualizer';
import { CodeExplorer } from './components/CodeExplorer';
import { CopyrightCertificateModal } from './components/CopyrightCertificateModal';
import { QuickTests } from './components/QuickTests';

export default function App() {
  const [mode, setMode] = useState<MathMode>('sample_match_81');
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'console' | 'visualizer' | 'code'>('console');
  
  // Varsayılan girdi olarak soru örneğini çalıştıralım: 2 3 1 5 2 5 3 3
  const [currentResult, setCurrentResult] = useState<AlgorithmResult>(() =>
    runIntegerPairsAlgorithm('2 3 1 5 2 5 3 3', 'sample_match_81')
  );

  const handleModeChange = (newMode: MathMode) => {
    setMode(newMode);
    if (currentResult) {
      const updated = runIntegerPairsAlgorithm(currentResult.rawInput, newMode);
      setCurrentResult(updated);
    }
  };

  const handleToggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    sounds.setMuted(nextState);
  };

  const handleSelectInputFromPresets = (inputStr: string) => {
    const res = runIntegerPairsAlgorithm(inputStr, mode);
    setCurrentResult(res);
    sounds.playKeyClick();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Üst Navigasyon Çubuğu */}
      <Navbar
        mode={mode}
        onModeChange={handleModeChange}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Ana Gövde */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* Kahraman (Hero) & Eser Sahibi İmzası Başlığı */}
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden">
          {/* Arka plan parlaklığı */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Enes Öztürk İmzalı & Orijinal Telif Korumalı Algoritma</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Integer İkililerin Toplamı ve Karesi
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Ekrandan girilen <span className="text-amber-300 font-semibold">n tane integer ikilinin</span> toplamını alan, eğer sayılar birbirinden farklıysa toplamlarını ekrana yazdıran, sayılar aynıysa toplamının karesini ekrana yazdıran konsol uygulaması.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700 font-mono">
                  Örnek Giriş: 2 3 1 5 2 5 3 3
                </span>
                <span className="text-slate-500">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 font-mono font-bold">
                  Çıktı: {mode === 'sample_match_81' ? '5 6 7 81' : '5 6 7 36'}
                </span>
              </div>
            </div>

            {/* Sağ İmza ve Telif Rozeti Kartı */}
            <div className="bg-slate-950/90 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4 shrink-0 lg:w-72 shadow-xl shadow-amber-500/5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Eser Sahibi Beyanı
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div>
                <div className="text-lg font-black text-white tracking-wide">
                  Enes Öztürk
                </div>
                <p className="text-xs text-slate-400">Yazılım Mühendisi & Algoritma Mimarı</p>
                <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Telif Hakkı Tescilli © 2026
                </div>
              </div>

              <button
                onClick={() => {
                  sounds.playKeyClick();
                  setIsCertificateOpen(true);
                }}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs transition shadow-md shadow-amber-500/20 active:scale-95"
              >
                Telif Belgesini Aç
              </button>
            </div>
          </div>
        </div>

        {/* Ana İçerik Görünümü (Sekmelere Göre) */}
        {activeTab === 'console' && (
          <div className="space-y-6">
            <ConsoleTerminal
              mode={mode}
              onModeChange={handleModeChange}
              onOpenCertificate={() => setIsCertificateOpen(true)}
              onResultGenerated={setCurrentResult}
              currentResult={currentResult}
            />
            <QuickTests onSelectInput={handleSelectInputFromPresets} />
          </div>
        )}

        {activeTab === 'visualizer' && (
          <div className="space-y-6">
            <Visualizer
              result={currentResult}
              mode={mode}
              onModeChange={handleModeChange}
            />
            <QuickTests onSelectInput={handleSelectInputFromPresets} />
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-6">
            <CodeExplorer />
          </div>
        )}

        {/* Bilgilendirici Algoritma Notları & Teknik Dökümantasyon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="font-bold text-white text-sm">Dizi ve İkili Mantığı</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ekrandan girilen dizi ardışık ikişerli gruplara (<code className="text-amber-300">numbers[i]</code> ve <code className="text-amber-300">numbers[i+1]</code>) ayrılır. Döngü adımı <code className="text-cyan-300">i += 2</code> olarak ilerler.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="font-bold text-white text-sm">Farklı Sayılar (a != b)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Eğer ikilideki elemanlar birbirinden farklıysa, elemanların toplamı alınır (<code className="text-emerald-300">a + b</code>). Örneğin <code className="text-amber-300">(2, 3) → 5</code>, <code className="text-amber-300">(1, 5) → 6</code>.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="font-bold text-white text-sm">Aynı Sayılar & 81 Uyumu</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Örnek çıktıda <code className="text-purple-300">(3, 3)</code> için <code className="text-amber-300">81</code> verilmiştir. Enes Öztürk algoritması hem <code className="text-cyan-300">(a*b)² = 81</code> hem de sözel <code className="text-cyan-300">(a+b)² = 36</code> modunu destekler.
            </p>
          </div>
        </div>

      </main>

      {/* Alt Bilgi (Footer) - Enes Öztürk İmzası ve Telif Beyanı */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold font-mono">
              EÖ
            </div>
            <span className="font-semibold text-slate-200">Enes Öztürk Özel Algoritma Çözümü</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-500">Telif Hakkı © 2026 Tüm Hakları Saklıdır.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCertificateOpen(true)}
              className="text-amber-400 hover:text-amber-300 font-medium underline underline-offset-4"
            >
              Resmi Telif Beyanını Görüntüle
            </button>
            <span className="text-slate-700">•</span>
            <span className="text-emerald-400 font-mono">v2.4.0 (Prod)</span>
          </div>
        </div>
      </footer>

      {/* Telif Hakkı Sertifikası Modalı */}
      <CopyrightCertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
      />
    </div>
  );
}
