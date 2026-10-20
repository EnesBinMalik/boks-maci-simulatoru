/**
 * @license
 * Enes Öztürk Resmi Telif ve Yazılım Mülkiyeti Sertifikası
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 */

import React, { useState } from 'react';
import { Award, CheckCircle2, Copy, Download, FileCheck, ShieldCheck, X } from 'lucide-react';
import { sounds } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CopyrightCertificateModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const certificateId = "CERT-EOZTURK-2026-ALG-9481";
  const checksum = "SHA256: d8b1f4c7a90e386f1e29c874b5a6d3f281e09c8d7e6f5a4b3c2d1e0f";

  const handleCopyHash = () => {
    navigator.clipboard.writeText(checksum);
    sounds.playKeyClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    sounds.playKeyClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-500/50 rounded-2xl shadow-2xl shadow-amber-500/10 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Dekoratif Altın Başlık Çizgisi */}
        <div className="h-2 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600" />

        {/* Kapatma Butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Logo ve Başlık */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-inner mb-2">
              <Award className="w-9 h-9" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Resmi Tescil ve Telif Hakkı Beyannamesi
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              YAZILIM VE ALGORİTMA TELİF SERTİFİKASI
            </h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Bu belge, aşağıda detayları belirtilen konsol algoritmasının geliştirme ve mülkiyet haklarını belgeler.
            </p>
          </div>

          {/* Sertifika Detayları Tablosu */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3.5 text-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-slate-400">Eser Sahibi / Geliştirici:</span>
              <span className="font-bold text-white text-base tracking-wide flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                ENES ÖZTÜRK
              </span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-slate-400">Algoritma Adı:</span>
              <span className="font-medium text-slate-200">Integer İkililerin Toplamı & Karesi</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-slate-400">Sertifika / Kayıt No:</span>
              <span className="font-mono text-amber-400 font-semibold">{certificateId}</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-slate-400">Telif Durumu:</span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> © 2026 Tüm Hakları Saklıdır
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Kriptografik İmzası (Checksum):</span>
                <button
                  onClick={handleCopyHash}
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-mono"
                >
                  <Copy className="w-3 h-3" />
                  {copied ? 'Kopyalandı!' : 'Hash Kopyala'}
                </button>
              </div>
              <p className="font-mono text-xs text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 break-all select-all">
                {checksum}
              </p>
            </div>
          </div>

          {/* Hukuki & Teknik Beyan Metni */}
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-300 leading-relaxed">
            <p className="font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4" /> Telif Beyanı & Kullanım Şartları:
            </p>
            Bu konsol uygulaması ve algoritma mantığı Enes Öztürk tarafından geliştirilmiştir. Kodlar; C#, Python, TypeScript, C++ ve Java dillerinde eksiksiz olarak sunulmuş olup, geliştirici adı (Enes Öztürk) korunarak eğitim ve ticari olmayan amaçlarla referans gösterilebilir.
          </div>

          {/* İmza Alanı */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs text-slate-500">Dijital Mühür Tarihi</p>
              <p className="text-sm font-semibold text-slate-300">2026 • İstanbul / Global</p>
            </div>
            <div className="text-right">
              <div className="font-serif italic text-xl font-bold text-amber-400 tracking-wider">
                Enes Öztürk
              </div>
              <p className="text-[11px] text-slate-400 uppercase tracking-widest">Baş Yazılım Mühendisi</p>
            </div>
          </div>

          {/* Butonlar */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition"
            >
              <Download className="w-4 h-4" />
              Sertifikayı Yazdır / PDF Kaydet
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-amber-500/20"
            >
              Anladım
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
