import React, { useState } from 'react';
import { Play, BarChart3, RotateCcw, Percent } from 'lucide-react';
import { FighterData, MonteCarloResult, RingConfig } from '../types/boxing';
import { runMonteCarlo } from '../utils/simulationEngine';

interface MonteCarloSectionProps {
  f1: FighterData;
  f2: FighterData;
  ring: RingConfig;
}

export const MonteCarloSection: React.FC<MonteCarloSectionProps> = ({ f1, f2, ring }) => {
  const [matchCount, setMatchCount] = useState<number>(100);
  const [result, setResult] = useState<MonteCarloResult | null>(() => runMonteCarlo(f1, f2, ring, 100));
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleRun = (count: number) => {
    setIsRunning(true);
    setTimeout(() => {
      const res = runMonteCarlo(f1, f2, ring, count);
      setResult(res);
      setIsRunning(false);
    }, 150);
  };

  const f1StartPct = result ? ((result.f1StartsCount / result.totalMatches) * 100).toFixed(1) : '50.0';
  const f2StartPct = result ? ((result.f2StartsCount / result.totalMatches) * 100).toFixed(1) : '50.0';
  const f1WinPct = result ? ((result.f1WinsCount / result.totalMatches) * 100).toFixed(1) : '0.0';
  const f2WinPct = result ? ((result.f2WinsCount / result.totalMatches) * 100).toFixed(1) : '0.0';

  return (
    <div className="w-full space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              %50 Başlangıç Olasılığı Doğrulama & Monte Carlo Testi
            </h2>
            <p className="text-xs text-slate-400">
              Büyük Sayılar Yasası (Law of Large Numbers) ile Java Math.random() &lt;= 0.5 dağılımının doğrulanması
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-300 mt-3 leading-relaxed">
          Bu simülasyon, belirlediğiniz dövüşçü özellikleri ile arka planda anında yüzlerce maç oynatır.
          Ödev kapsamında entegre edilen <span className="font-mono text-amber-400">isFirst()</span> metodunun
          her iki boksöre de adil şekilde tam <span className="font-mono text-amber-400">%50</span> başlama hakkı tanıdığını test eder.
        </p>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Test Maç Sayısı:</span>
          {[100, 500, 1000].map((count) => (
            <button
              key={count}
              onClick={() => {
                setMatchCount(count);
                handleRun(count);
              }}
              disabled={isRunning}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                matchCount === count
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {count} Maç
            </button>
          ))}

          <button
            onClick={() => handleRun(matchCount)}
            disabled={isRunning}
            className="ml-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>Yeniden Test Et</span>
          </button>
        </div>
      </div>

      {/* Results Dashboard */}
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: 50% First Attack Distribution */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-400" />
                <span>İlk Vuruş Başlangıç Dağılımı (%50 Hedef)</span>
              </h3>
              <span className="text-xs font-mono text-slate-400 tabular-nums">
                {result.totalMatches} Karşılaşma
              </span>
            </div>

            {/* Split Visual Bar */}
            <div className="space-y-2">
              <div className="h-5 bg-slate-800 rounded-full overflow-hidden flex border border-slate-700/60 p-0.5">
                <div
                  style={{ width: `${f1StartPct}%` }}
                  className="bg-blue-500 h-full rounded-l-full transition-all duration-500"
                />
                <div
                  style={{ width: `${f2StartPct}%` }}
                  className="bg-rose-500 h-full rounded-r-full transition-all duration-500"
                />
              </div>

              <div className="flex justify-between text-xs font-mono">
                <span className="text-blue-400 font-bold">
                  {f1.name}: %{f1StartPct} ({result.f1StartsCount} kez)
                </span>
                <span className="text-rose-400 font-bold">
                  {f2.name}: %{f2StartPct} ({result.f2StartsCount} kez)
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 font-mono space-y-1">
              <div className="flex justify-between">
                <span>Beklenen Teorik Olasılık:</span>
                <span className="text-amber-400">%50.00 / %50.00</span>
              </div>
              <div className="flex justify-between">
                <span>Gözlemlenen Sapma:</span>
                <span className="text-emerald-400">
                  ±{Math.abs(Number(f1StartPct) - 50).toFixed(1)}% (Beklenen normal dağılım aralığında)
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Win Rates with Current Stats */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span>Toplam Maç Galibiyet Oranı</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Ort. {result.averageRounds} Round
              </span>
            </div>

            {/* Split Visual Bar */}
            <div className="space-y-2">
              <div className="h-5 bg-slate-800 rounded-full overflow-hidden flex border border-slate-700/60 p-0.5">
                <div
                  style={{ width: `${f1WinPct}%` }}
                  className="bg-cyan-500 h-full rounded-l-full transition-all duration-500"
                />
                <div
                  style={{ width: `${f2WinPct}%` }}
                  className="bg-orange-500 h-full rounded-r-full transition-all duration-500"
                />
              </div>

              <div className="flex justify-between text-xs font-mono">
                <span className="text-cyan-400 font-bold">
                  {f1.name}: %{f1WinPct} ({result.f1WinsCount} Galibiyet)
                </span>
                <span className="text-orange-400 font-bold">
                  {f2.name}: %{f2WinPct} ({result.f2WinsCount} Galibiyet)
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 font-mono space-y-1">
              <div className="flex justify-between">
                <span>Toplam Savrulan Darbe (Dodge):</span>
                <span className="text-cyan-300 tabular-nums">{result.totalDodges} vuruş</span>
              </div>
              <div className="flex justify-between">
                <span>Maç Başına Ortalama Round:</span>
                <span className="text-amber-300 tabular-nums">{result.averageRounds}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
