import { AlgorithmResult, NumberStep, PresetExample } from '../types/algorithm';

export const THRESHOLD = 67;

export function parseNumberInput(input: string): number[] {
  if (!input || !input.trim()) return [];
  // Split by whitespace or comma, support negative numbers
  return input
    .trim()
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !isNaN(Number(s)))
    .map(Number);
}

export function execute67Algorithm(input: string | number[]): AlgorithmResult {
  const numbers = Array.isArray(input) ? input : parseNumberInput(input);
  const rawInput = Array.isArray(input) ? input.join(' ') : input;

  let smallDiffSum = 0;
  let largeSquareSum = 0;

  const steps: NumberStep[] = numbers.map((n) => {
    if (n < THRESHOLD) {
      const diff = THRESHOLD - n;
      smallDiffSum += diff;
      return {
        original: n,
        status: 'less',
        diff,
        formula: `${THRESHOLD} - ${n} = ${diff}`,
        contribution: diff,
      };
    } else if (n > THRESHOLD) {
      const diff = n - THRESHOLD;
      const squared = diff * diff;
      largeSquareSum += squared;
      return {
        original: n,
        status: 'greater',
        diff,
        formula: `(${n} - ${THRESHOLD})² = ${diff}² = ${squared}`,
        contribution: squared,
      };
    } else {
      return {
        original: n,
        status: 'equal',
        diff: 0,
        formula: `${n} == ${THRESHOLD} (Fark 0)`,
        contribution: 0,
      };
    }
  });

  return {
    rawInput,
    numbers,
    steps,
    smallDiffSum,
    largeSquareSum,
    output: `${smallDiffSum} ${largeSquareSum}`,
    timestamp: new Date().toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  };
}

export const PRESETS: PresetExample[] = [
  {
    title: 'Kullanıcı Örneği (Referans)',
    description: '56 (<67), 45 (<67), 68 (>67), 77 (>67)',
    input: '56 45 68 77',
    expectedOutput: '33 101',
  },
  {
    title: 'Dengeli Karma Set',
    description: '60, 70, 50, 80 sayıları',
    input: '60 70 50 80',
    expectedOutput: '24 178',
  },
  {
    title: 'Tümü 67\'den Küçük',
    description: '30, 45, 60, 66 (Kare toplamı 0)',
    input: '30 45 60 66',
    expectedOutput: '67 0',
  },
  {
    title: 'Tümü 67\'den Büyük',
    description: '68, 69, 72 (Fark toplamı 0)',
    input: '68 69 72',
    expectedOutput: '0 30',
  },
  {
    title: 'Eşik Değer (67) İçeren Set',
    description: '57, 67, 77 (67 değeri fark 0 üretir)',
    input: '57 67 77',
    expectedOutput: '10 100',
  },
];

