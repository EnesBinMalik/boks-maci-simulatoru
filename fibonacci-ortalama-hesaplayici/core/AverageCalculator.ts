/**
 * @file AverageCalculator.ts
 * @description Sorumluluk: Sayı kümesinin istatistiksel ortalamalarını hesaplamak.
 * Single Responsibility: Yalnızca ortalama (Aritmetik, Geometrik, Harmonik vb.) ve toplam hesaplama işlemlerini yürütür.
 */

export interface AverageResult {
  count: number;
  sumBigInt: bigint;
  sumFormatted: string;
  arithmeticMean: number;
  arithmeticMeanExactString: string;
  min: bigint;
  max: bigint;
  median: number;
  geometricMean?: number;
  harmonicMean?: number;
}

export class AverageCalculator {
  /**
   * BigInt listesinin toplamını hesaplar.
   */
  public static calculateSum(numbers: bigint[]): bigint {
    return numbers.reduce((acc, curr) => acc + curr, 0n);
  }

  /**
   * Verilen Fibonacci değerleri için detaylı ortalama analizi yapar.
   * @param numbers Değer dizisi
   */
  public static calculateAverages(numbers: bigint[]): AverageResult {
    const count = numbers.length;
    if (count === 0) {
      return {
        count: 0,
        sumBigInt: 0n,
        sumFormatted: '0',
        arithmeticMean: 0,
        arithmeticMeanExactString: '0',
        min: 0n,
        max: 0n,
        median: 0
      };
    }

    const sum = this.calculateSum(numbers);
    const countBigInt = BigInt(count);

    // Tam bölme ve kalan ile hassas ondalık string oluşturma
    const quotient = sum / countBigInt;
    const remainder = sum % countBigInt;
    
    // Kalanı ondalık basamaklara dönüştür (6 basamak hassasiyet)
    const decimalPlaces = 6;
    const scaledRemainder = (remainder * BigInt(10 ** decimalPlaces)) / countBigInt;
    const paddedDecimals = scaledRemainder.toString().padStart(decimalPlaces, '0');
    const exactFormatted = remainder === 0n 
      ? quotient.toString() 
      : `${quotient.toString()}.${paddedDecimals}`;

    // Sayısal float ortalama (JS number hassasiyeti çerçevesinde)
    let arithmeticFloat: number;
    if (sum < BigInt(Number.MAX_SAFE_INTEGER)) {
      arithmeticFloat = Number(sum) / count;
    } else {
      arithmeticFloat = parseFloat(exactFormatted);
    }

    // Min ve Max
    const min = numbers[0];
    const max = numbers[numbers.length - 1];

    // Medyan
    let median = 0;
    const mid = Math.floor(count / 2);
    if (count % 2 === 0) {
      const valA = numbers[mid - 1];
      const valB = numbers[mid];
      median = Number(valA + valB) / 2;
    } else {
      median = Number(numbers[mid]);
    }

    // Geometrik ve Harmonik Ortalama (Sayılar küçükken overflow olmadan hesaplanabilir)
    let geometricMean: number | undefined = undefined;
    let harmonicMean: number | undefined = undefined;

    if (count <= 50) {
      try {
        // Geometrik Ortalama: exp( (1/n) * sum(ln(x_i)) )
        const logSum = numbers.reduce((acc, val) => {
          if (val <= 0n) return acc;
          return acc + Math.log(Number(val));
        }, 0);
        geometricMean = Math.exp(logSum / count);

        // Harmonik Ortalama: n / sum(1 / x_i)
        const reciprocalSum = numbers.reduce((acc, val) => {
          if (val <= 0n) return acc;
          return acc + (1 / Number(val));
        }, 0);
        if (reciprocalSum > 0) {
          harmonicMean = count / reciprocalSum;
        }
      } catch {
        // Overflow durumlarında pas geçilir
      }
    }

    return {
      count,
      sumBigInt: sum,
      sumFormatted: sum.toLocaleString('tr-TR'),
      arithmeticMean: arithmeticFloat,
      arithmeticMeanExactString: exactFormatted,
      min,
      max,
      median,
      geometricMean,
      harmonicMean
    };
  }
}
