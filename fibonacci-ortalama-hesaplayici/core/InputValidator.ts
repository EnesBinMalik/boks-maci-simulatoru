/**
 * @file InputValidator.ts
 * @description Sorumluluk: Kullanıcıdan gelen derinlik verisini doğrulamak ve temizlemek.
 * Single Responsibility: Yalnızca girdi doğrulama kurallarını ve hata mesajlarını yönetir.
 */

export interface ValidationResult {
  isValid: boolean;
  value: number;
  errorMessage?: string;
}

export class InputValidator {
  private static readonly MIN_DEPTH = 1;
  private static readonly MAX_RECOMMENDED_DEPTH = 500;
  private static readonly ABSOLUTE_MAX_DEPTH = 1000;

  /**
   * Derinlik değerini doğrular.
   * @param rawInput Kullanıcı tarafından girilen ham metin veya sayı
   */
  public static validateDepth(rawInput: string | number): ValidationResult {
    if (rawInput === '' || rawInput === null || rawInput === undefined) {
      return {
        isValid: false,
        value: 0,
        errorMessage: 'Lütfen bir derinlik değeri giriniz.'
      };
    }

    const parsedNumber = typeof rawInput === 'number' ? rawInput : Number(rawInput);

    if (isNaN(parsedNumber)) {
      return {
        isValid: false,
        value: 0,
        errorMessage: 'Geçerli bir tamsayı girilmelidir.'
      };
    }

    if (!Number.isInteger(parsedNumber)) {
      return {
        isValid: false,
        value: Math.floor(parsedNumber),
        errorMessage: 'Derinlik değeri ondalıklı olamaz, tamsayı olmalıdır.'
      };
    }

    if (parsedNumber < this.MIN_DEPTH) {
      return {
        isValid: false,
        value: parsedNumber,
        errorMessage: `Derinlik en az ${this.MIN_DEPTH} olmalıdır.`
      };
    }

    if (parsedNumber > this.ABSOLUTE_MAX_DEPTH) {
      return {
        isValid: false,
        value: this.ABSOLUTE_MAX_DEPTH,
        errorMessage: `Maksimum hesaplanabilir derinlik sınırı: ${this.ABSOLUTE_MAX_DEPTH}`
      };
    }

    return {
      isValid: true,
      value: parsedNumber
    };
  }

  public static getRecommendedMax(): number {
    return this.MAX_RECOMMENDED_DEPTH;
  }
}
