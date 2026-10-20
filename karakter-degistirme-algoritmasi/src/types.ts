export type ShiftMode = 'word' | 'full';
export type ShiftDirection = 'left' | 'right';

export interface AlgorithmOptions {
  mode: ShiftMode;
  direction: ShiftDirection;
  steps: number;
  preservePunctuation: boolean;
}

export interface TerminalEntry {
  id: string;
  type: 'input' | 'output' | 'system' | 'error' | 'info';
  text: string;
  timestamp?: string;
  transformed?: string;
  details?: string[];
}

export interface TestCase {
  id: string;
  title: string;
  input: string;
  expectedWordLeft: string;
  description: string;
}

export interface CharacterShiftStep {
  stepIndex: number;
  description: string;
  originalChar: string;
  fromIndex: number;
  toIndex: number;
  currentResult: string[];
}
