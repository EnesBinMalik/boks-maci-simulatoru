/**
 * @file FibonacciFacade.ts
 * @description Sorumluluk: Alt sınıfları (InputValidator, FibonacciGenerator, AverageCalculator,
 * DigitAnalyzer, GoldenRatioAnalyzer) orkestre eden Facade (Cephe) mimarisi.
 * Single Responsibility: UI katmanının tek bir koordinasyon noktasıyla çalışmasını sağlamak,
 * bağımlılıkları düzenlemek ve birleştirilmiş rapor sunmak.
 */

import { InputValidator, ValidationResult } from './InputValidator';
import { FibonacciGenerator, FibonacciTerm, SequenceVariant } from './FibonacciGenerator';
import { AverageCalculator, AverageResult } from './AverageCalculator';
import { DigitAnalyzer, DigitAnalysisResult } from './DigitAnalyzer';
import { GoldenRatioAnalyzer, GoldenRatioConvergence } from './GoldenRatioAnalyzer';

export interface FibonacciCalculationReport {
  timestamp: string;
  depth: number;
  variant: SequenceVariant;
  terms: FibonacciTerm[];
  averageResult: AverageResult;
  digitAnalysis: DigitAnalysisResult;
  goldenRatio: GoldenRatioConvergence;
  calculationDurationMs: number;
  signature: string;
}

export class FibonacciFacade {
  private static readonly SIGNATURE = 'Enes Öztürk Özel Mühendislik İmzası';

  /**
   * Kullanıcıdan gelen derinlik girdisini baştan sona işleyerek tam bir rapor üretir.
   */
  public static execute(rawDepth: string | number, variant: SequenceVariant = 'one_based'): {
    success: boolean;
    validation: ValidationResult;
    report?: FibonacciCalculationReport;
  } {
    const startTime = performance.now();

    // 1. Adım: Girdi Doğrulama (SRP - InputValidator)
    const validation = InputValidator.validateDepth(rawDepth);
    if (!validation.isValid) {
      return { success: false, validation };
    }

    const depth = validation.value;

    // 2. Adım: Dizi Üretimi (SRP - FibonacciGenerator)
    const terms = FibonacciGenerator.generateSequence(depth, variant);
    const bigintValues = terms.map(t => t.value);
    const stringValues = terms.map(t => t.stringValue);

    // 3. Adım: İstatistik ve Ortalama Hesaplama (SRP - AverageCalculator)
    const averageResult = AverageCalculator.calculateAverages(bigintValues);

    // 4. Adım: Rakam (Basamak) Analizi (SRP - DigitAnalyzer)
    const digitAnalysis = DigitAnalyzer.analyzeDigits(stringValues);

    // 5. Adım: Altın Oran Yakınsaması (SRP - GoldenRatioAnalyzer)
    const lastTerm = terms.length > 0 ? terms[terms.length - 1] : undefined;
    const goldenRatio = GoldenRatioAnalyzer.analyzeConvergence(lastTerm?.ratioToPrev, depth);

    const calculationDurationMs = Number((performance.now() - startTime).toFixed(2));

    const report: FibonacciCalculationReport = {
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      depth,
      variant,
      terms,
      averageResult,
      digitAnalysis,
      goldenRatio,
      calculationDurationMs,
      signature: this.SIGNATURE
    };

    return {
      success: true,
      validation,
      report
    };
  }
}
