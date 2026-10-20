import { AlgorithmResult, SwapMode, WordTokenStep } from '../types';

/**
 * Tek bir kelimenin ilk ve son karakterini yer değiştiren algoritma.
 * @param token İşlenecek kelime veya karakter dizisi
 * @returns İlk ve son karakteri yer değiştirilmiş string
 */
export function swapWordChars(token: string): {
  result: string;
  step: WordTokenStep;
} {
  const chars = Array.from(token);
  const length = chars.length;

  if (length === 0) {
    return {
      result: '',
      step: {
        id: Math.random().toString(36).substring(2, 9),
        original: '',
        firstChar: '',
        middleStr: '',
        lastChar: '',
        result: '',
        length: 0,
        isSingleChar: false,
        isEmpty: true,
      },
    };
  }

  if (length === 1) {
    return {
      result: token,
      step: {
        id: Math.random().toString(36).substring(2, 9),
        original: token,
        firstChar: chars[0],
        middleStr: '',
        lastChar: chars[0],
        result: token,
        length: 1,
        isSingleChar: true,
        isEmpty: false,
      },
    };
  }

  const firstChar = chars[0];
  const lastChar = chars[length - 1];
  const middleChars = chars.slice(1, length - 1);
  const middleStr = middleChars.join('');
  const result = lastChar + middleStr + firstChar;

  return {
    result,
    step: {
      id: Math.random().toString(36).substring(2, 9),
      original: token,
      firstChar,
      middleStr,
      lastChar,
      result,
      length,
      isSingleChar: false,
      isEmpty: false,
    },
  };
}

/**
 * Verilen metin üzerinde algoritmayı çalıştırır.
 * Mod:
 * - 'words': Her kelime için ayrı ayrı ilk ve son karakterleri takas eder (Örnekteki standart algoritma).
 * - 'fullString': Bütün metnin en başındaki ve en sonundaki karakteri takas eder.
 */
export function runSwapAlgorithm(input: string, mode: SwapMode = 'words'): AlgorithmResult {
  const startTime = performance.now();

  if (!input || input.trim().length === 0) {
    return {
      rawInput: input,
      output: input,
      mode,
      executionTimeMs: 0.01,
      wordCount: 0,
      charCount: input.length,
      steps: [],
      timestamp: new Date().toLocaleTimeString('tr-TR'),
    };
  }

  let finalOutput = '';
  const steps: WordTokenStep[] = [];

  if (mode === 'words') {
    // Kelimeleri ve aralarındaki boşlukları koruyarak böl
    const tokens = input.split(/(\s+)/);

    finalOutput = tokens
      .map((token) => {
        // Eğer boşluk dizisi ise doğrudan döndür
        if (/^\s+$/.test(token)) {
          return token;
        }
        const { result, step } = swapWordChars(token);
        steps.push(step);
        return result;
      })
      .join('');
  } else {
    // Bütün cümlenin/metnin ilk ve son karakterini değiştir
    const { result, step } = swapWordChars(input);
    finalOutput = result;
    steps.push(step);
  }

  const endTime = performance.now();
  const executionTimeMs = parseFloat((endTime - startTime).toFixed(3));
  const wordCount = input.trim().split(/\s+/).filter(Boolean).length;

  return {
    rawInput: input,
    output: finalOutput,
    mode,
    executionTimeMs,
    wordCount,
    charCount: input.length,
    steps,
    timestamp: new Date().toLocaleTimeString('tr-TR'),
  };
}

/**
 * Hazır örnek test senaryoları
 */
export const PRESET_EXAMPLES = [
  {
    title: 'Örnek İstek (Soru Metni)',
    input: 'Merhaba Hello Algoritma x',
    expected: 'aerhabM oellH algoritmA x',
    description: 'Kullanıcının verdiği örnek senaryo',
  },
  {
    title: 'Çift Merhaba Testi',
    input: 'Merhaba Merhaba Algoritma x',
    expected: 'aerhabM aerhabM algoritmA x',
    description: 'Tekrarlayan kelimeler ve tek karakter testi',
  },
  {
    title: 'Enes Öztürk İmzası',
    input: 'Enes Ozturk Yazilim Gelistirici',
    expected: 'sneE kzturO IaziliY igelistiricG',
    description: 'Geliştirici Enes Öztürk isim testi',
  },
  {
    title: 'Tek Harfli & Kısa Kelimeler',
    input: 'A BC DEF GHIJ K',
    expected: 'A CB FED JHIG K',
    description: 'Farklı uzunluktaki kelimelerin davranışı',
  },
  {
    title: 'Rakam ve Özel Karakterler',
    input: '2026 Algoritma #Kodlama!',
    expected: '6022 algoritmA !Kodlama#',
    description: 'Rakamlar ve noktalama işaretleri ile test',
  },
];
