/**
 * @license
 * Telif Hakkı © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Copy,
  Check,
  Download,
  Trash2,
  Terminal as TerminalIcon,
  Maximize2,
  Minimize2,
  CornerDownLeft,
} from 'lucide-react';
import { ConsoleLine } from '../core/types';

interface TerminalConsoleProps {
  lines: ConsoleLine[];
  onCommand: (command: string) => void;
  onClear: () => void;
  onExport: () => void;
}

type TerminalTheme = 'emerald' | 'amber' | 'cyan' | 'monochrome';

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({
  lines,
  onCommand,
  onClear,
  onExport,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showScanlines, setShowScanlines] = useState(false);
  const [theme, setTheme] = useState<TerminalTheme>('emerald');
  const [showLineNumbers, setShowLineNumbers] = useState(false);

  const consoleEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new lines
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    onCommand(inputVal.trim());
    setInputVal('');
  };

  const handleCopy = () => {
    const text = lines.map((l) => l.text).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Theme color maps
  const themeClasses: Record<TerminalTheme, { text: string; border: string; prompt: string; bg: string }> = {
    emerald: {
      text: 'text-emerald-400',
      border: 'border-emerald-500/20',
      prompt: 'text-emerald-300',
      bg: 'bg-neutral-950',
    },
    amber: {
      text: 'text-amber-400',
      border: 'border-amber-500/20',
      prompt: 'text-amber-300',
      bg: 'bg-neutral-950',
    },
    cyan: {
      text: 'text-cyan-300',
      border: 'border-cyan-500/20',
      prompt: 'text-cyan-200',
      bg: 'bg-neutral-950',
    },
    monochrome: {
      text: 'text-neutral-200',
      border: 'border-neutral-700',
      prompt: 'text-neutral-100',
      bg: 'bg-neutral-950',
    },
  };

  const currentTheme = themeClasses[theme];

  return (
    <div
      className={`flex flex-col rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl overflow-hidden transition-all duration-200 ${
        isFullScreen ? 'fixed inset-4 z-50 rounded-lg' : 'h-[620px] w-full'
      }`}
    >
      {/* Terminal Title Bar */}
      <div className="bg-neutral-900/90 px-4 py-2.5 border-b border-neutral-800 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
          </div>
          <TerminalIcon className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-xs font-mono text-neutral-300">
            enes@ozturk-console: ~ /algorithm/triangle-drawer
          </span>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Selector */}
          <div className="flex items-center gap-1 bg-neutral-950/60 px-2 py-1 rounded border border-neutral-800 text-[11px] text-neutral-400">
            <span className="hidden sm:inline">Tema:</span>
            <button
              onClick={() => setTheme('emerald')}
              className={`w-3.5 h-3.5 rounded-full bg-emerald-500 ${
                theme === 'emerald' ? 'ring-2 ring-emerald-300' : 'opacity-60 hover:opacity-100'
              }`}
              title="Matrix Yeşil"
            />
            <button
              onClick={() => setTheme('amber')}
              className={`w-3.5 h-3.5 rounded-full bg-amber-500 ${
                theme === 'amber' ? 'ring-2 ring-amber-300' : 'opacity-60 hover:opacity-100'
              }`}
              title="Kehribar (Amber)"
            />
            <button
              onClick={() => setTheme('cyan')}
              className={`w-3.5 h-3.5 rounded-full bg-cyan-400 ${
                theme === 'cyan' ? 'ring-2 ring-cyan-200' : 'opacity-60 hover:opacity-100'
              }`}
              title="Gece Mavisi"
            />
            <button
              onClick={() => setTheme('monochrome')}
              className={`w-3.5 h-3.5 rounded-full bg-neutral-200 ${
                theme === 'monochrome' ? 'ring-2 ring-neutral-400' : 'opacity-60 hover:opacity-100'
              }`}
              title="Monokrom Beyaz"
            />
          </div>

          {/* CRT scanlines toggle */}
          <button
            onClick={() => setShowScanlines(!showScanlines)}
            className={`px-2 py-1 text-[11px] font-mono rounded border transition-colors ${
              showScanlines
                ? 'bg-emerald-950/50 text-emerald-300 border-emerald-700/50'
                : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-neutral-200'
            }`}
            title="CRT Tarama Çizgisi Efekti"
          >
            CRT
          </button>

          {/* Line Numbers Toggle */}
          <button
            onClick={() => setShowLineNumbers(!showLineNumbers)}
            className={`px-2 py-1 text-[11px] font-mono rounded border transition-colors ${
              showLineNumbers
                ? 'bg-emerald-950/50 text-emerald-300 border-emerald-700/50'
                : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-neutral-200'
            }`}
            title="Satır Numaralarını Göster/Gizle"
          >
            # No
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
            title="Konsol Çıktısını Kopyala"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onExport}
            className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
            title="Konsol Çıktısını .txt Olarak İndir"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClear}
            className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-red-400 transition-colors"
            title="Konsolu Temizle"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
            title={isFullScreen ? 'Küçült' : 'Tam Ekran'}
          >
            {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        className={`relative flex-1 p-4 font-mono text-xs overflow-y-auto leading-relaxed select-text ${
          currentTheme.bg
        } ${showScanlines ? 'scanlines' : ''}`}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="space-y-0.5">
          {lines.map((line, idx) => {
            let color = currentTheme.text;
            if (line.type === 'header') color = 'text-cyan-400 font-bold';
            if (line.type === 'copyright') color = 'text-amber-300 font-semibold';
            if (line.type === 'input') color = 'text-blue-300 font-semibold';
            if (line.type === 'error') color = 'text-rose-400 font-bold bg-rose-950/20 px-1 py-0.5 rounded';
            if (line.type === 'success') color = 'text-emerald-300 font-semibold';
            if (line.type === 'system') color = 'text-neutral-400 italic';

            return (
              <div key={line.id} className="flex items-start gap-2 whitespace-pre leading-5">
                {showLineNumbers && (
                  <span className="text-neutral-600 select-none text-[10px] w-6 shrink-0 text-right">
                    {idx + 1}
                  </span>
                )}
                <span className="text-neutral-600 select-none text-[10px] hidden sm:inline shrink-0">
                  [{line.timestamp}]
                </span>
                <span className={`${color} break-all font-mono tracking-wider`}>
                  {line.text}
                </span>
              </div>
            );
          })}
          <div ref={consoleEndRef} />
        </div>
      </div>

      {/* Interactive Command Prompt */}
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-900/90 border-t border-neutral-800 px-4 py-3 flex items-center gap-2"
      >
        <span className={`font-mono text-xs font-bold ${currentTheme.prompt}`}>
          enes@drawer:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder='Boyut girin (örn: 6) veya komut (örn: "boyut 8", "temizle", "yardim")'
          className="flex-1 bg-transparent text-xs font-mono text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
        />
        <button
          type="submit"
          className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono rounded flex items-center gap-1 transition-colors"
        >
          <span>Gönder</span>
          <CornerDownLeft className="w-3 h-3 text-neutral-400" />
        </button>
      </form>
    </div>
  );
};
