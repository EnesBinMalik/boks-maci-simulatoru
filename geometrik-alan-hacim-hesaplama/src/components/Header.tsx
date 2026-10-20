/**
 * @license
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * Top Bar Contract: 3 bölgeli temiz üst gezinme çubuğu
 */

import React from 'react';
import { Download } from 'lucide-react';
import JSZip from 'jszip';
import { CSHARP_FILES } from '../data/csharpCode';
import { AUTHOR_NAME, COPYRIGHT_NOTICE } from '../data/shapesConfig';

export type ActiveTab = 'terminal' | 'visual' | 'code' | 'architecture';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const handleQuickDownload = async () => {
    const zip = new JSZip();
    zip.file(
      'README.md',
      `# Geometrik Alan, Çevre ve Hacim Hesaplama (C# Console)\nTelif Sahibi: ${AUTHOR_NAME}\n${COPYRIGHT_NOTICE}\n`
    );
    CSHARP_FILES.forEach((f) => zip.file(f.path, f.code));
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GeometryApp_EnesOzturk_CSharp.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Bölge 1: Marka ve Başlık */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('terminal');
            }}
            className="text-base sm:text-lg font-bold tracking-tight text-slate-100 hover:text-cyan-400 transition-colors whitespace-nowrap"
          >
            Geometri <span className="text-cyan-400">Hesaplayıcı</span>
          </a>
          <span className="hidden sm:inline text-xs font-mono text-slate-500">
            · Enes Öztürk
          </span>
        </div>

        {/* Bölge 2: Navigasyon Sekmeleri */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1">
          <button
            onClick={() => onTabChange('terminal')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'terminal'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            C# Terminali
          </button>
          <button
            onClick={() => onTabChange('visual')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'visual'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Görsel Laboratuvar
          </button>
          <button
            onClick={() => onTabChange('code')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'code'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            C# Kaynak Kodları
          </button>
          <button
            onClick={() => onTabChange('architecture')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'architecture'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            SRP & DRY Mimarisi
          </button>
        </nav>

        {/* Bölge 3: Birincil Aksiyon Butonu */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleQuickDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow transition-colors whitespace-nowrap shrink-0"
            title="Tüm C# Projesini ZIP Olarak İndir"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Projeyi İndir (.ZIP)</span>
            <span className="sm:hidden">İndir</span>
          </button>
        </div>
      </div>
    </header>
  );
};
