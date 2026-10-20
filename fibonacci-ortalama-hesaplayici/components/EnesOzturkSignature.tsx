/**
 * @file EnesOzturkSignature.tsx
 * @description Enes Öztürk Özel Tasarım ve Mühendislik Mührü bileşeni.
 * El emeği, yüksek standartlı temiz kod ve Single Responsibility prensibi güvencesi sunar.
 */

import React from 'react';
import { Award, Code2, Heart, CheckCircle2 } from 'lucide-react';

export const EnesOzturkSignature: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-800/80 pt-10 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900/90 via-slate-900 to-slate-950 border border-amber-500/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          {/* Subtle gold glow */}
          <div className="absolute top-0 right-1/4 w-72 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            {/* Left side: Seal and craftsman statement */}
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center text-amber-400">
                  <Award className="w-6 h-6" />
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest mt-0.5">E.Ö</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                  <span>Özel Mühendislik İmzası</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-400 font-normal">El Emeği & Temiz Kod</span>
                </div>
                <h4 className="text-xl font-extrabold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
                  <span>Enes Öztürk</span>
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  Bu çalışma; kod tekrarından kaçınma (DRY), Single Responsibility Prensibi (SRP),
                  yüksek duyarlıklı BigInt matematik motoru ve özenli estetik kullanıcı deneyimi standartlarıyla
                  özel olarak tasarlanıp hayata geçirilmiştir.
                </p>
              </div>
            </div>

            {/* Right side: Verification highlights */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-mono text-slate-300 shrink-0">
              <div className="px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center gap-2">
                <Code2 className="w-4 h-4 text-sky-400" />
                <span>SRP Modüler Mimari</span>
              </div>
              <div className="px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Kaliteli & Etkili Tasarım</span>
              </div>
            </div>
          </div>

          {/* Bottom copyright note */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <div>
              © 2026 Fibonacci Ortalama Hesaplama Laboratuvarı. Enes Öztürk Müh. Mührü.
            </div>
            <div className="flex items-center gap-3">
              <span>Hassasiyet: BigInt & 6-Digit Float</span>
              <span>·</span>
              <span>Altın Oran: φ ≈ 1.618</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
