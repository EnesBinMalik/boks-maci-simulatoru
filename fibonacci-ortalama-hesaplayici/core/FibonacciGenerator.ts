/**
 * @file FibonacciGenerator.ts
 * @description Sorumluluk: Verilen derinliğe göre Fibonacci dizisini üretmek.
 * Single Responsibility: Sadece Fibonacci terimlerini oluşturma algoritmasını ve önbelleklemesini yönetir.
 * Don't Repeat Yourself (DRY): Önbellek (Memoization) ve tek noktadan türetilen hesaplama döngüsü kullanır.
 */

export interface FibonacciTerm {
  index: number;        // Dizideki sıra numarası (1'den başlayan)
  value: bigint;        // Değerin tam BigInt hali (hassasiyet kaybı yok)
  stringValue: string;  // Gösterim için metin
  isEven: boolean;      // Çift sayı mı?
  digitCount: number;   // Kaç basamaklı?
  ratioToPrev?: number; // F(n) / F(n-1) oranı
}

export type SequenceVariant = 'one_based' | 'zero_based';

export class FibonacciGenerator {
  // Performansı artırmak ve tekrarlı hesaplamaları önlemek için statik önbellek
  private static cache: Map<number, bigint> = new Map();

  static {
    // Başlangıç terimleri
    FibonacciGenerator.cache.set(0, 0n);
    FibonacciGenerator.cache.set(1, 1n);
    FibonacciGenerator.cache.set(2, 1n);
  }

  /**
   * Belirtilen derinlik kadar Fibonacci terimi üretir.
   * @param depth Hesaplanacak terim adedi (N)
   * @param variant 'one_based' (1, 1, 2, 3, 5...) veya 'zero_based' (0, 1, 1, 2, 3...)
   */
  public static generateSequence(depth: number, variant: SequenceVariant = 'one_based'): FibonacciTerm[] {
    if (depth <= 0) return [];

    const terms: FibonacciTerm[] = [];
    const values: bigint[] = [];

    if (variant === 'zero_based') {
      // 0, 1, 1, 2, 3, 5, 8...
      for (let i = 0; i < depth; i++) {
        const val = this.getNthFibonacci(i);
        values.push(val);
      }
    } else {
      // Standart 1, 1, 2, 3, 5, 8, 13...
      for (let i = 1; i <= depth; i++) {
        const val = this.getNthFibonacci(i);
        values.push(val);
      }
    }

    // Terimleri nesnelere dönüştür
    for (let i = 0; i < values.length; i++) {
      const val = values[i];
      const strVal = val.toString();
      let ratioToPrev: number | undefined = undefined;

      if (i > 0 && values[i - 1] > 0n) {
        // Altın orana yakınsama oranı için yaklaşık float hesaplama
        const prev = values[i - 1];
        if (val < BigInt(Number.MAX_SAFE_INTEGER) && prev < BigInt(Number.MAX_SAFE_INTEGER)) {
          ratioToPrev = Number(val) / Number(prev);
        } else {
          // Büyük sayılarda ilk 15 basamağı baz alarak oran hesaplama
          const strA = strVal.slice(0, 15);
          const strB = prev.toString().slice(0, 15);
          ratioToPrev = parseFloat(strA) / parseFloat(strB) * Math.pow(10, strVal.length - prev.toString().length);
        }
      }

      terms.push({
        index: i + 1,
        value: val,
        stringValue: strVal,
        isEven: val % 2n === 0n,
        digitCount: strVal.length,
        ratioToPrev: ratioToPrev ? Number(ratioToPrev.toFixed(8)) : undefined
      });
    }

    return terms;
  }

  /**
   * n. Fibonacci sayısını memoization ile hesaplar.
   */
  public static getNthFibonacci(n: number): bigint {
    if (n < 0) return 0n;
    if (this.cache.has(n)) {
      return this.cache.get(n)!;
    }

    // Önbellekteki en son bilinen noktayı bul
    let lastKnown = 2;
    while (this.cache.has(lastKnown + 1) && lastKnown < n) {
      lastKnown++;
    }

    let a = this.cache.get(lastKnown - 1) ?? 1n;
    let b = this.cache.get(lastKnown) ?? 1n;

    for (let i = lastKnown + 1; i <= n; i++) {
      const next = a + b;
      this.cache.set(i, next);
      a = b;
      b = next;
    }

    return b;
  }
}
