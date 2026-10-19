import React from 'react';
import { EmployeeData, calculateEmployee, formatCurrency, formatRawNumber } from '../types/employee';
import { Users, Trash2, Edit3, Plus, Download, TrendingUp, ShieldAlert, Zap, DollarSign } from 'lucide-react';

interface PayrollTableProps {
  employees: EmployeeData[];
  onSelectEmployee: (emp: EmployeeData) => void;
  onDeleteEmployee: (id: string) => void;
  onOpenNewForm: () => void;
}

export const PayrollTable: React.FC<PayrollTableProps> = ({
  employees,
  onSelectEmployee,
  onDeleteEmployee,
  onOpenNewForm,
}) => {
  // Compute aggregate company stats
  const totals = employees.reduce(
    (acc, emp) => {
      const calc = calculateEmployee(emp);
      return {
        baseSalary: acc.baseSalary + emp.salary,
        tax: acc.tax + calc.tax,
        bonus: acc.bonus + calc.bonus,
        raise: acc.raise + calc.raiseSalary,
        totalSalary: acc.totalSalary + calc.totalSalary,
        totalWorkHours: acc.totalWorkHours + emp.workHours,
      };
    },
    { baseSalary: 0, tax: 0, bonus: 0, raise: 0, totalSalary: 0, totalWorkHours: 0 }
  );

  const avgHours = employees.length > 0 ? (totals.totalWorkHours / employees.length).toFixed(1) : '0';

  const exportCSV = () => {
    const headers = [
      'Adı',
      'Taban Maaş (TL)',
      'Çalışma Saati',
      'İşe Başlama Yılı',
      'Kıdem Yılı',
      'Vergi (TL)',
      'Bonus (TL)',
      'Maaş Artışı (TL)',
      'Vergi ve Bonuslu Maaş (TL)',
      'Toplam Maaş (TL)',
    ];

    const rows = employees.map((emp) => {
      const c = calculateEmployee(emp);
      return [
        `"${emp.name}"`,
        emp.salary,
        emp.workHours,
        emp.hireYear,
        c.yearsWorked,
        c.tax,
        c.bonus,
        c.raiseSalary,
        c.salaryWithTaxAndBonus,
        c.totalSalary,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `fabrika_bordro_enes_ozturk_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Factory KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs uppercase font-semibold">Toplam Taban Maaş</span>
            <DollarSign className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900">
            {formatCurrency(totals.baseSalary)}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {employees.length} personelin brüt toplamı
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-rose-100 shadow-2xs">
          <div className="flex items-center justify-between text-rose-600 mb-2">
            <span className="text-xs uppercase font-semibold">Toplam Vergi (%3)</span>
            <ShieldAlert className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-rose-600">
            {formatCurrency(totals.tax)}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Maaşı &gt; 1000 TL olanlardan kesinti
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-100 shadow-2xs">
          <div className="flex items-center justify-between text-amber-600 mb-2">
            <span className="text-xs uppercase font-semibold">Toplam Dağıtılan Bonus</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-amber-600">
            {formatCurrency(totals.bonus)}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Ortalama {avgHours} saat çalışma / hafta
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-100 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <span className="text-xs uppercase font-semibold">Toplam Şirket Bordrosu</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-emerald-700">
            {formatCurrency(totals.totalSalary)}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Zam + Bonuslar dahil nihai maliyet
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              Fabrika Personel Bordro Listesi
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tüm personeller Employee sınıfının metotlarıyla hesaplanır. İstediğiniz personeli seçerek simülatörde inceleyebilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              CSV Dışa Aktar
            </button>
            <button
              onClick={onOpenNewForm}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-2xs shadow-indigo-600/20 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Yeni Çalışan Ekle
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Personel (name)</th>
                <th className="py-3 px-4 text-right">Maaş (salary)</th>
                <th className="py-3 px-4 text-center">Saat (workHours)</th>
                <th className="py-3 px-4 text-center">İşe Giriş (hireYear)</th>
                <th className="py-3 px-4 text-right text-rose-600">Vergi (tax)</th>
                <th className="py-3 px-4 text-right text-amber-600">Bonus (bonus)</th>
                <th className="py-3 px-4 text-right text-blue-600">Zam (raiseSalary)</th>
                <th className="py-3 px-4 text-right font-bold text-emerald-700">Toplam Maaş</th>
                <th className="py-3 px-4 text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {employees.map((emp) => {
                const c = calculateEmployee(emp);
                return (
                  <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                          {emp.name.charAt(0).toUpperCase()}
                        </div>
                        <span>{emp.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-medium">
                      {formatRawNumber(emp.salary)} TL
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md font-mono text-xs ${
                          emp.workHours > 40
                            ? 'bg-amber-100 text-amber-800 font-bold'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {emp.workHours}h
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-600">
                      {emp.hireYear}{' '}
                      <span className="text-[11px] text-slate-400">({c.yearsWorked}y)</span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-rose-600 font-medium">
                      -{formatRawNumber(c.tax)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-amber-600 font-medium">
                      +{formatRawNumber(c.bonus)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-blue-600 font-medium">
                      +{formatRawNumber(c.raiseSalary)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700 text-sm">
                      {formatRawNumber(c.totalSalary)} TL
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onSelectEmployee(emp)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          title="Simülatörde İncele"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {employees.length > 1 && (
                          <button
                            onClick={() => onDeleteEmployee(emp.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Listeden Çıkar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
