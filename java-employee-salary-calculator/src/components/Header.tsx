import React from 'react';
import { Award, Code2, Coffee, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'simulator' | 'code' | 'payroll' | 'docs' | 'github';
  setActiveTab: (tab: 'simulator' | 'code' | 'payroll' | 'docs' | 'github') => void;
  employeeCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  employeeCount,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          {/* Logo & App Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Coffee className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                  Java OOP 101
                </span>
                <span className="text-xs text-slate-500">Mevcut Yıl: 2021</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                Employee Maaş Hesaplayıcı
              </h1>
            </div>
          </div>

          {/* Signature Badge - Enes Öztürk */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200/80 shadow-xs">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                EÖ
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider font-semibold text-indigo-600">
                  Geliştirici & İmza
                </div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-1">
                  Enes Öztürk
                  <Award className="w-3.5 h-3.5 text-amber-500 fill-amber-500 inline" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 border-t border-slate-100 pt-1 -mb-px overflow-x-auto">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`py-2.5 px-4 text-sm font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Canlı Simülatör & Hesaplama
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`py-2.5 px-4 text-sm font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'code'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Code2 className="w-4 h-4" />
            Java Kaynak Kodları (Employee.java)
          </button>

          <button
            onClick={() => setActiveTab('payroll')}
            className={`py-2.5 px-4 text-sm font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'payroll'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <span>Bordro & Fabrika Personel Listesi</span>
            <span className="ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700 font-semibold">
              {employeeCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('docs')}
            className={`py-2.5 px-4 text-sm font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'docs'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <span>Nitelikler & Metot Rehberi</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`py-2.5 px-4 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'github'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>GitHub&apos;a Entegre Et</span>
          </button>
        </div>
      </div>
    </header>
  );
};
