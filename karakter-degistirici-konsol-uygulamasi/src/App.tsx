import React, { useState } from 'react';
import { Header } from './components/Header';
import { TerminalView } from './components/TerminalView';
import { VisualSwapInspector } from './components/VisualSwapInspector';
import { CodePlayground } from './components/CodePlayground';
import { EnesOzturkSignature } from './components/EnesOzturkSignature';
import { AlgorithmResult } from './types';
import { Terminal, Eye, Code, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'visualizer' | 'code' | 'license'>('terminal');
  const [lastResult, setLastResult] = useState<AlgorithmResult | null>(null);
  const [externalTrigger, setExternalTrigger] = useState<string | null>(null);

  const handleInspectResult = (result: AlgorithmResult) => {
    setLastResult(result);
    setActiveTab('visualizer');
  };

  const handleRunDefaultExample = () => {
    setActiveTab('terminal');
    setExternalTrigger(`ornek`);
    // Reset trigger quickly so re-clicks work
    setTimeout(() => setExternalTrigger(null), 100);
  };

  return (
    <div className="min-h-screen bg-[#070a11] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar adhering to strict design contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRunDefaultExample={handleRunDefaultExample}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8 flex flex-col gap-6">
        {/* Hero context banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-1">
              Algoritmik Konsol Çözümü
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
              String İlk ve Son Karakter Değiştirici
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Verilen string ifade içerisindeki her kelimenin (veya tüm metnin) ilk ve son karakterinin yerini değiştirip ekrana yazdıran konsol uygulaması.
            </p>
          </div>

          {/* Tab selector for mobile & quick switching */}
          <div className="flex items-center p-1 bg-slate-900 rounded-lg border border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'terminal'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Konsol CLI</span>
            </button>
            <button
              onClick={() => setActiveTab('visualizer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'visualizer'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Görsel İnceleme</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'code'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Kaynak Kodlar</span>
            </button>
            <button
              onClick={() => setActiveTab('license')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'license'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Telif & Lisans</span>
            </button>
          </div>
        </div>

        {/* Dynamic Tab Body */}
        <div className="flex-1">
          {activeTab === 'terminal' && (
            <TerminalView
              onInspectResult={handleInspectResult}
              externalTriggerInput={externalTrigger}
            />
          )}

          {activeTab === 'visualizer' && (
            <VisualSwapInspector initialResult={lastResult} />
          )}

          {activeTab === 'code' && <CodePlayground />}

          {activeTab === 'license' && <EnesOzturkSignature />}
        </div>
      </main>

      {/* Footer with Enes Öztürk Signature and Legal Copyright */}
      <footer className="border-t border-slate-800 bg-[#05070d] py-6 px-6 mt-12 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-semibold text-slate-300">Enes Öztürk</span>
            <span aria-hidden="true">·</span>
            <span>İlk ve Son Karakter Değiştirici Konsol Uygulaması</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>© 2026 Enes Öztürk. Tüm Hakları Saklıdır.</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <button
              onClick={() => setActiveTab('license')}
              className="text-cyan-400 hover:underline hover:text-cyan-300 font-medium"
            >
              Telif Hakları & Lisans
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
