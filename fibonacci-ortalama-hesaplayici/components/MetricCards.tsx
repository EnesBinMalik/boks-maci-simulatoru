/**
 * @file MetricCards.tsx
 * @description Fibonacci ortalama ve istatistik sonuçlarını sunan odaklı KPI paneli.
 */

import React, { useState } from 'react';
import { FibonacciCalculationReport } from '../core/FibonacciFacade';
import { Copy, Check, TrendingUp, Layers, Hash, Sigma, Compass } from 'lucide-react';

interface MetricCardsProps {
  report: FibonacciCalculationReport;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ report }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const { averageResult, digitAnalysis, goldenRatio, depth } = report;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. DOMINANT PRIMARY KPI: Aritmetik Ortalama */}
      <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-900/90 border border-amber-500/30 rounded-2xl p-6 relative overflow-hidden shadow-xl flex flex-col justify-between">
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
          <Sigma className="w-32 h-32 text-amber-400" />
        </div>

        <div>
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <TrendingUp className="w-4 h-4" />
              <span>Aritmetik Ortalama (X̄)</span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(averageResult.arithmeticMeanExactString, 'mean')}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 text-xs"
              title="Ortalamayı Kopyala"
            >
              {copiedKey === 'mean' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-xs">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Kopyala</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-2">
            <div className="text-3xl lg:text-4xl font-extrabold text-white font-mono tracking-tight tabular-nums break-all">
              {averageResult.arithmeticMeanExactString}
            </div>
            <p className="text-xs text-slate-400 mt-2 font-mono">
              Formül: Σ(F₁) ... F_{depth} / {depth}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Terim Sayısı: {depth}</span>
            <span aria-hidden="true">·</span>
            <span>Tam Toplam: {averageResult.sumFormatted}</span>
          </div>
          <span className="text-amber-400/90 font-medium font-mono">Hassas Hesaplama</span>
        </div>
      </div>

      {/* 2. Toplam Değer */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
        <div>
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sky-400" />
              Terimler Toplamı
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(averageResult.sumBigInt.toString(), 'sum')}
              className="text-slate-500 hover:text-slate-300 transition-colors"
            >
              {copiedKey === 'sum' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="text-2xl font-bold text-white font-mono tracking-tight tabular-nums truncate" title={averageResult.sumBigInt.toString()}>
            {averageResult.sumFormatted}
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/60 text-xs text-slate-400 flex items-center justify-between">
          <span>İlk Terim: {report.terms[0]?.stringValue ?? 0}</span>
          <span>Son: {report.terms[report.terms.length - 1]?.stringValue.slice(0, 6)}...</span>
        </div>
      </div>

      {/* 3. Rakam (Basamak) Ortalaması */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
        <div>
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="flex items-center gap-1.5">
              <Hash className="w-4 h-4 text-emerald-400" />
              Rakam Ortalaması
            </span>
            <span className="text-xs text-emerald-400 font-mono font-medium">0-9 Basamak</span>
          </div>
          <div className="text-2xl font-bold text-white font-mono tracking-tight tabular-nums">
            {digitAnalysis.digitAverage}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Toplam {digitAnalysis.totalDigitsCount} basamaktaki rakamların ortalaması
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/60 text-xs text-slate-400 flex items-center justify-between">
          <span>Rakamlar Toplamı: {digitAnalysis.digitSum}</span>
          <span>Mod: {digitAnalysis.mostFrequentDigit}</span>
        </div>
      </div>

      {/* 4. Altın Oran Yakınsaması (Phi: 1.618) */}
      <div className="md:col-span-2 lg:col-span-4 bg-slate-900/50 border border-slate-800/90 rounded-2xl p-4 lg:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 font-mono font-bold text-lg">
            φ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">Altın Oran (Golden Ratio) Yakınsaması</span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs text-amber-400 font-mono">φ ≈ 1.6180339887</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {goldenRatio.stepNotes}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 shrink-0 self-end md:self-auto text-xs font-mono">
          {goldenRatio.lastRatio !== undefined && (
            <div>
              <span className="text-slate-500 block">F_{depth} / F_{depth - 1} Oranı</span>
              <span className="text-sm font-bold text-white tabular-nums">{goldenRatio.lastRatio}</span>
            </div>
          )}
          {goldenRatio.convergencePercent !== undefined && (
            <div>
              <span className="text-slate-500 block">Uyum Oranı</span>
              <span className="text-sm font-bold text-emerald-400 tabular-nums">%{goldenRatio.convergencePercent}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
