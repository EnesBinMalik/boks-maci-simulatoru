/**
 * @license
 * Algoritma Çözüm Motoru - Enes Öztürk Özel Geliştirmesi
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 */

import { AlgorithmResult, MathMode, PairItem } from '../types';

/**
 * Kullanıcı girdisini ayrıştırır ve integer ikilileri hesaplar.
 *
 * Problem Tanımı:
 * Ekrandan girilen n tane integer ikililerin toplamını alan,
 * eğer sayılar birbirinden farklıysa toplamlarını,
 * sayılar aynıysa toplamının karesini ekrana yazdıran console uygulaması.
 *
 * Örnek Giriş: 2 3 1 5 2 5 3 3
 * Çıktı: 5 6 7 81
 *
 * Not (Modlar):
 * - sample_match_81: Örnek çıktıdaki 81 değerini sağlamak için sayılar eşit olduğunda
 *   (a * b)^2 veya a^4 = 81 hesaplanır (Örnek: (3 * 3)^2 = 81).
 * - strict_sum_square_36: Metindeki 'toplamının karesi' ifadesi tam matematiksel olarak
 *   (a + b)^2 = (3 + 3)^2 = 36 olarak hesaplanır.
 */
export function runIntegerPairsAlgorithm(
  input: string,
  mode: MathMode = 'sample_match_81'
): AlgorithmResult {
  const startTime = performance.now();

  const trimmed = input.trim();
  if (!trimmed) {
    return {
      rawInput: input,
      numbers: [],
      pairs: [],
      outputString: '',
      outputList: [],
      executionTimeMs: 0,
      mode,
      isValid: false,
      errorMessage: 'Lütfen en az iki adet tamsayı giriniz (örn: 2 3 1 5 2 5 3 3).'
    };
  }

  // Boşluk, virgül veya satır sonu ile ayır
  const tokens = trimmed.split(/[\s,]+/);
  const numbers: number[] = [];
  const invalidTokens: string[] = [];

  for (const token of tokens) {
    if (!token) continue;
    const num = Number(token);
    if (isNaN(num) || !Number.isInteger(num)) {
      invalidTokens.push(token);
    } else {
      numbers.push(num);
    }
  }

  if (invalidTokens.length > 0) {
    return {
      rawInput: input,
      numbers,
      pairs: [],
      outputString: '',
      outputList: [],
      executionTimeMs: performance.now() - startTime,
      mode,
      isValid: false,
      errorMessage: `Geçersiz tamsayı karakterleri bulundu: [${invalidTokens.join(', ')}]. Yalnızca tam sayılar girilebilir.`
    };
  }

  if (numbers.length < 2) {
    return {
      rawInput: input,
      numbers,
      pairs: [],
      outputString: '',
      outputList: [],
      executionTimeMs: performance.now() - startTime,
      mode,
      isValid: false,
      errorMessage: 'İkili oluşturmak için en az 2 sayı gereklidir.'
    };
  }

  let warningMessage: string | undefined;
  if (numbers.length % 2 !== 0) {
    const trailingNumber = numbers[numbers.length - 1];
    warningMessage = `Girilen sayı adedi tek (${numbers.length}). Son eleman (${trailingNumber}) eşleşecek bir ikiliye sahip olmadığı için hesaplamaya dahil edilmedi.`;
  }

  const pairs: PairItem[] = [];
  const outputList: number[] = [];

  for (let i = 0; i < numbers.length - 1; i += 2) {
    const a = numbers[i];
    const b = numbers[i + 1];
    const isEqual = a === b;
    let result: number;
    let formulaDescription: string;
    let calculationBreakdown: string;

    if (!isEqual) {
      result = a + b;
      formulaDescription = 'Sayılar farklı (a != b) → Toplam: a + b';
      calculationBreakdown = `${a} + ${b} = ${result}`;
    } else {
      if (mode === 'sample_match_81') {
        // Örnek çıktıda 3 3 için 81 verilmiştir: (3 * 3)^2 = 81 veya 3^4 = 81
        // (Soru metnindeki örnek çıktı uyumu)
        result = Math.pow(a * b, 2);
        formulaDescription = 'Sayılar aynı (a == b) → Örnek Çıktı Modu (81): (a × b)²';
        calculationBreakdown = `(${a} × ${b})² = ${a * b}² = ${result}`;
      } else {
        // Tam sözel matematik karşılığı: (a + b)^2
        const sum = a + b;
        result = Math.pow(sum, 2);
        formulaDescription = 'Sayılar aynı (a == b) → Matematiksel Toplamın Karesi: (a + b)²';
        calculationBreakdown = `(${a} + ${b})² = ${sum}² = ${result}`;
      }
    }

    pairs.push({
      id: pairs.length + 1,
      first: a,
      second: b,
      isEqual,
      result,
      formulaDescription,
      calculationBreakdown
    });

    outputList.push(result);
  }

  const outputString = outputList.join(' ');
  const endTime = performance.now();

  return {
    rawInput: input,
    numbers,
    pairs,
    outputString,
    outputList,
    executionTimeMs: Math.max(0.05, +(endTime - startTime).toFixed(3)),
    mode,
    isValid: true,
    warningMessage
  };
}
