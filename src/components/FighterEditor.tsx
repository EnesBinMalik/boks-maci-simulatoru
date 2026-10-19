import React, { useState } from 'react';
import { X, Check, RotateCcw, Shield, Zap, Scale, Heart } from 'lucide-react';
import { FighterData, RingConfig } from '../types/boxing';

interface FighterEditorProps {
  isOpen: boolean;
  onClose: () => void;
  f1: FighterData;
  f2: FighterData;
  ring: RingConfig;
  onSave: (newF1: FighterData, newF2: FighterData, newRing: RingConfig) => void;
}

export const FighterEditor: React.FC<FighterEditorProps> = ({
  isOpen,
  onClose,
  f1,
  f2,
  ring,
  onSave,
}) => {
  const [f1State, setF1State] = useState<FighterData>({ ...f1 });
  const [f2State, setF2State] = useState<FighterData>({ ...f2 });
  const [ringState, setRingState] = useState<RingConfig>({ ...ring });

  if (!isOpen) return null;

  const handleApplyPreset = (presetKey: 'default' | 'balanced' | 'champions') => {
    if (presetKey === 'default') {
      setF1State({
        ...f1State,
        name: 'Marc',
        damage: 15,
        health: 100,
        maxHealth: 100,
        weight: 90,
        dodge: 20,
      });
      setF2State({
        ...f2State,
        name: 'Alex',
        damage: 10,
        health: 95,
        maxHealth: 95,
        weight: 100,
        dodge: 30,
      });
      setRingState({ minWeight: 90, maxWeight: 100 });
    } else if (presetKey === 'balanced') {
      setF1State({
        ...f1State,
        name: 'Boksör A',
        damage: 15,
        health: 100,
        maxHealth: 100,
        weight: 95,
        dodge: 25,
      });
      setF2State({
        ...f2State,
        name: 'Boksör B',
        damage: 15,
        health: 100,
        maxHealth: 100,
        weight: 95,
        dodge: 25,
      });
      setRingState({ minWeight: 80, maxWeight: 110 });
    } else if (presetKey === 'champions') {
      setF1State({
        ...f1State,
        name: 'Muhammed Ali',
        damage: 22,
        health: 120,
        maxHealth: 120,
        weight: 98,
        dodge: 40,
      });
      setF2State({
        ...f2State,
        name: 'Mike Tyson',
        damage: 30,
        health: 110,
        maxHealth: 110,
        weight: 100,
        dodge: 20,
      });
      setRingState({ minWeight: 90, maxWeight: 115 });
    }
  };

  const handleSave = () => {
    onSave(f1State, f2State, ringState);
    onClose();
  };

  const isF1WeightOk = f1State.weight >= ringState.minWeight && f1State.weight <= ringState.maxWeight;
  const isF2WeightOk = f2State.weight >= ringState.minWeight && f2State.weight <= ringState.maxWeight;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">Dövüşçü ve Ring Ayarları</h3>
            <p className="text-xs text-slate-400">Parametreleri Java sınıfı kurallarına göre özelleştirin</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets Bar */}
        <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 whitespace-nowrap">Hazır Şablonlar:</span>
          <button
            onClick={() => handleApplyPreset('default')}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg whitespace-nowrap transition-colors cursor-pointer"
          >
            Ödev (Marc vs Alex)
          </button>
          <button
            onClick={() => handleApplyPreset('balanced')}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg whitespace-nowrap transition-colors cursor-pointer"
          >
            Eşit Güçler (%50 Şans)
          </button>
          <button
            onClick={() => handleApplyPreset('champions')}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg whitespace-nowrap transition-colors cursor-pointer"
          >
            Ali vs Tyson
          </button>
        </div>

        {/* Content Form */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Ring Weight Limits */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-3">
              Ring Ağırlık Kuralları (checkWeight)
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Minimum Ağırlık (kg)</label>
                <input
                  type="number"
                  min="40"
                  max="150"
                  value={ringState.minWeight}
                  onChange={(e) => setRingState({ ...ringState, minWeight: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Maksimum Ağırlık (kg)</label>
                <input
                  type="number"
                  min="40"
                  max="150"
                  value={ringState.maxWeight}
                  onChange={(e) => setRingState({ ...ringState, maxWeight: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Fighters grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Fighter 1 (Blue) */}
            <div className="p-4 bg-slate-950 rounded-xl border border-blue-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase">
                  Dövüşçü 1 (f1 - Mavi)
                </span>
                <span
                  className={`text-[11px] font-mono ${
                    isF1WeightOk ? 'text-emerald-400' : 'text-rose-400 font-bold'
                  }`}
                >
                  {isF1WeightOk ? 'Ağırlık Uygun' : 'Kategori Dışı!'}
                </span>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">İsim</label>
                <input
                  type="text"
                  value={f1State.name}
                  onChange={(e) => setF1State({ ...f1State, name: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white font-semibold focus:outline-none focus:border-blue-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="flex items-center gap-1 text-slate-400 mb-1">
                    <Heart className="w-3 h-3 text-rose-400" />
                    <span>Can (Health)</span>
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="500"
                    value={f1State.maxHealth}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setF1State({ ...f1State, maxHealth: val, health: val });
                    }}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg font-mono text-white"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1 text-slate-400 mb-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>Hasar (Damage)</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={f1State.damage}
                    onChange={(e) => setF1State({ ...f1State, damage: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg font-mono text-white"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1 text-slate-400 mb-1">
                    <Scale className="w-3 h-3 text-slate-400" />
                    <span>Ağırlık (kg)</span>
                  </label>
                  <input
                    type="number"
                    min="40"
                    max="150"
                    value={f1State.weight}
                    onChange={(e) => setF1State({ ...f1State, weight: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg font-mono text-white"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1 text-slate-400 mb-1">
                    <Shield className="w-3 h-3 text-cyan-400" />
                    <span>Savurma (%)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="99"
                    value={f1State.dodge}
                    onChange={(e) => setF1State({ ...f1State, dodge: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg font-mono text-white"
                  />
                </div>
              </div>
            </div>

            {/* Fighter 2 (Red) */}
            <div className="p-4 bg-slate-950 rounded-xl border border-red-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase">
                  Dövüşçü 2 (f2 - Kırmızı)
                </span>
                <span
                  className={`text-[11px] font-mono ${
                    isF2WeightOk ? 'text-emerald-400' : 'text-rose-400 font-bold'
                  }`}
                >
                  {isF2WeightOk ? 'Ağırlık Uygun' : 'Kategori Dışı!'}
                </span>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">İsim</label>
                <input
                  type="text"
                  value={f2State.name}
                  onChange={(e) => setF2State({ ...f2State, name: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white font-semibold focus:outline-none focus:border-rose-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="flex items-center gap-1 text-slate-400 mb-1">
                    <Heart className="w-3 h-3 text-rose-400" />
                    <span>Can (Health)</span>
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="500"
                    value={f2State.maxHealth}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setF2State({ ...f2State, maxHealth: val, health: val });
                    }}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg font-mono text-white"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1 text-slate-400 mb-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>Hasar (Damage)</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={f2State.damage}
                    onChange={(e) => setF2State({ ...f2State, damage: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg font-mono text-white"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1 text-slate-400 mb-1">
                    <Scale className="w-3 h-3 text-slate-400" />
                    <span>Ağırlık (kg)</span>
                  </label>
                  <input
                    type="number"
                    min="40"
                    max="150"
                    value={f2State.weight}
                    onChange={(e) => setF2State({ ...f2State, weight: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg font-mono text-white"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1 text-slate-400 mb-1">
                    <Shield className="w-3 h-3 text-cyan-400" />
                    <span>Savurma (%)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="99"
                    value={f2State.dodge}
                    onChange={(e) => setF2State({ ...f2State, dodge: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg font-mono text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow"
          >
            <Check className="w-4 h-4" />
            <span>Ayarları Kaydet</span>
          </button>
        </div>
      </div>
    </div>
  );
};
