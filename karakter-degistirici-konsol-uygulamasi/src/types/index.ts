export type SwapMode = 'words' | 'fullString';

export interface WordTokenStep {
  id: string;
  original: string;
  firstChar: string;
  middleStr: string;
  lastChar: string;
  result: string;
  length: number;
  isSingleChar: boolean;
  isEmpty: boolean;
}

export interface AlgorithmResult {
  rawInput: string;
  output: string;
  mode: SwapMode;
  executionTimeMs: number;
  wordCount: number;
  charCount: number;
  steps: WordTokenStep[];
  timestamp: string;
}

export interface TerminalLogEntry {
  id: string;
  type: 'input' | 'output' | 'system' | 'signature' | 'error';
  content: string;
  details?: AlgorithmResult;
  timestamp: string;
}

export type SupportedLanguage = 'csharp' | 'python' | 'java' | 'typescript' | 'cpp';
