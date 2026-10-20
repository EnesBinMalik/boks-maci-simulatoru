/**
 * @license
 * Telif Hakkı © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 */

import React, { useState } from 'react';
import { X, ShieldCheck, Award, FileText, Check, Copy } from 'lucide-react';
import { AUTHOR_SIGNATURE } from '../core/types';

interface CopyrightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CopyrightModal: React.FC<CopyrightModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(
      `Geliştirici: ${AUTHOR_SIGNATURE.author}\nTelif Hakkı: ${AUTHOR_SIGNATURE.copyrightNotice}\nİmza Kodu: ${AUTHOR_SIGNATURE.signatureHash}\nMimari: Single Responsibility Principle (SRP) & DRY\nTarih: 2026`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-neutral-900 border border-neutral-700/80 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-100">
              Resmi Telif Hakları & Yazar İmzası
            </h3>
            <p className="text-xs text-neutral-400">
              Fikir ve Sanat Eserleri Kanunu Uyarınca Tescilli Algoritmik Çözüm
            </p>
          </div>
        </div>

        {/* Certificate Card */}
        <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 font-mono text-xs space-y-2.5">
          <div className="flex justify-between border-b border-neutral-800/80 pb-2">
            <span className="text-neutral-500">Eser Sahibi / Geliştirici:</span>
            <span className="text-emerald-400 font-bold">{AUTHOR_SIGNATURE.author}</span>
          </div>
          <div className="flex justify-between border-b border-neutral-800/80 pb-2">
            <span className="text-neutral-500">Unvan & Rol:</span>
            <span className="text-neutral-200">{AUTHOR_SIGNATURE.title}</span>
          </div>
          <div className="flex justify-between border-b border-neutral-800/80 pb-2">
            <span className="text-neutral-500">Telif Bildirimi:</span>
            <span className="text-neutral-200 text-right">{AUTHOR_SIGNATURE.copyrightNotice}</span>
          </div>
          <div className="flex justify-between border-b border-neutral-800/80 pb-2">
            <span className="text-neutral-500">Mimari Kriterler:</span>
            <span className="text-cyan-400 font-semibold">SRP & DRY Kuralları</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-neutral-500">Doğrulama İmzası:</span>
            <span className="text-amber-300 font-bold">{AUTHOR_SIGNATURE.signatureHash}</span>
          </div>
        </div>

        {/* Legal text */}
        <div className="text-xs text-neutral-400 leading-relaxed bg-neutral-950/40 p-3 rounded-lg border border-neutral-800/60">
          <p>
            Bu yazılım mimarisi, sınıfları (<code className="text-neutral-200">InputValidator</code>,{' '}
            <code className="text-neutral-200">TriangleGeometryCalculator</code>,{' '}
            <code className="text-neutral-200">ConsoleShapeRenderer</code>,{' '}
            <code className="text-neutral-200">ConsoleBufferManager</code>) ve algoritma algısı{' '}
            <strong>Enes Öztürk</strong> adına tescillenmiştir. Eğitim, inceleme ve ödev sunumları için
            en yüksek kalite standartlarına uygun olarak tasarlanmıştır.
          </p>
        </div>

        {/* Modal actions */}
        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            onClick={handleCopyHash}
            className="px-3.5 py-2 text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg border border-neutral-700 transition-colors flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sertifika Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span>Lisans Metnini Kopyala</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
