/**
 * @license
 * Enes Öztürk İmzalı Algoritma Motoru
 * SPDX-License-Identifier: MIT & Proprietary
 * Copyright (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 */

export type MathMode = 'sample_match_81' | 'strict_sum_square_36';

export interface PairItem {
  id: number;
  first: number;
  second: number;
  isEqual: boolean;
  result: number;
  formulaDescription: string;
  calculationBreakdown: string;
}

export interface AlgorithmResult {
  rawInput: string;
  numbers: number[];
  pairs: PairItem[];
  outputString: string;
  outputList: number[];
  executionTimeMs: number;
  mode: MathMode;
  isValid: boolean;
  errorMessage?: string;
  warningMessage?: string;
}

export type SupportedLanguage = 'csharp' | 'python' | 'typescript' | 'cpp' | 'java';

export interface CodeTemplate {
  lang: SupportedLanguage;
  name: string;
  extension: string;
  icon: string;
  code: string;
  description: string;
  runCommand: string;
}

export type TerminalTheme = 'dark_modern' | 'retro_crt' | 'dracula' | 'matrix_green' | 'nord';
