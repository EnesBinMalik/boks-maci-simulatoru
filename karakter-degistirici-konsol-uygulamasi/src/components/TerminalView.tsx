import React, { useState, useRef, useEffect } from 'react';
import { Copy, Check, Trash2, ShieldCheck, Sparkles, CornerDownLeft, ArrowRightLeft } from 'lucide-react';
import { AlgorithmResult, SwapMode, TerminalLogEntry } from '../types';
import { runSwapAlgorithm, PRESET_EXAMPLES } from '../utils/algorithm';

interface TerminalViewProps {
  onInspectResult?: (result: AlgorithmResult) => void;
  externalTriggerInput?: string | null;
}

const INITIAL_WELCOME = `╔══════════════════════════════════════════════════════════════════════════════╗
║             İLK VE SON KARAKTER DEĞİŞTİRİCİ KONSOL UYGULAMASI                ║
║             Yazılım Geliştirici : Enes Öztürk                                ║
║             Telif Hakkı         : © 2026 Enes Öztürk. Tüm Hakları Saklıdır.  ║
║             Algoritma Sürümü    : v1.0.4-LTS (Console CLI)                   ║
╚══════════════════════════════════════════════════════════════════════════════╝
İpuçları:
• İstediğiniz herhangi bir metni doğrudan yazıp [Enter] tuşuna basabilirsiniz.
• 'yardim' yazarak komut listesini görebilirsiniz.
• 'ornek' yazarak sorudaki örnek testi çalıştırabilirsiniz.
• 'telif' yazarak resmi telif hakkı bildirimini görüntüleyebilirsiniz.`;

