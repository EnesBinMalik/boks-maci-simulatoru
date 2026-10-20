/**
 * @license
 * Telif Hakkı © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * 
 * PRENSİP: SINGLE RESPONSIBILITY PRINCIPLE (SRP)
 * Bu sınıfın TEK SORUMLULUĞU:
 * Kullanıcıdan alınan boyut ve parametre girdilerinin doğruluğunu,
 * sınır kontrollerini ve tip güvenliğini denetlemektir.
 */

import { ValidationResult } from './types';

export class InputValidator {
  private readonly minSize: number;
  private readonly maxSize: number;

  constructor(minSize = 1, maxSize = 35) {
    this.minSize = minSize;
    this.maxSize = maxSize;
  }

  /**
   * Kullanıcıdan alınan girdi değerini doğrular.
   * @param rawInput String veya number formatındaki kullanıcı girdisi
   * @returns Doğrulama sonucu, hata mesajı veya ayrıştırılmış tamsayı
   */
  public validate(rawInput: unknown): ValidationResult {
    // 1. Boşluk veya tanımsızlık kontrolü
    if (rawInput === undefined || rawInput === null || rawInput === '') {
      return {
        isValid: false,
        errorMessage: 'Lütfen geçerli bir üçgen boyutu giriniz.',
      };
    }

    const trimmed = typeof rawInput === 'string' ? rawInput.trim() : String(rawInput);

    // 2. Sayısal kontrol
    const parsed = Number(trimmed);
    if (isNaN(parsed) || !Number.isInteger(parsed)) {
      return {
        isValid: false,
        errorMessage: `Girilen değer ("${trimmed}") geçerli bir tam sayı değildir. Lütfen pozitif bir tam sayı giriniz.`,
      };
    }

    // 3. Pozitiflik ve alt sınır kontrolü
    if (parsed < this.minSize) {
      return {
        isValid: false,
        errorMessage: `Üçgen boyutu en az ${this.minSize} olmalıdır. Girilen: ${parsed}`,
      };
    }

    // 4. Üst sınır kontrolü (konsolun taşmaması ve görsel uyum için)
    if (parsed > this.maxSize) {
      return {
        isValid: false,
        errorMessage: `Konsol görünürlüğü açısından maksimum boyut ${this.maxSize} olarak sınırlandırılmıştır. Girilen: ${parsed}`,
      };
    }

    return {
      isValid: true,
      parsedValue: parsed,
    };
  }

  public getBounds(): { min: number; maxSize: number } {
    return { min: this.minSize, maxSize: this.maxSize };
  }
}
