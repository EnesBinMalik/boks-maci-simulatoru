/**
 * @file DepthControlPanel.tsx
 * @description Kullanıcıdan Fibonacci derinliğini alan, önayarlı seçenekler sunan
 * ve anlık doğrulama sağlayan etkileşimli kontrol paneli.
 */

import React, { useState } from 'react';
import { SequenceVariant } from '../core/FibonacciGenerator';
import { Calculator, RotateCcw, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DepthControlPanelProps {
  currentDepth: number;
  currentVariant: SequenceVariant;
  onCalculate: (depth: number, variant: SequenceVariant) => void;
  isLoading?: boolean;
}

const PRESET_DEPTHS = [5, 8, 10, 15, 20, 30, 50];

export const DepthControlPanel: React.FC<DepthControlPanelProps> = ({
  currentDepth,
  currentVariant,
  onCalculate,
  isLoading = false
}) => {
  const [inputValue, setInputValue] = useState<string>(currentDepth.toString());
  const [variant, setVariant] = useState<SequenceVariant>(currentVariant);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInputChange = (val: string) => {
    setInputValue(val);
    const num = Number(val);
    if (val === '') {
      setErrorMsg('Lütfen bir derinlik sayısı yazınız.');
    } else if (isNaN(num) || !Number.isInteger(num)) {
      setErrorMsg('Yalnızca tam sayı girilmelidir.');
    } else if (num < 1) {
      setErrorMsg('Derinlik en az 1 olmalıdır.');
    } else if (num > 1000) {
      setErrorMsg('Maksimum derinlik 1000 ile sınırlandırılmıştır.');
    } else {
      setErrorMsg(null);
    }
  };

  const handleExecute = (targetDepth?: number, targetVariant?: SequenceVariant) => {
    const depthToUse = targetDepth !== undefined ? targetDepth : Number(inputValue);
    const variantToUse = targetVariant ?? variant;

    if (isNaN(depthToUse) || depthToUse < 1 || depthToUse > 1000) {
      setErrorMsg('Lütfen 1 ile 1000 arasında geçerli bir derinlik giriniz.');
      return;
    }

    setErrorMsg(null);
    onCalculate(depthToUse, variantToUse);

    // Tactile celebration for notable depths
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#F59E0B', '#FBBF24', '#D97706', '#E2E8F0']
      });
    } catch {
      // Ignore if confetti fails in sandbox
    }
  };

  const handlePresetClick = (depth: number) => {
    setInputValue(depth.toString());
    handleExecute(depth, variant);
  };

  const handleVariantToggle = (newVariant: SequenceVariant) => {
    setVariant(newVariant);
    const num = Number(inputValue);
    if (!isNaN(num) && num >= 1) {
      handleExecute(num, newVariant);
    }
  };

  const handleIncrement = (amount: number) => {
    const current = Number(inputValue) || 1;
    const next = Math.max(1, Math.min(1000, current + amount));
    setInputValue(next.toString());
    handleExecute(next, variant);
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-sm shadow-xl relative overflow-hidden">
      {/* Decorative subtle background mesh */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-1">
            <span>Matematiksel Seri Parametreleri</span>
            <span aria-hidden="true">·</span>
            <span>Single Responsibility Mimarisi</span>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
            Fibonacci Derinliğini Belirleyin
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Girilen derinlik (N) kadar terim üretilir, ardışık toplam ve aritmetik ortalama hesaplanır.
          </p>
        </div>

        {/* Variant selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-950/80 border border-slate-800 rounded-xl self-start lg:self-auto">
          <button
            type="button"
            onClick={() => handleVariantToggle('one_based')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              variant === 'one_based'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Standart (1, 1, 2, 3...)
          </button>
          <button
            type="button"
            onClick={() => handleVariantToggle('zero_based')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              variant === 'zero_based'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sıfır Tabanlı (0, 1, 1, 2...)
          </button>
        </div>
      </div>

      {/* Main input & controls row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Number input and steppers */}
        <div className="md:col-span-6 lg:col-span-5 flex items-center gap-2">
          <div className="relative flex-1">
            <label htmlFor="depth-input" className="sr-only">Fibonacci Derinliği</label>
            <input
              id="depth-input"
              type="number"
              min={1}
              max={1000}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
              placeholder="Örn: 10"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-lg font-mono font-bold text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all tabular-nums"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 uppercase">
              Terim (N)
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleIncrement(-1)}
            aria-label="Derinliği 1 azalt"
            className="w-11 h-11 flex items-center justify-center bg-slate-800/80 hover:bg-slate-700 active:scale-95 text-slate-200 rounded-xl border border-slate-700 font-mono font-bold text-base transition-all"
          >
            -
          </button>
          <button
            type="button"
            onClick={() => handleIncrement(1)}
            aria-label="Derinliği 1 artır"
            className="w-11 h-11 flex items-center justify-center bg-slate-800/80 hover:bg-slate-700 active:scale-95 text-slate-200 rounded-xl border border-slate-700 font-mono font-bold text-base transition-all"
          >
            +
          </button>
        </div>

        {/* Slider for quick tactile exploration */}
        <div className="md:col-span-6 lg:col-span-4 flex flex-col justify-center px-1">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
            <span>Hızlı Kaydırıcı</span>
            <span className="font-mono text-amber-400 font-semibold">{inputValue || 1} terim</span>
          </div>
          <input
            type="range"
            min={1}
            max={60}
            value={Math.min(60, Number(inputValue) || 1)}
            onChange={(e) => {
              const val = e.target.value;
              setInputValue(val);
              handleExecute(Number(val), variant);
            }}
            className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
        </div>

        {/* Calculate submit button */}
        <div className="md:col-span-12 lg:col-span-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleExecute()}
            disabled={isLoading || !!errorMsg}
            className="w-full py-3 px-5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Calculator className="w-4 h-4" />
            <span>Ortalamayı Hesapla</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>

      {/* Validation error notice */}
      {errorMsg && (
        <div className="mt-3 flex items-center gap-2 text-rose-400 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Preset depth pills */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          Hızlı Seçimler:
        </span>
        {PRESET_DEPTHS.map((depth) => {
          const isSelected = Number(inputValue) === depth;
          return (
            <button
              key={depth}
              type="button"
              onClick={() => handlePresetClick(depth)}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded-lg transition-all ${
                isSelected
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
              }`}
            >
              N = {depth}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => {
            setInputValue('10');
            handleExecute(10, 'one_based');
          }}
          className="ml-auto text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Varsayılana Sıfırla</span>
        </button>
      </div>
    </div>
  );
};
