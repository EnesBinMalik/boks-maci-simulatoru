import React, { useState } from 'react';
import { Copy, Check, Terminal, FileCode2, BookOpen } from 'lucide-react';
import { CODE_SNIPPETS } from '../utils/codeSnippets';

export const CodeViewer: React.FC = () => {
  const [activeLang, setActiveLang] = useState<string>('csharp');
  const [copied, setCopied] = useState<boolean>(false);

  const snippet = CODE_SNIPPETS[activeLang] || CODE_SNIPPETS.csharp;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
      {/* Tab bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {Object.entries(CODE_SNIPPETS).map(([key, item]) => {
            const isActive = activeLang === key;
            return (
              <button
                key={key}
                onClick={() => setActiveLang(key)}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-all ${
                  isActive
                    ? 'bg-zinc-800 text-emerald-400 border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
                }`}
              >
                {item.language}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-md border border-zinc-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* File meta & run command bar */}
      <div className="px-4 py-2 bg-zinc-900/60 border-b border-zinc-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400 gap-2">
        <div className="flex items-center gap-2">
          <FileCode2 className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-zinc-300 font-semibold">{snippet.filename}</span>
        </div>
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>Çalıştırma:</span>
          <code className="px-2 py-0.5 bg-black/50 border border-zinc-800 rounded text-emerald-300">
            {snippet.runCommand}
          </code>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="p-4 bg-black/60 overflow-x-auto font-mono text-xs md:text-sm text-zinc-200 leading-relaxed max-h-[460px] select-text">
        <pre className="whitespace-pre">
          <code>{snippet.code}</code>
        </pre>
      </div>

      {/* Explanation Box */}
      <div className="p-4 bg-zinc-900/70 border-t border-zinc-800 text-xs text-zinc-300 flex items-start gap-3">
        <div className="p-1.5 bg-zinc-800 rounded text-sky-400 shrink-0 mt-0.5">
          <BookOpen className="w-4 h-4" />
        </div>
        <div>
          <span className="font-semibold text-zinc-100 block mb-0.5">
            Algoritma ve Mantık Açıklaması:
          </span>
          <p className="text-zinc-400 leading-relaxed text-[11px] md:text-xs">
            {snippet.explanation}
          </p>
        </div>
      </div>
    </div>
  );
};
