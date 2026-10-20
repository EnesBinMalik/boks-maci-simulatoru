/**
 * @license
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * C# Kaynak Kod Görüntüleyici ve İndirici
 */

import React, { useState } from 'react';
import { CSHARP_FILES, CSharpFile } from '../data/csharpCode';
import { AUTHOR_NAME, COPYRIGHT_NOTICE } from '../data/shapesConfig';
import { FileCode2, Copy, Check, Download, Archive, ShieldCheck } from 'lucide-react';
import JSZip from 'jszip';

export const CodeViewer: React.FC = () => {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copiedFile, setCopiedFile] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const activeFile: CSharpFile = CSHARP_FILES[activeFileIndex];

  const handleCopyCurrent = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const handleDownloadSingle = () => {
    const blob = new Blob([activeFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFile.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      // README.md ekle
      const readmeContent = `# Geometrik Alan, Çevre ve Hacim Hesaplama (C# Console)
Geliştirici ve Telif Sahibi: ${AUTHOR_NAME}
Telif Hakkı: ${COPYRIGHT_NOTICE}

## Tasarım İlkeleri
- **Single Responsibility Principle (SRP)**:
  - 'IShape' ve türevleri (Circle, Square, Triangle, Cube, Sphere...) sadece kendi geometrisini bilir.
  - 'ConsoleInputService' sadece veri okuma ve tip doğrulaması yapar.
  - 'ConsolePresenter' sadece renkli çıktılar ve rapor formatlarını yönetir.
  - 'GeometryAppManager' iş akışını orkestre eder.
  - 'Program.cs' uygulamanın yaşam döngüsünü başlatır.
- **DRY (Don't Repeat Yourself)**:
  - Giriş doğrulama ('ReadPositiveDouble') ve hata mesajları tek bir metodda toplanmıştır.
  - Matematiksel ortak işlemler arayüzler ve ortak servisler üzerinden yürütülür.

## Çalıştırma
\`\`\`bash
dotnet build
dotnet run
\`\`\`
`;
      zip.file('README.md', readmeContent);

      // Tüm C# dosyalarını ekle
      CSHARP_FILES.forEach((f) => {
        zip.file(f.path, f.code);
      });

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'GeometryApp_EnesOzturk_CSharp.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('ZIP oluşturulurken hata:', e);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Üst Bar: Başlık, Telif Bilgisi ve Aksiyon Butonları */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-slate-100">
              C# Çözüm Mimarisi (Single Responsibility & DRY)
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Telif Sahibi: <span className="text-cyan-300 font-semibold">{AUTHOR_NAME}</span> · {COPYRIGHT_NOTICE}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCurrent}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {copiedFile ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedFile ? 'Kopyalandı' : 'Dosyayı Kopyala'}</span>
          </button>

          <button
            onClick={handleDownloadSingle}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            title={`${activeFile.filename} dosyasını indir`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>.cs İndir</span>
          </button>

          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow transition-colors"
          >
            <Archive className="w-3.5 h-3.5" />
            <span>{isZipping ? 'Paketleniyor...' : 'Tüm Projeyi İndir (.ZIP)'}</span>
          </button>
        </div>
      </div>

      {/* Dosya Gezgini & Kod Editörü */}
      <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950 flex flex-col shadow-2xl">
        {/* Dosya Sekmeleri */}
        <div className="flex items-center gap-1 p-2 bg-slate-900/90 border-b border-slate-800 overflow-x-auto">
          {CSHARP_FILES.map((f, idx) => {
            const isActive = idx === activeFileIndex;
            return (
              <button
                key={f.filename}
                onClick={() => setActiveFileIndex(idx)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-950 text-cyan-300 font-semibold border border-slate-800 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <FileCode2 className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{f.filename}</span>
              </button>
            );
          })}
        </div>

        {/* Dosya Açıklaması Kicker */}
        <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-cyan-400">{activeFile.path}</span>
          <span className="text-[11px] italic">{activeFile.description}</span>
        </div>

        {/* Kod Görüntüleme Alanı */}
        <div className="p-4 overflow-x-auto max-h-[580px] bg-[#0d1117] font-mono text-xs leading-relaxed text-slate-200">
          <pre className="font-mono">{activeFile.code}</pre>
        </div>
      </div>
    </div>
  );
};
