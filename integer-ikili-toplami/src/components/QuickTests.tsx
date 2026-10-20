/**
 * @license
 * Enes Öztürk Hızlı Test ve Girdi Üreteci
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 */

import React, { useState } from 'react';
import { Dices, Play, Sparkles, TestTube2, Zap } from 'lucide-react';
import { sounds } from '../utils/audio';

interface Props {
  onSelectInput: (input: string) => void;
}

export const QuickTests: React.FC<Props> = ({ onSelectInput }) => {
  const [randomPairCount, setRandomPairCount] = useState<number>(4);
  const [includeIdentical, setIncludeIdentical] = useState<boolean>(true);

  const presets = [
    {
      title: 'Soru Resmi Örneği',
      input: '2 3 1 5 2 5 3 3',
      expected81: '5 6 7 81',
      badge: 'Resmi Örnek',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30'
    },
    {
      title: 'Tüm İkililer Eşit',
      input: '3 3 5 5 2 2 4 4',
      expected81: '81 625 16 256',
      badge: 'Kareler Testi',
      badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30'
    },
    {
      title: 'Tüm İkililer Farklı',
      input: '1 2 3 4 5 6 7 8',
      expected81: '3 7 11 15',
      badge: 'Toplam Testi',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
    },
    {
      title: 'Sıfır ve Negatif Sayılar',
      input: '-5 5 0 0 -3 -3 10 -2',
      expected81: '0 0 81 8',
      badge: 'Sınır Durum',
      badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
    },
    {
      title: 'Tek Sayıda Eleman (Uyarı)',
      input: '2 3 1 5 9',
      expected81: '5 6 (Son eleman 9 yalnız kalır)',
      badge: 'Uyarı Testi',
      badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/30'
    }
  ];

  const generateRandomPairs = () => {
    sounds.playKeyClick();
    const numbers: number[] = [];

    for (let i = 0; i < randomPairCount; i++) {
      // Rastgele sayı
      const num1 = Math.floor(Math.random() * 9) + 1;
      let num2: number;

      // Eşit sayı ihtimali
      if (includeIdentical && Math.random() < 0.4) {
        num2 = num1;
      } else {
        do {
          num2 = Math.floor(Math.random() * 9) + 1;
        } while (num2 === num1);
      }

      numbers.push(num1, num2);
    }

    const generated = numbers.join(' ');
    onSelectInput(generated);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <TestTube2 className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Hızlı Test Senaryoları & Girdi Üreteci
          </h3>
        </div>
        <span className="text-xs text-slate-500">Enes Öztürk Doğrulama Kiti</span>
      </div>

      {/* Hazır Test Butonları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {presets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => {
              sounds.playKeyClick();
              onSelectInput(preset.input);
            }}
            className="group p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 text-left transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300 group-hover:text-amber-300 transition">
                  {preset.title}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${preset.badgeColor}`}>
                  {preset.badge}
                </span>
              </div>
              <div className="font-mono text-xs text-amber-400 bg-slate-900 px-2 py-1 rounded border border-slate-800/80 mb-2 truncate">
                {preset.input}
              </div>
            </div>
            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
              <span className="truncate">Beklenen: {preset.expected81}</span>
              <span className="text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Rastgele İkili Üreteci */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Dices className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Rastgele İkili Üreteci
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Dilediğiniz sayıda rastgele çift oluşturun ve doğrudan konsolda çalıştırın.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300">
            <span>İkili Adedi (n):</span>
            <select
              value={randomPairCount}
              onChange={(e) => setRandomPairCount(Number(e.target.value))}
              className="bg-slate-950 text-amber-300 font-bold px-2 py-0.5 rounded border border-slate-700 outline-none"
            >
              {[2, 3, 4, 5, 6, 8, 10].map((num) => (
                <option key={num} value={num}>
                  {num} İkili ({num * 2} Sayı)
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeIdentical}
              onChange={(e) => setIncludeIdentical(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0"
            />
            <span>Eşit Çift İhtimali Dahil</span>
          </label>

          <button
            onClick={generateRandomPairs}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-md shadow-amber-500/20 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Rastgele Üret & Gönder</span>
          </button>
        </div>
      </div>
    </div>
  );
};
