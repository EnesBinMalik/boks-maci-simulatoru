import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Copy, Check, Trash2, ArrowDown } from 'lucide-react';

interface TerminalConsoleProps {
  logs: string[];
  onClear: () => void;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({ logs, onClear }) => {
  const [copied, setCopied] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [filter, setFilter] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, autoScroll]);

  const handleCopy = () => {
    navigator.clipboard.writeText(logs.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredLogs = filter
    ? logs.filter((line) => line.toLowerCase().includes(filter.toLowerCase()))
    : logs;

  return (
    <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-amber-400" />
          <span className="font-semibold text-slate-200">Java Konsol Çıktısı (System.out)</span>
          <span className="text-[11px] text-slate-400">· {logs.length} satır</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter */}
          <input
            type="text"
            placeholder="Ara..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-24 sm:w-32 px-2 py-1 bg-slate-950 border border-slate-800 rounded text-[11px] text-slate-300 placeholder-slate-600 focus:outline-none focus:border-amber-400"
          />

          {/* Auto scroll toggle */}
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            title={autoScroll ? 'Otomatik kaydırmayı kapat' : 'Otomatik kaydırmayı aç'}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              autoScroll ? 'text-amber-400 bg-amber-400/10' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="text-[11px]">{copied ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>

          {/* Clear button */}
          <button
            onClick={onClear}
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title="Konsolu Temizle"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="p-4 h-64 sm:h-72 overflow-y-auto space-y-0.5 select-text">
        {filteredLogs.length === 0 ? (
          <div className="text-slate-600 italic py-8 text-center">
            Konsol çıktısı burada görüntülenecektir. "Dövüşü Başlat" butonuna tıklayarak simülasyonu çalıştırın.
          </div>
        ) : (
          filteredLogs.map((log, index) => {
            // Contextual coloring matching Java output
            let textColor = 'text-slate-300';
            if (log.includes('ROUND')) textColor = 'text-amber-400 font-bold';
            else if (log.includes('YAZI-TURA')) textColor = 'text-cyan-300 font-bold bg-cyan-950/30 px-1 py-0.5 rounded';
            else if (log.includes('hasar vurdu')) textColor = 'text-rose-300';
            else if (log.includes('savurdu')) textColor = 'text-emerald-400 font-semibold';
            else if (log.includes('Kazanan')) textColor = 'text-yellow-300 font-black text-sm bg-yellow-950/40 px-1 py-0.5 rounded';
            else if (log.includes('Kalan Can')) textColor = 'text-blue-300';
            else if (log.includes('---')) textColor = 'text-slate-600';

            return (
              <div key={index} className={`leading-relaxed ${textColor}`}>
                {log}
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
