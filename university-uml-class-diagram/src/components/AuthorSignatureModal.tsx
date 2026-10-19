import React from 'react';
import { X, CheckCircle, ShieldCheck, Award, FileCheck } from 'lucide-react';

interface AuthorSignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthorSignatureModal: React.FC<AuthorSignatureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Certificate Style Header */}
        <div className="p-6 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-blue-300 text-xs font-mono uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Resmi Modelleme İmzası & Proje Künyesi</span>
          </div>

          <h3 className="text-xl font-bold tracking-tight">
            Üniversite Sistemi UML Sınıf Tasarımı
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Yazılım Mimarisi ve Nesne Yönelimli Çözümleme
          </p>

          <div className="mt-5 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-blue-200 font-medium">HAZIRLAYAN & İMZALAYAN</div>
              <div className="text-lg font-extrabold tracking-tight text-white">Enes Öztürk</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center font-bold font-serif text-blue-200">
              EÖ
            </div>
          </div>
        </div>

        {/* Certificate Details */}
        <div className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 block mb-0.5">Standart</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">UML 2.5 ISO/IEC 19505</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 block mb-0.5">Tasarım Deseni</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Whole-Part & IS-A</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/20">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Modellenen İsterler & Doğrulama</span>
            </h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Madde 1:</strong> Üniversite - Sınıflık, Ofis ve Departman Bileşimleri (◆)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Madde 2:</strong> Departman - Ofis Sahipliği & Kümeleme (◇)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Madde 3:</strong> Profesör ve Memur Kalıtımı (Çalışan —▷)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Madde 4:</strong> Çalışan ile Ofis Arasındaki 1:N Çalışma İlişkisi</span>
              </li>
            </ul>
          </div>

          <p className="text-[11px] text-slate-500 italic">
            * İsteğe özel olarak: Sınıflara ait nitelik ve davranışlar belirtilmeden, salt sınıf hiyerarşisi ve ilişkisel mimari ön plana çıkarılmıştır.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Anladım
          </button>
        </div>
      </div>
    </div>
  );
};
