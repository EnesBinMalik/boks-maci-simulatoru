import React, { useState } from 'react';
import { CONSOLE_CODE_SAMPLES } from '../utils/algorithm';
import { Copy, Check, Terminal, FileCode, CheckCircle2 } from 'lucide-react';

type LanguageKey = 'csharp' | 'python' | 'javascript' | 'cpp';

const LANG_DETAILS: Record<LanguageKey, { label: string; file: string; desc: string }> = {
  csharp: {
    label: 'C# (.NET Console)',
    file: 'Program.cs',
    desc: 'C# Console Application - Console.ReadLine() & LINQ',
  },
  python: {
    label: 'Python (CLI)',
    file: 'algoritma67.py',
    desc: 'Python 3 CLI Script - input() & list comprehension',
  },
  javascript: {
    label: 'Node.js (Console)',
    file: 'index.js',
    desc: 'Node.js Console - readline module & ES6',
  },
  cpp: {
    label: 'C++ (Console)',
    file: 'main.cpp',
    desc: 'C++17 Console - std::cin & stringstream',
  },
};

export const CodeViewer: React.FC = () => {
  const [activeLang, setActiveLang] = useState<LanguageKey>('csharp');
  const [copied, setCopied] = useState(false);

  const activeCode = CONSOLE_CODE_SAMPLES[activeLang];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Description Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl">
        <div>
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <FileCode className="w-4 h-4 text-cyan-400" />
            Console Uygulaması Kaynak Kodları (Enes Öztürk İmzalı)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            İstediğiniz programlama dilini seçip kodu tek tıkla kopyalayarak doğrudan çalıştırabilirsiniz.
          </p>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700/60 transition-all shrink-0 active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Kopyalandı!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Kodu Kopyala</span>
            </>
          )}
        </button>
      </div>

      {/* Code Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        {/* Language Tabs Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800 overflow-x-auto">
          <div className="flex items-center gap-1">
            {(Object.keys(LANG_DETAILS) as LanguageKey[]).map((key) => {
              const active = activeLang === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveLang(key)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {LANG_DETAILS[key].label}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono text-slate-500 hidden sm:inline">
            {LANG_DETAILS[activeLang].file}
          </span>
        </div>

        {/* Code Content */}
        <div className="p-4 bg-slate-950 font-mono text-xs overflow-x-auto max-h-[500px]">
          <pre className="text-slate-300 leading-relaxed">
            <code>{activeCode}</code>
          </pre>
        </div>

        {/* Card Footer info */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            {LANG_DETAILS[activeLang].desc}
          </span>
          <span className="text-amber-400/90 font-mono text-[11px]">
            İmza: Enes Öztürk © 2026
          </span>
        </div>
      </div>
    </div>
  );
};
