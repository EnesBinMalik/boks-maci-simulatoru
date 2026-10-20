/**
 * @license
 * Telif Hakkı © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 */

import React from 'react';
import { CheckCircle2, Shield, Layers, FileCode2, ArrowRight } from 'lucide-react';
import { SRP_EXPLANATION } from '../core/referenceImplementations';
import { AUTHOR_SIGNATURE } from '../core/types';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero Banner for Architecture */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl p-6 relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Shield className="w-4 h-4" />
            <span>YAZILIM MİMARİSİ VE TASARIM PRENSİPLERİ</span>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-neutral-100">
            Single Responsibility (SRP) ve DRY Uyumluluk Raporu
          </h2>

          <p className="text-xs text-neutral-400 leading-relaxed">
            {SRP_EXPLANATION.summary} Bu uygulamada her sınıf ve metot, yalnızca tek bir değişme sebebi olacak
            şekilde ayrıştırılmış, kod tekrarları (DRY) tamamen elimine edilmiştir.
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs text-neutral-400 font-mono">
            <span>Yazar & Telif Sahibi: <strong>{AUTHOR_SIGNATURE.author}</strong></span>
            <span>·</span>
            <span>Telif Yılı: <strong>{AUTHOR_SIGNATURE.year}</strong></span>
            <span>·</span>
            <span className="text-emerald-400">Tüm Hakları Saklıdır</span>
          </div>
        </div>
      </div>

      {/* Class Responsibility Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-neutral-200 flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Sınıf ve Metot Ayrıştırması (Single Responsibility Principle)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SRP_EXPLANATION.classes.map((cls, idx) => (
            <div
              key={cls.name}
              className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                    {cls.name}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500">
                    Sınıf #{idx + 1}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-neutral-100">
                    {cls.responsibility}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    <strong>Değişme Sebebi:</strong> {cls.reasonToChange}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-800/80 text-[11px] text-neutral-500 flex items-center gap-1.5">
                <span className="text-rose-400 font-medium">Sınır:</span>
                <span>{cls.doesNotDo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DRY (Don't Repeat Yourself) Rules */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 space-y-3">
        <h3 className="text-sm font-semibold text-neutral-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>DRY (Don't Repeat Yourself) Uygulamaları</span>
        </h3>

        <ul className="space-y-2">
          {SRP_EXPLANATION.dryAnalysis.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 text-xs text-neutral-300">
              <span className="text-emerald-400 font-mono mt-0.5 font-bold">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Workflow Diagram */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 space-y-3">
        <h3 className="text-sm font-semibold text-neutral-200 flex items-center gap-2">
          <FileCode2 className="w-4 h-4 text-emerald-400" />
          <span>Veri Akış Diyagramı (Pipeline)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-center">
            <span className="text-[10px] text-neutral-500 block uppercase font-mono">1. Girdi</span>
            <span className="text-xs font-bold text-neutral-200 block mt-1">InputValidator</span>
            <span className="text-[11px] text-neutral-400 block mt-0.5">Sınır ve Tam Sayı Denetimi</span>
          </div>

          <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-center">
            <span className="text-[10px] text-neutral-500 block uppercase font-mono">2. Geometri</span>
            <span className="text-xs font-bold text-emerald-400 block mt-1">GeometryCalculator</span>
            <span className="text-[11px] text-neutral-400 block mt-0.5">Boşluk & Karakter Hesabı</span>
          </div>

          <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-center">
            <span className="text-[10px] text-neutral-500 block uppercase font-mono">3. Sunum</span>
            <span className="text-xs font-bold text-cyan-400 block mt-1">ShapeRenderer</span>
            <span className="text-[11px] text-neutral-400 block mt-0.5">Hizalama & Satır Formatı</span>
          </div>

          <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-center">
            <span className="text-[10px] text-neutral-500 block uppercase font-mono">4. Çıktı</span>
            <span className="text-xs font-bold text-amber-300 block mt-1">ConsoleBuffer</span>
            <span className="text-[11px] text-neutral-400 block mt-0.5">Telif Başlığı & Terminal</span>
          </div>
        </div>
      </div>
    </div>
  );
};
