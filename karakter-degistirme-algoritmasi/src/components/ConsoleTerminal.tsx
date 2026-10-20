import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  HelpCircle,
  Trash2,
  CornerDownLeft,
} from 'lucide-react';
import { AlgorithmOptions, TerminalEntry } from '../types';
import { transformString, PRESET_TEST_CASES } from '../utils/algorithm';

interface ConsoleTerminalProps {
  options: AlgorithmOptions;
  onOptionsChange: (newOptions: AlgorithmOptions) => void;
  onSendToVisualizer: (word: string) => void;
}

export const ConsoleTerminal: React.FC<ConsoleTerminalProps> = ({
  options,
  onOptionsChange,
  onSendToVisualizer,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'Microsoft Windows [Version 10.0.22631.3296]',
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'C:\\Users\\PatikaDev\\KarakterDegistirmeApp> dotnet run',
    },
    {
      id: 'init-3',
      type: 'info',
      text: '==========================================================\n  KARAKTER DEĞİŞTİRME KONSOL UYGULAMASI (.NET 9.0)\n  Karakterleri bir önceki konuma kaydırır (İlk harf sona geçer)\n==========================================================',
    },
    {
      id: 'init-4',
      type: 'info',
      text: 'İpucu: Bir metin girip [Enter] tuşuna basınız veya hazır komutları deneyiniz: "ornek", "soru", "yardim", "temizle".',
    },
  ]);

  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Add to command history
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);

    const inputEntry: TerminalEntry = {
      id: `in-${Date.now()}`,
      type: 'input',
      text: cmd,
    };

    const lower = trimmed.toLowerCase();

    // Check built-in commands
    if (lower === 'clear' || lower === 'cls' || lower === 'temizle') {
      setHistory([
        {
          id: `sys-${Date.now()}`,
          type: 'system',
          text: 'Konsol temizlendi. Yeni bir metin veya komut giriniz.',
        },
      ]);
      return;
    }

    if (lower === 'help' || lower === 'yardim' || lower === 'yardım') {
      setHistory((prev) => [
        ...prev,
        inputEntry,
        {
          id: `out-${Date.now()}`,
          type: 'info',
          text: `KULLANILABİLİR KOMUTLAR:
  <metin>         - Herhangi bir metin girin, algoritma çalışsın.
  ornek           - Standart Patika örneğini ("Merhaba Hello Question") çalıştırır.
  soru            - Kullanıcı sorusu örneğini ("Merhaba Merhaba Soru") çalıştırır.
  mod kelime      - Kelime bazlı dönüştürme moduna geçer (Varsayılan).
  mod dize        - Tüm dizeyi tek parça halinde kaydırma moduna geçer.
  yon sol         - Sola kaydırır: 1 önceki pozisyona (Standart: "Merhaba" -> "erhabaM").
  yon sag         - Sağa kaydırır: 1 sonraki pozisyona ("Merhaba" -> "aMerhab").
  temizle / cls   - Konsol ekranını temizler.`,
        },
      ]);
      return;
    }

    if (lower === 'ornek' || lower === 'example') {
      const sample = 'Merhaba Hello Question';
      const output = transformString(sample, options);
      setHistory((prev) => [
        ...prev,
        inputEntry,
        {
          id: `out-${Date.now()}`,
          type: 'output',
          text: `Giriş : ${sample}\nÇıktı : ${output}`,
          transformed: output,
        },
      ]);
      return;
    }

    if (lower === 'soru') {
      const sample = 'Merhaba Merhaba Soru';
      const output = transformString(sample, options);
      setHistory((prev) => [
        ...prev,
        inputEntry,
        {
          id: `out-${Date.now()}`,
          type: 'output',
          text: `Giriş : ${sample}\nÇıktı : ${output}`,
          transformed: output,
        },
      ]);
      return;
    }

    if (lower.startsWith('mod kelime')) {
      onOptionsChange({ ...options, mode: 'word' });
      setHistory((prev) => [
        ...prev,
        inputEntry,
        {
          id: `out-${Date.now()}`,
          type: 'info',
          text: 'Mod güncellendi: Kelime bazlı (her kelime bağımsız kaydırılır).',
        },
      ]);
      return;
    }

    if (lower.startsWith('mod dize')) {
      onOptionsChange({ ...options, mode: 'full' });
      setHistory((prev) => [
        ...prev,
        inputEntry,
        {
          id: `out-${Date.now()}`,
          type: 'info',
          text: 'Mod güncellendi: Tüm dize (bütün metin tek parça kaydırılır).',
        },
      ]);
      return;
    }

    if (lower.startsWith('yon sol')) {
      onOptionsChange({ ...options, direction: 'left' });
      setHistory((prev) => [
        ...prev,
        inputEntry,
        {
          id: `out-${Date.now()}`,
          type: 'info',
          text: 'Yön güncellendi: Sola kaydırma (1 önceki karakter konumu - Standart).',
        },
      ]);
      return;
    }

    if (lower.startsWith('yon sag') || lower.startsWith('yon sağ')) {
      onOptionsChange({ ...options, direction: 'right' });
      setHistory((prev) => [
        ...prev,
        inputEntry,
        {
          id: `out-${Date.now()}`,
          type: 'info',
          text: 'Yön güncellendi: Sağa kaydırma (1 sonraki karakter konumu).',
        },
      ]);
      return;
    }

    // Default: execute algorithm on the input string
    const result = transformString(trimmed, options);
    setHistory((prev) => [
      ...prev,
      inputEntry,
      {
        id: `out-${Date.now()}`,
        type: 'output',
        text: `Giriş : ${trimmed}\nÇıktı : ${result}`,
        transformed: result,
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIdx === -1 ? commandHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(commandHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= commandHistory.length) {
        setHistoryIdx(-1);
        setInputVal('');
      } else {
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    }
  };

  const runPreset = (text: string) => {
    executeCommand(text);
    inputRef.current?.focus();
  };

  const clearTerminal = () => {
    setHistory([
      {
        id: `clear-${Date.now()}`,
        type: 'system',
        text: 'Konsol sıfırlandı.',
      },
    ]);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block border border-red-600/50" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block border border-yellow-600/50" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/50" />
          </div>
          <TerminalIcon className="w-3.5 h-3.5 text-zinc-400" />
          <span className="font-mono text-zinc-300 font-medium tracking-tight">
            C:\Algoritma\KarakterDegistirme.exe - (C# / .NET 9.0 CLI)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearTerminal}
            className="flex items-center gap-1 px-2 py-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors text-[11px]"
            title="Konsolu Temizle"
          >
            <Trash2 className="w-3 h-3" />
            <span>Temizle</span>
          </button>
        </div>
      </div>

      {/* Preset Quick Actions */}
      <div className="px-4 py-2 bg-zinc-900/40 border-b border-zinc-800/80 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-zinc-400 font-mono text-[11px]">Hızlı Girdi:</span>
        <button
          onClick={() => runPreset('Merhaba Hello Question')}
          className="px-2.5 py-1 rounded bg-zinc-800/80 hover:bg-zinc-700 text-emerald-400 font-mono text-xs border border-zinc-700/60 transition-colors"
        >
          Merhaba Hello Question
        </button>
        <button
          onClick={() => runPreset('Merhaba Merhaba Soru')}
          className="px-2.5 py-1 rounded bg-zinc-800/80 hover:bg-zinc-700 text-sky-400 font-mono text-xs border border-zinc-700/60 transition-colors"
        >
          Merhaba Merhaba Soru
        </button>
        <button
          onClick={() => runPreset('Algoritma Dünyası 2026')}
          className="px-2.5 py-1 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 font-mono text-xs border border-zinc-700/60 transition-colors"
        >
          Algoritma Dünyası 2026
        </button>
        <button
          onClick={() => runPreset('ornek')}
          className="px-2 py-1 rounded bg-zinc-800/50 hover:bg-zinc-700/80 text-zinc-400 font-mono text-xs transition-colors"
        >
          Örnek Çalıştır
        </button>
      </div>

      {/* Terminal Body */}
      <div
        className="flex-1 p-4 font-mono text-xs md:text-sm overflow-y-auto space-y-3 select-text bg-black/40 min-h-[340px]"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item) => (
          <div key={item.id} className="leading-relaxed">
            {item.type === 'system' && (
              <div className="text-zinc-500 whitespace-pre-wrap">{item.text}</div>
            )}

            {item.type === 'info' && (
              <div className="text-zinc-400 bg-zinc-900/60 p-2.5 rounded border border-zinc-800/60 whitespace-pre-wrap">
                {item.text}
              </div>
            )}

            {item.type === 'input' && (
              <div className="flex items-start gap-2 text-zinc-200">
                <span className="text-emerald-500 font-bold select-none">&gt;</span>
                <span className="font-semibold">{item.text}</span>
              </div>
            )}

            {item.type === 'output' && (
              <div className="mt-1 p-3 bg-zinc-900/80 rounded border border-zinc-800 flex flex-col gap-2">
                <div className="whitespace-pre-wrap text-emerald-400 font-mono font-medium">
                  {item.text}
                </div>

                {item.transformed && (
                  <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80 text-xs">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(item.id, item.transformed!);
                      }}
                      className="flex items-center gap-1 px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-[11px] transition-colors"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Kopyalandı</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Çıktıyı Kopyala</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Send first word to visualizer
                        const words = item.text.split('\n')[0].replace('Giriş : ', '').split(' ');
                        if (words[0]) onSendToVisualizer(words[0]);
                      }}
                      className="flex items-center gap-1 px-2 py-1 bg-sky-950/60 hover:bg-sky-900/60 text-sky-400 border border-sky-800/50 rounded text-[11px] transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Görselleştiricide İncele</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Current Prompt Line */}
        <div className="flex items-center gap-2 pt-1 text-zinc-200">
          <span className="text-emerald-500 font-bold select-none">
            C:\Algoritma&gt;
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Bir metin yazıp Enter'a basınız..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-zinc-100 placeholder-zinc-600 focus:ring-0 p-0 text-xs md:text-sm"
            autoFocus
          />
          <button
            onClick={() => {
              executeCommand(inputVal);
              setInputVal('');
            }}
            disabled={!inputVal.trim()}
            className="px-2 py-1 rounded bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 text-xs transition-colors"
          >
            <span>Gönder</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </div>

        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Footer Info */}
      <div className="px-4 py-2 bg-zinc-900 border-t border-zinc-800 text-[11px] text-zinc-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span>
            Mod:{' '}
            <strong className="text-zinc-200">
              {options.mode === 'word' ? 'Kelime Bazlı' : 'Tüm Dize'}
            </strong>
          </span>
          <span aria-hidden="true" className="text-zinc-700">·</span>
          <span>
            Yön:{' '}
            <strong className="text-zinc-200">
              {options.direction === 'left' ? 'Sola (1 Önceki)' : 'Sağa (1 Sonraki)'}
            </strong>
          </span>
        </div>
        <div className="text-zinc-500 flex items-center gap-1">
          <HelpCircle className="w-3 h-3" />
          <span>Komut geçmişi için Yukarı/Aşağı ok tuşlarını kullanabilirsiniz</span>
        </div>
      </div>
    </div>
  );
};
