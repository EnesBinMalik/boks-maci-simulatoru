import React from 'react';
import { BookOpen, ShieldAlert, Zap, TrendingUp, Layers, Award } from 'lucide-react';

export const MethodExplainer: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-2xl p-6 shadow-sm border border-indigo-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              Java Nesne Yönelimli Programlama (OOP) Rehberi
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Employee Sınıfı Mimari ve Metot Analizi
            </h2>
            <p className="text-indigo-200/90 text-sm mt-1 max-w-2xl">
              Bu sınıf, bir fabrikada çalışan personellerin niteliklerini kapsülleyerek (encapsulation) vergi kesintisi, mesai bonusu ve kıdem zammı kurallarını işletir.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-xl backdrop-blur-xs border border-white/10 text-xs font-medium">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Hazırlayan: <strong>Enes Öztürk</strong></span>
          </div>
        </div>
      </div>

      {/* Sınıfın 4 Niteliği (Attributes) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-indigo-600" />
          Sınıfın 4 Niteliği (Fields / Instance Variables)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="font-mono text-xs font-bold text-indigo-600 uppercase">1. Nitelik</div>
            <div className="font-mono text-sm font-bold text-slate-900 mt-1">String name;</div>
            <p className="text-xs text-slate-600 mt-2">
              Çalışanın adı ve soyadını metin formatında saklar.
            </p>
            <div className="mt-2 text-[11px] text-slate-400 font-mono">Örn: &quot;kemal&quot;</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="font-mono text-xs font-bold text-emerald-600 uppercase">2. Nitelik</div>
            <div className="font-mono text-sm font-bold text-slate-900 mt-1">double salary;</div>
            <p className="text-xs text-slate-600 mt-2">
              Çalışanın brüt taban maaşını ondalıklı sayı olarak tutar.
            </p>
            <div className="mt-2 text-[11px] text-slate-400 font-mono">Örn: 2000.0</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="font-mono text-xs font-bold text-amber-600 uppercase">3. Nitelik</div>
            <div className="font-mono text-sm font-bold text-slate-900 mt-1">int workHours;</div>
            <p className="text-xs text-slate-600 mt-2">
              Haftalık toplam çalışma saatini tam sayı olarak saklar.
            </p>
            <div className="mt-2 text-[11px] text-slate-400 font-mono">Örn: 45</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="font-mono text-xs font-bold text-blue-600 uppercase">4. Nitelik</div>
            <div className="font-mono text-sm font-bold text-slate-900 mt-1">int hireYear;</div>
            <p className="text-xs text-slate-600 mt-2">
              Personelin fabrikada işe başlangıç yılını saklar.
            </p>
            <div className="mt-2 text-[11px] text-slate-400 font-mono">Örn: 1985</div>
          </div>
        </div>
      </div>

      {/* Sınıfın 5 Metodu (Methods) */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          Sınıfın 5 Metodu (Methods & Specifications)
        </h3>

        {/* Metot 1: Constructor */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                1
              </span>
              <h4 className="font-mono font-bold text-slate-900 text-sm sm:text-base">
                Employee(name, salary, workHours, hireYear)
              </h4>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
              Kurucu Metot (Constructor)
            </span>
          </div>
          <div className="mt-3 text-xs sm:text-sm text-slate-600 space-y-2">
            <p>
              4 parametre alır ve nesne ilk oluşturulduğunda sınıfın alanlarını (fields) başlatır.
            </p>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs overflow-x-auto">
              <code>
                {`public Employee(String name, double salary, int workHours, int hireYear) {
    this.name = name;
    this.salary = salary;
    this.workHours = workHours;
    this.hireYear = hireYear;
}`}
              </code>
            </div>
          </div>
        </div>

        {/* Metot 2: tax() */}
        <div className="bg-white rounded-2xl border border-rose-100 shadow-2xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs">
                2
              </span>
              <h4 className="font-mono font-bold text-slate-900 text-sm sm:text-base">
                public double tax()
              </h4>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              Vergi Hesaplama
            </span>
          </div>
          <div className="mt-3 text-xs sm:text-sm text-slate-600 space-y-2">
            <p>
              Maaşa uygulanan vergiyi hesaplar:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 font-medium pl-1">
              <li>Çalışanın maaşı <strong>1000 TL&apos;den az ise</strong> vergi uygulanmayacaktır (<code className="text-rose-600 font-mono">0.0 TL</code>).</li>
              <li>Çalışanın maaşı <strong>1000 TL&apos;den fazla ise</strong> maaşının <strong>%3&apos;ü</strong> kadar vergi kesilecektir (<code className="text-rose-600 font-mono">salary * 0.03</code>).</li>
            </ul>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs overflow-x-auto">
              <code>
                {`public double tax() {
    if (this.salary > 1000) {
        return this.salary * 0.03;
    }
    return 0.0;
}`}
              </code>
            </div>
          </div>
        </div>

        {/* Metot 3: bonus() */}
        <div className="bg-white rounded-2xl border border-amber-100 shadow-2xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-xs">
                3
              </span>
              <h4 className="font-mono font-bold text-slate-900 text-sm sm:text-base">
                public double bonus()
              </h4>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              Mesai Bonusu
            </span>
          </div>
          <div className="mt-3 text-xs sm:text-sm text-slate-600 space-y-2">
            <p>
              Fazla mesai saatlerine göre bonus ödemesini hesaplar:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 font-medium pl-1">
              <li>Eğer çalışan haftada <strong>40 saatten fazla</strong> çalışmış ise;</li>
              <li>Fazladan çalıştığı her saat başına <strong>30 TL</strong> bonus ücreti tahakkuk eder (<code className="text-amber-600 font-mono">(workHours - 40) * 30</code>).</li>
            </ul>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs overflow-x-auto">
              <code>
                {`public double bonus() {
    if (this.workHours > 40) {
        int extraHours = this.workHours - 40;
        return extraHours * 30.0;
    }
    return 0.0;
}`}
              </code>
            </div>
          </div>
        </div>

        {/* Metot 4: raiseSalary() */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-2xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                4
              </span>
              <h4 className="font-mono font-bold text-slate-900 text-sm sm:text-base">
                public double raiseSalary()
              </h4>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Kıdem Maaş Artışı (Zam)
            </span>
          </div>
          <div className="mt-3 text-xs sm:text-sm text-slate-600 space-y-2">
            <p>
              Çalışanın işe başlangıç yılına göre maaş artışını hesaplar (Mevcut yıl: <strong>2021</strong>):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200 text-xs">
                <span className="font-bold text-blue-900">&lt; 10 Yıldan Az:</span>
                <div className="text-blue-700 font-semibold mt-1">%5 Zam</div>
                <code className="text-[11px] font-mono text-slate-600 mt-1 block">salary * 0.05</code>
              </div>
              <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200 text-xs">
                <span className="font-bold text-blue-900">9 Yıldan Fazla &amp; &lt; 20 Yıl:</span>
                <div className="text-blue-700 font-semibold mt-1">%10 Zam</div>
                <code className="text-[11px] font-mono text-slate-600 mt-1 block">salary * 0.10</code>
              </div>
              <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200 text-xs">
                <span className="font-bold text-blue-900">&gt; 19 Yıldan Fazla:</span>
                <div className="text-blue-700 font-semibold mt-1">%15 Zam</div>
                <code className="text-[11px] font-mono text-slate-600 mt-1 block">salary * 0.15</code>
              </div>
            </div>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs overflow-x-auto mt-2">
              <code>
                {`public double raiseSalary() {
    int currentYear = 2021;
    int yearsWorked = currentYear - this.hireYear;

    if (yearsWorked < 10) {
        return this.salary * 0.05;
    } else if (yearsWorked < 20) {
        return this.salary * 0.10;
    } else {
        return this.salary * 0.15;
    }
}`}
              </code>
            </div>
          </div>
        </div>

        {/* Metot 5: toString() */}
        <div className="bg-white rounded-2xl border border-purple-100 shadow-2xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                5
              </span>
              <h4 className="font-mono font-bold text-slate-900 text-sm sm:text-base">
                public String toString()
              </h4>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700">
              Formatlı Çıktı Metodu
            </span>
          </div>
          <div className="mt-3 text-xs sm:text-sm text-slate-600 space-y-2">
            <p>
              Çalışana ait tüm bilgileri ekrana bastıracak formatlı String metnini üretir.
            </p>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs overflow-x-auto">
              <code>
                {`@Override
public String toString() {
    double taxAmount = tax();
    double bonusAmount = bonus();
    double raiseAmount = raiseSalary();
    double salaryWithTaxAndBonus = this.salary - taxAmount + bonusAmount;
    double totalSalary = this.salary + raiseAmount + bonusAmount - taxAmount;

    return "Adı : " + this.name + "\\n" +
           "Maaşı : " + this.salary + "\\n" +
           "Çalışma Saati : " + this.workHours + "\\n" +
           "Başlangıç Yılı : " + this.hireYear + "\\n" +
           "Vergi : " + taxAmount + "\\n" +
           "Bonus : " + bonusAmount + "\\n" +
           "Maaş Artışı : " + raiseAmount + "\\n" +
           "Vergi ve Bonuslar ile birlikte maaş : " + salaryWithTaxAndBonus + "\\n" +
           "Toplam Maaş : " + totalSalary;
}`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
