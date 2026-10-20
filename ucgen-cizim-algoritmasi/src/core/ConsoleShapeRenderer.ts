/**
 * @license
 * Telif Hakkı © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * 
 * PRENSİP: SINGLE RESPONSIBILITY PRINCIPLE (SRP)
 * Bu sınıfın TEK SORUMLULUĞU:
 * Hesaplanmış üçgen satırlarını konsol için biçimlendirmek (satır numaraları,
 * hizalama, sol kenar boşluğu gibi sunum katmanı detaylarını hazırlamak).
 */

import { RowCalculation } from './types';

export interface RenderOptions {
  showRowNumbers?: boolean;
  prefix?: string;
}

export class ConsoleShapeRenderer {
  /**
   * Geometrik satır hesaplarını konsola yazılmaya hazır dizge (string) dizisine dönüştürür.
   * @param rows Geometri hesaplayıcıdan gelen satır verileri
   * @param options Biçimlendirme seçenekleri
   */
  public render(rows: RowCalculation[], options: RenderOptions = {}): string[] {
    const { showRowNumbers = false, prefix = '' } = options;
    const maxDigits = String(rows.length).length;

    return rows.map((row) => {
      let outputLine = prefix;

      if (showRowNumbers) {
        // DRY: Satır numaralarını düzgün hizalamak için tek format fonksiyonu
        const paddedIndex = String(row.rowIndex).padStart(maxDigits, ' ');
        outputLine += `[${paddedIndex}] `;
      }

      outputLine += row.formattedRow;
      return outputLine;
    });
  }

  /**
   * Tekil bir satırın konsol çıktısını hazırlar.
   */
  public renderSingleRow(row: RowCalculation, options: RenderOptions = {}, totalRows = 1): string {
    const { showRowNumbers = false, prefix = '' } = options;
    const maxDigits = String(totalRows).length;
    let outputLine = prefix;

    if (showRowNumbers) {
      const paddedIndex = String(row.rowIndex).padStart(maxDigits, ' ');
      outputLine += `[${paddedIndex}] `;
    }

    outputLine += row.formattedRow;
    return outputLine;
  }
}
