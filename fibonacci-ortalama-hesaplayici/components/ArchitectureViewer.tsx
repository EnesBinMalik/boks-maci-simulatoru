/**
 * @file ArchitectureViewer.tsx
 * @description Single Responsibility Principle (SRP) ve DRY (Don't Repeat Yourself)
 * mimarisini interaktif olarak açıklayan ve kaynak kodları incelemeye sunan modül.
 */

import React, { useState } from 'react';
import {
  Code,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Cpu,
  Layers,
  Sparkles,
  X,
  FileCode2
} from 'lucide-react';

interface ArchitectureViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SRP_CLASSES = [
  {
    id: 'validator',
    name: 'InputValidator',
    file: 'src/core/InputValidator.ts',
    responsibility: 'Yalnızca kullanıcı girdilerini doğrulamak, tamsayı kontrolü yapmak ve hata mesajlarını yönetmek.',
    methods: ['validateDepth(rawInput: string | number)', 'getRecommendedMax()'],
    codeSnippet: `export class InputValidator {
  private static readonly MIN_DEPTH = 1;
  private static readonly ABSOLUTE_MAX_DEPTH = 1000;

  // Single Responsibility: Yalnızca doğrulama mantığı
  public static validateDepth(rawInput: string | number): ValidationResult {
    if (!rawInput) return { isValid: false, value: 0, errorMessage: 'Boş bırakılamaz.' };
    const num = Number(rawInput);
    if (!Number.isInteger(num)) return { isValid: false, value: 0, errorMessage: 'Tamsayı olmalı.' };
    if (num < this.MIN_DEPTH) return { isValid: false, value: 0, errorMessage: 'En az 1 olmalı.' };
    return { isValid: true, value: num };
  }
}`
  },
  {
    id: 'generator',
    name: 'FibonacciGenerator',
    file: 'src/core/FibonacciGenerator.ts',
    responsibility: 'Yalnızca Fibonacci serisi terimlerini üretmek ve memoization (önbellekleme) ile performans sağlamak.',
    methods: ['generateSequence(depth: number, variant: SequenceVariant)', 'getNthFibonacci(n: number)'],
    codeSnippet: `export class FibonacciGenerator {
  // DRY: Tekrarlı hesaplamayı önleyen statik önbellek
  private static cache: Map<number, bigint> = new Map();

  // Single Responsibility: Sadece dizi üretimi
  public static generateSequence(depth: number, variant: SequenceVariant): FibonacciTerm[] {
    const terms: FibonacciTerm[] = [];
    for (let i = 1; i <= depth; i++) {
      const val = this.getNthFibonacci(i);
      terms.push({ index: i, value: val, stringValue: val.toString(), isEven: val % 2n === 0n });
    }
    return terms;
  }
}`
  },
  {
    id: 'calculator',
    name: 'AverageCalculator',
    file: 'src/core/AverageCalculator.ts',
    responsibility: 'Yalnızca matematiksel toplam ve ortalamaları (Aritmetik, Harmonik, Geometrik) hesaplamak.',
    methods: ['calculateSum(numbers: bigint[])', 'calculateAverages(numbers: bigint[])'],
    codeSnippet: `export class AverageCalculator {
  // Single Responsibility: Sadece istatistik ve ortalama hesaplama
  public static calculateSum(numbers: bigint[]): bigint {
    return numbers.reduce((acc, curr) => acc + curr, 0n);
  }

  public static calculateAverages(numbers: bigint[]): AverageResult {
    const count = numbers.length;
    const sum = this.calculateSum(numbers);
    const quotient = sum / BigInt(count);
    const remainder = sum % BigInt(count);
    // Yüksek hassasiyetli ondalıklı aritmetik ortalama
    return { count, sumBigInt: sum, arithmeticMeanExactString: ... };
  }
}`
  },
  {
    id: 'digitAnalyzer',
    name: 'DigitAnalyzer',
    file: 'src/core/DigitAnalyzer.ts',
    responsibility: 'Sayıları basamaklarına (0-9 rakamlarına) ayrıştırıp tekil rakam ortalamasını ve frekansını çıkarmak.',
    methods: ['analyzeDigits(termsStringValues: string[])'],
    codeSnippet: `export class DigitAnalyzer {
  // Single Responsibility: 0-9 rakam analizi (Sayı vs Rakam ayrımı)
  public static analyzeDigits(termsStringValues: string[]): DigitAnalysisResult {
    const counts = new Array<number>(10).fill(0);
    let digitSum = 0, totalDigits = 0;
    // Her basamağı ayrıştır ve frekans/ortalama çıkar
    return { totalDigitsCount, digitSum, digitAverage: digitSum / totalDigits, ... };
  }
}`
  },
  {
    id: 'goldenRatio',
    name: 'GoldenRatioAnalyzer',
    file: 'src/core/GoldenRatioAnalyzer.ts',
    responsibility: 'Fibonacci terimleri arasındaki oranın Altın Oran sabitine (φ = 1.6180339...) yakınsamasını ölçmek.',
    methods: ['analyzeConvergence(lastTermRatio?: number, depth: number)'],
    codeSnippet: `export class GoldenRatioAnalyzer {
  public static readonly PHI = 1.618033988749895;

  // Single Responsibility: Altın Oran analizleri
  public static analyzeConvergence(lastTermRatio?: number, depth: number): GoldenRatioConvergence {
    const delta = Math.abs(lastTermRatio - this.PHI);
    return { phiConstant: this.PHI, deltaFromPhi: delta, stepNotes: ... };
  }
}`
  },
  {
    id: 'facade',
    name: 'FibonacciFacade',
    file: 'src/core/FibonacciFacade.ts',
    responsibility: 'UI katmanı ile bağımsız SRP sınıfları arasındaki koordinasyonu sağlayan Facade (Cephe) tasarımı.',
    methods: ['execute(rawDepth: string | number, variant: SequenceVariant)'],
    codeSnippet: `export class FibonacciFacade {
  // Sınıfları tek bir orkestrasyonda birleştirir
  public static execute(rawDepth: string | number, variant: SequenceVariant) {
    const validation = InputValidator.validateDepth(rawDepth);
    const terms = FibonacciGenerator.generateSequence(validation.value, variant);
    const averageResult = AverageCalculator.calculateAverages(terms.map(t => t.value));
    const digitAnalysis = DigitAnalyzer.analyzeDigits(terms.map(t => t.stringValue));
    const goldenRatio = GoldenRatioAnalyzer.analyzeConvergence(...);
    return { success: true, report: { terms, averageResult, digitAnalysis, goldenRatio } };
  }
}`
  }
];

