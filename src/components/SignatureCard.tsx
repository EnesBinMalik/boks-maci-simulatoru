import React from 'react';
import { Award, CheckCircle, Code2, Feather, Calendar, GraduationCap, Check } from 'lucide-react';

export const SignatureCard: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Formal Submission Card */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Top header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Ödev Teslim Raporu
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Boks Maçı Simülasyonu
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>Ekim 2026</span>
          </div>
        </div>

        {/* Author / Signature Presentation */}
        <div className="my-6 p-6 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs uppercase font-mono tracking-widest text-slate-500">
              PROJE MÜELLİFİ & GELİŞTİRİCİ
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 tracking-tight flex items-center gap-2">
              <span>Enes Öztürk</span>
              <Check className="w-5 h-5 text-emerald-400 stroke-[3]" />
            </div>
            <p className="text-xs text-slate-400">
              Java Nesne Yönelimli Programlama (OOP) & Olasılık Algoritması Çözümü
            </p>
          </div>

          {/* Stylized Handwritten Signature simulation */}
          <div className="px-6 py-3 bg-slate-900 border border-amber-500/20 rounded-xl flex flex-col items-center justify-center">
            <div className="font-serif italic text-2xl text-amber-400 select-none tracking-wide">
              Enes Öztürk
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1">
              DİJİTAL İMZA ONAYLI
            </span>
          </div>
        </div>

        {/* Homework Task Specification & Resolution */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Ödev Şartı ve Çözüm Ayrıntıları</span>
          </h3>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
            <div className="font-semibold text-amber-400">
              Görev Tanımı:
            </div>
            <p className="italic text-slate-400">
              "Projeye ilk kimin dövüşe başlayacağını %50 olasılık ile hesaplayan sistemi entegre ediniz."
            </p>

            <div className="font-semibold text-emerald-400 pt-2">
              Uygulanan Çözüm ve Teknik Açıklama:
            </div>
            <p>
              Java'nın standart <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">Math.random()</code> metodu,
              [0.0, 1.0) yarı açık aralığında uniform (tekdüze) dağılıma sahip rastgele double değerler üretir.
              Bu aralıktaki herhangi bir değerin 0.5'ten küçük veya eşit olma olasılığı tam olarak <strong>%50</strong>'dir.
            </p>
            <p>
              <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">Ring</code> sınıfına eklenen{' '}
              <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">isFirst()</code> metodu ile
              maç başlamadan hemen önce ilk vuruş yapan dövüşçü belirlenir ve dövüş sırası bu sıraya göre yürütülür.
            </p>
          </div>

          {/* Key verification checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-start gap-2.5 p-3 bg-slate-950/40 rounded-xl border border-slate-800 text-xs text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">%50 Başlangıç Mekanizması</strong>
                <span>Math.random() &lt;= 0.5 ile kusursuz iki yönlü simetri sağlandı.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 bg-slate-950/40 rounded-xl border border-slate-800 text-xs text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">isWin() Düzeltmesi</strong>
                <span>f2'nin canı bittiğinde f1'in kazanan ilan edilmesi sağlandı.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 bg-slate-950/40 rounded-xl border border-slate-800 text-xs text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Sıklet & Ağırlık Uyumu</strong>
                <span>checkWeight metodu ile sporcuların sıklet kuralları korundu.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 bg-slate-950/40 rounded-xl border border-slate-800 text-xs text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Savurma (Dodge) Mekaniği</strong>
                <span>Dövüşçülerin dodge yüzdesine göre hasarı bloklaması sağlandı.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 font-mono">
          <span>Enes Öztürk © 2026 · Java Boks Maçı Projesi</span>
          <span>Patika.dev / Üniversite Java 101 Ödevi</span>
        </div>
      </div>
    </div>
  );
};
