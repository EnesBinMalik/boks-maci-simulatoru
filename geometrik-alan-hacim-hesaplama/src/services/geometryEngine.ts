/**
 * @license
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * Tek Sorumluluk Prensibi (SRP): Bu servis sadece geometrik matematik formüllerini ve adım adım hesaplama mantığını yürütür.
 */

import { CalculationResult, CalculationStep, CalculationType } from '../types/geometry';
import { SHAPES_CONFIG, AUTHOR_NAME, COPYRIGHT_NOTICE } from '../data/shapesConfig';

export class GeometryEngine {
  /**
   * Üçgen eşitsizliği kontrolü (DRY & Güvenlik)
   */
  public static validateTriangle(a: number, b: number, c: number): { isValid: boolean; error?: string } {
    if (a <= 0 || b <= 0 || c <= 0) {
      return { isValid: false, error: 'Kenar uzunlukları sıfırdan büyük pozitif bir sayı olmalıdır.' };
    }
    if (a + b <= c || a + c <= b || b + c <= a) {
      return {
        isValid: false,
        error: `Girilen kenarlar (${a}, ${b}, ${c}) bir üçgen oluşturamaz! Üçgen eşitsizliği gereği: her kenar diğer iki kenarın toplamından küçük olmalıdır.`
      };
    }
    return { isValid: true };
  }

