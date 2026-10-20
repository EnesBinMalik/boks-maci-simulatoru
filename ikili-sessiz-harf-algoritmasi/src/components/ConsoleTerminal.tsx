import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  Command,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { AnalysisResult, OutputMode, TerminalLogEntry } from '../types/algorithm';
import { processExpression } from '../utils/algorithm';
import confetti from 'canvas-confetti';

interface ConsoleTerminalProps {
  currentInput: string;
  setCurrentInput: (val: string) => void;
  analysis: AnalysisResult;
  outputMode: OutputMode;
  includeCopyrightInOutput: boolean;
  setIncludeCopyrightInOutput: (val: boolean) => void;
  onOpenCertificate: () => void;
}

const PRESET_EXAMPLES = [
  { label: 'Kullanıcı Örneği (Soru)', text: 'Merhaba Umut Arya', badge: 'Örnek' },
  { label: 'Tümünde Çift Sessiz', text: 'Tren Kral Spor Türk', badge: 'Tümü Doğru' },
  { label: 'Hiç Çift Sessiz Yok', text: 'Araba Elma Oya Ali', badge: 'Tümü Yanlış' },
  { label: 'Geliştirici İmzası', text: 'Enes Öztürk İstanbul', badge: 'Özel İsim' },
  { label: 'Türkçe Karakterler', text: 'Ağaç Çağdaş Işık Şemsiye', badge: 'TR Karakter' },
];

