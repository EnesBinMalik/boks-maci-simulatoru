/**
 * @license
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * Görsel Geometri & İnteraktif Hesaplama Laboratuvarı
 */

import React, { useState } from 'react';
import { SHAPES_CONFIG, AUTHOR_NAME, COPYRIGHT_NOTICE } from '../data/shapesConfig';
import { GeometryEngine } from '../services/geometryEngine';
import { CalculationType } from '../types/geometry';
import { Calculator, CheckCircle2, Sliders, Info, ShieldAlert } from 'lucide-react';

export const VisualCalculator: React.FC = () => {
  const [selectedShapeId, setSelectedShapeId] = useState<string>('circle');
  const [unit, setUnit] = useState<string>('cm');

  // Her şeklin parametrelerini saklayan state
  const [params, setParams] = useState<Record<string, Record<string, number>>>(() => {
    const init: Record<string, Record<string, number>> = {};
    SHAPES_CONFIG.forEach((shape) => {
      init[shape.id] = {};
      shape.parameters.forEach((p) => {
        init[shape.id][p.id] = p.defaultValue;
      });
    });
    return init;
  });

  const activeShape = SHAPES_CONFIG.find((s) => s.id === selectedShapeId) || SHAPES_CONFIG[0];
  const activeParams = params[activeShape.id] || {};

  const handleParamChange = (paramId: string, val: number) => {
    setParams((prev) => ({
      ...prev,
      [activeShape.id]: {
        ...prev[activeShape.id],
        [paramId]: val
      }
    }));
  };

  // Üçgen validasyon kontrolü
  let triangleError: string | null = null;
  if (activeShape.id === 'triangle') {
    const v = GeometryEngine.validateTriangle(
      activeParams.sideA || 1,
      activeParams.sideB || 1,
      activeParams.sideC || 1
    );
    if (!v.isValid) {
      triangleError = v.error || 'Geçersiz üçgen kenarları';
    }
  }

  // Hesaplama sonuçları
  let calculationResult = null;
  let calculationError = null;

  try {
    const defaultCalcType: CalculationType = activeShape.category === '2D' ? 'both' : 'all';
    calculationResult = GeometryEngine.calculate(activeShape.id, activeParams, defaultCalcType, unit);
  } catch (err: unknown) {
    calculationError = err instanceof Error ? err.message : String(err);
  }

  // SVG Görsel Çizim Fonksiyonu
  const renderShapeVisual = () => {
    const viewBox = '0 0 320 260';

    if (activeShape.id === 'circle') {
      const r = activeParams.radius || 5;
      const visualR = Math.min(100, Math.max(25, r * 10));
      return (
        <svg viewBox={viewBox} className="w-full h-full">
          {/* Arka plan ızgarası */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="320" height="260" fill="url(#grid)" />

          {/* Daire gövdesi */}
          <circle
            cx="160"
            cy="130"
            r={visualR}
            fill="#0284c7"
            fillOpacity="0.15"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeDasharray="none"
          />
          {/* Merkez Noktası */}
          <circle cx="160" cy="130" r="4" fill="#38bdf8" />

          {/* Yarıçap Çizgisi */}
          <line
            x1="160"
            y1="130"
            x2={160 + visualR}
            y2="130"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeDasharray="4 2"
          />
          {/* Yarıçap etiketi */}
          <text
            x={160 + visualR / 2}
            y="120"
            fill="#fbbf24"
            fontSize="12"
            fontFamily="monospace"
            textAnchor="middle"
            fontWeight="bold"
          >
            r = {r} {unit}
          </text>
        </svg>
      );
    }

    if (activeShape.id === 'square') {
      const a = activeParams.side || 5;
      const size = Math.min(180, Math.max(50, a * 15));
      const x = 160 - size / 2;
      const y = 130 - size / 2;
      return (
        <svg viewBox={viewBox} className="w-full h-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="320" height="260" fill="url(#grid)" />

          <rect
            x={x}
            y={y}
            width={size}
            height={size}
            fill="#0284c7"
            fillOpacity="0.15"
            stroke="#38bdf8"
            strokeWidth="3"
            rx="2"
          />
          {/* Kenar ölçü oku */}
          <line x1={x} y1={y + size + 16} x2={x + size} y2={y + size + 16} stroke="#f59e0b" strokeWidth="2" />
          <text
            x="160"
            y={y + size + 32}
            fill="#fbbf24"
            fontSize="12"
            fontFamily="monospace"
            textAnchor="middle"
            fontWeight="bold"
          >
            a = {a} {unit}
          </text>
        </svg>
      );
    }

    if (activeShape.id === 'rectangle') {
      const w = activeParams.width || 4;
      const h = activeParams.height || 8;
      const visualW = Math.min(220, Math.max(60, w * 14));
      const visualH = Math.min(160, Math.max(40, h * 12));
      const x = 160 - visualW / 2;
      const y = 130 - visualH / 2;

      return (
        <svg viewBox={viewBox} className="w-full h-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="320" height="260" fill="url(#grid)" />

          <rect
            x={x}
            y={y}
            width={visualW}
            height={visualH}
            fill="#0284c7"
            fillOpacity="0.15"
            stroke="#38bdf8"
            strokeWidth="3"
            rx="2"
          />
          {/* Genişlik etiketi */}
          <text
            x={160}
            y={y + visualH + 20}
            fill="#fbbf24"
            fontSize="12"
            fontFamily="monospace"
            textAnchor="middle"
            fontWeight="bold"
          >
            a = {w} {unit}
          </text>
          {/* Yükseklik etiketi */}
          <text
            x={x - 12}
            y={130}
            fill="#34d399"
            fontSize="12"
            fontFamily="monospace"
            textAnchor="end"
            fontWeight="bold"
          >
            b = {h} {unit}
          </text>
        </svg>
      );
    }

    if (activeShape.id === 'triangle') {
      const a = activeParams.sideA || 6;
      const b = activeParams.sideB || 8;
      const c = activeParams.sideC || 10;

      return (
        <svg viewBox={viewBox} className="w-full h-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="320" height="260" fill="url(#grid)" />

          {/* Üçgen Çizimi */}
          <polygon
            points="160,50 60,200 260,200"
            fill="#0284c7"
            fillOpacity="0.15"
            stroke="#38bdf8"
            strokeWidth="3"
          />
          {/* Kenar Etiketleri */}
          <text x="160" y="222" fill="#fbbf24" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            a (Taban) = {a} {unit}
          </text>
          <text x="90" y="120" fill="#34d399" fontSize="12" fontFamily="monospace" textAnchor="end" fontWeight="bold">
            b = {b} {unit}
          </text>
          <text x="230" y="120" fill="#a78bfa" fontSize="12" fontFamily="monospace" textAnchor="start" fontWeight="bold">
            c = {c} {unit}
          </text>
        </svg>
      );
    }

    if (activeShape.id === 'cube') {
      const a = activeParams.edge || 5;
      return (
        <svg viewBox={viewBox} className="w-full h-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="320" height="260" fill="url(#grid)" />

          {/* 3D İzometrik Küp Çizimi */}
          <g transform="translate(160, 130)">
            {/* Üst yüzey */}
            <polygon points="0,-60 65,-25 0,10 -65,-25" fill="#38bdf8" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="2" />
            {/* Sol yüzey */}
            <polygon points="-65,-25 0,10 0,85 -65,50" fill="#0284c7" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2" />
            {/* Sağ yüzey */}
            <polygon points="0,10 65,-25 65,50 0,85" fill="#0369a1" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2" />
          </g>

          <text x="160" y="240" fill="#fbbf24" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            Ayrıt (a) = {a} {unit} · 6 Yüzey · 12 Ayrıt
          </text>
        </svg>
      );
    }

    if (activeShape.id === 'cylinder') {
      const r = activeParams.radius || 4;
      const h = activeParams.height || 10;
      return (
        <svg viewBox={viewBox} className="w-full h-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="320" height="260" fill="url(#grid)" />

          {/* Silindir Gövdesi */}
          <g transform="translate(160, 130)">
            {/* Yan Yüzey Gövdesi */}
            <rect x="-60" y="-50" width="120" height="100" fill="#0284c7" fillOpacity="0.2" />
            <line x1="-60" y1="-50" x2="-60" y2="50" stroke="#38bdf8" strokeWidth="2.5" />
            <line x1="60" y1="-50" x2="60" y2="50" stroke="#38bdf8" strokeWidth="2.5" />

            {/* Alt Elips */}
            <ellipse cx="0" cy="50" rx="60" ry="20" fill="#0369a1" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2.5" />
            {/* Üst Elips */}
            <ellipse cx="0" cy="-50" rx="60" ry="20" fill="#38bdf8" fillOpacity="0.35" stroke="#38bdf8" strokeWidth="2.5" />

            {/* Yarıçap çizgisi */}
            <line x1="0" y1="-50" x2="60" y2="-50" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
          </g>

          <text x="160" y="70" fill="#fbbf24" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            r = {r} {unit}
          </text>
          <text x="240" y="135" fill="#34d399" fontSize="12" fontFamily="monospace" textAnchor="start" fontWeight="bold">
            h = {h} {unit}
          </text>
        </svg>
      );
    }

    if (activeShape.id === 'sphere') {
      const r = activeParams.radius || 5;
      return (
        <svg viewBox={viewBox} className="w-full h-full">
          <defs>
            <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#0284c7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
            </radialGradient>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="320" height="260" fill="url(#grid)" />

          <g transform="translate(160, 130)">
            {/* Küre Gövdesi */}
            <circle cx="0" cy="0" r="75" fill="url(#sphereGrad)" stroke="#38bdf8" strokeWidth="2.5" />
            {/* Ekvator Çizgisi */}
            <ellipse cx="0" cy="0" rx="75" ry="22" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8" />
            {/* Yarıçap Çizgisi */}
            <line x1="0" y1="0" x2="75" y2="0" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
            <circle cx="0" cy="0" r="3" fill="#f59e0b" />
          </g>

          <text x="195" y="122" fill="#fbbf24" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            r = {r} {unit}
          </text>
        </svg>
      );
    }

    // Default / Dikdörtgenler Prizması
    const a = activeParams.width || 4;
    const b = activeParams.length || 6;
    const h = activeParams.height || 8;
    return (
      <svg viewBox={viewBox} className="w-full h-full">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="320" height="260" fill="url(#grid)" />

        <g transform="translate(160, 130)">
          <polygon points="-80,-40 20,-70 90,-40 -10,-10" fill="#38bdf8" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="2" />
          <polygon points="-80,-40 -10,-10 -10,60 -80,30" fill="#0284c7" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2" />
          <polygon points="-10,-10 90,-40 90,30 -10,60" fill="#0369a1" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2" />
        </g>
        <text x="160" y="240" fill="#fbbf24" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
          {a} x {b} x {h} {unit}
        </text>
      </svg>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Şekil Seçim Kartları */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-cyan-400" />
            <span>Geometrik Şekil & Parametre Laboratuvarı</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ölçüleri interaktif olarak değiştirin; C# motorunun adım adım formül sonuçlarını canlı izleyin.
          </p>
        </div>

        {/* Birim Seçici */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Uzunluk Birimi:</span>
          {(['cm', 'm', 'mm'] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                unit === u
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      {/* Şekil Seçim Sekmeleri (2D & 3D Gruplu) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {SHAPES_CONFIG.map((shape) => {
          const isSelected = shape.id === selectedShapeId;
          return (
            <button
              key={shape.id}
              onClick={() => setSelectedShapeId(shape.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-950/50'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className={`text-xs font-mono px-1.5 py-0.2 rounded ${
                  shape.category === '2D' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {shape.category}
                </span>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
              </div>
              <span className={`text-sm font-semibold truncate ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                {shape.turkishName}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2 Sütunlu Çalışma Alanı: Sol Görsel Çizim + Sağ Parametreler & Canlı Sonuçlar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sol Kolon: SVG Çizim ve Şekil Bilgi Kartı */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-xl">
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Dinamik Geometrik Model
              </span>
              <span className="text-xs font-mono text-cyan-400 font-semibold">
                {activeShape.turkishName} ({activeShape.category})
              </span>
            </div>

            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 flex items-center justify-center">
              {renderShapeVisual()}
            </div>

            <p className="text-xs text-slate-400 mt-3 text-center leading-relaxed">
              {activeShape.description}
            </p>
          </div>

          {/* Formül Rehberi */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              Kullanılan Matematiksel Formüller
            </h4>
            <div className="space-y-2">
              {activeShape.availableCalculations.map((calc) => (
                <div key={calc.id} className="flex items-center justify-between text-xs bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-300">{calc.label}:</span>
                  <span className="font-mono text-cyan-400 font-bold">{calc.formula}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sağ Kolon: Parametre Sliders ve Adım Adım C# Hesap Raporu */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Parametre Ayarları */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg">
            <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center justify-between">
              <span>{activeShape.turkishName} Kenar ve Ölçü Girişi</span>
              <span className="text-xs font-mono text-slate-400">SRP: Input Handling</span>
            </h3>

            {triangleError && (
              <div className="mb-4 p-3 bg-rose-950/50 border border-rose-800 rounded-xl flex items-start gap-2.5 text-xs text-rose-300">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Üçgen Eşitsizliği Uyarısı:</span> {triangleError}
                </div>
              </div>
            )}

            <div className="space-y-4">
              {activeShape.parameters.map((param) => {
                const currentVal = activeParams[param.id] ?? param.defaultValue;
                return (
                  <div key={param.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <label htmlFor={param.id} className="font-medium text-slate-300">
                        {param.name} ({param.symbol}):
                      </label>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          id={param.id}
                          min={param.min}
                          max={param.max}
                          step={param.step}
                          value={currentVal}
                          onChange={(e) => handleParamChange(param.id, parseFloat(e.target.value) || 0.1)}
                          className="w-20 px-2 py-0.5 text-right font-mono bg-slate-950 border border-slate-700 rounded text-cyan-300 focus:outline-none focus:border-cyan-500 text-xs"
                        />
                        <span className="font-mono text-slate-400">{unit}</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      step={param.step}
                      value={currentVal}
                      onChange={(e) => handleParamChange(param.id, parseFloat(e.target.value))}
                      className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>{param.min} {unit}</span>
                      <span>{param.description}</span>
                      <span>{param.max} {unit}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hesaplama Sonuçları Kartı */}
          {calculationResult && !triangleError && (
            <div className="p-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-900/60 rounded-2xl shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                    C# Motoru Hesap Raporu
                  </span>
                  <h3 className="text-base font-bold text-slate-100">
                    {calculationResult.calculationTitle}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                    {calculationResult.primaryValue.toLocaleString('tr-TR', { maximumFractionDigits: 4 })}
                  </span>
                  <span className="text-xs font-mono text-emerald-300 ml-1">
                    {calculationResult.primaryUnit}
                  </span>
                </div>
              </div>

              {/* Sayısal Özet Çizelgesi */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(calculationResult.numericValues).map(([lbl, val]) => (
                  <div key={lbl} className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-xl">
                    <span className="text-[11px] text-slate-400 block truncate">{lbl}</span>
                    <span className="text-sm font-bold font-mono text-cyan-300 tabular-nums">
                      {val.toLocaleString('tr-TR', { maximumFractionDigits: 4 })}
                    </span>
                  </div>
                ))}
              </div>

              {/* Adım Adım Çözüm Kutusu */}
              <div className="space-y-2 mt-1">
                <h4 className="text-xs font-semibold text-slate-300">
                  Adım Adım Matematiksel Açıklama:
                </h4>
                {calculationResult.steps.map((st, i) => (
                  <div key={i} className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                      <span>{st.title}</span>
                      <span className="font-mono text-emerald-400">{st.result}</span>
                    </div>
                    <div className="text-xs font-mono text-cyan-400">
                      {st.formula}
                    </div>
                    <div className="text-xs text-amber-300 font-mono">
                      Yerine Koyma: {st.substitution}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {st.explanation}
                    </div>
                  </div>
                ))}
              </div>

              {/* Anlaşılır Özet & Enes Öztürk İmzası */}
              <div className="p-3 bg-cyan-950/30 border border-cyan-800/50 rounded-xl text-xs space-y-1">
                <p className="text-cyan-200 font-medium">
                  {calculationResult.formattedSummary}
                </p>
                <p className="text-slate-400 text-[11px] pt-1 border-t border-cyan-900/40">
                  Telif Hakkı (c) 2026 {AUTHOR_NAME} - {COPYRIGHT_NOTICE}
                </p>
              </div>
            </div>
          )}

          {calculationError && (
            <div className="p-4 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 text-xs">
              Hesaplama Hatası: {calculationError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
