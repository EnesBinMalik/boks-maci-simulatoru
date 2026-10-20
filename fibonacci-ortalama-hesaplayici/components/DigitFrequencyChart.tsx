/**
 * @file DigitFrequencyChart.tsx
 * @description Fibonacci serisinde yer alan tüm rakamların (0-9) frekans dağılımını
 * ve ortalamasını grafiksel olarak görselleştiren bileşen.
 */

import React from 'react';
import { DigitAnalysisResult } from '../core/DigitAnalyzer';
import { BarChart3, Hash, Award } from 'lucide-react';

interface DigitFrequencyChartProps {
  digitAnalysis: DigitAnalysisResult;
}

export const DigitFrequencyChart: React.FC<DigitFrequencyChartProps> = ({ digitAnalysis }) => {
  const { totalDigitsCount, digitSum, digitAverage, digitFrequencies, mostFrequentDigit } = digitAnalysis;

  // En yüksek frekansı referans alarak bar yüksekliği hesapla
  const maxCount = Math.max(...digitFrequencies.map(d => d.count), 1);

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-sm shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <Hash className="w-3.5 h-3.5" />
            <span>0-9 Basamak Analitiği</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Rakamların Frekans Dağılımı ve Ortalaması
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Fibonacci terimlerinin tüm basamakları tek tek ayrıştırılarak rakam ortalaması hesaplanmıştır.
          </p>
        </div>

        {/* Quick summary stats */}
        <div className="flex items-center gap-4 text-xs font-mono self-start sm:self-auto">
          <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
            <span className="text-slate-500 block">Toplam Basamak</span>
            <span className="text-white font-bold text-sm tabular-nums">{totalDigitsCount} adet</span>
          </div>
          <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
            <span className="text-slate-500 block">Rakamlar Ortalaması</span>
            <span className="text-emerald-400 font-bold text-sm tabular-nums">{digitAverage}</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="pt-4 pb-2">
        <div className="grid grid-cols-10 gap-2 sm:gap-3 h-52 items-end px-2">
          {digitFrequencies.map((item) => {
            const heightPercent = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
            const isDominant = item.digit === mostFrequentDigit && item.count > 0;

            return (
              <div key={item.digit} className="flex flex-col items-center h-full justify-end group">
                {/* Count tooltip on hover */}
                <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-slate-300 text-center pointer-events-none whitespace-nowrap">
                  {item.count} adet
                  <br />
                  %{item.percentage}
                </div>

                {/* Animated Bar */}
                <div className="w-full bg-slate-950 rounded-t-lg relative flex items-end justify-center p-1 overflow-hidden" style={{ height: '70%' }}>
                  <div
                    className={`w-full rounded-t-md transition-all duration-500 ${
                      isDominant
                        ? 'bg-gradient-to-t from-emerald-500 to-amber-400'
                        : 'bg-gradient-to-t from-slate-700 to-slate-500 group-hover:from-amber-500 group-hover:to-amber-300'
                    }`}
                    style={{ height: `${Math.max(4, heightPercent)}%` }}
                  />
                </div>

                {/* Digit Label */}
                <div className="mt-2 text-center">
                  <div className={`text-xs font-bold font-mono ${isDominant ? 'text-amber-400' : 'text-slate-300'}`}>
                    {item.digit}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono hidden sm:block">
                    {item.count}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Insights */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>
            En çok tekrar eden rakam:{' '}
            <strong className="text-white font-mono">
              '{mostFrequentDigit}'
            </strong>{' '}
            ({digitFrequencies[mostFrequentDigit]?.count} defa)
          </span>
        </div>
        <div className="font-mono text-slate-500">
          Σ Rakamlar: {digitSum} / {totalDigitsCount} = {digitAverage}
        </div>
      </div>
    </div>
  );
};
