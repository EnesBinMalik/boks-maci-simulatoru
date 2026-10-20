/**
 * @license
 * Telif Hakkı © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * Algoritma: Kullanıcıdan alınan boyut bilgisine göre console'a Üçgen çizen uygulama.
 * Mimari: Single Responsibility (SRP) ve DRY Prensipleri.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { TerminalConsole } from './components/TerminalConsole';
import { ControlPanel } from './components/ControlPanel';
import { AlgorithmVisualizer } from './components/AlgorithmVisualizer';
import { ArchitectureView } from './components/ArchitectureView';
import { CodeInspector } from './components/CodeInspector';
import { TestsView } from './components/TestsView';
import { CopyrightModal } from './components/CopyrightModal';
import { TriangleApplication } from './core/TriangleApplication';
import { AUTHOR_SIGNATURE, ConsoleLine, RowCalculation, TriangleType } from './core/types';

export default function App() {
  // Core Application Instance (SRP Orchestrator)
  const app = useMemo(() => new TriangleApplication(), []);

  // UI State
  const [activeTab, setActiveTab] = useState<'console' | 'code' | 'architecture' | 'tests'>('console');
  const [size, setSize] = useState<number>(5);
  const [triangleType, setTriangleType] = useState<TriangleType>('pyramid');
  const [char, setChar] = useState<string>('*');
  const [showRowNumbers, setShowRowNumbers] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isCopyrightOpen, setIsCopyrightOpen] = useState<boolean>(false);

  // Console Buffer State
  const [consoleLines, setConsoleLines] = useState<ConsoleLine[]>([]);
  const [activeRows, setActiveRows] = useState<RowCalculation[]>([]);

  // Animation cancel ref
  const cancelAnimationRef = useRef<boolean>(false);

  // Sync initial lines from buffer on mount and perform initial draw
  useEffect(() => {
    // Perform initial draw of size 5
    const result = app.executeDraw({
      size: 5,
      char: '*',
      triangleType: 'pyramid',
      showRowNumbers: false,
    });
    setConsoleLines(app.buffer.getLines());
    if (result.rows) {
      setActiveRows(result.rows);
    }
  }, [app]);

  // Standard Instant Draw
  const handleDraw = () => {
    cancelAnimationRef.current = true;
    setIsAnimating(false);

    const result = app.executeDraw({
      size,
      char,
      triangleType,
      showRowNumbers,
    });

    setConsoleLines(app.buffer.getLines());
    if (result.rows) {
      setActiveRows(result.rows);
    }
  };

  // Step-by-Step Animated Draw
  const handleAnimatedDraw = async () => {
    cancelAnimationRef.current = false;
    setIsAnimating(true);

    // 1. Doğrulama
    const validation = app.validator.validate(size);
    app.buffer.addLine(`> [ADIM ADIM ÇİZİM BAŞLATILDI] Boyut=${size}, Tip=${triangleType}`, 'input');

    if (!validation.isValid || validation.parsedValue === undefined) {
      app.buffer.addLine(`[HATA] ${validation.errorMessage}`, 'error');
      setConsoleLines(app.buffer.getLines());
      setIsAnimating(false);
      return;
    }

    const validatedSize = validation.parsedValue;
    const rowCalculations = app.calculator.calculate(validatedSize, triangleType, char);
    setActiveRows(rowCalculations);

    app.buffer.addLine(`Hesaplanan toplam satır: ${validatedSize}. Döngü yürütülüyor...`, 'system');
    setConsoleLines(app.buffer.getLines());

    // Satır satır gecikmeli yazma (animasyon)
    for (let i = 0; i < rowCalculations.length; i++) {
      if (cancelAnimationRef.current) break;

      await new Promise((resolve) => setTimeout(resolve, 140));
      if (cancelAnimationRef.current) break;

      const renderedRow = app.renderer.renderSingleRow(
        rowCalculations[i],
        { showRowNumbers },
        rowCalculations.length
      );
      app.buffer.addLine(renderedRow, 'output');
      setConsoleLines(app.buffer.getLines());
    }

    if (!cancelAnimationRef.current) {
      app.buffer.addLine(`--- ${AUTHOR_SIGNATURE.copyrightNotice} ---`, 'copyright');
      setConsoleLines(app.buffer.getLines());
    }

    setIsAnimating(false);
  };

  // Interactive CLI commands in terminal
  const handleCommand = (rawCommand: string) => {
    const cmd = rawCommand.trim().toLowerCase();

    // Check if user simply entered a number (e.g., "7")
    const numericOnly = Number(cmd);
    if (!isNaN(numericOnly) && Number.isInteger(numericOnly)) {
      setSize(numericOnly);
      const res = app.executeDraw({
        size: numericOnly,
        char,
        triangleType,
        showRowNumbers,
      });
      setConsoleLines(app.buffer.getLines());
      if (res.rows) setActiveRows(res.rows);
      return;
    }

    // Command handling
    if (cmd === 'temizle' || cmd === 'cls' || cmd === 'clear') {
      handleClear();
      return;
    }

    if (cmd === 'yardim' || cmd === 'help') {
      app.buffer.addLine('Komut Listesi:', 'system');
      app.buffer.addLine('  <sayı>          : Belirtilen boyutta üçgen çizer (Örn: 7)', 'system');
      app.buffer.addLine('  boyut <sayı>    : Üçgen boyutunu ayarlar ve çizer (Örn: boyut 9)', 'system');
      app.buffer.addLine('  karakter <kar>  : Çizim karakterini değiştirir (Örn: karakter #)', 'system');
      app.buffer.addLine('  piramit         : Standart eşkenar piramit tipine geçer', 'system');
      app.buffer.addLine('  dik             : Dik üçgen tipine geçer', 'system');
      app.buffer.addLine('  bos             : İçi boş üçgen tipine geçer', 'system');
      app.buffer.addLine('  temizle         : Konsolu temizler', 'system');
      app.buffer.addLine('  hakkinda        : Geliştirici ve telif bilgisi', 'system');
      setConsoleLines(app.buffer.getLines());
      return;
    }

    if (cmd === 'hakkinda' || cmd === 'telif') {
      app.buffer.addLine(`Eser Sahibi: ${AUTHOR_SIGNATURE.author}`, 'copyright');
      app.buffer.addLine(`Telif Hakkı: ${AUTHOR_SIGNATURE.copyrightNotice}`, 'copyright');
      app.buffer.addLine(`Lisans: ${AUTHOR_SIGNATURE.license}`, 'copyright');
      app.buffer.addLine(`İmza Doğrulama: ${AUTHOR_SIGNATURE.signatureHash}`, 'copyright');
      setConsoleLines(app.buffer.getLines());
      setIsCopyrightOpen(true);
      return;
    }

    if (cmd.startsWith('boyut ')) {
      const parts = cmd.split(' ');
      const val = Number(parts[1]);
      if (!isNaN(val)) {
        setSize(val);
        const res = app.executeDraw({
          size: val,
          char,
          triangleType,
          showRowNumbers,
        });
        setConsoleLines(app.buffer.getLines());
        if (res.rows) setActiveRows(res.rows);
        return;
      }
    }

    if (cmd.startsWith('karakter ') && cmd.length > 9) {
      const newChar = rawCommand.substring(9).trim().charAt(0) || '*';
      setChar(newChar);
      app.buffer.addLine(`Karakter '${newChar}' olarak güncellendi.`, 'system');
      setConsoleLines(app.buffer.getLines());
      return;
    }

    if (cmd === 'piramit') {
      setTriangleType('pyramid');
      app.buffer.addLine('Üçgen türü "Eşkenar Piramit" olarak seçildi.', 'system');
      setConsoleLines(app.buffer.getLines());
      return;
    }

    if (cmd === 'dik') {
      setTriangleType('right_left');
      app.buffer.addLine('Üçgen türü "Sola Dayalı Dik Üçgen" olarak seçildi.', 'system');
      setConsoleLines(app.buffer.getLines());
      return;
    }

    if (cmd === 'bos') {
      setTriangleType('hollow_pyramid');
      app.buffer.addLine('Üçgen türü "İçi Boş Üçgen" olarak seçildi.', 'system');
      setConsoleLines(app.buffer.getLines());
      return;
    }

    // Bilinmeyen komut
    app.buffer.addLine(`> ${rawCommand}`, 'input');
    app.buffer.addLine(`Bilinmeyen komut: "${rawCommand}". Yardım için "yardim" yazınız veya doğrudan boyut giriniz (örn: 6).`, 'error');
    setConsoleLines(app.buffer.getLines());
  };

  const handleClear = () => {
    cancelAnimationRef.current = true;
    setIsAnimating(false);
    app.clearConsole();
    setConsoleLines(app.buffer.getLines());
  };

  const handleExport = () => {
    const textContent = app.buffer.exportAsPlainText();
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ucgen_algoritmasi_enes_ozturk_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCopyright={() => setIsCopyrightOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Tab 1: Konsol & Çizim (Primary View) */}
        {activeTab === 'console' && (
          <div className="space-y-6">
            {/* Top 2-Column Split: Controls + Terminal */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Control Panel */}
              <div className="lg:col-span-5 space-y-6">
                <ControlPanel
                  size={size}
                  setSize={setSize}
                  triangleType={triangleType}
                  setTriangleType={setTriangleType}
                  char={char}
                  setChar={setChar}
                  showRowNumbers={showRowNumbers}
                  setShowRowNumbers={setShowRowNumbers}
                  isAnimating={isAnimating}
                  onDraw={handleDraw}
                  onAnimatedDraw={handleAnimatedDraw}
                  onReset={handleClear}
                />
              </div>

              {/* Right Column: Terminal Console */}
              <div className="lg:col-span-7">
                <TerminalConsole
                  lines={consoleLines}
                  onCommand={handleCommand}
                  onClear={handleClear}
                  onExport={handleExport}
                />
              </div>
            </div>

            {/* Bottom Row: Mathematical Visualizer & DRY Analysis */}
            <AlgorithmVisualizer rows={activeRows} size={size} char={char} />
          </div>
        )}

        {/* Tab 2: Kaynak Kodları (C# / Java / TypeScript) */}
        {activeTab === 'code' && (
          <div className="space-y-4">
            <div className="max-w-2xl">
              <h2 className="text-lg font-bold text-neutral-100">
                Temiz Kod (Clean Code) Referans Uygulamaları
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Aşağıdaki kaynak kodlar, hem ödev teslimi hem de profesyonel yazılım mimarisi standartlarına uygun
                olarak Enes Öztürk telif haklarıyla hazırlanmıştır.
              </p>
            </div>
            <CodeInspector />
          </div>
        )}

        {/* Tab 3: SRP & DRY Mimari Analizi */}
        {activeTab === 'architecture' && <ArchitectureView />}

        {/* Tab 4: Otomatik Birim Testleri */}
        {activeTab === 'tests' && <TestsView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-300">
              {AUTHOR_SIGNATURE.copyrightNotice}
            </span>
            <span>·</span>
            <span>Geliştirici: {AUTHOR_SIGNATURE.author}</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span>Single Responsibility (SRP)</span>
            <span>·</span>
            <span>Don't Repeat Yourself (DRY)</span>
            <span>·</span>
            <button
              onClick={() => setIsCopyrightOpen(true)}
              className="hover:text-emerald-400 transition-colors underline underline-offset-2"
            >
              Lisans & Sertifika
            </button>
          </div>
        </div>
      </footer>

      {/* Copyright Modal */}
      <CopyrightModal
        isOpen={isCopyrightOpen}
        onClose={() => setIsCopyrightOpen(false)}
      />
    </div>
  );
}
