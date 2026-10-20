import React from 'react';
import { ShieldCheck, Award, PenTool, CheckCircle, FileText, Sparkles } from 'lucide-react';

export const SignatureCopyrightCard: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Resmi Algoritmik İmza & Telif Hakkı Sertifikası</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Enes Öztürk
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              67 Eşik Değerli Sayı Analiz ve Mutlak Kare Toplamı Algoritması fikri mülkiyet ve telif hakkı beyannamesi.
            </p>
          </div>

          {/* Decorative Signature Badge */}
          <div className="shrink-0 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 shadow-lg min-w-[200px]">
            <div className="text-xs text-amber-400 font-mono tracking-wider">
              YAZAR & MÜELLİF
            </div>
            {/* Stylized Digital Signature */}
            <div className="my-2 py-1 px-4 text-center font-serif italic text-2xl text-amber-300 border-b border-amber-500/40 select-none">
              Enes Öztürk
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Dijital İmza Doğrulandı
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5 text-cyan-400" />
              <span>İmza Sahibi</span>
            </div>
            <div className="text-base font-bold text-white">
              Enes Öztürk
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Algoritma Tasarımı & Geliştirici
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Telif Hakkı (Copyright)</span>
            </div>
            <div className="text-base font-bold text-amber-300">
              © 2026 Enes Öztürk
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Tüm Hakları Saklıdır (All Rights Reserved)
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Eser Niteliği</span>
            </div>
            <div className="text-base font-bold text-white">
              Console Algoritması
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Eşik: 67 · Fark & Kare Toplamı
            </div>
          </div>
        </div>

        {/* Legal Text Notice */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 text-xs text-slate-400 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 font-semibold text-slate-300">
            <CheckCircle className="w-4 h-4 text-cyan-400" />
            <span>Telif Hakkı ve Kullanım Hükümleri</span>
          </div>
          <p>
            Bu console uygulaması mantığı ve algoritmik hesaplama yöntemi <strong className="text-slate-200">Enes Öztürk</strong> imzası ile tescil edilmiş olup, 5846 sayılı Fikir ve Sanat Eserleri Kanunu ile uluslararası telif hakkı sözleşmeleri kapsamında korunmaktadır.
          </p>
          <p>
            Ekrandan girilen <span className="font-mono text-slate-300">n</span> adet sayının <span className="font-mono text-cyan-300">67</span> eşik değerine göre ayrıştırılması, küçük olanların farklarının toplamı ile büyük olanların farklarının mutlak karelerinin toplamının çıktılanması (<span className="font-mono text-emerald-400">Örn: 56 45 68 77 -&gt; 33 101</span>) algoritmanın temel işleyiş modelidir.
          </p>
        </div>
      </div>
    </div>
  );
};
