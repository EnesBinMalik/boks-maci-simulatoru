import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Terminal } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { CODE_TEMPLATES } from '../utils/codeTemplates';

export const CodePlayground: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('csharp');
  const [copied, setCopied] = useState(false);

  const currentTemplate = CODE_TEMPLATES[selectedLang];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTemplate.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentTemplate.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentTemplate.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Title & Info */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <FileCode className="w-4 h-4 text-cyan-400" />
            Üretim Seviyesinde Konsol Uygulaması Kaynak Kodları
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            İstediğiniz programlama dilinde derlenmeye ve doğrudan terminalde çalıştırılmaya hazır konsol uygulaması. Enes Öztürk telif hakları ve lisansıyla tescillidir.
          </p>
        </div>

        {/* Language selector buttons */}
        <div className="flex items-center gap-1.5 flex-wrap p-1 bg-slate-950 rounded-lg border border-slate-800">
          {(Object.keys(CODE_TEMPLATES) as SupportedLanguage[]).map((langKey) => {
            const item = CODE_TEMPLATES[langKey];
            const isSelected = selectedLang === langKey;
            return (
              <button
                key={langKey}
                onClick={() => setSelectedLang(langKey)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.name.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Editor Window */}
      <div className="rounded-xl border border-slate-800 bg-[#080d17] shadow-2xl overflow-hidden flex flex-col font-mono text-xs md:text-sm">
        {/* Editor Toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 select-none">
          <div className="flex items-center gap-3">
            <span className="text-xs font-sans text-cyan-300 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              {currentTemplate.filename}
            </span>
            <span className="text-slate-500 text-xs font-sans hidden sm:inline">
              ({currentTemplate.name})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-sans font-medium transition-colors border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-sans font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>İndir ({currentTemplate.fileExtension.toUpperCase()})</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 md:p-6 overflow-x-auto max-h-[550px] leading-relaxed text-slate-200 bg-[#060a12]">
          <pre className="font-mono text-xs md:text-sm">{currentTemplate.code}</pre>
        </div>

        {/* Terminal Run Instructions Bar */}
        <div className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-sans text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Terminalde Çalıştırma Komutu:</span>
            <code className="px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800 font-mono">
              {currentTemplate.runCommand}
            </code>
          </div>
          <div className="text-slate-500 text-[11px]">
            Telif Sahibi: <strong className="text-slate-300">Enes Öztürk</strong> © 2026
          </div>
        </div>
      </div>
    </div>
  );
};
