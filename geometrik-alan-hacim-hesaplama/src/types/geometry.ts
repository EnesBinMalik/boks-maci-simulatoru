/**
 * @license
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * Geometrik Alan, Çevre ve Hacim Hesaplama Sistemi
 */

export type ShapeCategory = '2D' | '3D';

export type CalculationType2D = 'area' | 'perimeter' | 'both';
export type CalculationType3D = 'volume' | 'totalSurfaceArea' | 'lateralArea' | 'basePerimeter' | 'all';

export type CalculationType = CalculationType2D | CalculationType3D;

export interface ShapeParameter {
  id: string;
  name: string;
  symbol: string;
  description: string;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  unit: string;
}

export interface CalculationStep {
  title: string;
  formula: string;
  substitution: string;
  result: string;
  explanation: string;
}

export interface CalculationResult {
  shapeName: string;
  category: ShapeCategory;
  calculationType: CalculationType;
  calculationTitle: string;
  numericValues: Record<string, number>;
  primaryValue: number;
  primaryUnit: string;
  steps: CalculationStep[];
  formattedSummary: string;
  authorSignature: string;
}

export interface GeometricShapeConfig {
  id: string;
  name: string;
  turkishName: string;
  category: ShapeCategory;
  description: string;
  availableCalculations: {
    id: CalculationType;
    label: string;
    unitType: 'length' | 'area' | 'volume';
    formula: string;
  }[];
  parameters: ShapeParameter[];
  iconName: string;
}
