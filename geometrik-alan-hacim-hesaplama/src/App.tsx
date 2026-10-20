/**
 * @license
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * Geometrik Alan, Çevre ve Hacim Hesaplama Uygulaması
 */

import React, { useState } from 'react';
import { Header, ActiveTab } from './components/Header';
import { ConsoleSimulator } from './components/ConsoleSimulator';
import { VisualCalculator } from './components/VisualCalculator';
import { CodeViewer } from './components/CodeViewer';
import { ArchitectureGuide } from './components/ArchitectureGuide';
import { AUTHOR_NAME, COPYRIGHT_NOTICE } from './data/shapesConfig';
import { Terminal, Eye, Code, BookOpen, CheckCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('terminal');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Giriş Başlık Alanı */}
        <section className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>C# CONSOLE UYGULAMASI & İNTERAKTİF MOTOR</span>
              <span aria-hidden="true">·</span>
              <span>.NET 8.0</span>
              <span aria-hidden="true">·</span>
              <span>SOLID & DRY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight text-balance">
              Geometrik Alan, Çevre ve Hacim Hesaplama
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
              Daire, Kare, Dikdörtgen, Üçgen, Küp, Silindir ve Küre şekillerinin çevre, alan ve hacimlerini adım adım hesaplayan,
              Single Responsibility kuralına uygun C# console uygulaması ve web laboratuvarı.
            </p>
          </div>

          {/* Telif & Geliştirici Kartı */}
          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-mono font-bold text-base">
              EÖ
            </div>
            <div className="text-xs">
              <span className="text-slate-400 block">Telif Sahibi & Geliştirici</span>
              <span className="font-bold text-slate-100 text-sm">{AUTHOR_NAME}</span>
              <span className="text-[11px] text-cyan-400 block font-mono">Tüm Hakları Saklıdır</span>
            </div>
          </div>
        </section>

        {/* Sekme Değiştirici Buton Şeridi */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
              activeTab === 'terminal'
                ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-950/40'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className={`p-2 rounded-lg ${activeTab === 'terminal' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold block text-slate-200">1. C# Terminali</span>
              <span className="text-[11px] text-slate-400">İnteraktif CLI Deneyimi</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('visual')}
            className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
              activeTab === 'visual'
                ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-950/40'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className={`p-2 rounded-lg ${activeTab === 'visual' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold block text-slate-200">2. Görsel Laboratuvar</span>
              <span className="text-[11px] text-slate-400">2D / 3D Canlı Model & Formül</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
              activeTab === 'code'
                ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-950/40'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className={`p-2 rounded-lg ${activeTab === 'code' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
              <Code className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold block text-slate-200">3. C# Kaynak Kodları</span>
              <span className="text-[11px] text-slate-400">Program.cs & Şekil Sınıfları</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
              activeTab === 'architecture'
                ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-950/40'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className={`p-2 rounded-lg ${activeTab === 'architecture' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold block text-slate-200">4. SRP & DRY Raporu</span>
              <span className="text-[11px] text-slate-400">Tasarım İlkeleri ve Açıklama</span>
            </div>
          </button>
        </section>

        {/* Aktif Sekme İçeriği */}
        <section className="min-h-[500px]">
          {activeTab === 'terminal' && <ConsoleSimulator />}
          {activeTab === 'visual' && <VisualCalculator />}
          {activeTab === 'code' && <CodeViewer />}
          {activeTab === 'architecture' && <ArchitectureGuide />}
        </section>
      </main>

      {/* Sade ve Kurallara Uygun Alt Bilgi (Footer) */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">{COPYRIGHT_NOTICE}</span>
            <span aria-hidden="true">·</span>
            <span>Geliştirici: {AUTHOR_NAME}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Single Responsibility Principle (SRP)</span>
            <span aria-hidden="true">·</span>
            <span>Don&apos;t Repeat Yourself (DRY)</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-cyan-500">C# .NET 8.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
