import React from 'react';
import { AnalysisResult, OutputMode } from '../types/algorithm';
import { CheckCircle2, XCircle, Info, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { TURKISH_VOWELS } from '../utils/algorithm';

interface VisualInspectorProps {
  analysis: AnalysisResult;
  outputMode: OutputMode;
}

export const VisualInspector: React.FC<VisualInspectorProps> = ({
  analysis,
  outputMode,
}) => {
  const turkishVowelsArray = Array.from(TURKISH_VOWELS);
  const turkishConsonantsArray = [
    'b', 'c', 'ç', 'd', 'f', 'g', 'ğ', 'h', 'j', 'k', 'l',
    'm', 'n', 'p', 'r', 's', 'ş', 't', 'v', 'y', 'z'
  ];

  return (
    <div className="space-y-6">
      
      {/* Linguistic Guide Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-emerald-400" />
          <span>Türkçe Alfabesi Harf Dağılımı & Algoritma Kuralları</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Sesli Harfler */}
          <div className="bg-slate-950/70 border border-emerald-500/20 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-emerald-300">8 Sesli (Ünlü) Harf:</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                Sesli
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono">
              {turkishVowelsArray.map((v) => (
                <span
                  key={v}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-sm uppercase"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Sessiz Harfler */}
          <div className="bg-slate-950/70 border border-indigo-500/20 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-indigo-300">21 Sessiz (Ünsüz) Harf:</span>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/20 font-bold">
                Sessiz
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono">
              {turkishConsonantsArray.map((c) => (
                <span
                  key={c}
                  className="w-6 h-6 flex items-center justify-center rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-bold text-xs uppercase"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-400 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            <strong className="text-white">Algoritma Mantığı:</strong> Bir kelimede yan yana gelen iki karakterin ikisi de sessiz harf ise o kelime için durum <strong>Doğru (true)</strong>, aksi halde <strong>Yanlış (false)</strong> kabul edilir.
          </span>
        </div>
      </div>

      {/* Words Visual Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Kelimelerin Harf Harf Analizi ({analysis.words.length} Kelime)</span>
          </h3>

          <div className="text-xs text-slate-400 font-mono">
            Doğru: <span className="text-emerald-400 font-bold">{analysis.trueCount}</span> | Yanlış: <span className="text-rose-400 font-bold">{analysis.falseCount}</span>
          </div>
        </div>

        {analysis.words.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-sm">
            İncelenecek bir metin girilmedi. Lütfen bir cümle veya kelime yazınız.
          </div>
        ) : (
          analysis.words.map((word, wordIndex) => {
            const isMatch = word.hasTwoConsecutiveConsonants;

            return (
              <div
                key={wordIndex}
                className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                  isMatch
                    ? 'bg-slate-900/80 border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                {/* Header of Word Card */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-mono font-bold text-slate-400 border border-slate-700">
                      {wordIndex + 1}
                    </span>
                    <span className="text-lg font-bold text-white font-mono">
                      "{word.originalWord}"
                    </span>
                    {word.cleanWord !== word.originalWord && (
                      <span className="text-xs text-slate-500 font-mono">
                        (Sadeleştirilmiş: {word.cleanWord})
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {isMatch ? (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Doğru (true)</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold">
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>Yanlış (false)</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Letter Tiles Grid */}
                <div className="mb-4">
                  <div className="text-[11px] font-semibold text-slate-400 mb-2">
                    Karakter Dizilimi ve Türleri:
                  </div>

                  <div className="flex flex-wrap gap-2 items-center">
                    {word.letters.map((letter, lIdx) => {
                      const isVowelChar = letter.isVowel;
                      const isConsonantChar = letter.isConsonant;
                      const isPair = letter.isPartOfPair;

                      return (
                        <div
                          key={lIdx}
                          className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all min-w-[48px] ${
                            isPair
                              ? 'bg-emerald-500/20 border-emerald-400 ring-2 ring-emerald-500/30 shadow-md shadow-emerald-500/20'
                              : isVowelChar
                              ? 'bg-cyan-950/40 border-cyan-800/50'
                              : isConsonantChar
                              ? 'bg-slate-800/80 border-slate-700'
                              : 'bg-slate-900 border-slate-800'
                          }`}
                        >
                          <span
                            className={`text-lg font-bold font-mono ${
                              isPair
                                ? 'text-emerald-300'
                                : isVowelChar
                                ? 'text-cyan-300'
                                : isConsonantChar
                                ? 'text-slate-200'
                                : 'text-slate-500'
                            }`}
                          >
                            {letter.char}
                          </span>

                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-1 rounded mt-1 ${
                              isPair
                                ? 'bg-emerald-400 text-slate-950 font-black'
                                : isVowelChar
                                ? 'text-cyan-400 bg-cyan-950'
                                : isConsonantChar
                                ? 'text-slate-400 bg-slate-900'
                                : 'text-slate-600'
                            }`}
                          >
                            {isPair
                              ? 'ÇİFT'
                              : isVowelChar
                              ? 'SESLİ'
                              : isConsonantChar
                              ? 'SESSİZ'
                              : 'SEMBO'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pairs Detected */}
                {word.pairs.length > 0 && (
                  <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl mb-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-emerald-300">
                      Tespit Edilen İkili Sessiz Çiftleri:
                    </span>
                    {word.pairs.map((p, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-2 py-0.5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 font-mono text-emerald-200 font-bold"
                      >
                        '{p.chars}' ({p.startIndex + 1} ve {p.startIndex + 2}. indeksler)
                      </span>
                    ))}
                  </div>
                )}

                {/* Plain-language explanation */}
                <div className="text-xs text-slate-300 flex items-start gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span>{word.explanation}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Signature & Copyright Badge */}
      <div className="border border-amber-500/30 bg-amber-500/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <span className="text-white font-bold">Algoritma & Kod Mimarisi: </span>
            <span className="text-amber-300 font-semibold">Enes Öztürk</span>
            <p className="text-slate-400 text-[11px]">
              Telif Hakları Kanunu kapsamında tüm hakları saklıdır.
            </p>
          </div>
        </div>

        <span className="text-slate-500 font-mono text-[11px]">
          © 2026 Enes Öztürk
        </span>
      </div>

    </div>
  );
};
