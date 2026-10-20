import React, { useState, useRef, useEffect } from 'react';
import { TerminalLine, AlgorithmResult } from '../types/algorithm';
import { execute67Algorithm } from '../utils/algorithm';
import { Copy, Check, Trash2, HelpCircle, Sparkles, Send } from 'lucide-react';

interface TerminalConsoleProps {
  onResultCalculated: (result: AlgorithmResult) => void;
  externalInputTrigger?: string | null;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({
  onResultCalculated,
  externalInputTrigger,
}) => {
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: 'boot-1',
      type: 'system',
      text: 'Enes Öztürk 67 Eşik Değer Algoritması - Console v1.0.0',
    },
    {
      id: 'boot-2',
      type: 'signature',
      text: 'Telif Hakkı © 2026 Enes Öztürk. Tüm Hakları Saklıdır.',
    },
    {
      id: 'boot-3',
      type: 'info',
      text: 'Kural: Sayı < 67 ise farklar (67 - x) toplanır. Sayı > 67 ise farkların mutlak kareleri (x - 67)² toplanır.',
    },
    {
      id: 'boot-4',
      type: 'info',
      text: 'Kullanım: Sayıları yazıp Enter\'a basın (örn: "56 45 68 77") veya "help" yazın.',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [copied, setCopied] = useState(false);
  const [lastOutput, setLastOutput] = useState<string>('33 101');

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Handle external triggers (e.g. from preset buttons)
  useEffect(() => {
    if (externalInputTrigger) {
      runInput(externalInputTrigger);
    }
  }, [externalInputTrigger]);

  const handleCopyLastOutput = () => {
    if (!lastOutput) return;
    navigator.clipboard.writeText(lastOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setHistory([
      {
        id: `clear-${Date.now()}`,
        type: 'system',
        text: 'Konsol temizlendi. Sayıları giriniz (örn: 56 45 68 77):',
      },
    ]);
  };

  const runInput = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    // Add to command history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const promptLine: TerminalLine = {
      id: `cmd-${Date.now()}`,
      type: 'prompt',
      text: trimmed,
    };

    const lower = trimmed.toLowerCase();

    if (lower === 'clear' || lower === 'cls') {
      handleClear();
      return;
    }

    if (lower === 'help' || lower === 'yardim' || lower === '?') {
      setHistory((prev) => [
        ...prev,
        promptLine,
        {
          id: `help-1-${Date.now()}`,
          type: 'info',
          text: '--- YARDIM & KOMUTLAR ---',
        },
        {
          id: `help-2-${Date.now()}`,
          type: 'info',
          text: '• <sayı_1> <sayı_2> ... : Sayıları 67 eşiğine göre hesaplar. (Örn: 56 45 68 77)',
        },
        {
          id: `help-3-${Date.now()}`,
          type: 'info',
          text: '• example / ornek      : Referans örneği (56 45 68 77) çalıştırır.',
        },
        {
          id: `help-4-${Date.now()}`,
          type: 'info',
          text: '• clear / cls          : Konsol ekranını temizler.',
        },
        {
          id: `help-5-${Date.now()}`,
          type: 'signature',
          text: '• about / telif        : Enes Öztürk telif hakkı ve imza bilgisi.',
        },
      ]);
      return;
    }

    if (lower === 'example' || lower === 'ornek') {
      runInput('56 45 68 77');
      return;
    }

    if (lower === 'about' || lower === 'telif' || lower === 'imza') {
      setHistory((prev) => [
        ...prev,
        promptLine,
        {
          id: `about-${Date.now()}`,
          type: 'signature',
          text: 'Algoritma Tasarımı: Enes Öztürk\nFikri Mülkiyet & Telif: © 2026 Enes Öztürk. Tüm hakları saklıdır.\nEşik Değeri: 67 (Küçükler fark toplamı, büyükler mutlak kare toplamı)',
        },
      ]);
      return;
    }

    // Process as numbers
    const result = execute67Algorithm(trimmed);
    onResultCalculated(result);
    setLastOutput(result.output);

    if (result.numbers.length === 0) {
      setHistory((prev) => [
        ...prev,
        promptLine,
        {
          id: `err-${Date.now()}`,
          type: 'error',
          text: 'Hata: Sayı tespit edilemedi. Lütfen aralarında boşluk olan sayılar giriniz (örn: 56 45 68 77).',
        },
      ]);
      return;
    }

    const lines: TerminalLine[] = [
      promptLine,
      {
        id: `calc-${Date.now()}`,
        type: 'info',
        text: `Giriş: ${result.numbers.join(' ')} (n = ${result.numbers.length} sayı)`,
      },
      {
        id: `res-${Date.now()}`,
        type: 'success',
        text: `Çıktı: ${result.output}`,
      },
      {
        id: `sig-${Date.now()}`,
        type: 'signature',
        text: 'İmza: Enes Öztürk | Telif Hakkı: © 2026 Enes Öztürk. Tüm Hakları Saklıdır.',
      },
    ];

    setHistory((prev) => [...prev, ...lines]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runInput(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[540px]">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800/80 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors" />
          <span className="ml-2 text-xs font-mono text-slate-400">
            enes@ozturk-dev: ~/console-algoritma-67
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => runInput('56 45 68 77')}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-800 rounded transition-colors"
            title="Örnek Girdiyi Çalıştır"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span className="hidden sm:inline">Örnek</span>
          </button>
          <button
            onClick={handleCopyLastOutput}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-800 rounded transition-colors"
            title="Son Çıktıyı Kopyala"
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3 text-slate-400" />
            )}
            <span className="hidden sm:inline">
              {copied ? 'Kopyalandı' : 'Çıktı'}
            </span>
          </button>
          <button
            onClick={() => runInput('help')}
            className="p-1 text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800/60 transition-colors"
            title="Komut Yardımı"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleClear}
            className="p-1 text-slate-400 hover:text-rose-300 rounded hover:bg-slate-800/60 transition-colors"
            title="Konsolu Temizle"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        className="flex-1 p-4 font-mono text-xs sm:text-sm overflow-y-auto bg-slate-950/95 space-y-2"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line) => {
          if (line.type === 'system') {
            return (
              <div key={line.id} className="text-cyan-400 font-semibold">
                {line.text}
              </div>
            );
          }
          if (line.type === 'signature') {
            return (
              <div
                key={line.id}
                className="text-amber-400/90 whitespace-pre-line border-t border-b border-amber-500/20 py-1 my-1"
              >
                {line.text}
              </div>
            );
          }
          if (line.type === 'prompt') {
            return (
              <div key={line.id} className="flex items-start gap-2 text-slate-200">
                <span className="text-cyan-400 select-none">enes@ozturk:~$</span>
                <span className="text-white font-medium">{line.text}</span>
              </div>
            );
          }
          if (line.type === 'success') {
            return (
              <div
                key={line.id}
                className="text-emerald-400 font-bold bg-emerald-950/30 border border-emerald-500/30 px-3 py-1.5 rounded"
              >
                {line.text}
              </div>
            );
          }
          if (line.type === 'error') {
            return (
              <div key={line.id} className="text-rose-400">
                {line.text}
              </div>
            );
          }
          return (
            <div key={line.id} className="text-slate-400">
              {line.text}
            </div>
          );
        })}

        {/* Active Command Line */}
        <div className="flex items-center gap-2 pt-1 text-slate-200">
          <span className="text-cyan-400 select-none whitespace-nowrap">
            enes@ozturk:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="56 45 68 77 yazın ve Enter'a basın..."
            className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-slate-600 caret-cyan-400 text-xs sm:text-sm"
            autoFocus
          />
          <button
            type="button"
            onClick={() => {
              runInput(inputVal);
              setInputVal('');
            }}
            disabled={!inputVal.trim()}
            className="p-1 text-slate-400 hover:text-cyan-400 disabled:opacity-30 transition-colors"
            title="Çalıştır"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        <div ref={bottomRef} />
      </div>

      {/* Terminal Status Footer */}
      <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 select-none">
        <div className="flex items-center gap-4">
          <span>Eşik Değer: <strong className="text-slate-300">67</strong></span>
          <span>Son Çıktı: <strong className="text-emerald-400 font-semibold">{lastOutput}</strong></span>
        </div>
        <div className="text-slate-400">
          İmza: <span className="text-slate-300 font-semibold">Enes Öztürk</span> © 2026
        </div>
      </div>
    </div>
  );
};
