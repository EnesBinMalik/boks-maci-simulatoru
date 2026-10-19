/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { EmployeeData, calculateEmployee } from './types/employee';
import { Header } from './components/Header';
import { EmployeeForm } from './components/EmployeeForm';
import { CalculationBreakdown } from './components/CalculationBreakdown';
import { ConsoleOutput } from './components/ConsoleOutput';
import { CodeViewer } from './components/CodeViewer';
import { PayrollTable } from './components/PayrollTable';
import { MethodExplainer } from './components/MethodExplainer';
import { GithubIntegration } from './components/GithubIntegration';
import { Award, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

const INITIAL_EMPLOYEES: EmployeeData[] = [
  { id: '1', name: 'kemal', salary: 2000, workHours: 45, hireYear: 1985 },
  { id: '2', name: 'Ayşe Kaya', salary: 950, workHours: 40, hireYear: 2018 },
  { id: '3', name: 'Murat Demir', salary: 4500, workHours: 48, hireYear: 2006 },
  { id: '4', name: 'Selin Yıldız', salary: 6000, workHours: 42, hireYear: 1995 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'payroll' | 'docs' | 'github'>('simulator');
  const [employees, setEmployees] = useState<EmployeeData[]>(INITIAL_EMPLOYEES);

  // Active form employee (defaults to the exact Kemal example from the prompt)
  const [formData, setFormData] = useState<EmployeeData>({
    id: 'current-sim',
    name: 'kemal',
    salary: 2000,
    workHours: 45,
    hireYear: 1985,
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const currentCalcs = calculateEmployee(formData);

  const handleResetToSample = () => {
    setFormData({
      id: 'current-sim',
      name: 'kemal',
      salary: 2000,
      workHours: 45,
      hireYear: 1985,
    });
    showNotification("Kemal'in örnek verileri yüklendi!");
  };

  const handleAddToPayroll = () => {
    const newEmp: EmployeeData = {
      ...formData,
      id: 'emp-' + Date.now(),
    };
    setEmployees((prev) => [newEmp, ...prev]);
    showNotification(`"${formData.name}" bordro listesine eklendi!`);
  };

  const handleSelectFromPayroll = (emp: EmployeeData) => {
    setFormData({ ...emp });
    setActiveTab('simulator');
    showNotification(`"${emp.name}" simülatöre yüklendi.`);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    showNotification('Çalışan listeden silindi.');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* App Header with Enes Öztürk Signature */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        employeeCount={employees.length}
      />

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-medium shadow-xl border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Tab 1: Simulator & Live Calculator */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            {/* Top Prompt Banner Highlighting the Kemal Case */}
            <div className="bg-gradient-to-r from-indigo-500/10 via-amber-500/10 to-transparent p-4 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>
                  <strong>Aktif Örnek:</strong> {formData.name} • Maaş: {formData.salary} TL • Çalışma Saati: {formData.workHours} • İşe Başlangıç: {formData.hireYear}
                </span>
              </div>
              <div className="text-xs font-mono font-semibold text-indigo-700 bg-white/90 px-3 py-1 rounded-lg border border-indigo-200 self-start sm:self-auto">
                Mevcut Yıl Referansı: 2021
              </div>
            </div>

            {/* Employee Form Card */}
            <EmployeeForm
              formData={formData}
              setFormData={setFormData}
              onAddToPayroll={handleAddToPayroll}
              onResetToSample={handleResetToSample}
            />

            {/* Calculation Breakdown Cards */}
            <CalculationBreakdown
              salary={formData.salary}
              workHours={formData.workHours}
              hireYear={formData.hireYear}
              calcs={currentCalcs}
            />

            {/* Terminal Console Output */}
            <ConsoleOutput formData={formData} calcs={currentCalcs} />
          </div>
        )}

        {/* Tab 2: Java Source Code */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <CodeViewer />
          </div>
        )}

        {/* Tab 3: Payroll Table */}
        {activeTab === 'payroll' && (
          <PayrollTable
            employees={employees}
            onSelectEmployee={handleSelectFromPayroll}
            onDeleteEmployee={handleDeleteEmployee}
            onOpenNewForm={() => {
              setFormData({
                id: 'new-' + Date.now(),
                name: 'Yeni Personel',
                salary: 2500,
                workHours: 40,
                hireYear: 2015,
              });
              setActiveTab('simulator');
            }}
          />
        )}

        {/* Tab 4: Class & Methods Documentation */}
        {activeTab === 'docs' && (
          <MethodExplainer />
        )}

        {/* Tab 5: GitHub Entegrasyonu */}
        {activeTab === 'github' && (
          <GithubIntegration />
        )}
      </main>

      {/* Footer with Enes Öztürk Signature */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Java Employee Maaş Sistemi</span>
            <span>•</span>
            <span>4 Nitelik, 5 Metot (tax, bonus, raiseSalary, toString)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Proje İmzası:</span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white font-bold text-xs shadow-xs">
              <Award className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Enes Öztürk</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
