import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  ArrowRight,
  Info,
  Layers,
  Code2,
} from 'lucide-react';
import { generateStepTrace, shiftSingleWord } from '../utils/algorithm';
import { ShiftDirection } from '../types';

interface AlgorithmVisualizerProps {
  initialWord?: string;
  direction?: ShiftDirection;
}

export const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({
  initialWord = 'Merhaba',
  direction = 'left',
}) => {
  const [targetWord, setTargetWord] = useState<string>(initialWord);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(900); // ms per step

  const cleanWord = targetWord.trim() || 'Merhaba';
  const steps = generateStepTrace(cleanWord, direction);
  const totalSteps = steps.length;

  // Reset step whenever word or direction changes
  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [cleanWord, direction]);

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= totalSteps - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, playbackSpeed);

    return () => clearInterval(timer);
  }, [isPlaying, totalSteps, playbackSpeed]);

  const activeStep = steps[currentStep] || steps[0];
  const finalResult = shiftSingleWord(cleanWord, direction, 1, false);

  const originalChars = cleanWord.split('');

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 shadow-2xl flex flex-col gap-6">
      {/* Header & Word Input */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base font-semibold text-zinc-100">
              Adım Adım Karakter Kaydırma Simülatörü
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Karakterlerin bellekte indeksler arasındaki yer değiştirmesini adım adım izleyin.
          </p>
        </div>

        {/* Input word selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="word-input" className="text-xs text-zinc-400 whitespace-nowrap">
            İncelenecek Kelime:
          </label>
          <input
            id="word-input"
            type="text"
            value={targetWord}
            onChange={(e) => setTargetWord(e.target.value)}
            className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded text-sm text-zinc-100 font-mono focus:border-emerald-500 focus:outline-none w-36"
            placeholder="Kelime yazın"
          />
          <button
            onClick={() => setTargetWord('Merhaba')}
            className="px-2 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700"
          >
            Sıfırla
          </button>
        </div>
      </div>

      {/* Visual Character Box Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source State */}
        <div className="bg-zinc-900/60 p-4 rounded-lg border border-zinc-800/80">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-medium text-zinc-300">1. Orijinal Dizi (Girdi)</span>
            <span className="text-zinc-500 font-mono">Uzunluk: {originalChars.length}</span>
          </div>

          <div className="flex flex-wrap gap-2 py-2">
            {originalChars.map((char, idx) => {
              const isSourceActive =
                activeStep && activeStep.fromIndex === idx;

              return (
                <div
                  key={`orig-${idx}`}
                  className={`flex flex-col items-center justify-center w-12 h-16 rounded-lg font-mono border transition-all duration-200 ${
                    isSourceActive
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/10 scale-105'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-200'
                  }`}
                >
                  <span className="text-lg font-bold">{char}</span>
                  <span className="text-[10px] text-zinc-500 font-mono mt-1 border-t border-zinc-800 w-full text-center pt-0.5">
                    idx {idx}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-2 text-[11px] text-zinc-400">
            Formül: <code className="text-amber-300 font-mono">kelime[0..N-1]</code>
          </div>
        </div>

        {/* Target Result State */}
        <div className="bg-zinc-900/60 p-4 rounded-lg border border-zinc-800/80">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-medium text-emerald-400">2. Dönüştürülmüş Dizi (Çıktı)</span>
            <span className="text-zinc-400 font-mono">
              Adım: {currentStep + 1} / {totalSteps}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 py-2">
            {originalChars.map((_, idx) => {
              const isTargetActive =
                activeStep && activeStep.toIndex === idx;
              const charValue = activeStep?.currentResult?.[idx] || '';

              return (
                <div
                  key={`target-${idx}`}
                  className={`flex flex-col items-center justify-center w-12 h-16 rounded-lg font-mono border transition-all duration-200 ${
                    isTargetActive
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-500/10 scale-105'
                      : charValue
                      ? 'bg-zinc-900 border-zinc-700 text-emerald-300'
                      : 'bg-zinc-950/40 border-dashed border-zinc-800 text-zinc-600'
                  }`}
                >
                  <span className="text-lg font-bold">
                    {charValue || '·'}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono mt-1 border-t border-zinc-800 w-full text-center pt-0.5">
                    idx {idx}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-2 text-[11px] text-zinc-400 flex items-center justify-between">
            <div>
              Sonuç:{' '}
              <span className="text-emerald-400 font-mono font-bold">
                "{finalResult}"
              </span>
            </div>
            <span className="text-zinc-500 font-mono text-[10px]">
              {direction === 'left' ? 'Sola kaydırıldı' : 'Sağa kaydırıldı'}
            </span>
          </div>
        </div>
      </div>

      {/* Active Step Description Card */}
      {activeStep && (
        <div className="bg-zinc-900 p-3.5 rounded-lg border border-zinc-800 flex items-start gap-3">
          <div className="p-2 bg-emerald-950/60 border border-emerald-800/40 rounded text-emerald-400 shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold text-zinc-200">
              Adım {activeStep.stepIndex + 1}: {activeStep.description}
            </div>
            <div className="text-[11px] text-zinc-400 mt-1 flex flex-wrap items-center gap-2 font-mono">
              <span>
                Kaynak: İndeks <strong className="text-amber-300">{activeStep.fromIndex}</strong> ('{activeStep.originalChar}')
              </span>
              <ArrowRight className="w-3 h-3 text-zinc-500" />
              <span>
                Hedef: İndeks <strong className="text-emerald-400">{activeStep.toIndex}</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Playback Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-zinc-800/80">
        {/* Play / Step Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStep(0)}
            className="p-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs transition-colors"
            title="Başa Sar"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="p-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs disabled:opacity-40 transition-colors"
            title="Önceki Adım"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-md shadow-emerald-900/30 transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Durdur</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>{currentStep >= totalSteps - 1 ? 'Yeniden Oynat' : 'Oynat'}</span>
              </>
            )}
          </button>
          <button
            onClick={() => setCurrentStep((prev) => Math.min(totalSteps - 1, prev + 1))}
            disabled={currentStep >= totalSteps - 1}
            className="p-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs disabled:opacity-40 transition-colors"
            title="Sonraki Adım"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Slider */}
        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <span>Oynatma Hızı:</span>
          <input
            type="range"
            min="300"
            max="1800"
            step="100"
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className="w-28 accent-emerald-500 cursor-pointer"
          />
          <span className="font-mono text-zinc-300 min-w-12 text-right">
            {(playbackSpeed / 1000).toFixed(1)} sn
          </span>
        </div>
      </div>

      {/* Mathematical & Algorithmic Insight Box */}
      <div className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/80 text-xs text-zinc-400 space-y-1.5 font-mono">
        <div className="flex items-center gap-1.5 text-zinc-300 font-semibold font-sans">
          <Code2 className="w-3.5 h-3.5 text-sky-400" />
          <span>Algoritma Matematiği &amp; Mantığı:</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          • Dize uzunluğu $N$ olmak üzere her $i \in [1, N-1]$ için yeni indeks $i - 1$ olur.
        </p>
        <p className="text-[11px] leading-relaxed">
          • 0. indisteki ilk karakter ise son konuma ($N - 1$) taşınır: <span className="text-emerald-400">yeni[i] = eski[(i + 1) mod N]</span>.
        </p>
        <p className="text-[11px] leading-relaxed">
          • Bu işlem tek satırda <span className="text-sky-300">kelime.Substring(1) + kelime[0]</span> şeklinde $O(N)$ zaman karmaşıklığında gerçekleştirilir.
        </p>
      </div>
    </div>
  );
};
