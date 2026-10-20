export type OutputMode = 'tr-bool' | 'en-bool' | 'pascal-bool' | 'binary';

export interface LetterInfo {
  char: string;
  isLetter: boolean;
  isVowel: boolean;
  isConsonant: boolean;
  isPartOfPair: boolean;
  pairIndex?: number;
}

export interface ConsonantPair {
  startIndex: number;
  chars: string;
}

export interface WordAnalysis {
  originalWord: string;
  cleanWord: string;
  hasTwoConsecutiveConsonants: boolean;
  pairs: ConsonantPair[];
  letters: LetterInfo[];
  explanation: string;
}

export interface AnalysisResult {
  input: string;
  words: WordAnalysis[];
  outputTokens: string[];
  outputString: string;
  formattedOutput: string;
  totalWords: number;
  trueCount: number;
  falseCount: number;
}

export interface TerminalLogEntry {
  id: string;
  type: 'input' | 'output' | 'system' | 'error' | 'copyright';
  content: string;
  timestamp: string;
  analysis?: AnalysisResult;
}
