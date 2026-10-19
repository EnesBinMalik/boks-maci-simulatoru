import React from 'react';
import { Play, Pause, SkipForward, RotateCcw, FastForward, SlidersHorizontal, AlertTriangle } from 'lucide-react';

interface CombatControlsProps {
  isFighting: boolean;
  isPaused: boolean;
  isFinished: boolean;
  speed: number;
  weightMismatch: boolean;
  onStart: () => void;
  onPauseToggle: () => void;
  onNextStep: () => void;
  onFastForward: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onOpenEditor: () => void;
}

export const CombatControls: React.FC<CombatControlsProps> = ({
  isFighting,
  isPaused,
  isFinished,
  speed,
  weightMismatch,
  onStart,
  onPauseToggle,
  onNextStep,
  onFastForward,
  onReset,
  onSpeedChange,
  onOpenEditor,
}) => {
  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col gap-3">
      {weightMismatch && (
        <div className="flex items-center gap-2 p-3 bg-red-950/50 border border-red-500/40 rounded-xl text-red-300 text-xs font-mono">
          <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
          <span>
            Hata: Sporcuların ağırlıkları ring limitlerine uymuyor! Lütfen ağırlıkları düzenleyin.
          </span>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Main action buttons */}
        <div className="flex items-center gap-2">
          {!isFighting && !isFinished ? (
            <button
              onClick={onStart}
              disabled={weightMismatch}
              className="py-2.5 px-5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Dövüşü Başlat (%50 Seçim)</span>
            </button>
          ) : isFighting ? (
            <button
              onClick={onPauseToggle}
              className="py-2.5 px-5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl border border-slate-700 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Devam Et</span>
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Duraklat</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={onReset}
              className="py-2.5 px-5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Yeni Karşılaşma</span>
            </button>
          )}

          {/* Step forward */}
          <button
            onClick={onNextStep}
            disabled={!isFighting || (!isPaused && isFighting)}
            title="Tek bir vuruş adımı ilerle (Önce duraklatınız)"
            className="p-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 rounded-xl border border-slate-700 transition-colors cursor-pointer"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Fast forward to end */}
          <button
            onClick={onFastForward}
            disabled={!isFighting}
            title="Maçı anında sonuçlandır"
            className="p-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 rounded-xl border border-slate-700 transition-colors cursor-pointer"
          >
            <FastForward className="w-4 h-4" />
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            title="Sıfırla"
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Speed & Customization */}
        <div className="flex items-center gap-3">
          {/* Speed selector */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            {[1, 2, 4].map((spd) => (
              <button
                key={spd}
                onClick={() => onSpeedChange(spd)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  speed === spd
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Boxer config button */}
          <button
            onClick={onOpenEditor}
            disabled={isFighting}
            className="py-2 px-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Dövüşçü Ayarları</span>
            <span className="sm:hidden">Ayar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