  /**
   * Ana hesaplama metodu
   */
  public static calculate(
    shapeId: string,
    params: Record<string, number>,
    calcType: CalculationType,
    unit: string = 'cm'
  ): CalculationResult {
    const shape = SHAPES_CONFIG.find((s) => s.id === shapeId);
    if (!shape) {
      throw new Error(`Bilinmeyen geometrik şekil: ${shapeId}`);
    }

    const steps: CalculationStep[] = [];
    const numericValues: Record<string, number> = {};
    let primaryValue = 0;
    let primaryUnit = '';
    let calculationTitle = '';
    let formattedSummary = '';

    const areaUnit = `${unit}²`;
    const volUnit = `${unit}³`;
    const lenUnit = unit;

    // Şekle göre SRP prensibiyle ayrılmış hesaplama
    switch (shapeId) {
      case 'circle': {
        const r = params.radius || 1;
        const pi = Math.PI;

        const perimeter = 2 * pi * r;
        const area = pi * Math.pow(r, 2);

        numericValues['Yarıçap (r)'] = r;
        numericValues['Çevre'] = perimeter;
        numericValues['Alan'] = area;

        if (calcType === 'perimeter') {
          primaryValue = perimeter;
          primaryUnit = lenUnit;
          calculationTitle = 'Daire Çevre Hesaplaması';
          steps.push({
            title: '1. Formülün Belirlenmesi',
            formula: 'Ç = 2 · π · r',
            substitution: `Ç = 2 · ${pi.toFixed(4)} · ${r}`,
            result: `${perimeter.toFixed(4)} ${lenUnit}`,
            explanation: 'Dairenin çevre uzunluğu, çapı ile Pi sayısının çarpımına eşittir.'
          });
          formattedSummary = `Yarıçapı ${r} ${unit} olan dairenin çevre uzunluğu: ${perimeter.toFixed(4)} ${lenUnit}`;
        } else if (calcType === 'area') {
          primaryValue = area;
          primaryUnit = areaUnit;
          calculationTitle = 'Daire Alan Hesaplaması';
          steps.push({
            title: '1. Formülün Belirlenmesi',
            formula: 'A = π · r²',
            substitution: `A = ${pi.toFixed(4)} · (${r})² = ${pi.toFixed(4)} · ${(r * r).toFixed(2)}`,
            result: `${area.toFixed(4)} ${areaUnit}`,
            explanation: 'Dairenin alanı, Pi sayısı ile yarıçapın karesinin çarpılmasıyla bulunur.'
          });
          formattedSummary = `Yarıçapı ${r} ${unit} olan dairenin alanı: ${area.toFixed(4)} ${areaUnit}`;
        } else {
          primaryValue = area;
          primaryUnit = areaUnit;
          calculationTitle = 'Daire Çevre ve Alan Hesaplaması';
          steps.push({
            title: '1. Çevre Hesabı',
            formula: 'Ç = 2 · π · r',
            substitution: `Ç = 2 · ${pi.toFixed(4)} · ${r}`,
            result: `${perimeter.toFixed(4)} ${lenUnit}`,
            explanation: 'Çevre uzunluğu hesaplandı.'
          });
          steps.push({
            title: '2. Alan Hesabı',
            formula: 'A = π · r²',
            substitution: `A = ${pi.toFixed(4)} · ${r}²`,
            result: `${area.toFixed(4)} ${areaUnit}`,
            explanation: 'Alan değeri hesaplandı.'
          });
          formattedSummary = `Yarıçapı ${r} ${unit} olan dairenin Çevresi: ${perimeter.toFixed(4)} ${lenUnit}, Alanı: ${area.toFixed(4)} ${areaUnit}`;
        }
        break;
      }

      case 'square': {
        const a = params.side || 1;
        const perimeter = 4 * a;
        const area = a * a;

        numericValues['Kenar (a)'] = a;
        numericValues['Çevre'] = perimeter;
        numericValues['Alan'] = area;

        if (calcType === 'perimeter') {
          primaryValue = perimeter;
          primaryUnit = lenUnit;
          calculationTitle = 'Kare Çevre Hesaplaması';
          steps.push({
            title: '1. Formülün Belirlenmesi',
            formula: 'Ç = 4 · a',
            substitution: `Ç = 4 · ${a}`,
            result: `${perimeter.toFixed(2)} ${lenUnit}`,
            explanation: 'Karenin 4 kenarı birbirine eşit olduğundan, bir kenar 4 ile çarpılır.'
          });
          formattedSummary = `Bir kenarı ${a} ${unit} olan karenin çevresi: ${perimeter.toFixed(2)} ${lenUnit}`;
        } else if (calcType === 'area') {
          primaryValue = area;
          primaryUnit = areaUnit;
          calculationTitle = 'Kare Alan Hesaplaması';
          steps.push({
            title: '1. Formülün Belirlenmesi',
            formula: 'A = a²',
            substitution: `A = ${a} · ${a}`,
            result: `${area.toFixed(2)} ${areaUnit}`,
            explanation: 'Karenin alanı, bir kenarının kendisiyle çarpılmasıyla (karesi) elde edilir.'
          });
          formattedSummary = `Bir kenarı ${a} ${unit} olan karenin alanı: ${area.toFixed(2)} ${areaUnit}`;
        } else {
          primaryValue = area;
          primaryUnit = areaUnit;
          calculationTitle = 'Kare Çevre ve Alan Hesaplaması';
          steps.push({
            title: '1. Çevre Hesabı',
            formula: 'Ç = 4 · a',
            substitution: `Ç = 4 · ${a}`,
            result: `${perimeter.toFixed(2)} ${lenUnit}`,
            explanation: 'Çevre uzunluğu hesaplandı.'
          });
          steps.push({
            title: '2. Alan Hesabı',
            formula: 'A = a²',
            substitution: `A = ${a}²`,
            result: `${area.toFixed(2)} ${areaUnit}`,
            explanation: 'Alan hesaplandı.'
          });
          formattedSummary = `Bir kenarı ${a} ${unit} olan karenin Çevresi: ${perimeter.toFixed(2)} ${lenUnit}, Alanı: ${area.toFixed(2)} ${areaUnit}`;
        }
        break;
      }

      case 'rectangle': {
        const a = params.width || 1;
        const b = params.height || 1;
        const perimeter = 2 * (a + b);
        const area = a * b;

        numericValues['Kısa Kenar (a)'] = a;
        numericValues['Uzun Kenar (b)'] = b;
        numericValues['Çevre'] = perimeter;
        numericValues['Alan'] = area;

        if (calcType === 'perimeter') {
          primaryValue = perimeter;
          primaryUnit = lenUnit;
          calculationTitle = 'Dikdörtgen Çevre Hesaplaması';
          steps.push({
            title: '1. Formülün Belirlenmesi',
            formula: 'Ç = 2 · (a + b)',
            substitution: `Ç = 2 · (${a} + ${b}) = 2 · ${(a + b).toFixed(2)}`,
            result: `${perimeter.toFixed(2)} ${lenUnit}`,
            explanation: 'Dikdörtgenin çevresi iki kenarın toplamının 2 katıdır.'
          });
          formattedSummary = `Kenarları ${a} ve ${b} ${unit} olan dikdörtgenin çevresi: ${perimeter.toFixed(2)} ${lenUnit}`;
        } else if (calcType === 'area') {
          primaryValue = area;
          primaryUnit = areaUnit;
          calculationTitle = 'Dikdörtgen Alan Hesaplaması';
          steps.push({
            title: '1. Formülün Belirlenmesi',
            formula: 'A = a · b',
            substitution: `A = ${a} · ${b}`,
            result: `${area.toFixed(2)} ${areaUnit}`,
            explanation: 'Dikdörtgenin alanı iki dik kenarının birbiriyle çarpımıdır.'
          });
          formattedSummary = `Kenarları ${a} ve ${b} ${unit} olan dikdörtgenin alanı: ${area.toFixed(2)} ${areaUnit}`;
        } else {
          primaryValue = area;
          primaryUnit = areaUnit;
          calculationTitle = 'Dikdörtgen Çevre ve Alan Hesaplaması';
          steps.push({
            title: '1. Çevre Hesabı',
            formula: 'Ç = 2 · (a + b)',
            substitution: `Ç = 2 · (${a} + ${b})`,
            result: `${perimeter.toFixed(2)} ${lenUnit}`,
            explanation: 'Çevre hesaplandı.'
          });
          steps.push({
            title: '2. Alan Hesabı',
            formula: 'A = a · b',
            substitution: `A = ${a} · ${b}`,
            result: `${area.toFixed(2)} ${areaUnit}`,
            explanation: 'Alan hesaplandı.'
          });
          formattedSummary = `Kenarları ${a} ve ${b} ${unit} olan dikdörtgenin Çevresi: ${perimeter.toFixed(2)} ${lenUnit}, Alanı: ${area.toFixed(2)} ${areaUnit}`;
        }
        break;
      }

      case 'triangle': {
        const a = params.sideA || 3;
        const b = params.sideB || 4;
        const c = params.sideC || 5;

        const validation = this.validateTriangle(a, b, c);
        if (!validation.isValid) {
          throw new Error(validation.error);
        }

        const perimeter = a + b + c;
        const s = perimeter / 2; // Yarı çevre
        const areaSq = s * (s - a) * (s - b) * (s - c);
        const area = Math.sqrt(Math.max(0, areaSq));

        numericValues['1. Kenar (a)'] = a;
        numericValues['2. Kenar (b)'] = b;
        numericValues['3. Kenar (c)'] = c;
        numericValues['Yarı Çevre (s)'] = s;
        numericValues['Çevre'] = perimeter;
        numericValues['Alan (Heron)'] = area;

        if (calcType === 'perimeter') {
          primaryValue = perimeter;
          primaryUnit = lenUnit;
          calculationTitle = 'Üçgen Çevre Hesaplaması';
          steps.push({
            title: '1. Kenarların Toplanması',
            formula: 'Ç = a + b + c',
            substitution: `Ç = ${a} + ${b} + ${c}`,
            result: `${perimeter.toFixed(2)} ${lenUnit}`,
            explanation: 'Üçgenin çevresi 3 kenar uzunluğunun toplamıdır.'
          });
          formattedSummary = `Kenarları ${a}, ${b}, ${c} ${unit} olan üçgenin çevresi: ${perimeter.toFixed(2)} ${lenUnit}`;
        } else if (calcType === 'area') {
          primaryValue = area;
          primaryUnit = areaUnit;
          calculationTitle = 'Üçgen Alan Hesaplaması (Heron Formülü)';
          steps.push({
            title: '1. Yarı Çevre (s) Değerinin Bulunması',
            formula: 's = (a + b + c) / 2',
            substitution: `s = (${a} + ${b} + ${c}) / 2 = ${perimeter.toFixed(2)} / 2`,
            result: `${s.toFixed(2)} ${lenUnit}`,
            explanation: 'Heron formülü için öncelikle yarı çevre hesaplanır.'
          });
          steps.push({
            title: '2. Heron Formülü ile Alan Hesabı',
            formula: 'A = √(s · (s - a) · (s - b) · (s - c))',
            substitution: `A = √(${s.toFixed(2)} · (${(s - a).toFixed(2)}) · (${(s - b).toFixed(2)}) · (${(s - c).toFixed(2)})) = √(${areaSq.toFixed(2)})`,
            result: `${area.toFixed(4)} ${areaUnit}`,
            explanation: 'Kenar farklarının çarpımının karekökü alanı verir.'
          });
          formattedSummary = `Kenarları ${a}, ${b}, ${c} ${unit} olan üçgenin alanı: ${area.toFixed(4)} ${areaUnit}`;
        } else {
          primaryValue = area;
          primaryUnit = areaUnit;
          calculationTitle = 'Üçgen Çevre ve Alan Hesaplaması';
          steps.push({
            title: '1. Çevre Hesabı',
            formula: 'Ç = a + b + c',
            substitution: `Ç = ${a} + ${b} + ${c}`,
            result: `${perimeter.toFixed(2)} ${lenUnit}`,
            explanation: 'Çevre hesaplandı.'
          });
          steps.push({
            title: '2. Heron Alan Hesabı',
            formula: 'A = √(s · (s - a) · (s - b) · (s - c))',
            substitution: `s = ${s.toFixed(2)} ⇒ A = √(${areaSq.toFixed(2)})`,
            result: `${area.toFixed(4)} ${areaUnit}`,
            explanation: 'Alan hesaplandı.'
          });
          formattedSummary = `Kenarları ${a}, ${b}, ${c} ${unit} olan üçgenin Çevresi: ${perimeter.toFixed(2)} ${lenUnit}, Alanı: ${area.toFixed(4)} ${areaUnit}`;
        }
        break;
      }

      case 'cube': {
        const a = params.edge || 1;
        const volume = Math.pow(a, 3);
        const lateralArea = 4 * Math.pow(a, 2);
        const totalArea = 6 * Math.pow(a, 2);

        numericValues['Ayrıt (a)'] = a;
        numericValues['Hacim'] = volume;
        numericValues['Yanal Alan'] = lateralArea;
        numericValues['Toplam Alan'] = totalArea;

        if (calcType === 'volume') {
          primaryValue = volume;
          primaryUnit = volUnit;
          calculationTitle = 'Küp Hacim Hesaplaması';
          steps.push({
            title: '1. Formülün Belirlenmesi',
            formula: 'V = a³',
            substitution: `V = ${a}³ = ${a} · ${a} · ${a}`,
            result: `${volume.toFixed(2)} ${volUnit}`,
            explanation: 'Küpün hacmi bir ayrıtının küpüne eşittir.'
          });
          formattedSummary = `Bir ayrıtı ${a} ${unit} olan küpün hacmi: ${volume.toFixed(2)} ${volUnit}`;
        } else if (calcType === 'totalSurfaceArea') {
          primaryValue = totalArea;
          primaryUnit = areaUnit;
          calculationTitle = 'Küp Toplam Yüzey Alanı';
          steps.push({
            title: '1. 6 Eşit Yüzey Alanının Toplanması',
            formula: 'A = 6 · a²',
            substitution: `A = 6 · (${a})² = 6 · ${(a * a).toFixed(2)}`,
            result: `${totalArea.toFixed(2)} ${areaUnit}`,
            explanation: 'Küp 6 adet eş kareden oluştuğu için 6·a² formülü kullanılır.'
          });
          formattedSummary = `Bir ayrıtı ${a} ${unit} olan küpün toplam yüzey alanı: ${totalArea.toFixed(2)} ${areaUnit}`;
        } else if (calcType === 'lateralArea') {
          primaryValue = lateralArea;
          primaryUnit = areaUnit;
          calculationTitle = 'Küp Yanal Alan Hesaplaması';
          steps.push({
            title: '1. 4 Yan Yüzey Alanının Toplanması',
            formula: 'Ay = 4 · a²',
            substitution: `Ay = 4 · (${a})² = 4 · ${(a * a).toFixed(2)}`,
            result: `${lateralArea.toFixed(2)} ${areaUnit}`,
            explanation: 'Küpün 4 dikey yan yüzeyi bulunur.'
          });
          formattedSummary = `Bir ayrıtı ${a} ${unit} olan küpün yanal alanı: ${lateralArea.toFixed(2)} ${areaUnit}`;
        } else {
          primaryValue = volume;
          primaryUnit = volUnit;
          calculationTitle = 'Küp Detaylı Hacim ve Alan Raporu';
          steps.push({
            title: '1. Hacim Hesabı',
            formula: 'V = a³',
            substitution: `V = ${a}³`,
            result: `${volume.toFixed(2)} ${volUnit}`,
            explanation: 'Küpün uzayda kapladığı hacim.'
          });
          steps.push({
            title: '2. Yanal Alan Hesabı',
            formula: 'Ay = 4 · a²',
            substitution: `Ay = 4 · ${a}²`,
            result: `${lateralArea.toFixed(2)} ${areaUnit}`,
            explanation: '4 yan yüzeyin toplam alanı.'
          });
          steps.push({
            title: '3. Toplam Yüzey Alanı Hesabı',
            formula: 'At = 6 · a²',
            substitution: `At = 6 · ${a}²`,
            result: `${totalArea.toFixed(2)} ${areaUnit}`,
            explanation: 'Tüm yüzeylerin (6 yüzey) toplam alanı.'
          });
          formattedSummary = `Ayrıtı ${a} ${unit} olan küpün Hacmi: ${volume.toFixed(2)} ${volUnit}, Toplam Yüzey Alanı: ${totalArea.toFixed(2)} ${areaUnit}`;
        }
        break;
      }

      case 'cylinder': {
        const r = params.radius || 1;
        const h = params.height || 1;
        const pi = Math.PI;

        const volume = pi * Math.pow(r, 2) * h;
        const lateralArea = 2 * pi * r * h;
        const baseArea = pi * Math.pow(r, 2);
        const totalArea = lateralArea + 2 * baseArea;

        numericValues['Yarıçap (r)'] = r;
        numericValues['Yükseklik (h)'] = h;
        numericValues['Hacim'] = volume;
        numericValues['Yanal Alan'] = lateralArea;
        numericValues['Toplam Alan'] = totalArea;

        if (calcType === 'volume') {
          primaryValue = volume;
          primaryUnit = volUnit;
          calculationTitle = 'Silindir Hacim Hesaplaması';
          steps.push({
            title: '1. Formülün Belirlenmesi',
            formula: 'V = π · r² · h',
            substitution: `V = ${pi.toFixed(4)} · (${r})² · ${h} = ${pi.toFixed(4)} · ${(r * r).toFixed(2)} · ${h}`,
            result: `${volume.toFixed(4)} ${volUnit}`,
            explanation: 'Silindir hacmi, dairesel taban alanı ile yüksekliğin çarpımıdır.'
          });
          formattedSummary = `Yarıçapı ${r} ve yüksekliği ${h} ${unit} olan silindirin hacmi: ${volume.toFixed(4)} ${volUnit}`;
        } else if (calcType === 'lateralArea') {
          primaryValue = lateralArea;
          primaryUnit = areaUnit;
          calculationTitle = 'Silindir Yanal Alan Hesaplaması';
          steps.push({
            title: '1. Formülün Belirlenmesi',
            formula: 'Ay = 2 · π · r · h',
            substitution: `Ay = 2 · ${pi.toFixed(4)} · ${r} · ${h}`,
            result: `${lateralArea.toFixed(4)} ${areaUnit}`,
            explanation: 'Silindirin yanal yüzeyi açıldığında genişliği taban çevresi (2πr) ve yüksekliği (h) olan bir dikdörtgen oluşur.'
          });
          formattedSummary = `Silindirin yanal alanı: ${lateralArea.toFixed(4)} ${areaUnit}`;
        } else if (calcType === 'totalSurfaceArea') {
          primaryValue = totalArea;
          primaryUnit = areaUnit;
          calculationTitle = 'Silindir Toplam Yüzey Alanı';
          steps.push({
            title: '1. Formülün Belirlenmesi',
            formula: 'At = 2 · π · r · h + 2 · (π · r²)',
            substitution: `At = ${lateralArea.toFixed(2)} + 2 · (${baseArea.toFixed(2)})`,
            result: `${totalArea.toFixed(4)} ${areaUnit}`,
            explanation: 'Toplam alan, yanal alan ile alt ve üst olmak üzere 2 adet taban alanının toplamıdır.'
          });
          formattedSummary = `Silindirin toplam yüzey alanı: ${totalArea.toFixed(4)} ${areaUnit}`;
        } else {
          primaryValue = volume;
          primaryUnit = volUnit;
          calculationTitle = 'Silindir Detaylı Analiz Raporu';
          steps.push({
            title: '1. Hacim Hesabı',
            formula: 'V = π · r² · h',
            substitution: `V = ${pi.toFixed(4)} · ${r}² · ${h}`,
            result: `${volume.toFixed(4)} ${volUnit}`,
            explanation: 'Hacim hesaplandı.'
          });
          steps.push({
            title: '2. Yanal Alan',
            formula: 'Ay = 2 · π · r · h',
            substitution: `Ay = 2 · ${pi.toFixed(4)} · ${r} · ${h}`,
            result: `${lateralArea.toFixed(4)} ${areaUnit}`,
            explanation: 'Yanal alan hesaplandı.'
          });
          steps.push({
            title: '3. Toplam Yüzey Alanı',
            formula: 'At = 2πrh + 2πr²',
            substitution: `At = ${lateralArea.toFixed(2)} + ${(2 * baseArea).toFixed(2)}`,
            result: `${totalArea.toFixed(4)} ${areaUnit}`,
            explanation: 'Tüm yüzey alanı hesaplandı.'
          });
          formattedSummary = `Silindirin Hacmi: ${volume.toFixed(4)} ${volUnit}, Toplam Yüzey Alanı: ${totalArea.toFixed(4)} ${areaUnit}`;
        }
        break;
      }

      case 'sphere': {
        const r = params.radius || 1;
        const pi = Math.PI;

        const volume = (4 / 3) * pi * Math.pow(r, 3);
        const area = 4 * pi * Math.pow(r, 2);

        numericValues['Yarıçap (r)'] = r;
        numericValues['Hacim'] = volume;
        numericValues['Yüzey Alanı'] = area;

        if (calcType === 'volume') {
          primaryValue = volume;
          primaryUnit = volUnit;
          calculationTitle = 'Küre Hacim Hesaplaması';
          steps.push({
            title: '1. Formülün Belirlenmesi',
            formula: 'V = (4/3) · π · r³',
            substitution: `V = (4/3) · ${pi.toFixed(4)} · (${r})³ = (4/3) · ${pi.toFixed(4)} · ${Math.pow(r, 3).toFixed(2)}`,
            result: `${volume.toFixed(4)} ${volUnit}`,
            explanation: 'Kürenin hacmi, yarıçapının küpü ile (4/3)π sayısının çarpımıdır.'
          });
          formattedSummary = `Yarıçapı ${r} ${unit} olan kürenin hacmi: ${volume.toFixed(4)} ${volUnit}`;
        } else if (calcType === 'totalSurfaceArea') {
          primaryValue = area;
          primaryUnit = areaUnit;
          calculationTitle = 'Küre Yüzey Alanı Hesaplaması';
          steps.push({
            title: '1. Formülün Belirlenmesi',
            formula: 'A = 4 · π · r²',
            substitution: `A = 4 · ${pi.toFixed(4)} · (${r})² = 4 · ${pi.toFixed(4)} · ${(r * r).toFixed(2)}`,
            result: `${area.toFixed(4)} ${areaUnit}`,
            explanation: 'Kürenin yüzey alanı, aynı yarıçaplı 4 büyük dairenin alanına eşittir.'
          });
          formattedSummary = `Yarıçapı ${r} ${unit} olan kürenin yüzey alanı: ${area.toFixed(4)} ${areaUnit}`;
        } else {
          primaryValue = volume;
          primaryUnit = volUnit;
          calculationTitle = 'Küre Hacim ve Yüzey Alanı Raporu';
          steps.push({
            title: '1. Hacim Hesabı',
            formula: 'V = (4/3) · π · r³',
            substitution: `V = (4/3) · ${pi.toFixed(4)} · ${r}³`,
            result: `${volume.toFixed(4)} ${volUnit}`,
            explanation: 'Hacim hesaplandı.'
          });
          steps.push({
            title: '2. Yüzey Alanı Hesabı',
            formula: 'A = 4 · π · r²',
            substitution: `A = 4 · ${pi.toFixed(4)} · ${r}²`,
            result: `${area.toFixed(4)} ${areaUnit}`,
            explanation: 'Yüzey alanı hesaplandı.'
          });
          formattedSummary = `Kürenin Hacmi: ${volume.toFixed(4)} ${volUnit}, Yüzey Alanı: ${area.toFixed(4)} ${areaUnit}`;
        }
        break;
      }

      case 'rectangularPrism': {
        const a = params.width || 1;
        const b = params.length || 1;
        const h = params.height || 1;

        const volume = a * b * h;
        const lateralArea = 2 * (a + b) * h;
        const totalArea = 2 * (a * b + a * h + b * h);

        numericValues['En (a)'] = a;
        numericValues['Boy (b)'] = b;
        numericValues['Yükseklik (h)'] = h;
        numericValues['Hacim'] = volume;
        numericValues['Yanal Alan'] = lateralArea;
        numericValues['Toplam Alan'] = totalArea;

        if (calcType === 'volume') {
          primaryValue = volume;
          primaryUnit = volUnit;
          calculationTitle = 'Dikdörtgenler Prizması Hacim Hesaplaması';
          steps.push({
            title: '1. Formülün Belirlenmesi',
            formula: 'V = a · b · h',
            substitution: `V = ${a} · ${b} · ${h}`,
            result: `${volume.toFixed(2)} ${volUnit}`,
            explanation: 'Prizmanın hacmi üç dik ayrıtının birbiriyle çarpımıdır.'
          });
          formattedSummary = `Boyutları ${a} x ${b} x ${h} ${unit} olan prizmanın hacmi: ${volume.toFixed(2)} ${volUnit}`;
        } else if (calcType === 'totalSurfaceArea') {
          primaryValue = totalArea;
          primaryUnit = areaUnit;
          calculationTitle = 'Dikdörtgenler Prizması Toplam Alanı';
          steps.push({
            title: '1. Formülün Belirlenmesi',
            formula: 'At = 2 · (a·b + a·h + b·h)',
            substitution: `At = 2 · (${a}·${b} + ${a}·${h} + ${b}·${h}) = 2 · (${(a * b).toFixed(2)} + ${(a * h).toFixed(2)} + ${(b * h).toFixed(2)})`,
            result: `${totalArea.toFixed(2)} ${areaUnit}`,
            explanation: '6 yüzeyden karşılıklı olanlar birbirine eşittir (2 taban + 4 yan yüz).'
          });
          formattedSummary = `Prizmanın toplam yüzey alanı: ${totalArea.toFixed(2)} ${areaUnit}`;
        } else {
          primaryValue = volume;
          primaryUnit = volUnit;
          calculationTitle = 'Dikdörtgenler Prizması Hacim ve Yüzey Analizi';
          steps.push({
            title: '1. Hacim Hesabı',
            formula: 'V = a · b · h',
            substitution: `V = ${a} · ${b} · ${h}`,
            result: `${volume.toFixed(2)} ${volUnit}`,
            explanation: 'Hacim hesaplandı.'
          });
          steps.push({
            title: '2. Toplam Yüzey Alanı Hesabı',
            formula: 'At = 2 · (ab + ah + bh)',
            substitution: `At = 2 · (${a * b} + ${a * h} + ${b * h})`,
            result: `${totalArea.toFixed(2)} ${areaUnit}`,
            explanation: 'Toplam yüzey alanı hesaplandı.'
          });
          formattedSummary = `Prizmanın Hacmi: ${volume.toFixed(2)} ${volUnit}, Toplam Yüzey Alanı: ${totalArea.toFixed(2)} ${areaUnit}`;
        }
        break;
      }

      default:
        throw new Error(`Desteklenmeyen şekil: ${shapeId}`);
    }

    return {
      shapeName: shape.turkishName,
      category: shape.category,
      calculationType: calcType,
      calculationTitle,
      numericValues,
      primaryValue,
      primaryUnit,
      steps,
      formattedSummary,
      authorSignature: `${AUTHOR_NAME} - ${COPYRIGHT_NOTICE}`
    };
  }
}
