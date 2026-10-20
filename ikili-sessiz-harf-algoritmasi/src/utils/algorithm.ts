import { AnalysisResult, ConsonantPair, LetterInfo, OutputMode, WordAnalysis } from '../types/algorithm';

export const TURKISH_VOWELS = new Set(['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü']);

/**
 * Checks if a character is a letter (Unicode-aware, supporting Turkish chars)
 */
export function isLetter(char: string): boolean {
  return /^\p{L}$/u.test(char);
}

/**
 * Checks if a character is a vowel (sesli harf) in Turkish/Latin alphabet
 */
export function isVowel(char: string): boolean {
  if (!isLetter(char)) return false;
  const lower = char.toLocaleLowerCase('tr-TR');
  return TURKISH_VOWELS.has(lower);
}

/**
 * Checks if a character is a consonant (sessiz harf)
 */
export function isConsonant(char: string): boolean {
  if (!isLetter(char)) return false;
  return !isVowel(char);
}

/**
 * Analyzes a single word to check for 2 consecutive consonants
 */
export function analyzeWord(word: string): WordAnalysis {
  const chars = Array.from(word);
  const letters: LetterInfo[] = [];
  const pairs: ConsonantPair[] = [];

  // Strip leading/trailing punctuation for clean word checking
  const cleanWord = word.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, '');
  
  // Find letters and identify pairs
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const letter = isLetter(char);
    const vowel = letter ? isVowel(char) : false;
    const consonant = letter ? !vowel : false;

    letters.push({
      char,
      isLetter: letter,
      isVowel: vowel,
      isConsonant: consonant,
      isPartOfPair: false,
    });
  }

  // Detect consecutive consonants
  for (let i = 0; i < letters.length - 1; i++) {
    if (letters[i].isConsonant && letters[i + 1].isConsonant) {
      letters[i].isPartOfPair = true;
      letters[i + 1].isPartOfPair = true;
      pairs.push({
        startIndex: i,
        chars: `${letters[i].char}${letters[i + 1].char}`,
      });
    }
  }

  const hasTwoConsecutiveConsonants = pairs.length > 0;

  // Build Turkish educational explanation
  let explanation = '';
  if (hasTwoConsecutiveConsonants) {
    const pairDescriptions = pairs.map(
      (p) => `'${p.chars}' (${p.startIndex + 1}. ve ${p.startIndex + 2}. harfler)`
    );
    explanation = `'${cleanWord || word}' kelimesinde ardışık sessiz harf çifti bulundu: ${pairDescriptions.join(', ')}. Sonuç: Doğru (true)`;
  } else {
    explanation = `'${cleanWord || word}' kelimesinde yan yana 2 sessiz harf bulunmamaktadır. Sonuç: Yanlış (false)`;
  }

  return {
    originalWord: word,
    cleanWord,
    hasTwoConsecutiveConsonants,
    pairs,
    letters,
    explanation,
  };
}

/**
 * Maps boolean result to chosen output mode representation
 */
export function formatBooleanToken(value: boolean, mode: OutputMode): string {
  switch (mode) {
    case 'tr-bool':
      return value ? 'Doğru' : 'Yanlış';
    case 'en-bool':
      return value ? 'true' : 'false';
    case 'pascal-bool':
      return value ? 'True' : 'False';
    case 'binary':
      return value ? '1' : '0';
    default:
      return value ? 'Doğru' : 'Yanlış';
  }
}

/**
 * Processes an entire string expression containing multiple words
 */
export function processExpression(
  input: string,
  mode: OutputMode = 'tr-bool',
  includeCopyright: boolean = true
): AnalysisResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      input: '',
      words: [],
      outputTokens: [],
      outputString: '',
      formattedOutput: '',
      totalWords: 0,
      trueCount: 0,
      falseCount: 0,
    };
  }

  // Split by whitespace
  const rawWords = trimmed.split(/\s+/).filter(Boolean);
  const words: WordAnalysis[] = rawWords.map((w) => analyzeWord(w));

  const outputTokens = words.map((w) => formatBooleanToken(w.hasTwoConsecutiveConsonants, mode));
  const rawOutputString = outputTokens.join(' ');

  let formattedOutput = rawOutputString;
  if (includeCopyright) {
    formattedOutput = `${rawOutputString} // © Enes Öztürk - Tüm Hakları Saklıdır`;
  }

  const trueCount = words.filter((w) => w.hasTwoConsecutiveConsonants).length;
  const falseCount = words.length - trueCount;

  return {
    input,
    words,
    outputTokens,
    outputString: rawOutputString,
    formattedOutput,
    totalWords: words.length,
    trueCount,
    falseCount,
  };
}