export const TerminalView: React.FC<TerminalViewProps> = ({
  onInspectResult,
  externalTriggerInput,
}) => {
  const [logs, setLogs] = useState<TerminalLogEntry[]>([
    {
      id: 'init-1',
      type: 'system',
      content: INITIAL_WELCOME,
      timestamp: new Date().toLocaleTimeString('tr-TR'),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState<SwapMode>('words');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [copied, setCopied] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  // Handle external trigger if passed from Header
  useEffect(() => {
    if (externalTriggerInput) {
      handleExecute(externalTriggerInput);
    }
  }, [externalTriggerInput]);

  const handleExecute = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Add to history
    setHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const inputEntry: TerminalLogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      type: 'input',
      content: rawCmd,
      timestamp: new Date().toLocaleTimeString('tr-TR'),
    };

    const lower = trimmed.toLowerCase();

    // Check built-in commands
    if (lower === 'yardim' || lower === 'help' || lower === '?') {
      const helpEntry: TerminalLogEntry = {
        id: Math.random().toString(36).substring(2, 9),
        type: 'system',
        content: `KONSOL KOMUTLARI:
  [herhangi bir metin]   -> Metindeki ilk ve son karakterleri takas eder
  ornek                  -> Sorudaki 'Merhaba Hello Algoritma x' örneğini çalıştırır
  temizle / clear        -> Terminal ekranını temizler
  telif / copyright      -> Enes Öztürk telif hakları ve lisans detaylarını gösterir
  mod [kelime|tum]       -> 'kelime' (her kelime için) veya 'tum' (tüm metin için)
  hakkinda               -> Algoritma ve geliştirici bilgileri`,
        timestamp: new Date().toLocaleTimeString('tr-TR'),
      };
      setLogs((prev) => [...prev, inputEntry, helpEntry]);
      setInputValue('');
      return;
    }

    if (lower === 'temizle' || lower === 'clear' || lower === 'cls') {
      setLogs([]);
      setInputValue('');
      return;
    }

    if (lower === 'telif' || lower === 'copyright') {
      const copyrightEntry: TerminalLogEntry = {
        id: Math.random().toString(36).substring(2, 9),
        type: 'signature',
        content: `================================================================================
TELİF HAKKI VE MÜLKİYET BİLDİRİMİ
================================================================================
Yazılım Sahibi ve Geliştirici : Enes Öztürk
Telif Yılı                    : 2026
Yasal Haklar                 : © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
Hukuki Statü                 : Fikir ve Sanat Eserleri Kanunu ile Korunmaktadır.
Algoritma                    : String İlk ve Son Karakter Değiştirme Algoritması
Lisans                       : Enes Öztürk Tescilli Ticari & Akademik Kullanım Lisansı
================================================================================`,
        timestamp: new Date().toLocaleTimeString('tr-TR'),
      };
      setLogs((prev) => [...prev, inputEntry, copyrightEntry]);
      setInputValue('');
      return;
    }

    if (lower === 'ornek' || lower === 'demo') {
      const sample = 'Merhaba Hello Algoritma x';
      const result = runSwapAlgorithm(sample, mode);
      const outputEntry: TerminalLogEntry = {
        id: Math.random().toString(36).substring(2, 9),
        type: 'output',
        content: `Giriş : ${sample}\nÇıktı : ${result.output}\n\n[İmza]: Enes Öztürk imzasıyla yürütüldü. © 2026 Tüm Hakları Saklıdır.`,
        details: result,
        timestamp: new Date().toLocaleTimeString('tr-TR'),
      };
      setLogs((prev) => [...prev, inputEntry, outputEntry]);
      setInputValue('');
      if (onInspectResult) onInspectResult(result);
      return;
    }

    if (lower.startsWith('mod ') || lower.startsWith('mode ')) {
      const targetMode = lower.split(' ')[1];
      if (targetMode === 'kelime' || targetMode === 'words') {
        setMode('words');
        setLogs((prev) => [
          ...prev,
          inputEntry,
          {
            id: Math.random().toString(36).substring(2, 9),
            type: 'system',
            content: `[Bilgi] Çalışma modu 'Kelime Bazlı' olarak güncellendi. (Her kelimenin ilk ve son harfi takas edilir)`,
            timestamp: new Date().toLocaleTimeString('tr-TR'),
          },
        ]);
      } else if (targetMode === 'tum' || targetMode === 'full') {
        setMode('fullString');
        setLogs((prev) => [
          ...prev,
          inputEntry,
          {
            id: Math.random().toString(36).substring(2, 9),
            type: 'system',
            content: `[Bilgi] Çalışma modu 'Tüm Metin Bazlı' olarak güncellendi. (Bütün cümlenin ilk ve son harfi takas edilir)`,
            timestamp: new Date().toLocaleTimeString('tr-TR'),
          },
        ]);
      } else {
        setLogs((prev) => [
          ...prev,
          inputEntry,
          {
            id: Math.random().toString(36).substring(2, 9),
            type: 'error',
            content: `[Hata] Geçersiz mod: '${targetMode}'. Kullanım: 'mod kelime' veya 'mod tum'`,
            timestamp: new Date().toLocaleTimeString('tr-TR'),
          },
        ]);
      }
      setInputValue('');
      return;
    }

    if (lower === 'hakkinda' || lower === 'about') {
      setLogs((prev) => [
        ...prev,
        inputEntry,
        {
          id: Math.random().toString(36).substring(2, 9),
          type: 'system',
          content: `Bu konsol uygulaması, verilen bir metin içerisindeki ilk ve son karakterleri takas eden algoritmayı çalıştırır.
Tasarımcı & Mühendis: Enes Öztürk
Telif Hakları: © 2026 Enes Öztürk`,
          timestamp: new Date().toLocaleTimeString('tr-TR'),
        },
      ]);
      setInputValue('');
      return;
    }

    // Default: Run algorithm on the input
    const result = runSwapAlgorithm(rawCmd, mode);
    const outputEntry: TerminalLogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      type: 'output',
      content: `Giriş : ${result.rawInput}\nÇıktı : ${result.output}\n\n[İmza]: Enes Öztürk imzasıyla yürütüldü. Telif Hakları Saklıdır.`,
      details: result,
      timestamp: new Date().toLocaleTimeString('tr-TR'),
    };

    setLogs((prev) => [...prev, inputEntry, outputEntry]);
    setInputValue('');
    if (onInspectResult) {
      onInspectResult(result);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleExecute(inputValue);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputValue(history[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInputValue('');
      } else {
        setHistoryIndex(nextIndex);
        setInputValue(history[nextIndex]);
      }
    }
  };

  const copyTerminalBuffer = () => {
    const text = logs
      .map((l) => {
        if (l.type === 'input') return `enes@console:~$ ${l.content}`;
        return l.content;
      })
      .join('\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top action strip: presets & controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-400 font-medium">Hızlı Test Örnekleri:</span>
          {PRESET_EXAMPLES.map((preset) => (
            <button
              key={preset.title}
              onClick={() => handleExecute(preset.input)}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-800 transition-colors whitespace-nowrap"
            >
              {preset.title}
            </button>
          ))}
        </div>

        {/* Mode Toggle & Utility actions */}
        <div className="flex items-center gap-2">
          {/* Segmented Mode Button */}
          <div className="flex items-center p-0.5 bg-slate-900 rounded-lg border border-slate-800">
            <button
              onClick={() => setMode('words')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                mode === 'words'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Her kelime içerisindeki ilk ve son karakterleri takas eder"
            >
              Kelime Bazlı (Örnek)
            </button>
            <button
              onClick={() => setMode('fullString')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                mode === 'fullString'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Bütün metnin ilk ve son harfini takas eder"
            >
              Tüm Cümle Bazlı
            </button>
          </div>

          <button
            onClick={copyTerminalBuffer}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 transition-colors"
            title="Terminal Çıktısını Kopyala"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>

          <button
            onClick={() => setLogs([])}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded border border-slate-800 transition-colors"
            title="Terminali Temizle"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Temizle</span>
          </button>
        </div>
      </div>

      {/* Main Terminal Window Frame */}
      <div
        className="rounded-xl border border-slate-800 bg-[#070b12] shadow-2xl overflow-hidden flex flex-col font-mono text-sm"
        style={{ minHeight: '520px' }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80 select-none">
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-3 text-xs font-sans text-slate-400 font-medium">
              enes@console: ~/algoritmalar/karakter-degistirici
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-sans text-slate-400">
            <span className="text-slate-500">Bash / zsh</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-cyan-400 font-medium">UTF-8</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Enes Öztürk © 2026
            </span>
          </div>
        </div>

        {/* Terminal Output Log Area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs md:text-sm leading-relaxed max-h-[600px]">
          {logs.length === 0 && (
            <div className="text-slate-600 italic py-4">
              Terminal temizlendi. Yeni bir komut veya metin giriniz... (Örn: 'ornek' veya 'Merhaba Hello Algoritma x')
            </div>
          )}

          {logs.map((log) => {
            if (log.type === 'system') {
              return (
                <div key={log.id} className="text-cyan-300/90 whitespace-pre-wrap leading-relaxed">
                  {log.content}
                </div>
              );
            }

            if (log.type === 'signature') {
              return (
                <div
                  key={log.id}
                  className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 whitespace-pre-wrap leading-relaxed"
                >
                  {log.content}
                </div>
              );
            }

            if (log.type === 'input') {
              return (
                <div key={log.id} className="flex items-start gap-2 text-slate-200">
                  <span className="text-emerald-400 shrink-0 font-semibold">enes-ozturk@console:~$</span>
                  <span className="text-white font-medium break-all">{log.content}</span>
                  <span className="text-[10px] text-slate-600 ml-auto shrink-0 font-sans tabular-nums">{log.timestamp}</span>
                </div>
              );
            }

            if (log.type === 'error') {
              return (
                <div key={log.id} className="text-rose-400 whitespace-pre-wrap">
                  {log.content}
                </div>
              );
            }

            if (log.type === 'output') {
              return (
                <div key={log.id} className="pl-4 border-l-2 border-cyan-500/40 my-2 space-y-2">
                  <div className="text-slate-300 whitespace-pre-wrap">{log.content}</div>

                  {log.details && (
                    <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400 font-sans">
                      <span>Kelime Sayısı: <strong className="text-slate-200 tabular-nums">{log.details.wordCount}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Karakter: <strong className="text-slate-200 tabular-nums">{log.details.charCount}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Süre: <strong className="text-cyan-400 tabular-nums">{log.details.executionTimeMs} ms</strong></span>
                      {onInspectResult && (
                        <>
                          <span aria-hidden="true">·</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onInspectResult(log.details!);
                            }}
                            className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 font-medium"
                          >
                            <ArrowRightLeft className="w-3 h-3" />
                            Görsel Harf Takasını İncele
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            }

            return null;
          })}

          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Input Line */}
        <div className="px-4 py-3 bg-[#05080e] border-t border-slate-800/80 flex items-center gap-2">
          <span className="text-emerald-400 shrink-0 font-semibold text-xs md:text-sm">
            enes-ozturk@console:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Metin yazın (örn: Merhaba Hello Algoritma x) ve Enter'a basın..."
            className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder:text-slate-600 text-xs md:text-sm font-mono caret-cyan-400 focus:ring-0"
            autoFocus
          />
          <button
            onClick={() => handleExecute(inputValue)}
            disabled={!inputValue.trim()}
            className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 disabled:hover:bg-cyan-600 text-white rounded text-xs font-sans font-medium flex items-center gap-1 transition-colors"
          >
            <span>Çalıştır</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Direct prompt example runner card */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-slate-200 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            İstenen Örnek Senaryo:
          </span>
          <span>
            Giriş: <code className="text-amber-300 font-mono">Merhaba Hello Algoritma x</code> → Çıktı: <code className="text-emerald-400 font-mono">aerhabM oellH algoritmA x</code>
          </span>
        </div>
        <button
          onClick={() => handleExecute('Merhaba Hello Algoritma x')}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 rounded-lg font-medium transition-colors whitespace-nowrap self-start md:self-auto"
        >
          Bu Örneği Terminalde Çalıştır
        </button>
      </div>
    </div>
  );
};