export const ArchitectureViewer: React.FC<ArchitectureViewerProps> = ({ isOpen, onClose }) => {
  const [selectedClassId, setSelectedClassId] = useState<string>('generator');
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentClass = SRP_CLASSES.find(c => c.id === selectedClassId) ?? SRP_CLASSES[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentClass.codeSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Yazılım Mimarisi & Single Responsibility (SRP)</h3>
                <span className="text-xs text-amber-400 font-mono font-medium">Enes Öztürk İmzası</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Kod tekrarından kaçınılmış (DRY), bağımsız sınıflara ve metotlara ayrılmış modüler yapı.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Architecture Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950/70 border border-slate-800/80 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Single Responsibility (SRP)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Her sınıf yalnızca tek bir amaca hizmet eder: Doğrulama, Dizi Üretimi, Ortalama Hesabı, Rakam Analizi veya Sunum.
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold mb-1">
                <Layers className="w-4 h-4" />
                <span>DRY (Don't Repeat Yourself)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Memoization önbelleği ile tekrarlı Fibonacci adımları ortadan kaldırılmış, tek noktadan türetilen matematiksel zincir kurulmuştur.
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>BigInt Güvencesi</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                JavaScript 64-bit float sınırını aşan yüksek derinliklerde bile sıfır hassasiyet kaybı ile tam sayı kesinliği sağlanmıştır.
              </p>
            </div>
          </div>

          {/* Class Tabs and Code Viewer */}
          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60">
            {/* Tab navigation */}
            <div className="flex items-center overflow-x-auto border-b border-slate-800 bg-slate-950 px-2 py-1 gap-1">
              {SRP_CLASSES.map((cls) => (
                <button
                  key={cls.id}
                  type="button"
                  onClick={() => setSelectedClassId(cls.id)}
                  className={`px-3 py-2 text-xs font-mono rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    selectedClassId === cls.id
                      ? 'bg-slate-800 text-amber-400 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileCode2 className="w-3.5 h-3.5" />
                  <span>{cls.name}.ts</span>
                </button>
              ))}
            </div>

            {/* Selected class details */}
            <div className="p-5 border-b border-slate-800/80 bg-slate-900/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                    <span>{currentClass.name}</span>
                    <span className="text-xs text-slate-500 font-normal">({currentClass.file})</span>
                  </h4>
                  <p className="text-xs text-amber-300 mt-1">
                    🎯 <strong>Tek Sorumluluk:</strong> {currentClass.responsibility}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="self-start sm:self-auto px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors flex items-center gap-1.5 font-mono"
                >
                  {copiedSnippet ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Kodu Kopyala</span>
                    </>
                  )}
                </button>
              </div>

              {/* Methods list */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {currentClass.methods.map((method, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-[11px] font-mono text-slate-300"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="p-4 bg-slate-950 overflow-x-auto">
              <pre className="text-xs font-mono text-slate-300 leading-relaxed">
                <code>{currentClass.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Footer Signature */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Mühendislik İmzası: <strong>Enes Öztürk</strong></span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors font-semibold"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
