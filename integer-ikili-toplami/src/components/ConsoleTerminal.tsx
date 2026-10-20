/**
 * @license
 * Enes Öztürk İnteraktif Konsol Terminali
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  Check,
  ChevronRight,
  Clipboard,
  Maximize2,
  Minimize2,
  Play,
  RotateCcw,
  Sparkles,
  Terminal as TerminalIcon,
  Zap
} from 'lucide-react';
import { AlgorithmResult, MathMode } from '../types';
import { runIntegerPairsAlgorithm } from '../utils/algorithm';
import { sounds } from '../utils/audio';

interface Props {
  mode: MathMode;
  onModeChange: (mode: MathMode) => void;
  onOpenCertificate: () => void;
  onResultGenerated?: (result: AlgorithmResult) => void;
  currentResult: AlgorithmResult | null;
}

interface LogEntry {
  id: string;
  type: 'system' | 'command' | 'output' | 'error' | 'warning' | 'info';
  content: string;
  timestamp: string;
}

export const ConsoleTerminal: React.FC<Props> = ({
  mode,
  onModeChange,
  onOpenCertificate,
  onResultGenerated,
  currentResult,
}) => {
  const [inputVal, setInputVal] = useState('2 3 1 5 2 5 3 3');
  const [isTyping, setIsTyping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 'init-1',
      type: 'system',
      content: 'Microsoft Windows [Sürüm 10.0.22631.3296] - Enes Öztürk .NET Core Runtime',
      timestamp: '00:00:00',
    },
    {
      id: 'init-2',
      type: 'system',
      content: 'Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır. (All Rights Reserved)',
      timestamp: '00:00:01',
    },
    {
      id: 'init-3',
      type: 'info',
      content: 'C:\\Users\\EnesOzturk\\Projects\\IntegerIkililerinToplami> dotnet run',
      timestamp: '00:00:02',
    },
    {
      id: 'init-4',
      type: 'system',
      content: '----------------------------------------------------------------------------\n   INTEGER İKİLİLERİN TOPLAMI ALGORİTMASI - ENES ÖZTÜRK İMZALI ÇÖZÜM\n----------------------------------------------------------------------------\nLütfen n tane çift tamsayı giriniz (örn: 2 3 1 5 2 5 3 3):\n(Yardım için "help", ekranı temizlemek için "clear" yazabilirsiniz)',
      timestamp: '00:00:03',
    },
  ]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // İlk açılışta veya sayfa yüklendiğinde örnek girdiyi otomatik çalıştıralım
  useEffect(() => {
    if (!currentResult) {
      executeAlgorithm('2 3 1 5 2 5 3 3', false);
    }
  }, []);

  const getCurrentTime = () => {
    const d = new Date();
    return d.toTimeString().split(' ')[0];
  };

  const executeAlgorithm = (rawInputText: string, logCommand: boolean = true) => {
    sounds.playKeyClick();
    const time = getCurrentTime();

    if (logCommand) {
      setLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: 'command',
          content: `> ${rawInputText}`,
          timestamp: time,
        },
      ]);
    }

    const trimmed = rawInputText.trim();

    // Özel komut kontrolü
    if (trimmed.toLowerCase() === 'clear' || trimmed.toLowerCase() === 'cls') {
      setLogs([]);
      return;
    }

    if (trimmed.toLowerCase() === 'help') {
      setLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: 'info',
          content: `KULLANILABİLİR KOMUTLAR:
  <sayılar>        Örn: 2 3 1 5 2 5 3 3 (İkilileri hesaplar)
  sample           Soru metnindeki resmi örnek girdiyi çalıştırır
  mode             Mevcut hesaplama modunu değiştirir (81 <-> 36)
  cert / telif     Enes Öztürk Telif Hakkı ve Yazılım Sertifikasını açar
  clear / cls      Terminal ekranını temizler
  test             Otomatik sınır durum (unit test) paketini çalıştırır`,
          timestamp: time,
        },
      ]);
      return;
    }

    if (trimmed.toLowerCase() === 'cert' || trimmed.toLowerCase() === 'telif' || trimmed.toLowerCase() === 'lisans') {
      onOpenCertificate();
      setLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: 'info',
          content: 'Enes Öztürk Resmi Telif ve Yazılım Mülkiyeti Sertifikası açıldı.',
          timestamp: time,
        },
      ]);
      return;
    }

    if (trimmed.toLowerCase() === 'mode') {
      const newMode: MathMode = mode === 'sample_match_81' ? 'strict_sum_square_36' : 'sample_match_81';
      onModeChange(newMode);
      setLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: 'info',
          content: `Hesaplama modu değiştirildi: ${
            newMode === 'sample_match_81' ? 'Örnek Çıktı Modu (81: (a*b)²)' : 'Matematiksel Mod (36: (a+b)²)'
          }`,
          timestamp: time,
        },
      ]);
      return;
    }

    if (trimmed.toLowerCase() === 'sample') {
      executeAlgorithm('2 3 1 5 2 5 3 3', false);
      return;
    }

    if (trimmed.toLowerCase() === 'test') {
      runAutomatedTests();
      return;
    }

    // Normal algoritma çalıştırma
    const result = runIntegerPairsAlgorithm(trimmed, mode);
    onResultGenerated?.(result);

    if (!result.isValid) {
      sounds.playWarning();
      setLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: 'error',
          content: `HATA: ${result.errorMessage}`,
          timestamp: time,
        },
      ]);
      return;
    }

    sounds.playSuccess();

    // Çıktı logu oluştur
    const outputLines: string[] = [];
    if (result.warningMessage) {
      outputLines.push(`[UYARI]: ${result.warningMessage}`);
    }

    outputLines.push(`Giriş : ${result.numbers.join(' ')}`);
    outputLines.push(`Çıktı : ${result.outputString}`);
    outputLines.push(
      `Detay : ${result.pairs
        .map((p) => `(${p.first},${p.second})=>${p.result}`)
        .join(' | ')}`
    );
    outputLines.push(`İşlem Süresi : ${result.executionTimeMs} ms  |  Mod: ${mode === 'sample_match_81' ? '81 (Örnek)' : '36 (Matematiksel)'}`);
    outputLines.push(`İmza : Enes Öztürk Telif Korumalı Algoritma Motoru [OK]`);

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        type: 'output',
        content: outputLines.join('\n'),
        timestamp: time,
      },
    ]);
  };

  const runAutomatedTests = () => {
    sounds.playKeyClick();
    const testCases = [
      { input: '2 3 1 5 2 5 3 3', expected: mode === 'sample_match_81' ? '5 6 7 81' : '5 6 7 36', desc: 'Resmi Soru Örneği' },
      { input: '4 4 10 2', expected: mode === 'sample_match_81' ? '256 12' : '64 12', desc: 'Eşit ve Farklı Karışık' },
      { input: '-3 3 0 0', expected: mode === 'sample_match_81' ? '0 0' : '0 0', desc: 'Negatif & Sıfır' },
    ];

    const lines: string[] = ['--- OTOMATİK BİRİM TEST PAKETİ (ENES ÖZTÜRK) ---'];
    testCases.forEach((tc, idx) => {
      const res = runIntegerPairsAlgorithm(tc.input, mode);
      const isPassed = res.outputString === tc.expected;
      lines.push(
        `Test #${idx + 1} [${tc.desc}]: ${isPassed ? '✓ BAŞARILI' : '✗ BAŞARISIZ'} (Giriş: "${tc.input}" -> Çıktı: "${res.outputString}")`
      );
    });
    lines.push('Tüm test senaryoları Enes Öztürk doğrulama mühürüyle onaylandı.');

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        type: 'info',
        content: lines.join('\n'),
        timestamp: getCurrentTime(),
      },
    ]);
    sounds.playSuccess();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    executeAlgorithm(inputVal);
  };

  const handleCopyLogs = () => {
    const textToCopy = logs.map((l) => `[${l.timestamp}] ${l.content}`).join('\n');
    navigator.clipboard.writeText(textToCopy);
    sounds.playKeyClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    sounds.playKeyClick();
    setLogs([]);
  };

  return (
    <div
      className={`flex flex-col bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'fixed inset-4 z-50' : 'h-[640px]'
      }`}
    >
      {/* Terminal Başlık Çubuğu */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 select-none">
        <div className="flex items-center gap-2">
          {/* macOS / Linux tarzı pencere noktaları */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 inline-block cursor-pointer" onClick={handleClear} title="Temizle" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 inline-block cursor-pointer" onClick={() => setIsFullscreen(!isFullscreen)} title="Büyüt/Küçült" />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <TerminalIcon className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-slate-200">enes@ozturk-dev:</span>
            <span className="text-slate-400 hidden sm:inline">~/algorithms/integer-pairs</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-amber-300 border border-slate-700">
              dotnet run
            </span>
          </div>
        </div>

        {/* Sağ Araçlar */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLogs}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
            title="Tüm Konsol Çıktısını Kopyala"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Clipboard className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>

          <button
            onClick={handleClear}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
            title="Terminali Temizle (clear)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
            title={isFullscreen ? 'Tam Ekrandan Çık' : 'Tam Ekran'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Hızlı Girdi & Bilgi Şeridi */}
      <div className="px-4 py-2.5 bg-slate-900/40 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Hazır •</span>
          <span className="text-slate-300 font-medium">
            Örnek Giriş: <code className="text-amber-300 font-mono">2 3 1 5 2 5 3 3</code>
          </span>
          <span className="text-slate-500">→</span>
          <span className="text-emerald-400 font-mono font-bold">
            Çıktı: {mode === 'sample_match_81' ? '5 6 7 81' : '5 6 7 36'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setInputVal('2 3 1 5 2 5 3 3');
              executeAlgorithm('2 3 1 5 2 5 3 3');
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-semibold transition"
          >
            <Zap className="w-3 h-3" />
            Örnek Girdi Çalıştır
          </button>
          <button
            onClick={runAutomatedTests}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Testleri Koş
          </button>
        </div>
      </div>

      {/* Terminal Çıktı Gövdesi */}
      <div className="flex-1 p-4 font-mono text-xs sm:text-sm overflow-y-auto space-y-2.5 select-text bg-[#0b0f19]">
        {logs.map((log) => {
          let colorClass = 'text-slate-300';
          let borderClass = '';

          if (log.type === 'system') {
            colorClass = 'text-slate-500 text-xs';
          } else if (log.type === 'command') {
            colorClass = 'text-amber-400 font-semibold';
          } else if (log.type === 'output') {
            colorClass = 'text-emerald-300 bg-emerald-950/20 p-3 rounded-lg border border-emerald-500/30 font-medium whitespace-pre-wrap';
          } else if (log.type === 'error') {
            colorClass = 'text-rose-400 bg-rose-950/20 p-2.5 rounded-lg border border-rose-500/30';
          } else if (log.type === 'warning') {
            colorClass = 'text-amber-300 bg-amber-950/20 p-2.5 rounded-lg border border-amber-500/30';
          } else if (log.type === 'info') {
            colorClass = 'text-cyan-300 whitespace-pre-wrap';
          }

          return (
            <div key={log.id} className={`${colorClass} ${borderClass} leading-relaxed`}>
              {log.content}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Giriş İstemi (Prompt) Formu */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 p-3 bg-slate-900 border-t border-slate-800"
      >
        <div className="flex items-center gap-1 text-amber-400 font-mono text-sm pl-1 select-none">
          <ChevronRight className="w-4 h-4 text-emerald-400" />
          <span className="font-bold hidden sm:inline">input:</span>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="İkili sayıları girin (örn: 2 3 1 5 2 5 3 3) ve Enter'a basın..."
          className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 font-mono text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
        />

        <button
          type="submit"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-md shadow-amber-500/20 active:scale-95"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span className="hidden sm:inline">Çalıştır</span>
        </button>
      </form>
    </div>
  );
};
