import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ConsoleTerminal } from './components/ConsoleTerminal';
import { VisualInspector } from './components/VisualInspector';
import { CodePlayground } from './components/CodePlayground';
import { CopyrightModal } from './components/CopyrightModal';
import { OutputMode } from './types/algorithm';
import { processExpression } from './utils/algorithm';
import {
  ShieldCheck,
  Terminal,
  Sparkles,
  FileCode,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Cpu
} from 'lucide-react';

export default function App() {
  const [currentInput, setCurrentInput] = useState<string>('Merhaba Umut Arya');
  const [outputMode, setOutputMode] = useState<OutputMode>('tr-bool');
  const [activeTab, setActiveTab] = useState<'console' | 'visual' | 'code'>('console');
  const [includeCopyrightInOutput, setIncludeCopyrightInOutput] = useState<boolean>(true);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState<boolean>(false);

  // Real-time analysis for current input
  const currentAnalysis = useMemo(() => {
    return processExpression(currentInput, outputMode, includeCopyrightInOutput);
  }, [currentInput, outputMode, includeCopyrightInOutput]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Header
        outputMode={outputMode}
        setOutputMode={setOutputMode}
        onOpenCertificate={() => setIsCertificateModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Hero Context Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30 border border-slate-800 p-6 sm:p-7 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <Cpu className="w-3.5 h-3.5" />
                <span>Konsol Algoritması &amp; Dil Analiz Laboratuvarı</span>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Ardışık İki Sessiz Harf Doğrulama Konsolu
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Verilen string ifadedeki her bir kelimede yan yana <strong>2 sessiz harf</strong> olup olmadığını kontrol eder. Şartı sağlayan kelimeler için <strong>Doğru (true)</strong>, sağlamayanlar için <strong>Yanlış (false)</strong> yazdırır.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
                <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2">
                  <span className="text-slate-400">Örnek Giriş:</span>
                  <span className="text-cyan-300 font-bold">Merhaba Umut Arya</span>
                </div>
                
                <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-center gap-2">
                  <span className="text-slate-400">Beklenen Çıktı:</span>
                  <span className="text-emerald-300 font-bold">Doğru Yanlış Doğru</span>
                </div>
              </div>
            </div>

            {/* Author Card in Hero */}
            <div className="lg:w-72 bg-slate-950/90 border border-amber-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between shrink-0">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Telif Sahibi
                </span>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-full font-mono">
                  © 2026
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-base font-extrabold text-white">
                  Enes Öztürk
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Algoritma Mimarisi &amp; Telif Korumalı Konsol Uygulaması
                </p>
              </div>

              <button
                onClick={() => setIsCertificateModalOpen(true)}
                className="mt-3.5 w-full py-1.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Telif Belgesini Aç</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

          </div>
        </section>

        {/* Tab Views */}
        {activeTab === 'console' && (
          <ConsoleTerminal
            currentInput={currentInput}
            setCurrentInput={setCurrentInput}
            analysis={currentAnalysis}
            outputMode={outputMode}
            includeCopyrightInOutput={includeCopyrightInOutput}
            setIncludeCopyrightInOutput={setIncludeCopyrightInOutput}
            onOpenCertificate={() => setIsCertificateModalOpen(true)}
          />
        )}

        {activeTab === 'visual' && (
          <VisualInspector
            analysis={currentAnalysis}
            outputMode={outputMode}
          />
        )}

        {activeTab === 'code' && (
          <CodePlayground />
        )}

      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">İkili Sessiz Harf Algoritması</span>
            <span>•</span>
            <span className="text-slate-500">Konsol Uygulaması v1.0</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Geliştirici &amp; Telif Hakları:</span>
            <strong className="text-white">Enes Öztürk</strong>
            <span>(Tüm Hakları Saklıdır © 2026)</span>
          </div>
        </div>
      </footer>

      {/* Copyright Certificate Modal */}
      <CopyrightModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
      />

    </div>
  );
}
