/**
 * @file GoldenSpiralVisualizer.tsx
 * @description Fibonacci kareleri ve Altın Spiral'in (Logaritmik Spiral)
 * dinamik SVG tabanlı geometrik çizimi ve interaktif görselleştiricisi.
 */

import React, { useState } from 'react';
import { FibonacciTerm } from '../core/FibonacciGenerator';
import { ZoomIn, ZoomOut, RotateCcw, Compass, Eye, Sparkles } from 'lucide-react';

interface GoldenSpiralVisualizerProps {
  terms: FibonacciTerm[];
  depth: number;
}

interface SquareBox {
  index: number;
  val: number;
  x: number;
  y: number;
  size: number;
  arcPath: string;
  label: string;
}

export const GoldenSpiralVisualizer: React.FC<GoldenSpiralVisualizerProps> = ({ terms, depth }) => {
  const [zoom, setZoom] = useState<number>(1);
  const [activeSquareIndex, setActiveSquareIndex] = useState<number | null>(null);

  // Görsel çizim için ilk 10 terimi (en fazla 12) orantısal ölçeklendirme ile kullanıyoruz
  const maxDisplayTerms = Math.min(10, terms.length);
  const visualTerms = terms.slice(0, maxDisplayTerms);

  // Karelerin ve spiral yaylarının koordinatlarını hesaplama
  // Yön dizilimi: Sağ, Yukarı, Sol, Aşağı...
  const squares: SquareBox[] = [];
  
  let currentX = 0;
  let currentY = 0;
  let direction = 0; // 0: Right, 1: Up, 2: Left, 3: Down

  // Referans ölçek için Fibonacci değerleri (küçük sayılar)
  const numericValues = visualTerms.map(t => Number(t.value));

  // Geometrik kutuları kurma
  // Başlangıç F_1 = 1, F_2 = 1, F_3 = 2, F_4 = 3, F_5 = 5, F_6 = 8...
  for (let i = 0; i < visualTerms.length; i++) {
    const size = numericValues[i];
    let x = currentX;
    let y = currentY;
    let arcPath = '';

    if (i === 0) {
      x = 0;
      y = 0;
      arcPath = `M ${x} ${y + size} A ${size} ${size} 0 0 1 ${x + size} ${y}`;
      currentX = size;
      currentY = 0;
      direction = 1; // Bir sonraki yukarı
    } else if (direction === 1) { // Yukarı
      x = currentX - size;
      y = currentY - size;
      arcPath = `M ${x} ${y + size} A ${size} ${size} 0 0 1 ${x + size} ${y + size}`;
      currentX = x;
      currentY = y;
      direction = 2; // Sonraki sol
    } else if (direction === 2) { // Sol
      x = currentX - size;
      y = currentY;
      arcPath = `M ${x + size} ${y + size} A ${size} ${size} 0 0 1 ${x + size} ${y}`;
      currentX = x;
      currentY = y + size;
      direction = 3; // Sonraki aşağı
    } else if (direction === 3) { // Aşağı
      x = currentX;
      y = currentY;
      arcPath = `M ${x + size} ${y} A ${size} ${size} 0 0 1 ${x} ${y}`;
      currentX = x + size;
      currentY = y + size;
      direction = 0; // Sonraki sağ
    } else if (direction === 0) { // Sağ
      x = currentX;
      y = currentY - size;
      arcPath = `M ${x} ${y} A ${size} ${size} 0 0 1 ${x} ${y + size}`;
      currentX = x + size;
      currentY = y;
      direction = 1;
    }

    squares.push({
      index: i + 1,
      val: size,
      x,
      y,
      size,
      arcPath,
      label: `F${i + 1}=${size}`
    });
  }

  // Bounding box hesapla
  let minX = 0, maxX = 1, minY = 0, maxY = 1;
  squares.forEach(sq => {
    minX = Math.min(minX, sq.x);
    maxX = Math.max(maxX, sq.x + sq.size);
    minY = Math.min(minY, sq.y);
    maxY = Math.max(maxY, sq.y + sq.size);
  });

  const width = Math.max(1, maxX - minX);
  const height = Math.max(1, maxY - minY);
  const padding = Math.max(width, height) * 0.1;
  const viewBox = `${minX - padding} ${minY - padding} ${width + padding * 2} ${height + padding * 2}`;

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-sm shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Geometrik Altın Oran Modeli</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Fibonacci Kareleri ve Logaritmik Spiral
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Her karenin kenar uzunluğu ilgili Fibonacci sayısına eşittir ({visualTerms.slice(0, 6).map(t => t.stringValue).join(', ')}...).
          </p>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setZoom(prev => Math.max(0.5, prev - 0.2))}
              aria-label="Uzaklaş"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-2 text-slate-300 tabular-nums">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom(prev => Math.min(2.5, prev + 0.2))}
              aria-label="Yakınlaş"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoom(1)}
              aria-label="Sıfırla"
              className="p-1.5 text-slate-400 hover:text-amber-400 rounded-lg transition-colors ml-1"
              title="Ölçeği Sıfırla"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full h-[380px] lg:h-[460px] bg-slate-950 rounded-xl border border-slate-800/80 overflow-hidden flex items-center justify-center p-4">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <svg
          viewBox={viewBox}
          className="w-full h-full transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Fibonacci Squares */}
          {squares.map((sq) => {
            const isHovered = activeSquareIndex === sq.index;
            return (
              <g
                key={sq.index}
                onMouseEnter={() => setActiveSquareIndex(sq.index)}
                onMouseLeave={() => setActiveSquareIndex(null)}
                className="cursor-pointer transition-all"
              >
                <rect
                  x={sq.x}
                  y={sq.y}
                  width={sq.size}
                  height={sq.size}
                  fill={isHovered ? 'rgba(245, 158, 11, 0.18)' : 'rgba(30, 41, 59, 0.45)'}
                  stroke={isHovered ? '#fbbf24' : '#475569'}
                  strokeWidth={Math.max(0.4, (width + height) * 0.002)}
                  className="transition-colors duration-200"
                />
                {/* Text Label inside square */}
                {sq.size > (width + height) * 0.03 && (
                  <text
                    x={sq.x + sq.size / 2}
                    y={sq.y + sq.size / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isHovered ? '#fef08a' : '#94a3b8'}
                    fontSize={Math.max(1, sq.size * 0.22)}
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="bold"
                    className="select-none pointer-events-none"
                  >
                    {sq.val}
                  </text>
                )}
              </g>
            );
          })}

          {/* Golden Spiral Arcs */}
          {squares.map((sq) => (
            <path
              key={`arc-${sq.index}`}
              d={sq.arcPath}
              fill="none"
              stroke="#f59e0b"
              strokeWidth={Math.max(0.8, (width + height) * 0.006)}
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
            />
          ))}
        </svg>

        {/* Floating square detail info */}
        {activeSquareIndex && (
          <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-amber-400/40 rounded-xl px-4 py-2.5 backdrop-blur-md text-xs shadow-xl flex items-center gap-3">
            <span className="font-mono text-amber-400 font-bold">
              Kare #{activeSquareIndex}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-white font-mono">
              Kenar = {terms[activeSquareIndex - 1]?.stringValue}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Karelerin üzerine gelerek terim değerlerini inceleyebilirsiniz.</span>
        </div>
        <div className="font-mono text-slate-500">
          İlk {visualTerms.length} terimin geometrik yerleşimi gösterilmektedir.
        </div>
      </div>
    </div>
  );
};
