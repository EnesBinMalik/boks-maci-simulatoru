import React, { useState } from 'react';
import {
  Terminal,
  Layers,
  Code2,
  CheckCircle2,
  Sliders,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  RotateCw,
} from 'lucide-react';
import { ConsoleTerminal } from './components/ConsoleTerminal';
import { AlgorithmVisualizer } from './components/AlgorithmVisualizer';
import { CodeViewer } from './components/CodeViewer';
import { TestCasesPanel } from './components/TestCasesPanel';
import { AlgorithmOptions } from './types';
import { transformString } from './utils/algorithm';

export default function App() {
  const [activeTab, setActiveTab] = useState<'console' | 'visualizer' | 'code' | 'tests'>('console');
  const [visualizerWord, setVisualizerWord] = useState<string>('Merhaba');
  const [copiedQuick, setCopiedQuick] = useState<boolean>(false);

  // Quick interactive bar state
  const [quickInput, setQuickInput] = useState<string>('Merhaba Hello Question');

  // Global Algorithm Options
  const [options, setOptions] = useState<AlgorithmOptions>({
    mode: 'word',
    direction: 'left',
    steps: 1,
    preservePunctuation: false,
  });

  const quickOutput = transformString(quickInput, options);

  const handleCopyQuick = () => {
    navigator.clipboard.writeText(quickOutput);
    setCopiedQuick(true);
    setTimeout(() => setCopiedQuick(false), 2000);
  };

  const handleSendToVisualizer = (word: string) => {
    setVisualizerWord(word);
    setActiveTab('visualizer');
  };

  const handleSendToConsole = (text: string) => {
    setQuickInput(text);
    setActiveTab('console');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Application Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-semibold text-zinc-100">
                  Karakter Değiştirme Algoritması
                </h1>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                  C# / .NET CLI &amp; Visualizer
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Verilen string ifadedeki karakterleri bir önceki karakter ile yer değiştirme
              </p>
            </div>
          </div>

          {/* Quick Options Bar */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            {/* Mode switch */}
            <div className="flex items-center bg-zinc-900 p-1 rounded-lg border border-zinc-800">
              <button
                onClick={() => setOptions({ ...options, mode: 'word' })}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  options.mode === 'word'
                    ? 'bg-zinc-800 text-emerald-400 font-medium shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Kelime Bazlı
              </button>
              <button
                onClick={() => setOptions({ ...options, mode: 'full' })}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  options.mode === 'full'
                    ? 'bg-zinc-800 text-emerald-400 font-medium shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Tüm Dize
              </button>
            </div>

            {/* Direction switch */}
            <div className="flex items-center bg-zinc-900 p-1 rounded-lg border border-zinc-800">
              <button
                onClick={() => setOptions({ ...options, direction: 'left' })}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  options.direction === 'left'
                    ? 'bg-zinc-800 text-emerald-400 font-medium shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="1 önceki karakter konumu (İlk karakter sona geçer)"
              >
                Sola (1 Önceki)
              </button>
              <button
                onClick={() => setOptions({ ...options, direction: 'right' })}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  options.direction === 'right'
                    ? 'bg-zinc-800 text-emerald-400 font-medium shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="1 sonraki karakter konumu (Son karakter başa geçer)"
              >
                Sağa (1 Sonraki)
              </button>
            </div>
          </div>
        </div>

        {/* Global Instant Playground Bar */}
        <div className="border-t border-zinc-850 bg-zinc-900/40 px-4 sm:px-6 py-2.5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center gap-3 text-xs">
            <div className="flex items-center gap-2 text-zinc-400 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium text-zinc-300">Anlık Dönüştürücü:</span>
            </div>

            <div className="flex-1 flex items-center gap-2">
              <input
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                placeholder="Herhangi bir metin yazınız..."
                className="flex-1 px-3 py-1.5 bg-zinc-950 border border-zinc-700/80 rounded-md font-mono text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
              <ArrowRight className="w-4 h-4 text-zinc-500 shrink-0" />
              <div className="flex-1 px-3 py-1.5 bg-black/60 border border-emerald-950/80 rounded-md font-mono text-xs text-emerald-400 font-semibold truncate">
                {quickOutput || <span className="text-zinc-600 font-normal">Boş çıktı</span>}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleCopyQuick}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-xs border border-zinc-700 transition-colors"
                title="Sonucu Kopyala"
              >
                {copiedQuick ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Kopyala</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  const firstWord = quickInput.split(' ')[0];
                  if (firstWord) handleSendToVisualizer(firstWord);
                }}
                className="px-2.5 py-1.5 bg-sky-950/70 hover:bg-sky-900/70 text-sky-400 rounded text-xs border border-sky-800/50 transition-colors"
              >
                Görselleştir
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 pt-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('console')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'console'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Konsol Uygulaması (CLI)</span>
          </button>

          <button
            onClick={() => setActiveTab('visualizer')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'visualizer'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Adım Adım Simülatör</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'code'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Kaynak Kodlar (C#, Python, JS)</span>
          </button>

          <button
            onClick={() => setActiveTab('tests')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'tests'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Test Masası</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-6">
        {/* Context Brief / Prompt banner */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
              Algoritma Tanımı &amp; Kuralı
            </span>
            <p className="text-sm text-zinc-200">
              Verilen string ifade içerisindeki karakterleri bir önceki karakter ile yer değiştiren console uygulaması.
            </p>
            <div className="text-xs text-zinc-400 font-mono flex flex-wrap items-center gap-2 pt-1">
              <span>Giriş: <code className="text-zinc-200">Merhaba Hello Question</code></span>
              <span aria-hidden="true" className="text-zinc-600">→</span>
              <span>Çıktı: <code className="text-emerald-400">erhabaM elloH uestionQ</code></span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setQuickInput('Merhaba Merhaba Soru');
                handleSendToConsole('Merhaba Merhaba Soru');
              }}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded text-xs transition-colors"
            >
              "Merhaba Merhaba Soru"yu Konsolda Dene
            </button>
          </div>
        </div>

        {/* Active Tab View */}
        <div className="flex-1">
          {activeTab === 'console' && (
            <ConsoleTerminal
              options={options}
              onOptionsChange={setOptions}
              onSendToVisualizer={handleSendToVisualizer}
            />
          )}

          {activeTab === 'visualizer' && (
            <AlgorithmVisualizer
              initialWord={visualizerWord}
              direction={options.direction}
            />
          )}

          {activeTab === 'code' && <CodeViewer />}

          {activeTab === 'tests' && (
            <TestCasesPanel
              options={options}
              onSendToConsole={handleSendToConsole}
              onSendToVisualizer={handleSendToVisualizer}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-850 bg-zinc-950 py-4 px-6 text-center text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Karakter Değiştirme Algoritması · C# Console Application Çözümü
          </span>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>$O(N)$ Zaman</span>
            <span aria-hidden="true">·</span>
            <span>$O(N)$ Bellek</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400">Substring(1) + [0]</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
