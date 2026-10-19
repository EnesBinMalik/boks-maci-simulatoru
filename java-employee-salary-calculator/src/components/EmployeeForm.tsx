import React from 'react';
import { EmployeeData } from '../types/employee';
import { User, DollarSign, Clock, Calendar, RotateCcw, Plus, BookmarkCheck } from 'lucide-react';

interface EmployeeFormProps {
  formData: EmployeeData;
  setFormData: React.Dispatch<React.SetStateAction<EmployeeData>>;
  onAddToPayroll: () => void;
  onResetToSample: () => void;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  formData,
  setFormData,
  onAddToPayroll,
  onResetToSample,
}) => {
  const presets = [
    {
      label: 'Kemal (Örnek Vaka)',
      badge: 'Soru Örneği',
      data: { name: 'kemal', salary: 2000, workHours: 45, hireYear: 1985 },
    },
    {
      label: 'Ayşe (Vergisiz Sınır)',
      badge: '<1000 TL',
      data: { name: 'Ayşe Kaya', salary: 950, workHours: 40, hireYear: 2018 },
    },
    {
      label: 'Murat (Kıdemli Usta)',
      badge: '10-19 Yıl',
      data: { name: 'Murat Demir', salary: 4500, workHours: 48, hireYear: 2006 },
    },
    {
      label: 'Selin (Emektar 20+ Yıl)',
      badge: '%15 Zam',
      data: { name: 'Selin Yıldız', salary: 6000, workHours: 42, hireYear: 1995 },
    },
  ];

  const handlePresetClick = (preset: typeof presets[0]['data']) => {
    setFormData((prev) => ({
      ...prev,
      ...preset,
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-600" />
            Çalışan Parametreleri (Employee Sınıfı Girdileri)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Employee(name, salary, workHours, hireYear) kurucu metoduna gönderilecek veriler.
          </p>
        </div>
        <button
          onClick={onResetToSample}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-slate-200"
          title="Sorudaki 'kemal' örneğine sıfırla"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Örneğe Sıfırla (Kemal)
        </button>
      </div>

      {/* Quick Presets */}
      <div className="pt-4 pb-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
          Hızlı Senaryolar (Hazır Şablonlar)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {presets.map((preset, idx) => {
            const isActive =
              formData.name === preset.data.name &&
              formData.salary === preset.data.salary &&
              formData.workHours === preset.data.workHours &&
              formData.hireYear === preset.data.hireYear;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetClick(preset.data)}
                className={`p-2.5 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                  isActive
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-xs ring-1 ring-indigo-500'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className="font-semibold truncate">{preset.label}</span>
                <span className="mt-1 text-[10px] text-slate-500">
                  {preset.data.salary} TL • {preset.data.workHours}s • {preset.data.hireYear}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inputs Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
            1. name (Adı ve Soyadı)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50/50 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all outline-hidden font-medium text-slate-800"
              placeholder="Örn: kemal"
            />
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Java veri tipi: <code className="text-indigo-600 font-mono">String</code>
          </span>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 flex justify-between">
            <span>2. salary (Maaşı)</span>
            <span className="text-indigo-600 font-mono font-bold">
              {formData.salary.toLocaleString('tr-TR')} TL
            </span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <DollarSign className="w-4 h-4" />
            </div>
            <input
              type="number"
              min="0"
              step="50"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: Math.max(0, Number(e.target.value)) })}
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50/50 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all outline-hidden font-medium text-slate-800"
              placeholder="Örn: 2000.0"
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
            <span>1000 TL altı: %0 vergi | 1000 TL üstü: %3 vergi</span>
            <span className="font-mono text-indigo-600">double</span>
          </div>
        </div>

        {/* Work Hours */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 flex justify-between">
            <span>3. workHours (Haftalık Çalışma Saati)</span>
            <span className="text-amber-600 font-mono font-bold">
              {formData.workHours} saat / hafta
            </span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Clock className="w-4 h-4" />
            </div>
            <input
              type="number"
              min="0"
              max="120"
              value={formData.workHours}
              onChange={(e) => setFormData({ ...formData, workHours: Math.max(0, Number(e.target.value)) })}
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50/50 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all outline-hidden font-medium text-slate-800"
              placeholder="Örn: 45"
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
            <span>
              {formData.workHours > 40 ? (
                <strong className="text-emerald-600">
                  +{formData.workHours - 40} saat fazla mesai (x30 TL)
                </strong>
              ) : (
                '40 saat ve altı: Bonus yok'
              )}
            </span>
            <span className="font-mono text-indigo-600">int</span>
          </div>
        </div>

        {/* Hire Year */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 flex justify-between">
            <span>4. hireYear (İşe Başlangıç Yılı)</span>
            <span className="text-blue-600 font-mono font-bold">
              {Math.max(0, 2021 - formData.hireYear)} yıl kıdem
            </span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="number"
              min="1950"
              max="2021"
              value={formData.hireYear}
              onChange={(e) => setFormData({ ...formData, hireYear: Number(e.target.value) })}
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50/50 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all outline-hidden font-medium text-slate-800"
              placeholder="Örn: 1985"
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
            <span>Referans Yıl: 2021 (Hizmet süresi = 2021 - hireYear)</span>
            <span className="font-mono text-indigo-600">int</span>
          </div>
        </div>
      </div>

      {/* Action to add to multi-person payroll */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <BookmarkCheck className="w-4 h-4 text-emerald-600" />
          <span>Tüm değerler Java kurallarına göre anlık hesaplanmaktadır.</span>
        </div>
        <button
          onClick={onAddToPayroll}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl shadow-xs shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          Bu Çalışanı Bordro Listesine Ekle
        </button>
      </div>
    </div>
  );
};
