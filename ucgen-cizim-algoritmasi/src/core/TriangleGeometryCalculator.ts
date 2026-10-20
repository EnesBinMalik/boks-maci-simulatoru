/**
 * @license
 * Telif Hakkı © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * 
 * PRENSİP: SINGLE RESPONSIBILITY PRINCIPLE (SRP) & DRY (DON'T REPEAT YOURSELF)
 * Bu sınıfın TEK SORUMLULUĞU:
 * Üçgen çizim geometrisini ve matematiksel satır verilerini hesaplamaktır.
 * Konsola yazdırma veya girdi alma işlemlerine karışmaz, sadece saf matematik üretir.
 */

import { RowCalculation, TriangleType } from './types';

export class TriangleGeometryCalculator {
  /**
   * DRY Kuralı: Karakter ve boşluk tekrarlarını tek bir standart metot üzerinden üretir.
   */
  private generateCharSequence(char: string, count: number): string {
    if (count <= 0) return '';
    return char.repeat(count);
  }

  /**
   * Belirtilen üçgen türüne göre tüm satırların matematiksel hesabını çıkarır.
   */
  public calculate(size: number, type: TriangleType, char: string = '*'): RowCalculation[] {
    switch (type) {
      case 'pyramid':
        return this.calculatePyramid(size, char);
      case 'right_left':
        return this.calculateRightLeft(size, char);
      case 'right_right':
        return this.calculateRightRight(size, char);
      case 'hollow_pyramid':
        return this.calculateHollowPyramid(size, char);
      case 'inverted_pyramid':
        return this.calculateInvertedPyramid(size, char);
      default:
        return this.calculatePyramid(size, char);
    }
  }

  /**
   * Standart Eşkenar Piramit Algoritması
   * i: 1'den size'a kadar
   * Boşluk: size - i
   * Karakter adedi: 2 * i - 1
   */
  private calculatePyramid(size: number, char: string): RowCalculation[] {
    const rows: RowCalculation[] = [];

    for (let i = 1; i <= size; i++) {
      const leadingSpaces = size - i;
      const charCount = 2 * i - 1;
      const spacesStr = this.generateCharSequence(' ', leadingSpaces);
      const charsStr = this.generateCharSequence(char, charCount);

      rows.push({
        rowIndex: i,
        leadingSpaces,
        charCount,
        formattedRow: `${spacesStr}${charsStr}`,
        formulaNote: `Satır ${i}: Boşluk = ${size}-${i} (${leadingSpaces}), Karakter = 2*${i}-1 (${charCount})`,
      });
    }

    return rows;
  }

  /**
   * Sola Dayalı Dik Üçgen Algoritması
   * i: 1'den size'a kadar
   * Boşluk: 0
   * Karakter adedi: i
   */
  private calculateRightLeft(size: number, char: string): RowCalculation[] {
    const rows: RowCalculation[] = [];

    for (let i = 1; i <= size; i++) {
      const leadingSpaces = 0;
      const charCount = i;
      const charsStr = this.generateCharSequence(char, charCount);

      rows.push({
        rowIndex: i,
        leadingSpaces,
        charCount,
        formattedRow: charsStr,
        formulaNote: `Satır ${i}: Boşluk = 0, Karakter = ${i}`,
      });
    }

    return rows;
  }

  /**
   * Sağa Dayalı Dik Üçgen Algoritması
   * i: 1'den size'a kadar
   * Boşluk: size - i
   * Karakter adedi: i
   */
  private calculateRightRight(size: number, char: string): RowCalculation[] {
    const rows: RowCalculation[] = [];

    for (let i = 1; i <= size; i++) {
      const leadingSpaces = size - i;
      const charCount = i;
      const spacesStr = this.generateCharSequence(' ', leadingSpaces);
      const charsStr = this.generateCharSequence(char, charCount);

      rows.push({
        rowIndex: i,
        leadingSpaces,
        charCount,
        formattedRow: `${spacesStr}${charsStr}`,
        formulaNote: `Satır ${i}: Boşluk = ${size}-${i} (${leadingSpaces}), Karakter = ${i}`,
      });
    }

    return rows;
  }

  /**
   * İçi Boş Eşkenar Üçgen Algoritması
   * i: 1'den size'a kadar
   * İlk satırda tek tepe noktası, son satırda tam taban, aradaki satırlarda sadece kenarlar.
   */
  private calculateHollowPyramid(size: number, char: string): RowCalculation[] {
    const rows: RowCalculation[] = [];

    for (let i = 1; i <= size; i++) {
      const leadingSpaces = size - i;
      const spacesStr = this.generateCharSequence(' ', leadingSpaces);
      let contentStr = '';
      const totalCharsInRow = 2 * i - 1;

      if (i === 1) {
        contentStr = char;
      } else if (i === size) {
        contentStr = this.generateCharSequence(char, totalCharsInRow);
      } else {
        const innerSpaces = totalCharsInRow - 2;
        contentStr = `${char}${this.generateCharSequence(' ', innerSpaces)}${char}`;
      }

      rows.push({
        rowIndex: i,
        leadingSpaces,
        charCount: totalCharsInRow,
        formattedRow: `${spacesStr}${contentStr}`,
        formulaNote: `Satır ${i}: Kenarlar ve taban dolu, iç kısım boşluk (${i === size ? 'Taban dolgusu' : 'İç boşluk'})`,
      });
    }

    return rows;
  }

  /**
   * Ters Eşkenar Piramit Algoritması
   */
  private calculateInvertedPyramid(size: number, char: string): RowCalculation[] {
    const rows: RowCalculation[] = [];

    for (let i = 1; i <= size; i++) {
      const leadingSpaces = i - 1;
      const charCount = 2 * (size - i) + 1;
      const spacesStr = this.generateCharSequence(' ', leadingSpaces);
      const charsStr = this.generateCharSequence(char, charCount);

      rows.push({
        rowIndex: i,
        leadingSpaces,
        charCount,
        formattedRow: `${spacesStr}${charsStr}`,
        formulaNote: `Satır ${i}: Boşluk = ${i - 1}, Karakter = 2*(${size}-${i})+1 (${charCount})`,
      });
    }

    return rows;
  }
}
