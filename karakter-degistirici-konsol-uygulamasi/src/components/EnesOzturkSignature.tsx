import React, { useState } from 'react';
import { ShieldCheck, Award, FileText, Copy, Check, Lock, CheckCircle2 } from 'lucide-react';

export const EnesOzturkSignature: React.FC = () => {
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [copiedNotice, setCopiedNotice] = useState(false);

  const citationText = `Öztürk, Enes (2026). "String İçerisinde İlk ve Son Karakterlerin Yerini Değiştirme Algoritması ve Konsol Uygulaması". Yazılım Mimarisi ve Algoritmik Çözümler Dizisi. Telif No: EO-2026-ALG-TR.`;

  const legalNoticeText = `================================================================================
RESMİ TELİF HAKKI VE MÜLKİYET BİLDİRİMİ
================================================================================
Yazılım Mimarı & Geliştirici : Enes Öztürk
Algoritma                    : String İlk ve Son Karakter Takas Algoritması
Yıl                          : 2026
Telif Statüsü                : © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
Hukuki Dayanak               : 5846 Sayılı Fikir ve Sanat Eserleri Kanunu

Bu algoritma, konsol arayüzü, görsel simülatör ve kaynak kodları Enes Öztürk
tarafından özel olarak geliştirilmiştir. İzinsiz ticari kopyalama veya
yazar ismi silinerek dağıtılması telif hakları ihlali teşkil eder.
================================================================================`;

  const copyCitation = () => {
    navigator.clipboard.writeText(citationText);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const copyNotice = () => {
    navigator.clipboard.writeText(legalNoticeText);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {/* Formal Signature Certificate Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Certificate Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
                Resmi Geliştirici Tescili & Telif Sertifikası
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-0.5">
                Enes Öztürk
              </h2>
              <div className="text-xs text-slate-400 mt-0.5">
                Yazılım Mimarı & Algoritma Geliştiricisi
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold self-start sm:self-center">
            <CheckCircle2 className="w-4 h-4" />
            <span>Telif Hakları Tescillidir</span>
          </div>
        </div>

        {/* Certificate Body details */}
        <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-4">
            <div>
              <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold">
                Eser / Proje Adı
              </span>
              <p className="text-sm font-semibold text-slate-200 mt-1">
                String İfadede İlk ve Son Karakterleri Değiştiren Konsol Uygulaması
              </p>
            </div>

            <div>
              <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold">
                Telif Sahibi & İmza Sahibi
              </span>
              <p className="text-sm font-semibold text-cyan-300 mt-1 flex items-center gap-2">
                <span>Enes Öztürk</span>
                <span className="text-xs text-slate-500">(Geliştirici)</span>
              </p>
            </div>

            <div>
              <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold">
                Telif Yılı & Hak Bildirimi
              </span>
              <p className="text-sm font-medium text-slate-300 mt-1">
                © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold">
                Sertifika & Doğrulama Kodu
              </span>
              <p className="text-sm font-mono font-semibold text-amber-300 mt-1">
                EO-ALG-2026-STR-SWAP-TR
              </p>
            </div>

            <div>
              <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold">
                Yasal Koruma Kapsamı
              </span>
              <p className="text-slate-300 mt-1 leading-relaxed">
                5846 sayılı Fikir ve Sanat Eserleri Kanunu ve uluslararası Berne Konvansiyonu uyarınca koruma altındadır.
              </p>
            </div>

            <div>
              <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold">
                Algoritmik Matematiksel Tanım
              </span>
              <p className="text-slate-300 mt-1 font-mono text-[11px] bg-slate-950 p-2 rounded border border-slate-800">
                f(w) = w[|w|-1] + w[1..|w|-2] + w[0] (∀|w| &gt; 1)
              </p>
            </div>
          </div>
        </div>

        {/* Digital Signature representation */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-cyan-400 shrink-0" />
            <div className="text-xs">
              <span className="text-slate-200 font-semibold block">Dijital İmza Mührü</span>
              <span className="text-slate-400">
                Bu uygulama orijinal olarak Enes Öztürk adına imzalanmış ve dağıtılmıştır.
              </span>
            </div>
          </div>

          <button
            onClick={copyNotice}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors border border-slate-700 shrink-0 whitespace-nowrap"
          >
            {copiedNotice ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedNotice ? 'Telif Metni Kopyalandı' : 'Telif Metnini Kopyala'}</span>
          </button>
        </div>
      </div>

      {/* Academic / Standard Citation block */}
      <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            Atıf ve Referans Gösterme Formatı
          </h3>
          <button
            onClick={copyCitation}
            className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
          >
            {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCitation ? 'Kopyalandı' : 'Atfı Kopyala'}</span>
          </button>
        </div>

        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
          {citationText}
        </div>
        <p className="text-[11px] text-slate-500">
          Bu algoritmayı ödevlerde, üniversite projelerinde veya kurumsal yazılımlarda kullanırken yukarıdaki atıfı ve telif hakkı sahibini belirtiniz.
        </p>
      </div>
    </div>
  );
};
