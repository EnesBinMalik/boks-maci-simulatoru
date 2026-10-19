import React, { useState } from 'react';
import { 
  generatePlantUML, 
  generateMermaid, 
  generatePythonCode, 
  generateJavaCode, 
  generateTypeScriptCode 
} from '../data/umlData';
import { UMLClass, UMLRelationship, ThemeMode } from '../types/uml';
import { X, Copy, Check, Download, FileCode2, Image as ImageIcon } from 'lucide-react';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  classes: UMLClass[];
  relationships: UMLRelationship[];
  theme: ThemeMode;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({
  isOpen,
  onClose,
  classes,
  relationships,
  theme,
  canvasRef,
}) => {
  const [activeTab, setActiveTab] = useState<'plantuml' | 'mermaid' | 'python' | 'java' | 'typescript'>('plantuml');
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const getCodeContent = () => {
    switch (activeTab) {
      case 'plantuml':
        return generatePlantUML();
      case 'mermaid':
        return generateMermaid();
      case 'python':
        return generatePythonCode();
      case 'java':
        return generateJavaCode();
      case 'typescript':
        return generateTypeScriptCode();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // SVG Export Handler
  const handleDownloadSVG = () => {
    if (!canvasRef.current) return;
    const svgEl = canvasRef.current.querySelector('svg');
    if (!svgEl) return;

    // Create standalone SVG with HTML elements embedded or pure SVG representation
    const width = 1350;
    const height = 750;

    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <style>
    .cls-box { fill: #ffffff; stroke: #334155; stroke-width: 1.5; rx: 6px; }
    .cls-header { fill: #f1f5f9; stroke: #334155; stroke-width: 1.5; }
    .cls-text { font-family: system-ui, sans-serif; font-size: 14px; font-weight: bold; fill: #0f172a; text-anchor: middle; }
    .sub-text { font-family: system-ui, sans-serif; font-size: 10px; fill: #64748b; text-anchor: middle; }
    .line { stroke: #334155; stroke-width: 1.75; }
    .mult { font-family: monospace; font-size: 11px; font-weight: bold; fill: #0f172a; }
  </style>
  <rect width="100%" height="100%" fill="#f8fafc" />
  
  <!-- Lines and Relationships -->
  ${svgEl.innerHTML}

  <!-- Watermark -->
  <text x="50" y="700" font-family="sans-serif" font-size="14" font-weight="bold" fill="#2563eb">Üniversite UML Sınıf Diyagramı</text>
  <text x="50" y="720" font-family="sans-serif" font-size="12" fill="#475569">Hazırlayan: Enes Öztürk</text>
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Universite_UML_Diyagrami_Enes_Ozturk.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // High-Resolution PNG Export using Canvas
  const handleDownloadPNG = async () => {
    setIsExporting(true);
    try {
      const canvas = document.createElement('canvas');
      const width = 1350;
      const height = 750;
      canvas.width = width * 2; // 2x retina scale
      canvas.height = height * 2;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.scale(2, 2);

      // Background
      ctx.fillStyle = theme === 'blueprint' ? '#0B1329' : theme === 'slate' ? '#0F172A' : '#F8FAFC';
      ctx.fillRect(0, 0, width, height);

      // Grid dots
      ctx.fillStyle = theme === 'blueprint' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(100, 116, 139, 0.15)';
      for (let x = 0; x < width; x += 24) {
        for (let y = 0; y < height; y += 24) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw classes
      classes.forEach((cls) => {
        // Box background
        ctx.fillStyle = theme === 'blueprint' ? '#1E293B' : '#FFFFFF';
        ctx.strokeStyle = theme === 'blueprint' ? '#60A5FA' : '#334155';
        ctx.lineWidth = 1.5;

        // Draw rounded rectangle
        ctx.beginPath();
        ctx.roundRect(cls.x, cls.y, cls.width, cls.height, 8);
        ctx.fill();
        ctx.stroke();

        // Header division line
        ctx.beginPath();
        ctx.moveTo(cls.x, cls.y + 45);
        ctx.lineTo(cls.x + cls.width, cls.y + 45);
        ctx.stroke();

        // Header Background
        ctx.fillStyle = theme === 'blueprint' ? '#1E3A8A' : '#F1F5F9';
        ctx.beginPath();
        ctx.roundRect(cls.x, cls.y, cls.width, 45, [8, 8, 0, 0]);
        ctx.fill();

        // Stereotype text
        if (cls.stereotype) {
          ctx.fillStyle = theme === 'blueprint' ? '#93C5FD' : '#64748B';
          ctx.font = '10px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`<<${cls.stereotype}>>`, cls.x + cls.width / 2, cls.y + 18);
        }

        // Title text
        ctx.fillStyle = theme === 'blueprint' ? '#FFFFFF' : '#0F172A';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(cls.name, cls.x + cls.width / 2, cls.y + (cls.stereotype ? 34 : 28));

        // Subtext / clean compartment label
        ctx.fillStyle = theme === 'blueprint' ? '#94A3B8' : '#64748B';
        ctx.font = '10px monospace';
        ctx.fillText('[UML Sınıfı]', cls.x + cls.width / 2, cls.y + 68);
      });

      // Draw SVG lines on top
      if (canvasRef.current) {
        const svgEl = canvasRef.current.querySelector('svg');
        if (svgEl) {
          const svgData = new XMLSerializer().serializeToString(svgEl);
          const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(svgBlob);
          const img = new Image();
          await new Promise((resolve) => {
            img.onload = () => {
              ctx.drawImage(img, 0, 0, width, height);
              URL.revokeObjectURL(url);
              resolve(true);
            };
            img.src = url;
          });
        }
      }

      // Title & Signature Badge on PNG
      ctx.fillStyle = theme === 'blueprint' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)';
      ctx.strokeStyle = theme === 'blueprint' ? '#334155' : '#E2E8F0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(30, height - 90, 320, 65, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#2563EB';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Üniversite Sistemi UML Sınıf Diyagramı', 45, height - 65);

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('Hazırlayan: Enes Öztürk', 45, height - 45);

      ctx.fillStyle = '#64748B';
      ctx.font = '10px sans-serif';
      ctx.fillText('UML 2.5 Standardı · Nesne Yönelimli Tasarım', 45, height - 32);

      // Trigger download
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `Universite_UML_Diyagrami_Enes_Ozturk.png`;
      downloadLink.click();
    } catch (err) {
      console.error('PNG export failed', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-lg">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Diyagramı & Kodu Dışa Aktar
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                PlantUML, Mermaid ve OOP dillerinde üretilmiş mimari kodlar
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Export Buttons Strip */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
          {/* Format Tabs */}
          <div className="flex items-center gap-1">
            {(['plantuml', 'mermaid', 'python', 'java', 'typescript'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                }`}
              >
                {tab === 'plantuml' ? 'PlantUML' : tab === 'mermaid' ? 'Mermaid JS' : tab}
              </button>
            ))}
          </div>

          {/* Download Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPNG}
              disabled={isExporting}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>{isExporting ? 'Hazırlanıyor...' : 'PNG İndir'}</span>
            </button>
            <button
              onClick={handleDownloadSVG}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-indigo-600" />
              <span>SVG İndir</span>
            </button>
          </div>
        </div>

        {/* Code Content Area */}
        <div className="relative flex-1 p-6 overflow-y-auto bg-slate-950 text-slate-200 font-mono text-xs">
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-md transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>
          <pre className="whitespace-pre-wrap leading-relaxed pr-24">
            {getCodeContent()}
          </pre>
        </div>

        {/* Footer Credit */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Tasarım ve Modelleme: <strong className="text-slate-800 dark:text-slate-200">Enes Öztürk</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
