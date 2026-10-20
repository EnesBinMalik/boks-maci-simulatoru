/**
 * @license
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * C# Console Terminal Simülatörü
 */

import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, RotateCcw, Copy, Check, Play, CornerDownLeft, Sparkles } from 'lucide-react';
import { SHAPES_CONFIG, AUTHOR_NAME, COPYRIGHT_NOTICE } from '../data/shapesConfig';
import { GeometryEngine } from '../services/geometryEngine';
import { CalculationType } from '../types/geometry';

interface ConsoleLine {
  id: string;
  type: 'banner' | 'prompt' | 'input' | 'output' | 'error' | 'success' | 'copyright';
  text: string;
}

type SimulationStep =
  | 'SELECT_SHAPE'
  | 'INPUT_PARAMS'
  | 'SELECT_CALCULATION'
  | 'ASK_CONTINUE'
  | 'GOODBYE';

export const ConsoleSimulator: React.FC = () => {
  const [history, setHistory] = useState<ConsoleLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentStep, setCurrentStep] = useState<SimulationStep>('SELECT_SHAPE');
  const [selectedShapeId, setSelectedShapeId] = useState<string>('circle');
  const [collectedParams, setCollectedParams] = useState<Record<string, number>>({});
  const [paramIndex, setParamIndex] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeShape = SHAPES_CONFIG.find((s) => s.id === selectedShapeId) || SHAPES_CONFIG[0];

  // İlk açılışta C# Hoş Geldiniz Bannerını ve Şekil Menüsünü çiz
  useEffect(() => {
    initTerminal();
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const addLines = (lines: Array<{ type: ConsoleLine['type']; text: string }>) => {
    setHistory((prev) => [
      ...prev,
      ...lines.map((l) => ({
        id: Math.random().toString(36).substring(2, 9),
        type: l.type,
        text: l.text
      }))
    ]);
  };

  const initTerminal = () => {
    const initialLines: ConsoleLine[] = [
      { id: '1', type: 'banner', text: '╔══════════════════════════════════════════════════════════════════════╗' },
      { id: '2', type: 'banner', text: '║                 GEOMETRİK HESAPLAMA MOTORU                          ║' },
      { id: '3', type: 'banner', text: '║            (Alan, Çevre ve Hacim Hesaplama Sistemi)                 ║' },
      { id: '4', type: 'banner', text: '║  Telif Hakkı (c) 2026 Enes Öztürk - Tüm Hakları Saklıdır.            ║' },
      { id: '5', type: 'banner', text: '║  Geliştirici : Enes Öztürk                                           ║' },
      { id: '6', type: 'banner', text: '║  Mimari      : SOLID (Single Responsibility) & DRY Prensipleri       ║' },
      { id: '7', type: 'banner', text: '╚══════════════════════════════════════════════════════════════════════╝' },
      { id: '8', type: 'output', text: '' },
      { id: '9', type: 'output', text: '─── İŞLEM YAPILACAK GEOMETRİK ŞEKLİ SEÇİNİZ ───' },
      { id: '10', type: 'output', text: ' [1] Daire                (2 Boyutlu)' },
      { id: '11', type: 'output', text: ' [2] Kare                 (2 Boyutlu)' },
      { id: '12', type: 'output', text: ' [3] Dikdörtgen           (2 Boyutlu)' },
      { id: '13', type: 'output', text: ' [4] Üçgen                (2 Boyutlu - Heron / 3 Kenar)' },
      { id: '14', type: 'output', text: ' [5] Küp                  (3 Boyutlu)' },
      { id: '15', type: 'output', text: ' [6] Silindir             (3 Boyutlu)' },
      { id: '16', type: 'output', text: ' [7] Küre                 (3 Boyutlu)' },
      { id: '17', type: 'output', text: ' [Ç] Çıkış' },
      { id: '18', type: 'prompt', text: 'Lütfen bir şekil seçiniz (1-7 veya Ç): ' }
    ];

    setHistory(initialLines);
    setCurrentStep('SELECT_SHAPE');
    setCollectedParams({});
    setParamIndex(0);
  };

  const handleUserInput = (val: string) => {
    const rawInput = val.trim();
    if (!rawInput) return;

    // Kullanıcının yazdığı satırı ekrana bas
    addLines([{ type: 'input', text: `> ${rawInput}` }]);
    setCurrentInput('');

    if (currentStep === 'SELECT_SHAPE') {
      const choice = rawInput.toUpperCase();
      if (choice === 'Ç' || choice === 'C') {
        addLines([
          { type: 'output', text: '' },
          { type: 'banner', text: 'Uygulamayı kullandığınız için teşekkür ederiz.' },
          { type: 'copyright', text: `Telif Hakkı (c) 2026 ${AUTHOR_NAME}. Tüm Hakları Saklıdır.` }
        ]);
        setCurrentStep('GOODBYE');
        return;
      }

      const shapeMap: Record<string, string> = {
        '1': 'circle',
        '2': 'square',
        '3': 'rectangle',
        '4': 'triangle',
        '5': 'cube',
        '6': 'cylinder',
        '7': 'sphere'
      };

      const targetId = shapeMap[choice];
      if (!targetId) {
        addLines([
          { type: 'error', text: '[!] Hata: Lütfen geçerli bir seçim yapınız (1-7 veya Ç).' },
          { type: 'prompt', text: 'Lütfen bir şekil seçiniz (1-7 veya Ç): ' }
        ]);
        return;
      }

      const shapeObj = SHAPES_CONFIG.find((s) => s.id === targetId)!;
      setSelectedShapeId(targetId);
      setCollectedParams({});
      setParamIndex(0);

      addLines([
        { type: 'output', text: '' },
        { type: 'output', text: `Seçilen Şekil: ${shapeObj.turkishName} (${shapeObj.category} Boyutlu)` },
        { type: 'prompt', text: `${shapeObj.parameters[0].name} (${shapeObj.parameters[0].symbol}) giriniz [cm]: ` }
      ]);
      setCurrentStep('INPUT_PARAMS');
    } else if (currentStep === 'INPUT_PARAMS') {
      const numVal = parseFloat(rawInput.replace(',', '.'));
      if (isNaN(numVal) || numVal <= 0) {
        addLines([
          { type: 'error', text: '[!] Hata: Değer sıfırdan büyük pozitif bir sayı olmalıdır.' },
          {
            type: 'prompt',
            text: `${activeShape.parameters[paramIndex].name} (${activeShape.parameters[paramIndex].symbol}) giriniz [cm]: `
          }
        ]);
        return;
      }

      const currentParamKey = activeShape.parameters[paramIndex].id;
      const updatedParams = { ...collectedParams, [currentParamKey]: numVal };
      setCollectedParams(updatedParams);

      const nextIndex = paramIndex + 1;
      if (nextIndex < activeShape.parameters.length) {
        setParamIndex(nextIndex);
        addLines([
          {
            type: 'prompt',
            text: `${activeShape.parameters[nextIndex].name} (${activeShape.parameters[nextIndex].symbol}) giriniz [cm]: `
          }
        ]);
      } else {
        // Üçgen ise kenar eşitsizliğini kontrol et (DRY validation)
        if (activeShape.id === 'triangle') {
          const v = GeometryEngine.validateTriangle(
            updatedParams.sideA,
            updatedParams.sideB,
            updatedParams.sideC
          );
          if (!v.isValid) {
            addLines([
              { type: 'error', text: `[!] ${v.error}` },
              { type: 'output', text: 'Lütfen kenarları yeniden giriniz:' },
              {
                type: 'prompt',
                text: `${activeShape.parameters[0].name} (${activeShape.parameters[0].symbol}) giriniz [cm]: `
              }
            ]);
            setParamIndex(0);
            setCollectedParams({});
            return;
          }
        }

        // Parametreler tamamlandı, şimdi hesaplanacak boyutu sor
        addLines([
          { type: 'output', text: '' },
          {
            type: 'output',
            text: `─── HESAPLANMAK İSTENEN BOYUTU SEÇİNİZ (${activeShape.category}) ───`
          },
          ...(activeShape.category === '2D'
            ? [
                { type: 'output' as const, text: ' [1] Çevre Uzunluğu (Ç)' },
                { type: 'output' as const, text: ' [2] Alan (A)' },
                { type: 'output' as const, text: ' [3] Hem Çevre Hem Alan (Detaylı Analiz)' }
              ]
            : [
                { type: 'output' as const, text: ' [1] Hacim (V)' },
                { type: 'output' as const, text: ' [2] Toplam Yüzey Alanı (At)' },
                { type: 'output' as const, text: ' [3] Tümü (Hacim, Yanal Alan ve Toplam Yüzey Alanı)' }
              ]),
          { type: 'prompt', text: 'Hesaplama türünü seçiniz (1-3): ' }
        ]);
        setCurrentStep('SELECT_CALCULATION');
      }
    } else if (currentStep === 'SELECT_CALCULATION') {
      let calcType: CalculationType = 'area';

      if (activeShape.category === '2D') {
        if (rawInput === '1') calcType = 'perimeter';
        else if (rawInput === '2') calcType = 'area';
        else if (rawInput === '3') calcType = 'both';
        else {
          addLines([
            { type: 'error', text: '[!] Hata: Lütfen 1, 2 veya 3 seçeneklerinden birini giriniz.' },
            { type: 'prompt', text: 'Hesaplama türünü seçiniz (1-3): ' }
          ]);
          return;
        }
      } else {
        if (rawInput === '1') calcType = 'volume';
        else if (rawInput === '2') calcType = 'totalSurfaceArea';
        else if (rawInput === '3') calcType = 'all';
        else {
          addLines([
            { type: 'error', text: '[!] Hata: Lütfen 1, 2 veya 3 seçeneklerinden birini giriniz.' },
            { type: 'prompt', text: 'Hesaplama türünü seçiniz (1-3): ' }
          ]);
          return;
        }
      }

      // Hesaplama motorunu çalıştır
      const result = GeometryEngine.calculate(activeShape.id, collectedParams, calcType);

      // C# ConsolePresenter çıktı formatını bas
      addLines([
        { type: 'output', text: '' },
        { type: 'banner', text: '╔══════════════════════════════════════════════════════════════════════╗' },
        { type: 'banner', text: `║ HESAPLAMA SONUCU : ${result.calculationTitle.padEnd(49, ' ')} ║` },
        { type: 'banner', text: '╚══════════════════════════════════════════════════════════════════════╝' },
        { type: 'output', text: 'GİRİLEN DEĞERLER:' },
        ...Object.entries(result.numericValues).map(([key, val]) => ({
          type: 'output' as const,
          text: `  • ${key}: ${val} cm`
        })),
        { type: 'output', text: '' },
        { type: 'output', text: 'ADIM ADIM MATEMATİKSEL İŞLEM:' },
        ...result.steps.flatMap((step) => [
          { type: 'output' as const, text: `  ${step.title}` },
          { type: 'output' as const, text: `  → Formül        : ${step.formula}` },
          { type: 'output' as const, text: `  → Yerine Koyma  : ${step.substitution}` },
          { type: 'output' as const, text: `  → Araç / Açıklama: ${step.explanation}` },
          { type: 'success' as const, text: `  → Hesaplanan     : ${step.result}` },
          { type: 'output' as const, text: '' }
        ]),
        { type: 'banner', text: '┌──────────────────────────────────────────────────────────────────────┐' },
        { type: 'banner', text: '│ ANLAŞILIR ÖZET :                                                     │' },
        { type: 'success', text: `│ ${result.formattedSummary.padEnd(68, ' ')} │` },
        { type: 'banner', text: '└──────────────────────────────────────────────────────────────────────┘' },
        { type: 'copyright', text: ` [✓] Geliştirici ve Telif Sahibi: ${AUTHOR_NAME} | ${COPYRIGHT_NOTICE}` },
        { type: 'output', text: '' },
        { type: 'prompt', text: 'Yeni bir hesaplama yapmak istiyor musunuz? (E/H): ' }
      ]);

      setCurrentStep('ASK_CONTINUE');
    } else if (currentStep === 'ASK_CONTINUE') {
      const ans = rawInput.toUpperCase();
      if (ans === 'E' || ans === 'EVET') {
        initTerminal();
      } else if (ans === 'H' || ans === 'HAYIR') {
        addLines([
          { type: 'output', text: '' },
          { type: 'banner', text: 'Program başarıyla tamamlandı. Çıkış yapıldı.' },
          { type: 'copyright', text: `Telif Hakkı (c) 2026 ${AUTHOR_NAME}. Tüm Hakları Saklıdır.` }
        ]);
        setCurrentStep('GOODBYE');
      } else {
        addLines([
          { type: 'error', text: '[!] Lütfen "E" (Evet) veya "H" (Hayır) giriniz.' },
          { type: 'prompt', text: 'Yeni bir hesaplama yapmak istiyor musunuz? (E/H): ' }
        ]);
      }
    } else if (currentStep === 'GOODBYE') {
      initTerminal();
    }
  };

  const executeScenario = (
    shapeCode: string,
    inputs: string[],
    calcChoice: string
  ) => {
    initTerminal();
    setTimeout(() => {
      handleUserInput(shapeCode);
      inputs.forEach((inp, idx) => {
        setTimeout(() => {
          handleUserInput(inp);
          if (idx === inputs.length - 1) {
            setTimeout(() => {
              handleUserInput(calcChoice);
            }, 100);
          }
        }, (idx + 1) * 80);
      });
    }, 100);
  };

  const copyConsoleText = () => {
    const text = history.map((h) => h.text).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Test Senaryoları Çubuğu */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="font-medium text-slate-200">Hızlı Test Senaryoları (C# Otomatik Koşucu):</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => executeScenario('1', ['5'], '2')}
            className="px-2.5 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-md transition-colors"
            title="Daire Alanı Hesabı (r=5)"
          >
            Daire Alanı (r=5)
          </button>
          <button
            onClick={() => executeScenario('3', ['4', '8'], '3')}
            className="px-2.5 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-md transition-colors"
            title="Dikdörtgen Çevre & Alan (4x8)"
          >
            Dikdörtgen (4x8)
          </button>
          <button
            onClick={() => executeScenario('4', ['6', '8', '10'], '2')}
            className="px-2.5 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-md transition-colors"
            title="Üçgen Heron Alanı (6, 8, 10)"
          >
            Üçgen Heron (6, 8, 10)
          </button>
          <button
            onClick={() => executeScenario('6', ['4', '10'], '1')}
            className="px-2.5 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-md transition-colors"
            title="Silindir Hacmi (r=4, h=10)"
          >
            Silindir Hacmi (r=4, h=10)
          </button>
          <button
            onClick={() => executeScenario('5', ['6'], '3')}
            className="px-2.5 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-md transition-colors"
            title="Küp Hacim & Yüzeyler (a=6)"
          >
            Küp (a=6)
          </button>
        </div>
      </div>

      {/* Terminal Penceresi */}
      <div className="border border-slate-800 bg-[#0c1017] rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono text-sm">
        {/* Terminal Pencere Başlığı */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
            <div className="flex items-center gap-2 ml-2 text-xs text-slate-300">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>GeometryApp.exe — C# .NET Console — Telif: Enes Öztürk</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyConsoleText}
              className="flex items-center gap-1.5 px-2 py-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded transition-colors"
              title="Konsol çıktısını kopyala"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
            <button
              onClick={initTerminal}
              className="flex items-center gap-1.5 px-2 py-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded transition-colors"
              title="Konsolu sıfırla"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Sıfırla</span>
            </button>
          </div>
        </div>

        {/* Konsol Çıktı Akışı */}
        <div className="p-4 overflow-y-auto max-h-[520px] min-h-[420px] space-y-0.5 leading-relaxed bg-[#0a0e14]">
          {history.map((line) => {
            if (line.type === 'banner') {
              return (
                <div key={line.id} className="text-cyan-400 font-semibold whitespace-pre">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'prompt') {
              return (
                <div key={line.id} className="text-amber-300 font-medium whitespace-pre">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'input') {
              return (
                <div key={line.id} className="text-white font-bold whitespace-pre pl-2 border-l-2 border-cyan-500 my-1">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'error') {
              return (
                <div key={line.id} className="text-rose-400 font-medium whitespace-pre">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'success') {
              return (
                <div key={line.id} className="text-emerald-400 font-medium whitespace-pre">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'copyright') {
              return (
                <div key={line.id} className="text-cyan-300 font-semibold whitespace-pre mt-2">
                  {line.text}
                </div>
              );
            }
            return (
              <div key={line.id} className="text-slate-300 whitespace-pre">
                {line.text}
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Akıllı Hızlı Seçim Butonları (Tuşlama gerekmeden tıklama imkanı) */}
        {currentStep === 'SELECT_SHAPE' && (
          <div className="flex flex-wrap items-center gap-1.5 px-4 py-2 bg-slate-900/90 border-t border-slate-800 text-xs">
            <span className="text-slate-400">Hızlı Seçim:</span>
            <button
              onClick={() => handleUserInput('1')}
              className="px-2 py-0.5 bg-slate-800 hover:bg-cyan-900/50 hover:text-cyan-300 rounded border border-slate-700 transition-colors"
            >
              [1] Daire
            </button>
            <button
              onClick={() => handleUserInput('2')}
              className="px-2 py-0.5 bg-slate-800 hover:bg-cyan-900/50 hover:text-cyan-300 rounded border border-slate-700 transition-colors"
            >
              [2] Kare
            </button>
            <button
              onClick={() => handleUserInput('3')}
              className="px-2 py-0.5 bg-slate-800 hover:bg-cyan-900/50 hover:text-cyan-300 rounded border border-slate-700 transition-colors"
            >
              [3] Dikdörtgen
            </button>
            <button
              onClick={() => handleUserInput('4')}
              className="px-2 py-0.5 bg-slate-800 hover:bg-cyan-900/50 hover:text-cyan-300 rounded border border-slate-700 transition-colors"
            >
              [4] Üçgen
            </button>
            <button
              onClick={() => handleUserInput('5')}
              className="px-2 py-0.5 bg-slate-800 hover:bg-cyan-900/50 hover:text-cyan-300 rounded border border-slate-700 transition-colors"
            >
              [5] Küp
            </button>
            <button
              onClick={() => handleUserInput('6')}
              className="px-2 py-0.5 bg-slate-800 hover:bg-cyan-900/50 hover:text-cyan-300 rounded border border-slate-700 transition-colors"
            >
              [6] Silindir
            </button>
            <button
              onClick={() => handleUserInput('7')}
              className="px-2 py-0.5 bg-slate-800 hover:bg-cyan-900/50 hover:text-cyan-300 rounded border border-slate-700 transition-colors"
            >
              [7] Küre
            </button>
          </div>
        )}

        {currentStep === 'SELECT_CALCULATION' && (
          <div className="flex flex-wrap items-center gap-1.5 px-4 py-2 bg-slate-900/90 border-t border-slate-800 text-xs">
            <span className="text-slate-400">Hesaplama Seç:</span>
            <button
              onClick={() => handleUserInput('1')}
              className="px-2 py-0.5 bg-slate-800 hover:bg-cyan-900/50 hover:text-cyan-300 rounded border border-slate-700 transition-colors"
            >
              [1] {activeShape.category === '2D' ? 'Çevre Uzunluğu' : 'Hacim'}
            </button>
            <button
              onClick={() => handleUserInput('2')}
              className="px-2 py-0.5 bg-slate-800 hover:bg-cyan-900/50 hover:text-cyan-300 rounded border border-slate-700 transition-colors"
            >
              [2] {activeShape.category === '2D' ? 'Alan' : 'Yüzey Alanı'}
            </button>
            <button
              onClick={() => handleUserInput('3')}
              className="px-2 py-0.5 bg-slate-800 hover:bg-cyan-900/50 hover:text-cyan-300 rounded border border-slate-700 transition-colors"
            >
              [3] Tümü / Detaylı Analiz
            </button>
          </div>
        )}

        {currentStep === 'ASK_CONTINUE' && (
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/90 border-t border-slate-800 text-xs">
            <span className="text-slate-400">Devam edilsin mi?</span>
            <button
              onClick={() => handleUserInput('E')}
              className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 rounded font-bold transition-colors"
            >
              [E] Evet (Yeni Hesaplama)
            </button>
            <button
              onClick={() => handleUserInput('H')}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
            >
              [H] Hayır (Çıkış)
            </button>
          </div>
        )}

        {/* Aktif Giriş Satırı */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUserInput(currentInput);
          }}
          className="flex items-center px-4 py-3 bg-slate-950 border-t border-slate-800 gap-2"
        >
          <span className="text-cyan-400 font-bold select-none">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            disabled={currentStep === 'GOODBYE'}
            placeholder={
              currentStep === 'GOODBYE'
                ? "Program sonlandı. 'Sıfırla' butonuna tıklayarak yeniden başlatabilirsiniz."
                : 'Değer girip Enter tuşuna basınız...'
            }
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none font-mono text-sm"
            autoFocus
          />
          <button
            type="submit"
            disabled={!currentInput.trim() || currentStep === 'GOODBYE'}
            className="px-3 py-1 text-xs bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 disabled:hover:bg-cyan-600 text-white rounded font-sans font-medium flex items-center gap-1 transition-colors"
          >
            <span>Gönder</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </form>
      </div>
    </div>
  );
};
