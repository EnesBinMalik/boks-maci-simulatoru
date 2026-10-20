import React from 'react';
import { AlgorithmResult } from '../types/algorithm';
import { THRESHOLD } from '../utils/algorithm';
import { ArrowDown, ArrowUp, Minus, Calculator, Hash, CheckCircle2 } from 'lucide-react';

interface CalculationBreakdownProps {
  result: AlgorithmResult;
}

export const CalculationBreakdown: React.FC<CalculationBreakdownProps> = ({ result }) => {
  const smallNumbers = result.steps.filter((s) => s.status === 'less');
  const largeNumbers = result.steps.filter((s) => s.status === 'greater');
  const equalNumbers = result.steps.filter((s) => s.status === 'equal');

  return (
    <div className="space-y-6">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inputs */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Girilen Sayı Adedi</span>
            <Hash className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {result.numbers.length}
          </div>
          <div className="text-xs text-slate-500 mt-1 truncate">
            {result.numbers.length > 0 ? result.numbers.join(', ') : 'Girdi yok'}
          </div>
        </div>

        {/* Small Diff Sum */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Küçük Olanların Farkı (&lt; 67)</span>
            <ArrowDown className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
            {result.smallDiffSum}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Σ (67 - x) formülü ile
          </div>
        </div>

        {/* Large Square Sum */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Büyük Olanların Karesi (&gt; 67)</span>
            <ArrowUp className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-indigo-400 tabular-nums">
            {result.largeSquareSum}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Σ (x - 67)² formülü ile
          </div>
        </div>

        {/* Final Console Output */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 bg-gradient-to-br from-slate-900 to-cyan-950/30 border-cyan-500/30">
          <div className="flex items-center justify-between text-xs text-cyan-300 mb-1">
            <span>Konsol Çıktısı</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums tracking-wide">
            {result.output}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            İmza: Enes Öztürk
          </div>
        </div>
      </div>

      {/* Formula Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Small Diff Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono text-xs">
              &lt;
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                1. Kural: 67'den Küçük Sayılar
              </h3>
              <p className="text-xs text-slate-400">
                Farkların doğrudan toplamı alınır
              </p>
            </div>
          </div>

          {smallNumbers.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500 bg-slate-950 rounded-lg">
              Bu girdi kümesinde 67'den küçük sayı bulunmamaktadır. (Toplam = 0)
            </div>
          ) : (
            <div className="space-y-2">
              <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs space-y-1.5 border border-slate-800/80">
                {smallNumbers.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between text-slate-300">
                    <span>
                      Sayı {s.original}: <span className="text-slate-400">{THRESHOLD} - {s.original}</span>
                    </span>
                    <span className="text-amber-400 font-semibold tabular-nums">
                      = +{s.contribution}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between font-bold text-white">
                  <span>Toplam Fark:</span>
                  <span className="text-amber-400 tabular-nums">
                    {smallNumbers.map((s) => s.contribution).join(' + ')} = {result.smallDiffSum}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Large Square Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-mono text-xs">
              &gt;
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                2. Kural: 67'den Büyük Sayılar
              </h3>
              <p className="text-xs text-slate-400">
                Farkların mutlak karesi alınarak toplanır
              </p>
            </div>
          </div>

          {largeNumbers.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500 bg-slate-950 rounded-lg">
              Bu girdi kümesinde 67'den büyük sayı bulunmamaktadır. (Toplam = 0)
            </div>
          ) : (
            <div className="space-y-2">
              <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs space-y-1.5 border border-slate-800/80">
                {largeNumbers.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between text-slate-300">
                    <span>
                      Sayı {s.original}: <span className="text-slate-400">({s.original} - {THRESHOLD})² = {s.diff}²</span>
                    </span>
                    <span className="text-indigo-400 font-semibold tabular-nums">
                      = +{s.contribution}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between font-bold text-white">
                  <span>Kareler Toplamı:</span>
                  <span className="text-indigo-400 tabular-nums">
                    {largeNumbers.map((s) => s.contribution).join(' + ')} = {result.largeSquareSum}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Step Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">
              Her Sayı İçin Ayrıntılı Hesaplama Tablosu
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Eşik Değeri: 67
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4 font-medium">Sıra</th>
                <th className="py-2.5 px-4 font-medium">Girilen Sayı</th>
                <th className="py-2.5 px-4 font-medium">67 İle Karşılaştırma</th>
                <th className="py-2.5 px-4 font-medium">Uygulanan Formül</th>
                <th className="py-2.5 px-4 font-medium text-right">Elde Edilen Değer</th>
                <th className="py-2.5 px-4 font-medium text-right">Hedef Toplam</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {result.steps.map((step, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 text-slate-500 tabular-nums">
                    #{idx + 1}
                  </td>
                  <td className="py-3 px-4 font-bold text-white tabular-nums">
                    {step.original}
                  </td>
                  <td className="py-3 px-4">
                    {step.status === 'less' && (
                      <span className="text-amber-400 font-sans font-medium flex items-center gap-1">
                        <ArrowDown className="w-3 h-3" /> Küçük (&lt; 67)
                      </span>
                    )}
                    {step.status === 'greater' && (
                      <span className="text-indigo-400 font-sans font-medium flex items-center gap-1">
                        <ArrowUp className="w-3 h-3" /> Büyük (&gt; 67)
                      </span>
                    )}
                    {step.status === 'equal' && (
                      <span className="text-slate-400 font-sans font-medium flex items-center gap-1">
                        <Minus className="w-3 h-3" /> Eşit (== 67)
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {step.formula}
                  </td>
                  <td className="py-3 px-4 text-right font-bold tabular-nums text-white">
                    {step.contribution}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {step.status === 'less' ? (
                      <span className="text-amber-400 font-sans text-[11px]">Küçükler Toplamı</span>
                    ) : step.status === 'greater' ? (
                      <span className="text-indigo-400 font-sans text-[11px]">Büyükler Toplamı</span>
                    ) : (
                      <span className="text-slate-500 font-sans text-[11px]">Etkisiz</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
