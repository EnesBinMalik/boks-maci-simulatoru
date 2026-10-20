/**
 * @license
 * Telif Hakkı © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * 
 * PRENSİP: SINGLE RESPONSIBILITY PRINCIPLE (SRP)
 * Bu sınıfın TEK SORUMLULUĞU:
 * Konsol tamponunu (buffer), satır akışını, telif hakkı başlıklarını ve
 * sistem günlük kayıtlarını yönetmektir.
 */

import { AUTHOR_SIGNATURE, ConsoleLine } from './types';

export class ConsoleBufferManager {
  private lines: ConsoleLine[] = [];
  private readonly maxLines: number;

  constructor(maxLines = 500) {
    this.maxLines = maxLines;
    this.initWelcomeBanner();
  }

  private createTimestamp(): string {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  }

  /**
   * Enes Öztürk resmi telif hakkı ve lisans başlangıç başlığı
   */
  public initWelcomeBanner(): void {
    this.lines = [
      {
        id: 'hdr-1',
        text: '╔══════════════════════════════════════════════════════════════════════╗',
        type: 'header',
        timestamp: this.createTimestamp(),
      },
      {
        id: 'hdr-2',
        text: '║       ÜÇGEN ÇİZİM ALGORİTMASI & KONSOL GELİŞTİRME ORTAMI             ║',
        type: 'header',
        timestamp: this.createTimestamp(),
      },
      {
        id: 'hdr-3',
        text: `║  Telif Hakkı © ${AUTHOR_SIGNATURE.year} ${AUTHOR_SIGNATURE.author}. Tüm Hakları Saklıdır.           ║`,
        type: 'copyright',
        timestamp: this.createTimestamp(),
      },
      {
        id: 'hdr-4',
        text: '║  Mimari İlkeler: Single Responsibility (SRP) & DRY Prensipleri       ║',
        type: 'system',
        timestamp: this.createTimestamp(),
      },
      {
        id: 'hdr-5',
        text: `║  İmza Doğrulama Kodu: ${AUTHOR_SIGNATURE.signatureHash}       ║`,
        type: 'system',
        timestamp: this.createTimestamp(),
      },
      {
        id: 'hdr-6',
        text: '╚══════════════════════════════════════════════════════════════════════╝',
        type: 'header',
        timestamp: this.createTimestamp(),
      },
      {
        id: 'sys-ready',
        text: 'Sistem hazır. Üçgen boyutu girerek "Çiz" butonuna basabilir veya terminale komut yazabilirsiniz.',
        type: 'system',
        timestamp: this.createTimestamp(),
      },
    ];
  }

  public addLine(text: string, type: ConsoleLine['type'] = 'output'): void {
    const newLine: ConsoleLine = {
      id: `line-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      text,
      type,
      timestamp: this.createTimestamp(),
    };

    this.lines.push(newLine);
    if (this.lines.length > this.maxLines) {
      this.lines.splice(0, this.lines.length - this.maxLines);
    }
  }

  public addBatch(texts: string[], type: ConsoleLine['type'] = 'output'): void {
    const timestamp = this.createTimestamp();
    const newItems: ConsoleLine[] = texts.map((text, idx) => ({
      id: `line-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
      text,
      type,
      timestamp,
    }));

    this.lines.push(...newItems);
    if (this.lines.length > this.maxLines) {
      this.lines.splice(0, this.lines.length - this.maxLines);
    }
  }

  public clear(): void {
    this.lines = [];
    this.initWelcomeBanner();
  }

  public getLines(): ConsoleLine[] {
    return [...this.lines];
  }

  /**
   * Konsol içeriğini düz metin olarak dışa aktarır (Dosya kaydetme & Kopyalama için)
   */
  public exportAsPlainText(): string {
    return this.lines.map((l) => l.text).join('\n');
  }
}
