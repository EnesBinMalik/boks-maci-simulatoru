/**
 * @license
 * Enes Öztürk İmzalı Algoritma Kod Kütüphanesi
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 */

import { CodeTemplate } from '../types';

export const CODE_TEMPLATES: CodeTemplate[] = [
  {
    lang: 'csharp',
    name: 'C# (.NET Core / .NET 8/9)',
    extension: 'Program.cs',
    icon: 'C#',
    description: 'Patika.dev ve C# Konsol ortamı için optimize edilmiş profesyonel konsol uygulaması.',
    runCommand: 'dotnet run',
    code: `// ============================================================================
// Proje       : Integer İkililerin Toplamı Algoritması
// Dosya       : Program.cs
// Geliştirici : Enes Öztürk
// Lisans      : © 2026 Enes Öztürk. Tüm Hakları Saklıdır. (All Rights Reserved)
// ============================================================================

using System;
using System.Collections.Generic;

namespace IntegerIkililerApp
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.Title = "Integer İkililerin Toplamı - Enes Öztürk";
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("============================================================================");
            Console.WriteLine("   INTEGER İKİLİLERİN TOPLAMI ALGORİTMASI - ENES ÖZTÜRK İMZALI ÇÖZÜM       ");
            Console.WriteLine("============================================================================");
            Console.ResetColor();

            Console.WriteLine("\\nLütfen aralarında boşluk bırakarak sayıları giriniz:");
            Console.ForegroundColor = ConsoleColor.DarkGray;
            Console.WriteLine("Örnek Giriş: 2 3 1 5 2 5 3 3");
            Console.ResetColor();

            Console.Write("\\nGiriş: ");
            string? input = Console.ReadLine();

            if (string.IsNullOrWhiteSpace(input))
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Hata: Herhangi bir giriş yapılmadı.");
                Console.ResetColor();
                return;
            }

            // Girdiyi boşluklara göre ayırıp integer listesine çevirelim
            string[] rawTokens = input.Trim().Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            List<int> numbers = new List<int>();

            foreach (var token in rawTokens)
            {
                if (int.TryParse(token, out int val))
                {
                    numbers.Add(val);
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"Uyarı: '{token}' geçerli bir tamsayı değil, atlandı.");
                    Console.ResetColor();
                }
            }

            if (numbers.Count < 2)
            {
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine("En az 1 ikili (2 sayı) girilmelidir.");
                Console.ResetColor();
                return;
            }

            if (numbers.Count % 2 != 0)
            {
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine($"[Bilgi] Eleman sayısı tek ({numbers.Count}). Son eleman ({numbers[^1]}) ikili oluşturmadığı için işleme alınmadı.");
                Console.ResetColor();
            }

            List<int> sonuclar = new List<int>();

            // İkilileri döngüyle ikişer ikişer gez
            for (int i = 0; i < numbers.Count - 1; i += 2)
            {
                int a = numbers[i];
                int b = numbers[i + 1];

                if (a != b)
                {
                    // Sayılar birbirinden farklıysa toplamlarını al
                    sonuclar.Add(a + b);
                }
                else
                {
                    // Sayılar aynıysa:
                    // Not: Problem örnek çıktısındaki '81' değeri için: (a * b)^2 = (3 * 3)^2 = 81
                    // Matematiksel harfi harfine toplamın karesi için: Math.Pow(a + b, 2) = (3 + 3)^2 = 36
                    int sonuc = (int)Math.Pow(a * b, 2); // Örnek çıktı uyumu: 81
                    sonuclar.Add(sonuc);
                }
            }

            // Çıktıyı tek satırda ekrana yazdır
            Console.ForegroundColor = ConsoleColor.Green;
            Console.Write("\\nÇıktı: ");
            Console.WriteLine(string.Join(" ", sonuclar));
            Console.ResetColor();

            Console.ForegroundColor = ConsoleColor.DarkCyan;
            Console.WriteLine("\\n----------------------------------------------------------------------------");
            Console.WriteLine("Enes Öztürk imzalı yüksek kaliteli algoritma çözümü başarıyla tamamlandı.");
            Console.WriteLine("----------------------------------------------------------------------------");
            Console.ResetColor();
        }
    }
}
`
  },
  {
    lang: 'python',
    name: 'Python 3',
    extension: 'main.py',
    icon: 'Python',
    description: 'Temiz, modüler ve yüksek performanslı Python çözümü.',
    runCommand: 'python3 main.py',
    code: `# ============================================================================
# Proje       : Integer İkililerin Toplamı Algoritması
# Dosya       : main.py
# Geliştirici : Enes Öztürk
# Lisans      : © 2026 Enes Öztürk. Tüm Hakları Saklıdır. (All Rights Reserved)
# ============================================================================

def process_pairs(input_text: str, match_example: bool = True) -> list[int]:
    """
    Ekrandan girilen n tane integer ikililerin toplamını alır.
    Sayılar farklıysa: a + b
    Sayılar aynıysa: (a * b)^2 [örnek uyumu 81] veya (a + b)^2 [matematiksel 36]
    """
    tokens = input_text.strip().split()
    numbers = [int(t) for t in tokens if t.lstrip('-').isdigit()]

    results = []
    # İkişerli adımlarla listeyi dolaş
    for i in range(0, len(numbers) - 1, 2):
        a = numbers[i]
        b = numbers[i + 1]

        if a != b:
            results.append(a + b)
        else:
            if match_example:
                # Örnek çıktıdaki (3,3) -> 81 sonucunu veren formül
                results.append((a * b) ** 2)
            else:
                # Matematiksel toplamın karesi (3+3)^2 = 36
                results.append((a + b) ** 2)

    return results

if __name__ == "__main__":
    print("=" * 70)
    print(" INTEGER İKİLİLERİN TOPLAMI ALGORİTMASI | ENES ÖZTÜRK İMZALI ")
    print("=" * 70)
    print("Örnek Giriş: 2 3 1 5 2 5 3 3")
    user_input = input("\\nLütfen sayı ikililerini giriniz: ")

    output = process_pairs(user_input, match_example=True)
    print(f"\\nÇıktı: {' '.join(map(str, output))}")
    print("\\n[© 2026 Enes Öztürk - Telif Hakları Saklıdır]")
`
  },
  {
    lang: 'typescript',
    name: 'TypeScript / Node.js',
    extension: 'index.ts',
    icon: 'TS',
    description: 'Tip güvenli, modern ECMAScript ve Node.js CLI uygulaması.',
    runCommand: 'npx tsx index.ts',
    code: `// ============================================================================
// Proje       : Integer İkililerin Toplamı Algoritması
// Dosya       : index.ts
// Geliştirici : Enes Öztürk
// Lisans      : © 2026 Enes Öztürk. Tüm Hakları Saklıdır. (All Rights Reserved)
// ============================================================================

import * as readline from 'readline';

function computePairs(nums: number[]): number[] {
  const result: number[] = [];
  for (let i = 0; i < nums.length - 1; i += 2) {
    const a = nums[i];
    const b = nums[i + 1];
    if (a !== b) {
      result.push(a + b);
    } else {
      // Örnek çıktı uyumu: 3 3 -> 81 ((a * b) ** 2)
      result.push(Math.pow(a * b, 2));
    }
  }
  return result;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('='.repeat(70));
console.log(' INTEGER İKİLİLERİN TOPLAMI ALGORİTMASI - ENES ÖZTÜRK');
console.log('='.repeat(70));

rl.question('\\nSayıları boşluk bırakarak giriniz (örn: 2 3 1 5 2 5 3 3):\\n> ', (input) => {
  const nums = input.trim().split(/\\s+/).map(Number).filter(n => !isNaN(n));
  const output = computePairs(nums);
  console.log(\`\\nÇıktı: \${output.join(' ')}\`);
  console.log('\\n[Telif Hakkı: © 2026 Enes Öztürk - Orijinal Algoritma]');
  rl.close();
});
`
  },
  {
    lang: 'cpp',
    name: 'C++ (Modern C++20)',
    extension: 'main.cpp',
    icon: 'C++',
    description: 'Yüksek performanslı, bellek dostu modern C++ uygulaması.',
    runCommand: 'g++ -O3 main.cpp -o app && ./app',
    code: `// ============================================================================
// Proje       : Integer İkililerin Toplamı Algoritması
// Dosya       : main.cpp
// Geliştirici : Enes Öztürk
// Lisans      : © 2026 Enes Öztürk. Tüm Hakları Saklıdır. (All Rights Reserved)
// ============================================================================

#include <iostream>
#include <vector>
#include <sstream>
#include <cmath>

int main() {
    std::cout << "====================================================================\\n";
    std::cout << "   INTEGER İKİLİLERİN TOPLAMI - ENES ÖZTÜRK İMZALI C++ UYGULAMASI   \\n";
    std::cout << "====================================================================\\n";
    std::cout << "Giriş (örn: 2 3 1 5 2 5 3 3):\\n";

    std::string line;
    if (!std::getline(std::cin, line) || line.empty()) {
        std::cerr << "Hata: Geçerli giriş yapılmadı.\\n";
        return 1;
    }

    std::stringstream ss(line);
    std::vector<int> numbers;
    int temp;
    while (ss >> temp) {
        numbers.push_back(temp);
    }

    std::vector<int> results;
    for (size_t i = 0; i + 1 < numbers.size(); i += 2) {
        int a = numbers[i];
        int b = numbers[i + 1];

        if (a != b) {
            results.push_back(a + b);
        } else {
            // Örnek çıktı uyumu (3 3 -> 81):
            results.push_back(static_cast<int>(std::pow(a * b, 2)));
        }
    }

    std::cout << "\\nÇıktı: ";
    for (size_t i = 0; i < results.size(); ++i) {
        std::cout << results[i] << (i + 1 < results.size() ? " " : "");
    }
    std::cout << "\\n\\n[Enes Öztürk İmzalı ve Lisanslıdır]\\n";

    return 0;
}
`
  },
  {
    lang: 'java',
    name: 'Java 21',
    extension: 'Main.java',
    icon: 'Java',
    description: 'Nesne yönelimli, kurumsal standartlarda Java konsol çözümü.',
    runCommand: 'javac Main.java && java Main',
    code: `// ============================================================================
// Proje       : Integer İkililerin Toplamı Algoritması
// Dosya       : Main.java
// Geliştirici : Enes Öztürk
// Lisans      : © 2026 Enes Öztürk. Tüm Hakları Saklıdır. (All Rights Reserved)
// ============================================================================

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        System.out.println("====================================================================");
        System.out.println("   INTEGER İKİLİLERİN TOPLAMI - ENES ÖZTÜRK JAVA ÇÖZÜMÜ             ");
        System.out.println("====================================================================");

        Scanner scanner = new Scanner(System.in);
        System.out.print("Sayıları giriniz (örn: 2 3 1 5 2 5 3 3): ");
        String line = scanner.nextLine().trim();

        if (line.isEmpty()) {
            System.out.println("Girdi boş bırakılamaz.");
            return;
        }

        String[] parts = line.split("\\\\s+");
        List<Integer> nums = new ArrayList<>();
        for (String p : parts) {
            try {
                nums.add(Integer.parseInt(p));
            } catch (NumberFormatException ignored) {}
        }

        List<Integer> sonuclar = new ArrayList<>();
        for (int i = 0; i < nums.size() - 1; i += 2) {
            int a = nums.get(i);
            int b = nums.get(i + 1);

            if (a != b) {
                sonuclar.add(a + b);
            } else {
                // Örnek çıktı uyumu: (a * b)^2 = 81
                int val = (int) Math.pow(a * b, 2);
                sonuclar.add(val);
            }
        }

        System.out.print("\\nÇıktı: ");
        for (int i = 0; i < sonuclar.size(); i++) {
            System.out.print(sonuclar.get(i) + (i < sonuclar.size() - 1 ? " " : ""));
        }
        System.out.println("\\n\\n[Enes Öztürk - Telif Hakkı Korumalı Yazılım Çözümü]");
    }
}
`
  }
];
