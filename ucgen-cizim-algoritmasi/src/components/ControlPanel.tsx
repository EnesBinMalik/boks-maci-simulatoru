/**
 * @license
 * Telif Hakkı © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 */

import React from 'react';
import { Play, RotateCcw, Sparkles, Layers, Sliders } from 'lucide-react';
import { TRIANGLE_PRESETS, TriangleType } from '../core/types';

interface ControlPanelProps {
  size: number;
  setSize: (size: number) => void;
  triangleType: TriangleType;
  setTriangleType: (type: TriangleType) => void;
  char: string;
  setChar: (char: string) => void;
  showRowNumbers: boolean;
  setShowRowNumbers: (show: boolean) => void;
  isAnimating: boolean;
  onDraw: () => void;
  onAnimatedDraw: () => void;
  onReset: () => void;
}

const PRESET_SIZES = [3, 5, 7, 10, 15, 20];
const CHAR_PRESETS = ['*', '#', '▲', '■', '@', '+', 'o'];

export const ControlPanel: React.FC<ControlPanelProps> = ({
  size,
  setSize,
  triangleType,
  setTriangleType,
  char,
  setChar,
  showRowNumbers,
  setShowRowNumbers,
  isAnimating,
  onDraw,
  onAnimatedDraw,
  onReset,
}) => {
  return (
    <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 space-y-6">
      {/* Section 1: Boyut (Dimension) Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold tracking-wide text-neutral-300 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span>Üçgen Boyutu (Yükseklik / Satır Sayısı)</span>
          </label>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
            n = {size}
          </span>
        </div>

        {/* Range Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min={1}
            max={30}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer bg-neutral-800 h-2 rounded-lg"
          />

          {/* Quick Preset Buttons */}
          <div className="flex items-center gap-1.5 pt-1">
            <span className="text-[11px] text-neutral-500 mr-1">Hazır:</span>
            {PRESET_SIZES.map((preset) => (
              <button
                key={preset}
                onClick={() => setSize(preset)}
                className={`px-2 py-1 text-xs font-mono rounded transition-colors ${
                  size === preset
                    ? 'bg-emerald-500 text-neutral-950 font-bold'
                    : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2: Üçgen Geometri Türü (Algorithm Type) */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold tracking-wide text-neutral-300 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span>Algoritma Varyasyonu</span>
        </label>

        <div className="grid grid-cols-1 gap-2">
          {TRIANGLE_PRESETS.map((preset) => {
            const isSelected = triangleType === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => setTriangleType(preset.id)}
                className={`text-left p-2.5 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-neutral-800/90 border-emerald-500/50 ring-1 ring-emerald-500/30'
                    : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700 text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${isSelected ? 'text-emerald-400 font-bold' : 'text-neutral-300'}`}>
                    {preset.name}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 bg-neutral-950/80 px-1.5 py-0.5 rounded border border-neutral-800">
                    {preset.formula}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1 leading-normal line-clamp-1">
                  {preset.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 3: Çizim Karakteri & Biçimlendirme */}
      <div className="grid grid-cols-2 gap-4">
        {/* Karakter Seçimi */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-neutral-300 block">
            Çizim Karakteri
          </label>
          <div className="flex items-center gap-1.5 flex-wrap">
            {CHAR_PRESETS.map((c) => (
              <button
                key={c}
                onClick={() => setChar(c)}
                className={`w-7 h-7 text-xs font-mono rounded flex items-center justify-center transition-colors ${
                  char === c
                    ? 'bg-emerald-500 text-neutral-950 font-bold ring-2 ring-emerald-400/40'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Özel Seçenekler */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-neutral-300 block">
            Satır Numaralandırma
          </label>
          <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs text-neutral-400 hover:text-neutral-200">
            <input
              type="checkbox"
              checked={showRowNumbers}
              onChange={(e) => setShowRowNumbers(e.target.checked)}
              className="accent-emerald-500 w-4 h-4 rounded"
            />
            <span>[1] [2] Satır Numarası</span>
          </label>
        </div>
      </div>

      {/* Section 4: Aksiyon Butonları */}
      <div className="pt-2 space-y-2.5">
        <button
          onClick={onDraw}
          disabled={isAnimating}
          className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 disabled:opacity-50 text-neutral-950 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Konsola Çiz (Anında)</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onAnimatedDraw}
            disabled={isAnimating}
            className="py-2 px-3 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-850 disabled:opacity-50 text-neutral-200 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-neutral-700"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAnimating ? 'Çiziliyor...' : 'Adım Adım Çiz'}</span>
          </button>

          <button
            onClick={onReset}
            className="py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-neutral-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Konsolu Sıfırla</span>
          </button>
        </div>
      </div>
    </div>
  );
};