export const ConsoleTerminal: React.FC<ConsoleTerminalProps> = ({
  currentInput,
  setCurrentInput,
  analysis,
  outputMode,
  includeCopyrightInOutput,
  setIncludeCopyrightInOutput,
  onOpenCertificate,
}) => {
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [copiedFull, setCopiedFull] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<TerminalLogEntry[]>([]);
  const [cliInput, setCliInput] = useState('');
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Initialize terminal with the default prompt example
  useEffect(() => {
    executeInput('Merhaba Umut Arya', true);
  }, [outputMode]);

  const executeInput = (rawText: string, isInitial = false) => {
    const textToRun = rawText.trim() || 'Merhaba Umut Arya';
    const result = processExpression(textToRun, outputMode, includeCopyrightInOutput);
    setCurrentInput(textToRun);

    const now = new Date().toLocaleTimeString('tr-TR');
    const newEntry: TerminalLogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      type: 'output',
      content: textToRun,
      timestamp: now,
      analysis: result,
    };

    setTerminalHistory((prev) => (isInitial ? [newEntry] : [...prev, newEntry]));

    if (!isInitial) {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#10b981', '#38bdf8', '#fbbf24'],
      });
    }

    setTimeout(() => {
      terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = cliInput.trim();
    if (!command) return;

    if (command === 'clear' || command === 'cls') {
      setTerminalHistory([]);
      setCliInput('');
      return;
    }

    if (command === 'help') {
      const now = new Date().toLocaleTimeString('tr-TR');
      setTerminalHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          type: 'system',
          content: 'Kullanılabilir komutlar:\n  - <metin> : Herhangi bir metni doğrudan analiz et\n  - run <metin> : Belirtilen metni çalıştır\n  - clear : Konsolu temizle\n  - copyright : Enes Öztürk telif bilgilerini göster\n  - test : Varsayılan test örneğini çalıştır',
          timestamp: now,
        },
      ]);
      setCliInput('');
      return;
    }

    if (command === 'copyright' || command === 'about') {
      const now = new Date().toLocaleTimeString('tr-TR');
      setTerminalHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          type: 'copyright',
          content: 'Telif Hakkı & Lisans:\n  Algoritma: İkili Sessiz Harf Doğrulama\n  Geliştirici: Enes Öztürk\n  Yıl: 2026\n  Durum: Tüm Hakları Saklıdır (All Rights Reserved)',
          timestamp: now,
        },
      ]);
      setCliInput('');
      return;
    }

    if (command.startsWith('run ')) {
      executeInput(command.substring(4));
    } else {
      executeInput(command);
    }

    setCliInput('');
  };

  const copyToClipboard = (text: string, isFull = false) => {
    navigator.clipboard.writeText(text);
    if (isFull) {
      setCopiedFull(true);
      setTimeout(() => setCopiedFull(false), 2000);
    } else {
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Preset Chips */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Hazır Test Kümeleri (Tek Tıkla Dene):</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            İkili sessiz harf kuralı: 'rh' (Merhaba), 'ry' (Arya)
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {PRESET_EXAMPLES.map((preset, index) => (
            <button
              key={index}
              onClick={() => executeInput(preset.text)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                currentInput === preset.text
                  ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-500/10'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              <span className="font-mono text-emerald-400">"{preset.text}"</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-900/80 text-slate-400 border border-slate-700/40">
                {preset.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Terminal Window */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden font-mono text-sm">
        
        {/* Terminal Title Bar */}
        <div className="bg-slate-900/90 border-b border-slate-800/90 px-4 py-3 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block hover:opacity-80 transition-opacity cursor-pointer" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block hover:opacity-80 transition-opacity cursor-pointer" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block hover:opacity-80 transition-opacity cursor-pointer" />
            </div>
            <div className="h-4 w-[1px] bg-slate-700 mx-1" />
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-300 font-semibold">enes@console:</span>
              <span className="text-slate-500">~/algoritmalar/ikili-sessiz-kontrol</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTerminalHistory([])}
              title="Konsol geçmişini temizle"
              className="text-xs text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Temizle</span>
            </button>
            <div className="h-3.5 w-[1px] bg-slate-800" />
            <button
              onClick={onOpenCertificate}
              title="Enes Öztürk Telif Hakları"
              className="text-[11px] text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>© Enes Öztürk</span>
            </button>
          </div>
        </div>

        {/* Live Active Result Banner */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border-b border-emerald-900/30 p-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Aktif Konsol Çıktısı (İstenen Sonuç Formatı)
              </div>
              <div className="text-base sm:text-lg font-bold text-white flex flex-wrap items-center gap-2">
                <span className="text-slate-400 font-normal">Giriş:</span>
                <span className="text-cyan-300">"{analysis.input}"</span>
                <ArrowRight className="w-4 h-4 text-slate-500 hidden sm:inline" />
                <span className="text-slate-400 font-normal">Çıktı:</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold tracking-wide">
                  {analysis.outputString || '(Boş)'}
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2 pt-0.5">
                <span className="text-amber-400 font-medium">Telif Koruması:</span>
                <span className="text-slate-300">© Enes Öztürk - Tüm Hakları Saklıdır</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => copyToClipboard(`Giriş: ${analysis.input}\nÇıktı: ${analysis.outputString}\n© Enes Öztürk - Tüm Hakları Saklıdır`, true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                {copiedFull ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
                <span>{copiedFull ? 'Kopyalandı!' : 'Tam Çıktıyı Kopyala'}</span>
              </button>

              <button
                onClick={() => copyToClipboard(analysis.outputString, false)}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl text-xs border border-slate-700 transition-all cursor-pointer"
              >
                {copiedRaw ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>Sadece Değerleri Al</span>
              </button>
            </div>
          </div>
        </div>

        {/* Terminal Body / Output Stream */}
        <div className="p-4 sm:p-6 space-y-5 max-h-[460px] overflow-y-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          
          {/* Welcome ASCII Banner */}
          <div className="text-xs text-slate-500 border border-slate-800/60 rounded-xl p-3 bg-slate-900/40">
            <div className="text-emerald-400 font-bold">
              ★ İkili Sessiz Harf Doğrulama Konsolu (Console App)
            </div>
            <div className="text-slate-400 mt-1">
              Telif Sahibi: <span className="text-white font-semibold">Enes Öztürk</span> | Lisans: Özel Mülkiyet © 2026
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Kural: Kelime içerisinde ardışık 2 sessiz harf varsa (örn: 'rh', 'ry') ekrana True / Doğru yazar.
            </div>
          </div>

          {/* History Items */}
          {terminalHistory.map((item) => (
            <div key={item.id} className="space-y-2 border-l-2 border-slate-800 pl-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="text-emerald-400 font-bold">$</span>
                <span className="text-slate-400">./ikili_sessiz_kontrol.exe --input</span>
                <span className="text-cyan-300 font-semibold">"{item.content}"</span>
                <span className="text-slate-600 text-[10px]">[{item.timestamp}]</span>
              </div>

              {item.analysis && (
                <div className="space-y-2.5 pt-1">
                  {/* Detailed Step-by-Step Breakdown */}
                  <div className="space-y-1 text-xs">
                    <div className="text-slate-400 font-medium">
                      [Kelime Analiz Aşamaları]:
                    </div>
                    {item.analysis.words.map((w, wIdx) => (
                      <div
                        key={wIdx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1 px-2.5 rounded-lg bg-slate-900/50 border border-slate-800/40 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 font-mono">[{wIdx + 1}]</span>
                          <span className="text-white font-bold">{w.cleanWord || w.originalWord}</span>
                          <span className="text-slate-500">→</span>
                          {w.hasTwoConsecutiveConsonants ? (
                            <span className="text-emerald-400 font-medium">
                              İkili sessiz mevcut ({w.pairs.map((p) => `'${p.chars}'`).join(', ')})
                            </span>
                          ) : (
                            <span className="text-slate-400">
                              Ardışık iki sessiz yok
                            </span>
                          )}
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded font-bold text-[11px] self-start sm:self-auto ${
                            w.hasTwoConsecutiveConsonants
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {w.hasTwoConsecutiveConsonants
                            ? outputMode === 'tr-bool'
                              ? 'DOĞRU'
                              : 'TRUE'
                            : outputMode === 'tr-bool'
                            ? 'YANLIŞ'
                            : 'FALSE'}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Standard Console Output Line */}
                  <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3.5 space-y-2">
                    <div className="text-sm font-bold text-white flex flex-wrap items-center gap-2">
                      <span className="text-emerald-400">Çıktı:</span>
                      <span className="text-emerald-200 tracking-wider">
                        {item.analysis.outputString}
                      </span>
                    </div>

                    <div className="h-[1px] bg-slate-800" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-1.5">
                      <div className="flex items-center gap-1.5 text-amber-300 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>enes öztürk imzasıyla telif hakları korunmaktadır.</span>
                      </div>
                      <span className="text-slate-500 font-mono text-[11px]">
                        © 2026 Enes Öztürk
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {item.type === 'system' && (
                <div className="bg-cyan-950/30 border border-cyan-800/40 p-3 rounded-xl text-cyan-300 whitespace-pre-wrap text-xs">
                  {item.content}
                </div>
              )}

              {item.type === 'copyright' && (
                <div className="bg-amber-950/30 border border-amber-800/40 p-3 rounded-xl text-amber-300 whitespace-pre-wrap text-xs">
                  {item.content}
                </div>
              )}
            </div>
          ))}

          <div ref={terminalBottomRef} />
        </div>

        {/* Interactive CLI Input Line */}
        <form
          onSubmit={handleCliSubmit}
          className="bg-slate-900 border-t border-slate-800 p-3 sm:p-4 flex items-center gap-3"
        >
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold shrink-0 text-sm select-none">
            <span>enes@studio:~$</span>
          </div>

          <input
            type="text"
            value={cliInput}
            onChange={(e) => setCliInput(e.target.value)}
            placeholder="Metin yazın (örn: Merhaba Umut Arya) veya 'help' yazıp Enter'a basın..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm font-mono"
          />

          <button
            type="submit"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shrink-0 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Çalıştır</span>
          </button>
        </form>

      </div>

      {/* Quick Input Bar for Easy Realtime Testing */}
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
        <label className="block text-xs font-semibold text-slate-300 mb-2">
          Anlık Hızlı Test Girişi (Canlı Güncellenir):
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => executeInput(e.target.value)}
            placeholder="Bir string ifade giriniz..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
          <button
            onClick={() => executeInput(currentInput)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Yeniden Analiz Et</span>
          </button>
        </div>
      </div>

    </div>
  );
};
