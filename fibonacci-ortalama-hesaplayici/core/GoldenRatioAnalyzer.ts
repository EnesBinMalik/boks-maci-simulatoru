/**
 * @file GoldenRatioAnalyzer.ts
 * @description Sorumluluk: Fibonacci serisinin Altın Oran'a (Phi: 1.6180339887...) yakınsama davranışını incelemek.
 * Single Responsibility: Sadece altın oran yakınsama hesaplamaları ve sapma analizini yapar.
 */

export interface GoldenRatioConvergence {
  phiConstant: number;
  lastRatio?: number;
  deltaFromPhi?: number;
  convergencePercent?: number;
  stepNotes: string;
}

export class GoldenRatioAnalyzer {
  public static readonly PHI = 1.618033988749895;

  public static analyzeConvergence(lastTermRatio?: number, depth: number = 0): GoldenRatioConvergence {
    if (lastTermRatio === undefined || depth < 2) {
      return {
        phiConstant: this.PHI,
        stepNotes: 'Altın oran yakınsaması için en az 2 terim gereklidir.'
      };
    }

    const delta = Math.abs(lastTermRatio - this.PHI);
    const convergencePercent = Math.max(0, 100 - (delta / this.PHI) * 100);

    let stepNotes = '';
    if (depth >= 15) {
      stepNotes = 'Dizi mükemmel derecede Altın Oran (φ) değerine kilitlenmiştir (hata payı < 0.0001).';
    } else if (depth >= 8) {
      stepNotes = 'Altın Oran yakınsaması yüksek kararlılık aşamasındadır.';
    } else {
      stepNotes = 'Küçük terimlerde ardışık oran dalgalanması devam etmektedir.';
    }

    return {
      phiConstant: this.PHI,
      lastRatio: lastTermRatio,
      deltaFromPhi: Number(delta.toExponential(4)),
      convergencePercent: Number(convergencePercent.toFixed(3)),
      stepNotes
    };
  }
}
