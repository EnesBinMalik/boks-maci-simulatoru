/**
 * @file StepByStepBreakdown.tsx
 * @description Fibonacci ortalama hesaplamasının adım adım matematiksel çözümünü
 * formüller ve ara değerlerle şeffaf şekilde gösteren bileşen.
 */

import React, { useState } from 'react';
import { FibonacciCalculationReport } from '../core/FibonacciFacade';
import { CheckCircle2, ChevronRight, HelpCircle, BookOpen } from 'lucide-react';

interface StepByStepBreakdownProps {
  report: FibonacciCalculationReport;
}

export const StepByStepBreakdown: React.FC<StepByStepBreakdownProps> = ({ report }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [showRakamComparison, setShowRakamComparison] = useState<boolean>(true);

  const { depth, terms, averageResult, digitAnalysis } = report;

  // İlk 6 terim ve son terim gösterimi
  const displayTerms = terms.length <= 8
    ? terms.map(t => t.stringValue).join(' + ')
    : `${terms.slice(0, 5).map(t => t.stringValue).join(' + ')} + ... + ${terms[terms.length - 1]?.stringValue}`;

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-sm shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Matematiksel İspat & Çözüm Süreci</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Adım Adım Ortalama Hesaplama Dökümü
          </h3>
        </div>

        {/* Step indicator buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
          {[1, 2, 3, 4].map((stepNum) => (
            <button
              key={stepNum}
              type="button"
              onClick={() => setActiveStep(stepNum)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1 ${
                activeStep === stepNum
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Adım {stepNum}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="space-y-6">
        {/* Adım 1: Seri Oluşturma */}
        {activeStep === 1 && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center font-bold text-xs shrink-0">
                1
              </span>
              <div>
                <h4 className="text-base font-semibold text-white">
                  Derinliğe Göre Fibonacci Serisinin Üretimi (N = {depth})
                </h4>
                <p className="text-sm text-slate-400 mt-1">
                  Fibonacci serisinde her terim, kendisinden önceki iki terimin toplamıdır:
                  <span className="font-mono text-amber-300 ml-1.5">F(n) = F(n-1) + F(n-2)</span>
                </p>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 font-mono text-sm overflow-x-auto text-slate-200">
              <div className="text-xs text-slate-500 mb-2">Üretilen Terim Dizisi ({depth} eleman):</div>
              <div className="flex flex-wrap gap-2">
                {terms.slice(0, 30).map((t) => (
                  <span
                    key={t.index}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-900 border border-slate-700/60 rounded-md text-xs"
                  >
                    <span className="text-slate-500 font-sans text-[10px]">F_{t.index}:</span>
                    <span className="text-amber-300 font-semibold">{t.stringValue}</span>
                  </span>
                ))}
                {terms.length > 30 && (
                  <span className="px-2.5 py-1 text-slate-500 text-xs flex items-center">
                    ... ve {terms.length - 30} terim daha
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="px-4 py-2 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>Sonraki Adım: Terimleri Topla</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Adım 2: Terimlerin Toplamı */}
        {activeStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center font-bold text-xs shrink-0">
                2
              </span>
              <div>
                <h4 className="text-base font-semibold text-white">
                  Dizideki Terimlerin Toplanması (Σ F)
                </h4>
                <p className="text-sm text-slate-400 mt-1">
                  Ortalama formülünün pay kısmı için serideki tüm {depth} adet sayı toplanır.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3 font-mono">
              <div className="text-xs text-slate-500 uppercase tracking-wider">Toplam Denklemi:</div>
              <div className="text-sm text-slate-300 break-all leading-relaxed">
                Toplam = {displayTerms}
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-base">
                <span className="text-slate-400 text-sm">Sonuç (Toplam):</span>
                <span className="text-amber-400 font-bold tabular-nums text-lg">
                  {averageResult.sumFormatted}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Önceki Adım
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="px-4 py-2 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>Sonraki Adım: Ortalamayı Bul</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Adım 3: Aritmetik Ortalama */}
        {activeStep === 3 && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center font-bold text-xs shrink-0">
                3
              </span>
              <div>
                <h4 className="text-base font-semibold text-white">
                  Aritmetik Ortalama Hesabı (Toplam / Derinlik)
                </h4>
                <p className="text-sm text-slate-400 mt-1">
                  Bulunan toplam değer, serideki terim sayısı olan derinliğe (N = {depth}) bölünür.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/90 border border-amber-500/20 rounded-xl p-6 space-y-4 font-mono">
              <div className="flex flex-col items-center justify-center py-2 text-center">
                <div className="text-xs text-slate-400 mb-2">Matematiksel Formül:</div>
                <div className="text-sm sm:text-base text-slate-200">
                  <span className="text-amber-400 font-bold">Aritmetik Ortalama (X̄)</span> ={' '}
                  <span className="inline-block align-middle text-center mx-2">
                    <span className="border-b border-slate-500 block px-2 pb-1 text-sky-300">
                      {averageResult.sumFormatted} (Toplam)
                    </span>
                    <span className="block pt-1 text-amber-300">
                      {depth} (Derinlik N)
                    </span>
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2">
                <span className="text-xs text-slate-400">Nihai Sayısal Ortalama:</span>
                <span className="text-xl sm:text-2xl font-bold text-white text-right tabular-nums">
                  {averageResult.arithmeticMeanExactString}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Önceki Adım
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(4)}
                className="px-4 py-2 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>Sonraki Adım: Sayı vs Rakam Karşılaştırması</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Adım 4: Rakam ve Sayı Ayrımı (Türkçe Terminoloji Derinliği) */}
        {activeStep === 4 && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center font-bold text-xs shrink-0">
                4
              </span>
              <div>
                <h4 className="text-base font-semibold text-white">
                  Terminoloji İncelemesi: "Sayıların Ortalaması" vs "Rakamların Ortalaması"
                </h4>
                <p className="text-sm text-slate-400 mt-1">
                  Ödev ve algoritma metinlerinde "rakam" kelimesi bazen serideki sayıları (terimleri),
                  bazen de gerçek anlamı olan 0-9 tekil basamakları kasteder. Uygulamamız her iki ihtimali de hesaplamıştır:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                  1. Yorum: Terimlerin (Sayıların) Ortalaması
                </div>
                <div className="text-2xl font-bold font-mono text-white mt-2 tabular-nums">
                  {averageResult.arithmeticMeanExactString}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Dizideki her bir tam Fibonacci sayısının toplamının N ({depth}) değerine bölümü.
                </p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                  2. Yorum: Basamakların (Rakamların: 0-9) Ortalaması
                </div>
                <div className="text-2xl font-bold font-mono text-white mt-2 tabular-nums">
                  {digitAnalysis.digitAverage}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Tüm terimlerin içerdiği {digitAnalysis.totalDigitsCount} adet tekil rakamın toplamı ({digitAnalysis.digitSum}) ve ortalaması.
                </p>
              </div>
            </div>

            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Önceki Adım
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
