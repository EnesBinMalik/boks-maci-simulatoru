import { AlgorithmOptions, CharacterShiftStep, TestCase } from '../types';

/**
 * Shifts characters in a single word.
 * Standard left shift (1 previous character): word.slice(1) + word[0]
 * E.g., "Merhaba" -> "erhabaM"
 *       "Hello" -> "elloH"
 *       "Question" -> "uestionQ"
 */
export function shiftSingleWord(
  word: string,
  direction: 'left' | 'right' = 'left',
  steps: number = 1,
  preservePunctuation: boolean = false
): string {
  if (!word || word.length <= 1) return word;

  if (preservePunctuation) {
    // Separate leading/trailing punctuation if requested
    const match = word.match(/^([^\p{L}\p{N}]*)([\p{L}\p{N}]+)([^\p{L}\p{N}]*)$/u);
    if (match) {
      const [, leading, core, trailing] = match;
      if (core.length <= 1) return word;
      const shiftedCore = shiftRawString(core, direction, steps);
      return leading + shiftedCore + trailing;
    }
  }

  return shiftRawString(word, direction, steps);
}

/**
 * Core cyclic shift logic for a character string
 */
export function shiftRawString(
  text: string,
  direction: 'left' | 'right' = 'left',
  steps: number = 1
): string {
  const len = text.length;
  if (len <= 1) return text;

  const k = ((steps % len) + len) % len;
  if (k === 0) return text;

  if (direction === 'left') {
    // Left shift: each character moves to previous index, first char moves to end
    // E.g., k=1: text.slice(1) + text[0]
    return text.slice(k) + text.slice(0, k);
  } else {
    // Right shift: each character moves to next index, last char moves to start
    // E.g., k=1: text[len-1] + text.slice(0, len-1)
    return text.slice(len - k) + text.slice(0, len - k);
  }
}

/**
 * Transforms an entire sentence according to AlgorithmOptions.
 */
export function transformString(input: string, options: AlgorithmOptions): string {
  if (!input) return '';

  if (options.mode === 'full') {
    return shiftRawString(input, options.direction, options.steps);
  }

  // Word mode: preserves spacing while shifting each word
  // Splits by whitespace or whitespace tokens
  const tokens = input.split(/(\s+)/);
  return tokens
    .map((token) => {
      if (/^\s+$/.test(token) || token.length === 0) {
        return token;
      }
      return shiftSingleWord(
        token,
        options.direction,
        options.steps,
        options.preservePunctuation
      );
    })
    .join('');
}

/**
 * Generates an array of step-by-step movement actions for visualization.
 */
export function generateStepTrace(
  word: string,
  direction: 'left' | 'right' = 'left'
): CharacterShiftStep[] {
  if (!word) return [];
  const chars = word.split('');
  const len = chars.length;
  const steps: CharacterShiftStep[] = [];

  if (len <= 1) {
    steps.push({
      stepIndex: 0,
      description: `Tek karakter ('${word}'), pozisyon değişmedi.`,
      originalChar: word,
      fromIndex: 0,
      toIndex: 0,
      currentResult: [...chars],
    });
    return steps;
  }

  if (direction === 'left') {
    // Initial state
    const result: string[] = new Array(len).fill('');

    // Step 1 to len-1: characters from index 1..len-1 shift left to index 0..len-2
    for (let i = 1; i < len; i++) {
      const targetIdx = i - 1;
      result[targetIdx] = chars[i];
      steps.push({
        stepIndex: i - 1,
        description: `Karakter '${chars[i]}' (indeks ${i}) bir önceki konuma (indeks ${targetIdx}) taşındı.`,
        originalChar: chars[i],
        fromIndex: i,
        toIndex: targetIdx,
        currentResult: [...result],
      });
    }

    // Final step: first character wraps to end
    result[len - 1] = chars[0];
    steps.push({
      stepIndex: len - 1,
      description: `İlk karakter '${chars[0]}' (indeks 0) döngüsel olarak son konuma (indeks ${len - 1}) taşındı.`,
      originalChar: chars[0],
      fromIndex: 0,
      toIndex: len - 1,
      currentResult: [...result],
    });
  } else {
    // Right shift steps
    const result: string[] = new Array(len).fill('');
    // Last char to index 0
    result[0] = chars[len - 1];
    steps.push({
      stepIndex: 0,
      description: `Son karakter '${chars[len - 1]}' (indeks ${len - 1}) döngüsel olarak ilk konuma (indeks 0) taşındı.`,
      originalChar: chars[len - 1],
      fromIndex: len - 1,
      toIndex: 0,
      currentResult: [...result],
    });

    for (let i = 0; i < len - 1; i++) {
      const targetIdx = i + 1;
      result[targetIdx] = chars[i];
      steps.push({
        stepIndex: targetIdx,
        description: `Karakter '${chars[i]}' (indeks ${i}) bir sonraki konuma (indeks ${targetIdx}) taşındı.`,
        originalChar: chars[i],
        fromIndex: i,
        toIndex: targetIdx,
        currentResult: [...result],
      });
    }
  }

  return steps;
}

export const PRESET_TEST_CASES: TestCase[] = [
  {
    id: 'patika-canonical',
    title: 'Örnek (Patika Standart Testi)',
    input: 'Merhaba Hello Question',
    expectedWordLeft: 'erhabaM elloH uestionQ',
    description: 'İlk harfler kelimenin sonuna kaydırılır, kalan harfler sola 1 pozisyon kayar.',
  },
  {
    id: 'user-prompt',
    title: 'Kullanıcı İstemi Örneği',
    input: 'Merhaba Merhaba Soru',
    expectedWordLeft: 'erhabaM erhabaM oruS',
    description: 'Aynı kelimelerin ve Türkçe karakterlerin işlenmesi.',
  },
  {
    id: 'turkish-chars',
    title: 'Türkçe Özel Karakterler',
    input: 'Şemsiye Öğrenci Çağlayan İğne Üzüm',
    expectedWordLeft: 'emsiyeŞ grenciÖ ağlayanÇ ğneİ zümÜ',
    description: 'Ş, Ö, Ç, İ, Ü ve yumuşak ğ gibi özel Unicode karakterlerin korunması.',
  },
  {
    id: 'short-words',
    title: 'Kısa ve Tek Harfli Kelimeler',
    input: 'A ve B ile C birleşti',
    expectedWordLeft: 'A ev B lei C irleştib',
    description: 'Tek harfli kelimeler değişmez, 2 ve 3 harfli kelimeler kaydırılır.',
  },
  {
    id: 'programming-terms',
    title: 'Yazılım Terimleri & Sayılar',
    input: 'Console Application 2026 Patika CSharp',
    expectedWordLeft: 'onsoleC pplicationA 0262 atikaP SharpC',
    description: 'Büyük-küçük harf duyarlılığı ve nümerik değerler.',
  },
];