export const CONSOLE_CODE_SAMPLES = {
  csharp: `/*
 * ========================================================
 * PROJE: 67 Eşik Değerli Fark & Mutlak Kare Toplamı Console Uygulaması
 * YAZAR / İMZA: Enes Öztürk
 * TELİF HAKKI: © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * AÇIKLAMA: Ekrandan girilen n tane sayının 67'den küçük veya
 * büyük olduğuna bakar. Küçük olanların farklarının toplamını,
 * büyük olanların farklarının mutlak karelerini toplayıp yazdırır.
 * ========================================================
 */

using System;
using System.Linq;

namespace EnesOzturk.Algoritma67
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("==================================================");
            Console.WriteLine("  Algoritma 67 Console Uygulaması");
            Console.WriteLine("  İmza: Enes Öztürk | Telif Hakkı: © 2026");
            Console.WriteLine("==================================================");
            Console.ResetColor();

            Console.Write("Sayıları aralarında boşluk bırakarak giriniz: ");
            string? input = Console.ReadLine();

            if (string.IsNullOrWhiteSpace(input))
            {
                Console.WriteLine("Geçerli bir girdi bulunamadı.");
                return;
            }

            int[] numbers = input.Split(' ', StringSplitOptions.RemoveEmptyEntries)
                                 .Select(int.Parse)
                                 .ToArray();

            int kucukFarkToplam = 0;
            int buyukKareToplam = 0;

            foreach (int sayi in numbers)
            {
                if (sayi < 67)
                {
                    kucukFarkToplam += (67 - sayi);
                }
                else if (sayi > 67)
                {
                    int fark = sayi - 67;
                    buyukKareToplam += (fark * fark);
                }
            }

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"\\nÇıktı: {kucukFarkToplam} {buyukKareToplam}");
            Console.ResetColor();

            Console.ForegroundColor = ConsoleColor.DarkGray;
            Console.WriteLine("\\n--------------------------------------------------");
            Console.WriteLine("İmza: Enes Öztürk");
            Console.WriteLine("Telif Hakkı: © 2026 Enes Öztürk. Tüm Hakları Saklıdır.");
            Console.ResetColor();
        }
    }
}`,

  python: `"""
========================================================
PROJE: 67 Eşik Değerli Fark & Mutlak Kare Toplamı Console Uygulaması
YAZAR / İMZA: Enes Öztürk
TELİF HAKKI: © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
========================================================
"""

def main():
    print("=" * 52)
    print("  Algoritma 67 Console Uygulaması")
    print("  İmza: Enes Öztürk | Telif Hakkı: © 2026")
    print("=" * 52)

    user_input = input("Sayıları aralarında boşluk ile giriniz (örn: 56 45 68 77): ")
    
    try:
        numbers = [int(x) for x in user_input.strip().split()]
    except ValueError:
        print("Hata: Lütfen geçerli tam sayılar giriniz.")
        return

    kucuk_fark_toplam = 0
    buyuk_kare_toplam = 0

    for x in numbers:
        if x < 67:
            kucuk_fark_toplam += (67 - x)
        elif x > 67:
            fark = x - 67
            buyuk_kare_toplam += (fark ** 2)

    print(f"\\nÇıktı: {kucuk_fark_toplam} {buyuk_kare_toplam}")
    print("-" * 52)
    print("İmza: Enes Öztürk")
    print("Telif Hakkı: © 2026 Enes Öztürk. Tüm Hakları Saklıdır.")

if __name__ == "__main__":
    main()`,

  javascript: `/**
 * ========================================================
 * PROJE: 67 Eşik Değerli Fark & Mutlak Kare Toplamı Console Uygulaması
 * YAZAR / İMZA: Enes Öztürk
 * TELİF HAKKI: © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * ========================================================
 */

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('='.repeat(52));
console.log('  Algoritma 67 Console Uygulaması');
console.log('  İmza: Enes Öztürk | Telif Hakkı: © 2026');
console.log('='.repeat(52));

readline.question('Sayıları aralarında boşlukla giriniz: ', (input) => {
  const numbers = input
    .trim()
    .split(/\\s+/)
    .map(Number)
    .filter(n => !isNaN(n));

  let smallDiffSum = 0;
  let largeSquareSum = 0;

  for (const num of numbers) {
    if (num < 67) {
      smallDiffSum += (67 - num);
    } else if (num > 67) {
      const diff = num - 67;
      largeSquareSum += (diff * diff);
    }
  }

  console.log(\`\\nÇıktı: \${smallDiffSum} \${largeSquareSum}\`);
  console.log('-'.repeat(52));
  console.log('İmza: Enes Öztürk');
  console.log('Telif Hakkı: © 2026 Enes Öztürk. Tüm Hakları Saklıdır.');
  readline.close();
});`,

  cpp: `/*
 * ========================================================
 * PROJE: 67 Eşik Değerli Fark & Mutlak Kare Toplamı Console Uygulaması
 * YAZAR / İMZA: Enes Öztürk
 * TELİF HAKKI: © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * ========================================================
 */

#include <iostream>
#include <sstream>
#include <vector>

using namespace std;

int main() {
    cout << "==================================================" << endl;
    cout << "  Algoritma 67 Console Uygulaması" << endl;
    cout << "  İmza: Enes Öztürk | Telif Hakkı: © 2026" << endl;
    cout << "==================================================" << endl;
    cout << "Sayıları giriniz (örn: 56 45 68 77): ";

    string line;
    if (!getline(cin, line)) return 0;

    stringstream ss(line);
    int num;
    long long kucukFarkToplam = 0;
    long long buyukKareToplam = 0;

    while (ss >> num) {
        if (num < 67) {
            kucukFarkToplam += (67 - num);
        } else if (num > 67) {
            long long fark = num - 67;
            buyukKareToplam += (fark * fark);
        }
    }

    cout << "\\nÇıktı: " << kucukFarkToplam << " " << buyukKareToplam << endl;
    cout << "--------------------------------------------------" << endl;
    cout << "İmza: Enes Öztürk" << endl;
    cout << "Telif Hakkı: © 2026 Enes Öztürk. Tüm Hakları Saklıdır." << endl;
    return 0;
}`
};
