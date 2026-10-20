/**
 * @license
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 */

import { GeometricShapeConfig } from '../types/geometry';

export const SHAPES_CONFIG: GeometricShapeConfig[] = [
  {
    id: 'circle',
    name: 'Circle',
    turkishName: 'Daire',
    category: '2D',
    description: 'Sabit bir noktaya (merkez) eşit uzaklıktaki tüm noktaların oluşturduğu düzlemsel şekil.',
    parameters: [
      {
        id: 'radius',
        name: 'Yarıçap',
        symbol: 'r',
        description: 'Daire merkezinden çembere olan uzaklık',
        defaultValue: 5,
        min: 0.1,
        max: 100,
        step: 0.5,
        unit: 'cm'
      }
    ],
    availableCalculations: [
      { id: 'area', label: 'Alan (A)', unitType: 'area', formula: 'A = π · r²' },
      { id: 'perimeter', label: 'Çevre (Ç)', unitType: 'length', formula: 'Ç = 2 · π · r' },
      { id: 'both', label: 'Hem Çevre Hem Alan', unitType: 'area', formula: 'Ç = 2πr  &  A = πr²' }
    ],
    iconName: 'Circle'
  },
  {
    id: 'square',
    name: 'Square',
    turkishName: 'Kare',
    category: '2D',
    description: 'Dört kenar uzunluğu birbirine eşit ve tüm iç açıları 90 derece olan düzgün dörtgen.',
    parameters: [
      {
        id: 'side',
        name: 'Kenar Uzunluğu',
        symbol: 'a',
        description: 'Karenin bir kenarının uzunluğu',
        defaultValue: 6,
        min: 0.1,
        max: 100,
        step: 0.5,
        unit: 'cm'
      }
    ],
    availableCalculations: [
      { id: 'area', label: 'Alan (A)', unitType: 'area', formula: 'A = a²' },
      { id: 'perimeter', label: 'Çevre (Ç)', unitType: 'length', formula: 'Ç = 4 · a' },
      { id: 'both', label: 'Hem Çevre Hem Alan', unitType: 'area', formula: 'Ç = 4a  &  A = a²' }
    ],
    iconName: 'Square'
  },
  {
    id: 'rectangle',
    name: 'Rectangle',
    turkishName: 'Dikdörtgen',
    category: '2D',
    description: 'Karşılıklı kenarları eşit ve paralel, iç açıları 90 derece olan dörtgen.',
    parameters: [
      {
        id: 'width',
        name: 'Kısa Kenar (Genişlik)',
        symbol: 'a',
        description: 'Dikdörtgenin birinci kenar uzunluğu',
        defaultValue: 4,
        min: 0.1,
        max: 100,
        step: 0.5,
        unit: 'cm'
      },
      {
        id: 'height',
        name: 'Uzun Kenar (Boy)',
        symbol: 'b',
        description: 'Dikdörtgenin ikinci kenar uzunluğu',
        defaultValue: 8,
        min: 0.1,
        max: 100,
        step: 0.5,
        unit: 'cm'
      }
    ],
    availableCalculations: [
      { id: 'area', label: 'Alan (A)', unitType: 'area', formula: 'A = a · b' },
      { id: 'perimeter', label: 'Çevre (Ç)', unitType: 'length', formula: 'Ç = 2 · (a + b)' },
      { id: 'both', label: 'Hem Çevre Hem Alan', unitType: 'area', formula: 'Ç = 2(a + b)  &  A = a · b' }
    ],
    iconName: 'RectangleHorizontal'
  },
  {
    id: 'triangle',
    name: 'Triangle',
    turkishName: 'Üçgen',
    category: '2D',
    description: 'Düzlemde doğrusal olmayan üç noktayı birleştiren üç doğru parçasının oluşturduğu geometrik şekil (Heron veya Taban×Yükseklik).',
    parameters: [
      {
        id: 'sideA',
        name: '1. Kenar (Taban)',
        symbol: 'a',
        description: 'Üçgenin taban kenar uzunluğu',
        defaultValue: 6,
        min: 0.1,
        max: 100,
        step: 0.5,
        unit: 'cm'
      },
      {
        id: 'sideB',
        name: '2. Kenar',
        symbol: 'b',
        description: 'Üçgenin ikinci kenar uzunluğu',
        defaultValue: 8,
        min: 0.1,
        max: 100,
        step: 0.5,
        unit: 'cm'
      },
      {
        id: 'sideC',
        name: '3. Kenar',
        symbol: 'c',
        description: 'Üçgenin üçüncü kenar uzunluğu',
        defaultValue: 10,
        min: 0.1,
        max: 100,
        step: 0.5,
        unit: 'cm'
      }
    ],
    availableCalculations: [
      { id: 'area', label: 'Alan (Heron Formülü)', unitType: 'area', formula: 'A = √(s · (s-a)(s-b)(s-c))' },
      { id: 'perimeter', label: 'Çevre (Ç)', unitType: 'length', formula: 'Ç = a + b + c' },
      { id: 'both', label: 'Hem Çevre Hem Alan', unitType: 'area', formula: 'Ç = a+b+c  &  A = √(s(s-a)(s-b)(s-c))' }
    ],
    iconName: 'Triangle'
  },
  {
    id: 'cube',
    name: 'Cube',
    turkishName: 'Küp',
    category: '3D',
    description: 'Bütün yüzeyleri birbirine eşit karelerden meydana gelen düzgün altıyüzlü üç boyutlu geometrik cisim.',
    parameters: [
      {
        id: 'edge',
        name: 'Ayrıt Uzunluğu',
        symbol: 'a',
        description: 'Küpün bir kenar (ayrıt) uzunluğu',
        defaultValue: 5,
        min: 0.1,
        max: 100,
        step: 0.5,
        unit: 'cm'
      }
    ],
    availableCalculations: [
      { id: 'volume', label: 'Hacim (V)', unitType: 'volume', formula: 'V = a³' },
      { id: 'totalSurfaceArea', label: 'Toplam Yüzey Alanı (A)', unitType: 'area', formula: 'A = 6 · a²' },
      { id: 'lateralArea', label: 'Yanal Alan (Ay)', unitType: 'area', formula: 'Ay = 4 · a²' },
      { id: 'all', label: 'Tüm Hesaplamalar (Hacim + Alanlar)', unitType: 'volume', formula: 'V = a³  &  A = 6a²' }
    ],
    iconName: 'Box'
  },
  {
    id: 'cylinder',
    name: 'Cylinder',
    turkishName: 'Silindir',
    category: '3D',
    description: 'Tabanı ve tavanı birbirine eş ve paralel iki daireden oluşan, yanal yüzeyi açıldığında dikdörtgen veren 3 boyutlu cisim.',
    parameters: [
      {
        id: 'radius',
        name: 'Taban Yarıçapı',
        symbol: 'r',
        description: 'Silindirin dairesel taban yarıçapı',
        defaultValue: 4,
        min: 0.1,
        max: 100,
        step: 0.5,
        unit: 'cm'
      },
      {
        id: 'height',
        name: 'Yükseklik',
        symbol: 'h',
        description: 'Silindirin tabanları arasındaki dik mesafe',
        defaultValue: 10,
        min: 0.1,
        max: 100,
        step: 0.5,
        unit: 'cm'
      }
    ],
    availableCalculations: [
      { id: 'volume', label: 'Hacim (V)', unitType: 'volume', formula: 'V = π · r² · h' },
      { id: 'lateralArea', label: 'Yanal Alan (Ay)', unitType: 'area', formula: 'Ay = 2 · π · r · h' },
      { id: 'totalSurfaceArea', label: 'Toplam Yüzey Alanı (At)', unitType: 'area', formula: 'At = 2πr² + 2πrh' },
      { id: 'all', label: 'Tüm Hesaplamalar (Hacim & Yüzey Alanı)', unitType: 'volume', formula: 'V, Ay, At hesaplamaları' }
    ],
    iconName: 'Cylinder'
  },
  {
    id: 'sphere',
    name: 'Sphere',
    turkishName: 'Küre',
    category: '3D',
    description: 'Uzayda sabit bir noktaya eşit uzaklıkta bulunan noktaların oluşturduğu kapalı yüzey ve bu yüzeyin sınırladığı cisim.',
    parameters: [
      {
        id: 'radius',
        name: 'Yarıçap',
        symbol: 'r',
        description: 'Kürenin merkezinden yüzeyine olan uzaklık',
        defaultValue: 5,
        min: 0.1,
        max: 100,
        step: 0.5,
        unit: 'cm'
      }
    ],
    availableCalculations: [
      { id: 'volume', label: 'Hacim (V)', unitType: 'volume', formula: 'V = (4/3) · π · r³' },
      { id: 'totalSurfaceArea', label: 'Yüzey Alanı (A)', unitType: 'area', formula: 'A = 4 · π · r²' },
      { id: 'all', label: 'Hem Hacim Hem Yüzey Alanı', unitType: 'volume', formula: 'V = 4/3·π·r³  &  A = 4·π·r²' }
    ],
    iconName: 'Globe'
  },
  {
    id: 'rectangularPrism',
    name: 'Rectangular Prism',
    turkishName: 'Dikdörtgenler Prizması',
    category: '3D',
    description: 'Bütün yüzeyleri dikdörtgen olan ve karşılıklı yüzeyleri birbirine eş ve paralel olan prizma.',
    parameters: [
      {
        id: 'width',
        name: 'En (Genişlik)',
        symbol: 'a',
        description: 'Taban kısa kenarı',
        defaultValue: 4,
        min: 0.1,
        max: 100,
        step: 0.5,
        unit: 'cm'
      },
      {
        id: 'length',
        name: 'Boy (Uzunluk)',
        symbol: 'b',
        description: 'Taban uzun kenarı',
        defaultValue: 6,
        min: 0.1,
        max: 100,
        step: 0.5,
        unit: 'cm'
      },
      {
        id: 'height',
        name: 'Yükseklik',
        symbol: 'h',
        description: 'Prizmanın dik yüksekliği',
        defaultValue: 8,
        min: 0.1,
        max: 100,
        step: 0.5,
        unit: 'cm'
      }
    ],
    availableCalculations: [
      { id: 'volume', label: 'Hacim (V)', unitType: 'volume', formula: 'V = a · b · h' },
      { id: 'totalSurfaceArea', label: 'Toplam Alan (At)', unitType: 'area', formula: 'At = 2·(ab + ah + bh)' },
      { id: 'lateralArea', label: 'Yanal Alan (Ay)', unitType: 'area', formula: 'Ay = 2·(a + b)·h' },
      { id: 'all', label: 'Tüm Hesaplamalar', unitType: 'volume', formula: 'V = a·b·h  &  At = 2(ab+ah+bh)' }
    ],
    iconName: 'Boxes'
  }
];

export const AUTHOR_NAME = 'Enes Öztürk';
export const COPYRIGHT_NOTICE = '© 2026 Enes Öztürk. Tüm Hakları Saklıdır.';
export const APP_TITLE = 'Geometrik Alan & Hacim Hesaplama Motoru';
