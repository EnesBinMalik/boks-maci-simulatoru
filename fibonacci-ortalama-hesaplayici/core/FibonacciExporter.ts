/**
 * @file FibonacciExporter.ts
 * @description Sorumluluk: Hesaplama raporunu dışa aktarma (CSV, JSON, Rapor Özeti).
 * Single Responsibility: Sadece veri dönüştürme ve indirme işlemlerinden sorumludur.
 */

import { FibonacciCalculationReport } from './FibonacciFacade';

export class FibonacciExporter {
  public static exportToJSON(report: FibonacciCalculationReport): void {
    const dataToExport = {
      imza: 'Enes Öztürk Özel Tasarım & Mühendislik',
      olusturmaTarihi: new Date().toISOString(),
      derinlik: report.depth,
      diziTipi: report.variant,
      hesaplamaSuresiMs: report.calculationDurationMs,
      ozet: {
        toplam: report.averageResult.sumBigInt.toString(),
        aritmetikOrtalama: report.averageResult.arithmeticMeanExactString,
        min: report.averageResult.min.toString(),
        max: report.averageResult.max.toString(),
        medyan: report.averageResult.median,
        harmonikOrtalama: report.averageResult.harmonicMean ?? 'N/A',
        geometrikOrtalama: report.averageResult.geometricMean ?? 'N/A'
      },
      rakamAnalizi: {
        toplamBasamakSayisi: report.digitAnalysis.totalDigitsCount,
        rakamlarToplami: report.digitAnalysis.digitSum,
        rakamOrtalamasi: report.digitAnalysis.digitAverage,
        enCokTekrarEdenRakam: report.digitAnalysis.mostFrequentDigit,
        enAzTekrarEdenRakam: report.digitAnalysis.leastFrequentDigit
      },
      terimler: report.terms.map(t => ({
        sira: t.index,
        deger: t.stringValue,
        ciftMi: t.isEven,
        basamak: t.digitCount,
        oran: t.ratioToPrev ?? null
      }))
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fibonacci_ortalama_rapor_derinlik_${report.depth}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  public static exportToCSV(report: FibonacciCalculationReport): void {
    const headers = ['Sira_N', 'Fibonacci_Degeri', 'Cift_Mi', 'Basamak_Sayisi', 'Onceki_Terime_Oran'];
    const rows = report.terms.map(t => [
      t.index,
      `"${t.stringValue}"`,
      t.isEven ? 'Evet' : 'Hayır',
      t.digitCount,
      t.ratioToPrev !== undefined ? t.ratioToPrev : ''
    ]);

    const csvContent = [
      `# Enes Ozturk - Fibonacci Ortalama Hesaplama Raporu`,
      `# Derinlik: ${report.depth} | Toplam: ${report.averageResult.sumFormatted} | Aritmetik Ortalama: ${report.averageResult.arithmeticMeanExactString}`,
      headers.join(';'),
      ...rows.map(r => r.join(';'))
    ].join('\r\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fibonacci_serisi_derinlik_${report.depth}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  public static formatSummaryForClipboard(report: FibonacciCalculationReport): string {
    return [
      `📐 FIBONACCI ORTALAMA HESAPLAMA RAPORU`,
      `İmza: Enes Öztürk`,
      `Tarih: ${report.timestamp} | Süre: ${report.calculationDurationMs} ms`,
      `----------------------------------------`,
      `Derinlik (N): ${report.depth}`,
      `Dizi Tipi: ${report.variant === 'one_based' ? '1, 1, 2, 3, 5...' : '0, 1, 1, 2, 3...'}`,
      `Terimlerin Toplamı: ${report.averageResult.sumFormatted}`,
      `Aritmetik Ortalama: ${report.averageResult.arithmeticMeanExactString}`,
      `Rakamların Basamak Ortalaması: ${report.digitAnalysis.digitAverage} (Toplam ${report.digitAnalysis.totalDigitsCount} basamak)`,
      `Altın Oran Durumu: ${report.goldenRatio.stepNotes}`,
      `----------------------------------------`,
      `İlk 5 Terim: ${report.terms.slice(0, 5).map(t => t.stringValue).join(', ')}`,
      `Son Terim (F_${report.depth}): ${report.terms[report.terms.length - 1]?.stringValue}`
    ].join('\n');
  }
}
