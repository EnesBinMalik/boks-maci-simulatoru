import React, { useState } from 'react';
import { CODE_SNIPPETS } from '../utils/codeSnippets';
import { Copy, Check, Terminal, Code2, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

export const CodePlayground: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<string>('csharp');
  const [copied, setCopied] = useState<boolean>(false);

  const snippet = CODE_SNIPPETS[selectedLang] || CODE_SNIPPETS.csharp;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Box */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>Konsol Uygulaması Kaynak Kodları (Console Application)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Bu algoritmanın C#, Python, JavaScript (Node.js), Java ve C++ dillerinde yazılmış, çalışmaya hazır konsol uygulamaları. Kodların başında <strong>Enes Öztürk</strong> telif hakları ve imza blokları yer almaktadır.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl shrink-0 font-medium">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Telif Korumalı Algoritma Mimarisi</span>
          </div>
        </div>
      </div>

      {/* Language Tabs & Code Card */}
      <div className="border border-slate-800 bg-slate-950 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Top bar with tabs */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
            {Object.keys(CODE_SNIPPETS).map((langKey) => {
              const item = CODE_SNIPPETS[langKey];
              const isSelected = selectedLang === langKey;

              return (
                <button
                  key={langKey}
                  onClick={() => setSelectedLang(langKey)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.language}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
              {snippet.filename}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 sm:p-6 overflow-x-auto bg-slate-950">
          <div className="text-xs font-mono text-slate-400 mb-3 pb-2 border-b border-slate-800/80 flex items-center justify-between">
            <span>{snippet.description}</span>
            <span className="text-emerald-400">© Enes Öztürk</span>
          </div>

          <pre className="font-mono text-xs sm:text-sm text-emerald-300/95 leading-relaxed selection:bg-emerald-500 selection:text-slate-950">
            <code>{snippet.code}</code>
          </pre>
        </div>

        {/* How to Run Helper */}
        <div className="bg-slate-900/80 border-t border-slate-800 p-4 text-xs">
          <div className="flex items-center gap-2 font-semibold text-slate-300 mb-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Terminalde Nasıl Çalıştırılır?</span>
          </div>
          <div className="bg-slate-950 rounded-xl p-2.5 font-mono text-[11px] text-slate-300 border border-slate-800">
            {selectedLang === 'csharp' && (
              <code>dotnet new console -o SessizHarfApp &amp;&amp; cd SessizHarfApp &amp;&amp; dotnet run</code>
            )}
            {selectedLang === 'python' && (
              <code>python3 algoritma.py</code>
            )}
            {selectedLang === 'javascript' && (
              <code>node index.js</code>
            )}
            {selectedLang === 'java' && (
              <code>javac Main.java &amp;&amp; java Main</code>
            )}
            {selectedLang === 'cpp' && (
              <code>g++ -std=c++17 main.cpp -o main &amp;&amp; ./main</code>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
