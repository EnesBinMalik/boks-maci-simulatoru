/**
 * @license
 * Telif Hakkı © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * Bu yazılım ve algoritmik mimari Enes Öztürk tarafından geliştirilmiştir.
 * Single Responsibility (SRP) ve DRY prensiplerine uygun mimari tip tanımları.
 */

export type TriangleType =
  | 'pyramid'           // Eşkenar Piramit (Standart)
  | 'right_left'        // Sola Dayalı Dik Üçgen
  | 'right_right'       // Sağa Dayalı Dik Üçgen
  | 'hollow_pyramid'    // İçi Boş Eşkenar Piramit
  | 'inverted_pyramid'; // Ters Eşkenar Piramit

export interface TriangleMetadata {
  id: TriangleType;
  name: string;
  description: string;
  formula: string;
}

export interface DrawOptions {
  size: number;
  char: string;
  triangleType: TriangleType;
  showRowNumbers?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
  parsedValue?: number;
}

export interface RowCalculation {
  rowIndex: number;       // 1'den başlayan satır indeksi
  leadingSpaces: number;  // Baştaki boşluk sayısı
  charCount: number;      // Karakter sayısı
  formattedRow: string;   // Biçimlendirilmiş satır
  formulaNote: string;    // Bu satır için matematiksel açıklama
}

export interface ConsoleLine {
  id: string;
  text: string;
  type: 'system' | 'header' | 'input' | 'output' | 'error' | 'success' | 'copyright';
  timestamp: string;
}

export interface DeveloperSignature {
  author: string;
  title: string;
  year: number;
  copyrightNotice: string;
  license: string;
  signatureHash: string;
}

export const AUTHOR_SIGNATURE: DeveloperSignature = {
  author: 'Enes Öztürk',
  title: 'Yazılım Mühendisi & Algoritma Mimarı',
  year: 2026,
  copyrightNotice: '© 2026 Enes Öztürk. Tüm Hakları Saklıdır (All Rights Reserved).',
  license: 'Telif Hakları Kanunu ve Lisans Sözleşmesi Kapsamındadır.',
  signatureHash: 'EO-ALG-SRP-DRY-2026-TR-8842',
};

export const TRIANGLE_PRESETS: TriangleMetadata[] = [
  {
    id: 'pyramid',
    name: 'Eşkenar Piramit (Standart)',
    description: 'Her satırda (n - i) boşluk ve (2i - 1) adet karakter çizer. Klasik algoritma ödev standardıdır.',
    formula: 'Boşluk = n - i | Karakter = 2i - 1',
  },
  {
    id: 'right_left',
    name: 'Sola Dayalı Dik Üçgen',
    description: 'Her satırda i adet karakter basılır, sol tarafa yaslıdır.',
    formula: 'Boşluk = 0 | Karakter = i',
  },
  {
    id: 'right_right',
    name: 'Sağa Dayalı Dik Üçgen',
    description: 'Her satırda (n - i) boşluk ve i adet karakter basılır.',
    formula: 'Boşluk = n - i | Karakter = i',
  },
  {
    id: 'hollow_pyramid',
    name: 'İçi Boş Eşkenar Üçgen',
    description: 'Yalnızca kenar ve taban sınırları çizilir, iç kısımlar boşlukla doldurulur.',
    formula: 'Kenarlar: 1. ve (2i-1). indeksler | Taban: Tümü',
  },
  {
    id: 'inverted_pyramid',
    name: 'Ters Eşkenar Piramit',
    description: 'Tavandan tabana doğru azalan piramit yapısı.',
    formula: 'Boşluk = i - 1 | Karakter = 2(n - i) + 1',
  },
];
