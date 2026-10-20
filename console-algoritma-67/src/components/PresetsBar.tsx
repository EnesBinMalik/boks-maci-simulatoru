import React from 'react';
import { PRESETS } from '../utils/algorithm';
import { PresetExample } from '../types/algorithm';
import { PlayCircle } from 'lucide-react';

interface PresetsBarProps {
  onSelectPreset: (preset: PresetExample) => void;
  currentInput: string;
}

export const PresetsBar: React.FC<PresetsBarProps> = ({
  onSelectPreset,
  currentInput,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="font-semibold text-slate-300">Hazır Test Senaryoları:</span>
        <span>Doğrudan konsola yüklemek için tıklayın</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5">
        {PRESETS.map((p, idx) => {
          const isActive = currentInput.trim() === p.input;
          return (
            <button
              key={idx}
              onClick={() => onSelectPreset(p)}
              className={`p-3 rounded-lg text-left transition-all border ${
                isActive
                  ? 'bg-cyan-500/10 border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-xs font-semibold text-white truncate">
                  {p.title}
                </span>
                <PlayCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              </div>
              <div className="font-mono text-xs font-bold text-cyan-400 tracking-wide mb-1">
                {p.input}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate">{p.description}</span>
                <span className="font-mono text-emerald-400 font-semibold shrink-0 ml-1">
                  -&gt; {p.expectedOutput}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
