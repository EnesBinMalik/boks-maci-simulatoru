/**
 * @license
 * Enes Öztürk Çok Dilli Kaynak Kod Gezgini
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 */

import React, { useState } from 'react';
import {
  Check,
  Code2,
  Copy,
  Download,
  FileCode,
  Layers,
  PlayCircle,
  ShieldCheck,
  Terminal
} from 'lucide-react';
import { CODE_TEMPLATES } from '../data/codeSnippets';
import { SupportedLanguage } from '../types';
import { sounds } from '../utils/audio';

export const CodeExplorer: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('csharp');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);

  const activeTemplate = CODE_TEMPLATES.find((t) => t.lang === selectedLang) || CODE_TEMPLATES[0];

  const handleCopyCode = () => {
    sounds.playKeyClick();
    navigator.clipboard.writeText(activeTemplate.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCommand = () => {
    sounds.playKeyClick();
    navigator.clipboard.writeText(activeTemplate.runCommand);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  const handleDownload = () => {
    sounds.playKeyClick();
    const blob = new Blob([activeTemplate.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeTemplate.extension;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      {/* Dil Seçim Sekmeleri */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
        {CODE_TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.lang}
            onClick={() => {
              sounds.playKeyClick();
              setSelectedLang(tmpl.lang);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition border ${
              selectedLang === tmpl.lang
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800 hover:bg-slate-800/80'
            }`}
          >
            <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-black/20">
              {tmpl.icon}
            </span>
            <span>{tmpl.name}</span>
          </button>
        ))}
      </div>

      {/* Kod Kartı */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Başlık ve Aksiyon Araç Çubuğu */}
        <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-white">
                  {activeTemplate.extension}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" /> Enes Öztürk İmzalı
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {activeTemplate.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Terminal Çalıştırma Komutu Rozeti */}
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeTemplate.runCommand}</span>
              <button
                onClick={handleCopyCommand}
                className="text-slate-400 hover:text-white transition ml-1"
                title="Komutu Kopyala"
              >
                {copiedCommand ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>

            {/* Dosya İndir */}
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
              title="Kaynak Kod Dosyasını İndir"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">İndir</span>
            </button>

            {/* Kodu Kopyala */}
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition shadow-sm active:scale-95"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
            </button>
          </div>
        </div>

        {/* Kod Metni Gövdesi */}
        <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto bg-[#0a0e17] leading-relaxed max-h-[560px] overflow-y-auto select-all">
          <pre className="text-slate-200">
            <code>{activeTemplate.code}</code>
          </pre>
        </div>

        {/* Alt Telif ve Mülkiyet Çubuğu */}
        <div className="bg-slate-900/60 px-4 py-2.5 border-t border-slate-800 text-xs flex flex-wrap items-center justify-between gap-2 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Telif Sahibi: <strong>Enes Öztürk</strong></span>
            <span>•</span>
            <span>Lisans: MIT with Author Credit</span>
          </div>
          <span className="text-[11px] text-slate-500">
            © 2026 Enes Öztürk - Tüm Hakları Saklıdır.
          </span>
        </div>
      </div>
    </div>
  );
};
