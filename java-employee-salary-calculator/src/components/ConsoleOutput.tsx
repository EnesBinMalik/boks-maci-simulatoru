import React, { useState } from 'react';
import { EmployeeData, EmployeeCalculations, formatRawNumber } from '../types/employee';
import { Terminal, Copy, Check, Sparkles, Award } from 'lucide-react';

interface ConsoleOutputProps {
  formData: EmployeeData;
  calcs: EmployeeCalculations;
}

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({ formData, calcs }) => {
  const [copied, setCopied] = useState(false);

  // Exact format requested in the prompt:
  const rawOutput = `Adı : ${formData.name}
Maaşı : ${formatRawNumber(formData.salary)}
Çalışma Saati : ${formData.workHours}
Başlangıç Yılı : ${formData.hireYear}
Vergi : ${formatRawNumber(calcs.tax)}
Bonus : ${formatRawNumber(calcs.bonus)}
Maaş Artışı : ${formatRawNumber(calcs.raiseSalary)}
Vergi ve Bonuslar ile birlikte maaş : ${formatRawNumber(calcs.salaryWithTaxAndBonus)}
Toplam Maaş : ${formatRawNumber(calcs.totalSalary)}`;

  const signedOutput = `==================================================
JAVA toString() KONSOL ÇIKTISI (System.out.println)
Geliştirici / İmza: Enes Öztürk
==================================================
${rawOutput}
==================================================
İmza: Enes Öztürk`;

  const handleCopy = (fullSigned = false) => {
    navigator.clipboard.writeText(fullSigned ? signedOutput : rawOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-xl overflow-hidden font-mono">
      {/* Terminal Title Bar */}
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs text-slate-400 font-sans ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            Java Konsol Çıktısı (Employee.toString())
          </span>
        </div>

        <div className="flex items-center gap-2 font-sans">
          <button
            onClick={() => handleCopy(false)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
            title="Örnekteki gibi sade toString() çıktısını kopyala"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Çıktıyı Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-5 sm:p-6 text-sm sm:text-base leading-relaxed overflow-x-auto space-y-1">
        <div className="text-slate-500 text-xs pb-3 border-b border-slate-800/80 mb-3 flex items-center justify-between">
          <span>$ java Main (Employee: {formData.name})</span>
          <span className="text-indigo-400 font-sans text-[11px] flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Birebir Uyumlu Java Çıktısı
          </span>
        </div>

        <div className="text-slate-200 select-all font-mono space-y-1">
          <div className="text-slate-100 font-medium">
            <span className="text-indigo-400">Adı : </span>
            <span className="text-white font-bold">{formData.name}</span>
          </div>
          <div>
            <span className="text-indigo-400">Maaşı : </span>
            <span className="text-emerald-400 font-bold">{formatRawNumber(formData.salary)}</span>
          </div>
          <div>
            <span className="text-indigo-400">Çalışma Saati : </span>
            <span className="text-amber-400 font-bold">{formData.workHours}</span>
          </div>
          <div>
            <span className="text-indigo-400">Başlangıç Yılı : </span>
            <span className="text-blue-400 font-bold">{formData.hireYear}</span>
          </div>
          <div>
            <span className="text-indigo-400">Vergi : </span>
            <span className="text-rose-400 font-bold">{formatRawNumber(calcs.tax)}</span>
          </div>
          <div>
            <span className="text-indigo-400">Bonus : </span>
            <span className="text-amber-300 font-bold">{formatRawNumber(calcs.bonus)}</span>
          </div>
          <div>
            <span className="text-indigo-400">Maaş Artışı : </span>
            <span className="text-blue-300 font-bold">{formatRawNumber(calcs.raiseSalary)}</span>
          </div>
          <div className="pt-1 text-slate-100 font-semibold border-t border-slate-800 mt-2">
            <span className="text-purple-300">Vergi ve Bonuslar ile birlikte maaş : </span>
            <span className="text-purple-200 font-bold">{formatRawNumber(calcs.salaryWithTaxAndBonus)}</span>
          </div>
          <div className="text-emerald-300 font-bold text-base sm:text-lg">
            <span className="text-emerald-400">Toplam Maaş : </span>
            <span className="text-emerald-300 font-black">{formatRawNumber(calcs.totalSalary)}</span>
          </div>
        </div>

        {/* Signature stamp at bottom of console */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-slate-400 font-sans gap-2">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Award className="w-4 h-4 text-amber-400" />
            <span>İmza: <strong className="text-white">Enes Öztürk</strong></span>
          </div>
          <div className="text-[11px] text-slate-500">
            Sınıf: Employee • 4 Nitelik, 5 Metot
          </div>
        </div>
      </div>
    </div>
  );
};
