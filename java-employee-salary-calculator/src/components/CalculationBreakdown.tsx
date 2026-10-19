import React from 'react';
import { EmployeeCalculations, formatCurrency, formatRawNumber } from '../types/employee';
import { ShieldAlert, Zap, TrendingUp, Calculator, CheckCircle2 } from 'lucide-react';

interface CalculationBreakdownProps {
  salary: number;
  workHours: number;
  hireYear: number;
  calcs: EmployeeCalculations;
}

export const CalculationBreakdown: React.FC<CalculationBreakdownProps> = ({
  salary,
  workHours,
  hireYear,
  calcs,
}) => {
  return (
    <div className="space-y-4">
      {/* 3 Main Method Logic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: tax() */}
        <div className="bg-white rounded-2xl border border-rose-100 p-5 shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -z-0 transition-transform group-hover:scale-110" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-rose-100 text-rose-800 border border-rose-200">
                tax()
              </span>
              <ShieldAlert className="w-5 h-5 text-rose-500" />
            </div>

            <div className="text-xs uppercase font-semibold text-slate-500 tracking-wider">
              Maaş Vergisi
            </div>
            <div className="text-2xl font-black text-rose-600 mt-1">
              -{formatCurrency(calcs.tax)}
              <span className="text-xs font-normal text-slate-400 ml-1">
                ({formatRawNumber(calcs.tax)})
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
              <div className="flex justify-between items-center">
                <span>Maaş Durumu:</span>
                <span className="font-semibold text-slate-800">
                  {salary > 1000 ? '> 1000 TL (%3)' : '≤ 1000 TL (Muaf)'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Uygulanan Oran:</span>
                <span className="font-mono font-bold text-rose-700">
                  %{calcs.taxRatePercent}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 italic pt-1 border-t border-dashed border-slate-200">
                {salary > 1000
                  ? `${salary} × 0.03 = ${calcs.tax.toFixed(1)} TL kesinti`
                  : 'Maaş 1000 TL altı olduğu için vergi kesilmez (0.0 TL)'}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: bonus() */}
        <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -z-0 transition-transform group-hover:scale-110" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-amber-100 text-amber-800 border border-amber-200">
                bonus()
              </span>
              <Zap className="w-5 h-5 text-amber-500" />
            </div>

            <div className="text-xs uppercase font-semibold text-slate-500 tracking-wider">
              Mesai Bonusu
            </div>
            <div className="text-2xl font-black text-amber-600 mt-1">
              +{formatCurrency(calcs.bonus)}
              <span className="text-xs font-normal text-slate-400 ml-1">
                ({formatRawNumber(calcs.bonus)})
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
              <div className="flex justify-between items-center">
                <span>Haftalık Çalışma:</span>
                <span className="font-semibold text-slate-800">{workHours} saat</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Fazla Mesai:</span>
                <span className="font-mono font-bold text-amber-700">
                  {calcs.overtimeHours > 0 ? `${calcs.overtimeHours} saat` : 'Yok (≤ 40h)'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 italic pt-1 border-t border-dashed border-slate-200">
                {calcs.overtimeHours > 0
                  ? `(${workHours} - 40) × 30 TL = ${calcs.bonus.toFixed(1)} TL`
                  : '40 saatten fazla çalışılmadığı için bonus eklenmez (0.0 TL)'}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: raiseSalary() */}
        <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-0 transition-transform group-hover:scale-110" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-blue-100 text-blue-800 border border-blue-200">
                raiseSalary()
              </span>
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>

            <div className="text-xs uppercase font-semibold text-slate-500 tracking-wider">
              Kıdem Maaş Artışı (Zam)
            </div>
            <div className="text-2xl font-black text-blue-600 mt-1">
              +{formatCurrency(calcs.raiseSalary)}
              <span className="text-xs font-normal text-slate-400 ml-1">
                ({formatRawNumber(calcs.raiseSalary)})
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
              <div className="flex justify-between items-center">
                <span>Hizmet Yılı (2021 - {hireYear}):</span>
                <span className="font-semibold text-slate-800">{calcs.yearsWorked} yıl</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Uygulanan Zam Oranı:</span>
                <span className="font-mono font-bold text-blue-700">
                  %{calcs.raiseRatePercent}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 italic pt-1 border-t border-dashed border-slate-200">
                {calcs.yearsWorked < 10
                  ? '< 10 yıl kıdem: %5 zam'
                  : calcs.yearsWorked < 20
                  ? '9-20 yıl arası kıdem: %10 zam'
                  : '> 19 yıl kıdem: %15 zam'}
                {` (${salary} × ${calcs.raiseRatePercent / 100} = ${calcs.raiseSalary.toFixed(1)} TL)`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Totals Calculation Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Subtotal: Vergi ve Bonuslar ile Birlikte Maaş */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-sm border border-slate-800">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            Vergi ve Bonuslar ile Birlikte Maaş
          </div>
          <div className="text-3xl font-extrabold text-white mt-1">
            {formatCurrency(calcs.salaryWithTaxAndBonus)}
            <span className="text-sm font-mono font-normal text-indigo-200 ml-2">
              (Java double: {formatRawNumber(calcs.salaryWithTaxAndBonus)})
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 text-xs text-indigo-200/90 font-mono flex items-center justify-between">
            <span>Formül: salary - tax() + bonus()</span>
            <span className="text-white font-bold">
              {salary} - {calcs.tax} + {calcs.bonus} = {calcs.salaryWithTaxAndBonus}
            </span>
          </div>
        </div>

        {/* Grand Total: Toplam Maaş */}
        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-2xl p-5 shadow-sm border border-emerald-500">
          <div className="flex items-center gap-2 text-emerald-100 text-xs font-semibold uppercase tracking-wider mb-1">
            <CheckCircle2 className="w-4 h-4" />
            Nihai Toplam Maaş (Total Salary)
          </div>
          <div className="text-3xl font-extrabold text-white mt-1">
            {formatCurrency(calcs.totalSalary)}
            <span className="text-sm font-mono font-normal text-emerald-100 ml-2">
              (Java double: {formatRawNumber(calcs.totalSalary)})
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 text-xs text-emerald-100 font-mono flex items-center justify-between">
            <span>salary + raiseSalary() + bonus() - tax()</span>
            <span className="text-white font-bold">
              {salary} + {calcs.raiseSalary} + {calcs.bonus} - {calcs.tax} = {calcs.totalSalary}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
