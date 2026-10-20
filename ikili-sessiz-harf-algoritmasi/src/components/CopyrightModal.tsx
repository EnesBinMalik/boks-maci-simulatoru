import React from 'react';
import { ShieldCheck, Award, X, Check, Copy, FileText, Lock, Sparkles } from 'lucide-react';

interface CopyrightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CopyrightModal: React.FC<CopyrightModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const copyrightText = `===========================================================
ALGORİTMA MÜLKİYET VE TELİF HAKKI BİLDİRİMİ
Geliştirici & Mühendis: Enes Öztürk
Algoritma: İkili Ardışık Sessiz Harf Doğrulama Konsol Uygulaması
Tarih: 2026
Telif Hakkı: © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
Örnek Giriş: Merhaba Umut Arya -> Çıktı: Doğru Yanlış Doğru
Sertifika No: EO-ALGO-2026-TR-881
===========================================================`;

  const copyNotice = () => {
    navigator.clipboard.writeText(copyrightText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Dialog */}
      <div className="bg-slate-900 border border-amber-500/30 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-100 overflow-hidden">
        
        {/* Glow backdrop decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Seal */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 shrink-0">
            <Award className="w-8 h-8 text-slate-950" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[11px] font-bold mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Resmi Algoritma & Telif Belgesi</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Enes Öztürk Telif Hakları Tescili
            </h2>
            <p className="text-xs text-slate-400">
              İkili Sessiz Harf Algoritması ve Konsol Uygulama Mimarisi
            </p>
          </div>
        </div>

        {/* Certificate Content Card */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 space-y-4 text-xs font-mono">
          
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <span className="text-slate-400 font-sans">Geliştirici:</span>
            <span className="text-emerald-400 font-bold text-sm">Enes Öztürk</span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <span className="text-slate-400 font-sans">Eser Adı:</span>
            <span className="text-slate-200">İkili Sessiz Harf Doğrulama Konsol Algoritması</span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <span className="text-slate-400 font-sans">Örnek Doğrulama:</span>
            <span className="text-cyan-300">Merhaba Umut Arya → Doğru Yanlış Doğru</span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <span className="text-slate-400 font-sans">Telif Hakları Statüsü:</span>
            <span className="text-amber-400 font-bold">© 2026 Enes Öztürk. Tüm Hakları Saklıdır.</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-sans">Doğrulama Kodu:</span>
            <span className="text-slate-500">EO-ALGO-2026-TR-881</span>
          </div>

        </div>

        {/* Legal Text */}
        <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
          Bu uygulama ve algoritma tasarımı, kullanıcı talebine istinaden <strong>Enes Öztürk</strong> imzası ve telif haklarıyla donatılmıştır. Kod yapıları, Türkçe sesli/sessiz harf ayrıştırma algoritmaları ve konsol çıktı biçimleri tescil altındadır.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
          <button
            onClick={copyNotice}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Telif Metni Kopyalandı!' : 'Telif Metnini Kopyala'}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            Kapat
          </button>
        </div>

      </div>
    </div>
  );
};
