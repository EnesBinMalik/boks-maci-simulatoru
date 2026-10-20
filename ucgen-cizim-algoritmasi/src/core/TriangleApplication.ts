/**
 * @license
 * Telif Hakkı © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * 
 * PRENSİP: SINGLE RESPONSIBILITY PRINCIPLE (SRP) & FACADE PATTERN
 * Bu sınıfın TEK SORUMLULUĞU:
 * Giriş doğrulama, geometri hesaplama, konsol render etme ve tampon yönetim
 * servislerini koordine ederek üçgen çizim sürecini uçtan uca yürütmektir.
 */

import { ConsoleBufferManager } from './ConsoleBufferManager';
import { ConsoleShapeRenderer, RenderOptions } from './ConsoleShapeRenderer';
import { InputValidator } from './InputValidator';
import { TriangleGeometryCalculator } from './TriangleGeometryCalculator';
import { AUTHOR_SIGNATURE, DrawOptions, RowCalculation, ValidationResult } from './types';

export class TriangleApplication {
  public readonly validator: InputValidator;
  public readonly calculator: TriangleGeometryCalculator;
  public readonly renderer: ConsoleShapeRenderer;
  public readonly buffer: ConsoleBufferManager;

  constructor(
    validator = new InputValidator(),
    calculator = new TriangleGeometryCalculator(),
    renderer = new ConsoleShapeRenderer(),
    buffer = new ConsoleBufferManager()
  ) {
    this.validator = validator;
    this.calculator = calculator;
    this.renderer = renderer;
    this.buffer = buffer;
  }

  /**
   * Çizim işlemini yürütür ve konsol tamponuna aktarır.
   */
  public executeDraw(options: DrawOptions): { success: boolean; validation: ValidationResult; rows?: RowCalculation[] } {
    // 1. ADIM: Doğrulama Servisi (InputValidator sorumluluğu)
    const validation = this.validator.validate(options.size);

    this.buffer.addLine(`> Üçgen çizimi istendi: Boyut=${options.size}, Tip=${options.triangleType}, Karakter='${options.char}'`, 'input');

    if (!validation.isValid || validation.parsedValue === undefined) {
      this.buffer.addLine(`[HATA] ${validation.errorMessage}`, 'error');
      return { success: false, validation };
    }

    const validatedSize = validation.parsedValue;

    // 2. ADIM: Geometri Hesaplama Servisi (TriangleGeometryCalculator sorumluluğu)
    const rowCalculations = this.calculator.calculate(validatedSize, options.triangleType, options.char);

    // 3. ADIM: Çıktı Biçimlendirme Servisi (ConsoleShapeRenderer sorumluluğu)
    const renderOptions: RenderOptions = {
      showRowNumbers: options.showRowNumbers ?? false,
    };
    const renderedLines = this.renderer.render(rowCalculations, renderOptions);

    // 4. ADIM: Konsol Çıktı ve Telif Hakkı Tamponuna Yazma
    this.buffer.addLine(`[İŞLEM BAŞARILI] ${validatedSize} birimlik üçgen çizildi. (Telif: ${AUTHOR_SIGNATURE.author})`, 'success');
    this.buffer.addBatch(renderedLines, 'output');
    this.buffer.addLine(`--- ${AUTHOR_SIGNATURE.copyrightNotice} ---`, 'copyright');

    return {
      success: true,
      validation,
      rows: rowCalculations,
    };
  }

  /**
   * Konsol ekranını sıfırlar ve Enes Öztürk telif başlığını yeniler.
   */
  public clearConsole(): void {
    this.buffer.clear();
  }
}
