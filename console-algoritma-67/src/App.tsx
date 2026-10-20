/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { TerminalConsole } from './components/TerminalConsole';
import { CalculationBreakdown } from './components/CalculationBreakdown';
import { CodeViewer } from './components/CodeViewer';
import { SignatureCopyrightCard } from './components/SignatureCopyrightCard';
import { PresetsBar } from './components/PresetsBar';
import { execute67Algorithm } from './utils/algorithm';
import { AlgorithmResult, PresetExample } from './types/algorithm';
import { Terminal, Calculator, Code2, Shield, ArrowRight, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('console');
  const [currentResult, setCurrentResult] = useState<AlgorithmResult>(() =>
    execute67Algorithm('56 45 68 77')
  );
  const [quickInput, setQuickInput] = useState<string>('56 45 68 77');
  const [externalTrigger, setExternalTrigger] = useState<string | null>(null);

  const handleRunQuickInput = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!quickInput.trim()) return;
    setExternalTrigger(quickInput);
    const res = execute67Algorithm(quickInput);
    setCurrentResult(res);
  };

  const handleSelectPreset = (preset: PresetExample) => {
    setQuickInput(preset.input);
    setExternalTrigger(preset.input);
    const res = execute67Algorithm(preset.input);
    setCurrentResult(res);
  };

  const handleRunDefaultExample = () => {
    setQuickInput('56 45 68 77');
    setExternalTrigger('56 45 68 77');
    const res = execute67Algorithm('56 45 68 77');
    setCurrentResult(res);
    setActiveTab('console');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRunDefaultExample={handleRunDefaultExample}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>Algoritma & Konsol Uygulaması</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              67 Eşik Değerli Fark &amp; Mutlak Kare Toplamı
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Ekrandan girilen <span className="text-cyan-400 font-semibold font-mono">n</span> adet sayının 67'den küçük ya da büyük olduğuna bakar:
              küçük olanların farklarının toplamını (<span className="text-amber-400 font-mono">67 - x</span>), büyük olanların ise farklarının mutlak karelerini (<span className="text-indigo-400 font-mono">(x - 67)²</span>) toplayıp ekrana yazdırır.
            </p>

            {/* Quick Live Calculator Bar */}
            <form onSubmit={handleRunQuickInput} className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={quickInput}
                  onChange={(e) => setQuickInput(e.target.value)}
                  placeholder="Sayıları giriniz (örn: 56 45 68 77)"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-sm font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm rounded-xl transition-all shadow-md shadow-cyan-500/10 flex items-center justify-center gap-2 shrink-0 active:scale-95"
              >
                <span>Hesapla &amp; Konsola Gönder</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Live Output Badge */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
              <span>Mevcut Çıktı:</span>
              <span className="font-mono text-base font-bold text-cyan-400 bg-slate-950 px-3 py-1 rounded-lg border border-cyan-500/30">
                {currentResult.output}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-amber-400 font-mono">İmza: Enes Öztürk</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400 font-mono">Telif Hakkı: © 2026</span>
            </div>
          </div>
        </div>

        {/* Test Scenarios / Presets */}
        <PresetsBar
          onSelectPreset={handleSelectPreset}
          currentInput={quickInput}
        />

        {/* Workspace Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl max-w-xl">
          <button
            onClick={() => setActiveTab('console')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'console'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>İnteraktif Konsol</span>
          </button>

          <button
            onClick={() => setActiveTab('breakdown')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'breakdown'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Adım Adım Analiz</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'code'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Kaynak Kodları</span>
          </button>

          <button
            onClick={() => setActiveTab('copyright')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'copyright'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Telif &amp; İmza</span>
          </button>
        </div>

        {/* Tab Viewport */}
        {activeTab === 'console' && (
          <div className="space-y-4">
            <TerminalConsole
              onResultCalculated={(res) => setCurrentResult(res)}
              externalInputTrigger={externalTrigger}
            />
          </div>
        )}

        {activeTab === 'breakdown' && (
          <CalculationBreakdown result={currentResult} />
        )}

        {activeTab === 'code' && <CodeViewer />}

        {activeTab === 'copyright' && <SignatureCopyrightCard />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400 font-mono">
            <span>67 Eşik Algoritması Console Uygulaması</span>
            <span>·</span>
            <span className="text-amber-400">İmza: Enes Öztürk</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>© 2026 Enes Öztürk. Tüm hakları saklıdır.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
