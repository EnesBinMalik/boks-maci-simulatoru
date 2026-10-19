import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, CheckCircle2, AlertCircle } from 'lucide-react';
import { JAVA_FIGHTER_CODE, JAVA_RING_CODE, JAVA_MAIN_CODE, HOMEWORK_DETAILS } from '../utils/javaCode';

export const JavaCodeViewer: React.FC = () => {
  const [activeFile, setActiveFile] = useState<'ring' | 'fighter' | 'main'>('ring');
  const [copied, setCopied] = useState(false);

  const getCodeContent = () => {
    switch (activeFile) {
      case 'ring':
        return { filename: 'Ring.java', code: JAVA_RING_CODE };
      case 'fighter':
        return { filename: 'Fighter.java', code: JAVA_FIGHTER_CODE };
      case 'main':
        return { filename: 'Main.java', code: JAVA_MAIN_CODE };
    }
  };

  const { filename, code } = getCodeContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-6">
      {/* Educational Explanation Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Ödev Çözümü: %50 İlk Vuranı Belirleme Mantığı
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Hazırlayan: <span className="text-amber-400 font-semibold">{HOMEWORK_DETAILS.author}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Ödev Şartı Tamamlandı</span>
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          {HOMEWORK_DETAILS.solutionDescription}
        </p>

        {/* Highlighted logic snippet */}
        <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30 font-mono text-xs text-slate-300 space-y-2">
          <div className="text-amber-400 font-bold">// Ring.java içerisine entegre edilen %50 olasılık metodu:</div>
          <div className="text-blue-300">
            <span className="text-purple-400">public boolean</span> <span className="text-yellow-300">isFirst</span>() &#123;
          </div>
          <div className="pl-4 text-slate-300">
            <span className="text-purple-400">double</span> randomValue = <span className="text-cyan-300">Math</span>.<span className="text-yellow-300">random</span>(); <span className="text-slate-500">// 0.0 ile 1.0 arası değer</span>
          </div>
          <div className="pl-4 text-emerald-400">
            <span className="text-purple-400">return</span> randomValue &lt;= 0.5; <span className="text-slate-500">// Tam %50 olasılık</span>
          </div>
          <div className="text-blue-300">&#125;</div>
        </div>

        {/* Improvements list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-400">
          {HOMEWORK_DETAILS.improvements.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Code Viewer Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-mono">
        {/* Tabs and action buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-900 border-b border-slate-800">
          {/* File selector tabs */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveFile('ring')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeFile === 'ring'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-800/60'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Ring.java (%50 Çözüm)</span>
            </button>
            <button
              onClick={() => setActiveFile('fighter')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeFile === 'fighter'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-800/60'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Fighter.java</span>
            </button>
            <button
              onClick={() => setActiveFile('main')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeFile === 'main'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-800/60'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Main.java</span>
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors cursor-pointer"
              title={`${filename} dosyasını indir`}
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>.java İndir</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-x-auto text-xs leading-relaxed max-h-[600px] overflow-y-auto">
          <pre className="text-slate-300">
            {code.split('\n').map((line, idx) => {
              const lineNum = idx + 1;
              const isComment = line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*');
              const isHighlight = line.includes('isFirst') || line.includes('randomValue <= 0.5') || line.includes('f1Starts');

              return (
                <div
                  key={idx}
                  className={`flex items-start hover:bg-slate-900/60 px-2 py-0.5 rounded transition-colors ${
                    isHighlight ? 'bg-amber-500/10 border-l-2 border-amber-400' : ''
                  }`}
                >
                  <span className="w-10 shrink-0 text-slate-600 select-none text-right pr-4 tabular-nums">
                    {lineNum}
                  </span>
                  <span
                    className={
                      isHighlight
                        ? 'text-amber-300 font-semibold'
                        : isComment
                        ? 'text-slate-500 italic'
                        : 'text-slate-200'
                    }
                  >
                    {line}
                  </span>
                </div>
              );
            })}
          </pre>
        </div>
      </div>
    </div>
  );
};
