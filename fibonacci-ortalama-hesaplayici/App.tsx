/**
 * @file App.tsx
 * @description Fibonacci Ortalama Hesaplama Uygulaması
 * Single Responsibility prensibine uygun, kod tekrarından kaçınan,
 * Enes Öztürk imzalı yüksek kaliteli matematik ve algoritma ortamı.
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DepthControlPanel } from './components/DepthControlPanel';
import { MetricCards } from './components/MetricCards';
import { StepByStepBreakdown } from './components/StepByStepBreakdown';
import { GoldenSpiralVisualizer } from './components/GoldenSpiralVisualizer';
import { SequenceTable } from './components/SequenceTable';
import { DigitFrequencyChart } from './components/DigitFrequencyChart';
import { ArchitectureViewer } from './components/ArchitectureViewer';
import { EnesOzturkSignature } from './components/EnesOzturkSignature';
import { FibonacciFacade, FibonacciCalculationReport } from './core/FibonacciFacade';
import { FibonacciExporter } from './core/FibonacciExporter';
import { SequenceVariant } from './core/FibonacciGenerator';
import {
  Sparkles,
  Share2,
  Copy,
  Check,
  FileSpreadsheet,
  Download,
  BookOpen,
  Compass,
  Table as TableIcon,
  Hash,
  Terminal
} from 'lucide-react';

export default function App() {
  const [depth, setDepth] = useState<number>(10);
  const [variant, setVariant] = useState<SequenceVariant>('one_based');
  const [report, setReport] = useState<FibonacciCalculationReport | null>(null);
  const [activeTab, setActiveTab] = useState<string>('calculator');
  const [isArchModalOpen, setIsArchModalOpen] = useState<boolean>(false);
  const [clipboardCopied, setClipboardCopied] = useState<boolean>(false);

  // İlk yüklemede ve parametreler değiştiğinde hesaplamayı yürüt
  useEffect(() => {
    const result = FibonacciFacade.execute(depth, variant);
    if (result.success && result.report) {
      setReport(result.report);
    }
  }, [depth, variant]);

  const handleCalculate = (newDepth: number, newVariant: SequenceVariant) => {
    setDepth(newDepth);
    setVariant(newVariant);
  };

  const handleCopySummary = () => {
    if (!report) return;
    const summary = FibonacciExporter.formatSummaryForClipboard(report);
    navigator.clipboard.writeText(summary);
    setClipboardCopied(true);
    setTimeout(() => setClipboardCopied(false), 2000);
  };

  const handleExportCSV = () => {
    if (report) FibonacciExporter.exportToCSV(report);
  };

  const handleExportJSON = () => {
    if (report) FibonacciExporter.exportToJSON(report);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-300">
      {/* Top Bar Contract (1-line Brand wordmark, 4-5 single-line links, 1 action) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenArchitecture={() => setIsArchModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Algoritmik Matematik Laboratuvarı</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Enes Öztürk Özel Üretimi</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
              Fibonacci Serisi & Ortalama Hesaplama
            </h1>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Kullanıcıdan alınan derinliğe (N) göre Fibonacci dizisindeki terimleri ve rakamları üreten,
              toplamını ve aritmetik ortalamasını Single Responsibility Prensibi (SRP) mimarisiyle hesaplayan etkili sistem.
            </p>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopySummary}
              className="px-3.5 py-2 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              title="Özeti Panoya Kopyala"
            >
              {clipboardCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Özet Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Raporu Kopyala</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3.5 py-2 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-sky-400" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={handleExportJSON}
              className="px-3.5 py-2 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>JSON</span>
            </button>
          </div>
        </div>

        {/* 1. Interactive Control Deck */}
        <DepthControlPanel
          currentDepth={depth}
          currentVariant={variant}
          onCalculate={handleCalculate}
        />

        {/* 2. Primary KPI Cards */}
        {report && <MetricCards report={report} />}

        {/* 3. Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/80 border border-slate-800 rounded-2xl overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'calculator'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TableIcon className="w-4 h-4" />
            <span>Terim Listesi & Tablo</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('steps')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'steps'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Adım Adım Çözüm</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('spiral')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'spiral'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Altın Spiral (Görsel Model)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('digits')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'digits'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Hash className="w-4 h-4" />
            <span>Rakam (0-9) Frekans Analizi</span>
          </button>

          <button
            type="button"
            onClick={() => setIsArchModalOpen(true)}
            className="ml-auto px-4 py-2 text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>SRP Mimarisi</span>
          </button>
        </div>

        {/* 4. Active Tab Content Display */}
        {report && (
          <div className="space-y-6">
            {activeTab === 'calculator' && (
              <div className="space-y-6">
                <SequenceTable
                  terms={report.terms}
                  onExportCSV={handleExportCSV}
                  onExportJSON={handleExportJSON}
                />
              </div>
            )}

            {activeTab === 'steps' && (
              <StepByStepBreakdown report={report} />
            )}

            {activeTab === 'spiral' && (
              <GoldenSpiralVisualizer terms={report.terms} depth={report.depth} />
            )}

            {activeTab === 'digits' && (
              <DigitFrequencyChart digitAnalysis={report.digitAnalysis} />
            )}
          </div>
        )}
      </main>

      {/* Signature Footer by Enes Öztürk */}
      <EnesOzturkSignature />

      {/* Interactive Clean Code / SRP Architecture Modal */}
      <ArchitectureViewer
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />
    </div>
  );
}
