import React, { useState } from 'react';
import { EMPLOYEE_JAVA_CODE, MAIN_JAVA_CODE } from '../data/javaSourceCode';
import { Copy, Check, Download, FileCode, CheckCircle2, Award, Terminal } from 'lucide-react';

export const CodeViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<'Employee.java' | 'Main.java'>('Employee.java');
  const [copied, setCopied] = useState(false);

  const currentCode = selectedFile === 'Employee.java' ? EMPLOYEE_JAVA_CODE : MAIN_JAVA_CODE;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Top Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileCode className="w-5 h-5 text-indigo-600" />
              Java Kaynak Kodları (Source Code)
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Hazır & Test Edildi
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Tüm nitelikler, kurucu metot, tax(), bonus(), raiseSalary(), toString() ve Enes Öztürk imzası.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-indigo-600 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 shadow-2xs transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-2xs shadow-indigo-600/20 transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>{selectedFile} İndir</span>
          </button>
        </div>
      </div>

      {/* Tabs for Employee.java vs Main.java */}
      <div className="flex items-center justify-between px-4 sm:px-6 bg-slate-900 border-b border-slate-800">
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedFile('Employee.java')}
            className={`py-2.5 px-4 text-xs sm:text-sm font-mono font-medium transition-all flex items-center gap-2 border-b-2 ${
              selectedFile === 'Employee.java'
                ? 'border-indigo-400 text-indigo-300 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            Employee.java (Ana Sınıf)
          </button>

          <button
            onClick={() => setSelectedFile('Main.java')}
            className={`py-2.5 px-4 text-xs sm:text-sm font-mono font-medium transition-all flex items-center gap-2 border-b-2 ${
              selectedFile === 'Main.java'
                ? 'border-indigo-400 text-indigo-300 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            Main.java (Çalıştırma & Test)
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-amber-400 font-mono">
          <Award className="w-3.5 h-3.5" />
          <span>İmza: Enes Öztürk</span>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="bg-slate-950 p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed max-h-[600px] overflow-y-auto">
        <pre className="font-mono">
          <code>{currentCode}</code>
        </pre>
      </div>

      {/* Code Notes Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800">Derleme & Çalıştırma:</span>
          <code className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-800 font-mono">
            javac Employee.java Main.java && java Main
          </code>
        </div>
        <div className="text-slate-500 italic">
          Java 8, 11, 17, 21+ tüm sürümlerle tam uyumludur.
        </div>
      </div>
    </div>
  );
};
