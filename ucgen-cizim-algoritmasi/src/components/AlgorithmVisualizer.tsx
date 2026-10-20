/**
 * @license
 * Telif Hakkı © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 */

import React from 'react';
import { Calculator, Cpu } from 'lucide-react';
import { RowCalculation } from '../core/types';

interface AlgorithmVisualizerProps {
  rows: RowCalculation[];
  size: number;
  char: string;
}

export const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({ rows, size, char }) => {
  if (rows.length === 0) return null;

  const totalCharacters = rows.reduce((acc, row) => acc + row.charCount, 0);

  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-semibold text-neutral-200">
            Algoritma & Matematiksel Analiz (DRY İncelemesi)
          </h3>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
          <span>Yükseklik (n): <strong className="text-emerald-400 font-bold">{size}</strong></span>
          <span>·</span>
          <span>Toplam Karakter: <strong className="text-emerald-400 font-bold">{totalCharacters}</strong></span>
          <span>·</span>
          <span>Karakter: <strong className="text-emerald-400 font-bold">{char}</strong></span>
        </div>
      </div>

      <p className="text-xs text-neutral-400 leading-relaxed">
        Aşağıdaki tablo, <code className="text-emerald-300">TriangleGeometryCalculator</code> sınıfının her bir satır döngüsünde
        DRY mantığıyla ürettiği değerleri ve matematiksel formül karşılıklarını göstermektedir:
      </p>

      {/* Row by row table */}
      <div className="overflow-x-auto max-h-56 overflow-y-auto rounded-lg border border-neutral-800">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-neutral-950/80 text-neutral-400 border-b border-neutral-800 sticky top-0">
            <tr>
              <th className="py-2 px-3 font-semibold text-neutral-300">Döngü (i)</th>
              <th className="py-2 px-3 font-semibold text-neutral-300">Boşluk Adedi</th>
              <th className="py-2 px-3 font-semibold text-neutral-300">Karakter Adedi</th>
              <th className="py-2 px-3 font-semibold text-neutral-300">Formül Açıklaması</th>
              <th className="py-2 px-3 font-semibold text-neutral-300">Görsel Önizleme</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
            {rows.map((row) => (
              <tr key={row.rowIndex} className="hover:bg-neutral-800/30 transition-colors">
                <td className="py-1.5 px-3 font-bold text-emerald-400">
                  i = {row.rowIndex}
                </td>
                <td className="py-1.5 px-3 text-amber-300">
                  {row.leadingSpaces} boşluk
                </td>
                <td className="py-1.5 px-3 text-cyan-300">
                  {row.charCount} adet
                </td>
                <td className="py-1.5 px-3 text-neutral-400 text-[11px]">
                  {row.formulaNote}
                </td>
                <td className="py-1.5 px-3 text-neutral-100 font-bold tracking-widest whitespace-pre">
                  {row.formattedRow}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-neutral-400 bg-neutral-950/60 p-2.5 rounded border border-neutral-800/80">
        <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>
          <strong>Zaman Karmaşıklığı (Time Complexity):</strong> O(n) döngü adımı, O(n²) toplam karakter üretimi.
          Hafıza Karmaşıklığı (Space Complexity): O(n²) string tampon belleği.
        </span>
      </div>
    </div>
  );
};
