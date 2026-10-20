/**
 * @file DigitAnalyzer.ts
 * @description Sorumluluk: Fibonacci serisindeki sayıların tüm basamaklarını (rakamlarını: 0-9) analiz etmek.
 * Single Responsibility: Türkçe'de "rakam" (0-9) ile "sayı" kavram ayrımına tam uygunluk sağlayarak
 * serideki tüm rakamların toplamını, frekansını ve basamak bazlı ortalamasını hesaplar.
 */

export interface DigitFrequency {
  digit: number;
  count: number;
  percentage: number;
}

export interface DigitAnalysisResult {
  totalDigitsCount: number;
  digitSum: number;
  digitAverage: number;
  digitFrequencies: DigitFrequency[];
  mostFrequentDigit: number;
  leastFrequentDigit: number;
}

export class DigitAnalyzer {
  /**
   * Fibonacci terimlerinin string değerlerinden tüm rakamları (0-9) çıkarıp analiz eder.
   * @param termsStringValues Fibonacci sayı dizisinin metin halleri
   */
  public static analyzeDigits(termsStringValues: string[]): DigitAnalysisResult {
    const counts = new Array<number>(10).fill(0);
    let totalDigitsCount = 0;
    let digitSum = 0;

    for (const str of termsStringValues) {
      for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const digit = char.charCodeAt(0) - 48; // '0' = 48
        if (digit >= 0 && digit <= 9) {
          counts[digit]++;
          digitSum += digit;
          totalDigitsCount++;
        }
      }
    }

    if (totalDigitsCount === 0) {
      return {
        totalDigitsCount: 0,
        digitSum: 0,
        digitAverage: 0,
        digitFrequencies: [],
        mostFrequentDigit: 0,
        leastFrequentDigit: 0
      };
    }

    const digitFrequencies: DigitFrequency[] = counts.map((count, digit) => ({
      digit,
      count,
      percentage: Number(((count / totalDigitsCount) * 100).toFixed(1))
    }));

    let maxCount = -1;
    let mostFrequent = 0;
    let minCount = Infinity;
    let leastFrequent = 0;

    counts.forEach((count, digit) => {
      if (count > maxCount) {
        maxCount = count;
        mostFrequent = digit;
      }
      if (count < minCount && count > 0) {
        minCount = count;
        leastFrequent = digit;
      }
    });

    const digitAverage = Number((digitSum / totalDigitsCount).toFixed(4));

    return {
      totalDigitsCount,
      digitSum,
      digitAverage,
      digitFrequencies,
      mostFrequentDigit: mostFrequent,
      leastFrequentDigit: leastFrequent
    };
  }
}
