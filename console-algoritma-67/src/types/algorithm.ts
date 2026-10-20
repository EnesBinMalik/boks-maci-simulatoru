export type NumberStatus = 'less' | 'greater' | 'equal';

export interface NumberStep {
  original: number;
  status: NumberStatus;
  diff: number;
  formula: string;
  contribution: number;
}

export interface AlgorithmResult {
  rawInput: string;
  numbers: number[];
  steps: NumberStep[];
  smallDiffSum: number;
  largeSquareSum: number;
  output: string; // e.g. "33 101"
  timestamp: string;
}

export interface TerminalLine {
  id: string;
  type: 'prompt' | 'output' | 'info' | 'system' | 'error' | 'signature' | 'success';
  text: string;
  data?: any;
}

export interface PresetExample {
  title: string;
  description: string;
  input: string;
  expectedOutput: string;
}
