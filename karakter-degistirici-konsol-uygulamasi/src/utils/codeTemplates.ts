import { SupportedLanguage } from '../types';

export interface CodeTemplateInfo {
  language: SupportedLanguage;
  name: string;
  filename: string;
  fileExtension: string;
  compilerCommand: string;
  runCommand: string;
  code: string;
}

export const CODE_TEMPLATES: Record<SupportedLanguage, CodeTemplateInfo> = {
  csharp: {
    language: 'csharp',
    name: 'C# (.NET 8 / 9 Console Application)',
    filename: 'Program.cs',
    fileExtension: 'cs',
    compilerCommand: 'dotnet build',
    runCommand: 'dotnet run',
    code: `/*
 * ============================================================================
 * PROJE ADI     : Karakter Değiştirici Konsol Uygulaması
 * GELİŞTİRİCİ   : Enes Öztürk
 * TELİF HAKKI   : © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * AÇIKLAMA      : Verilen string ifadedeki ilk ve son karakterlerin yerini 
 *                 değiştirip tekrar ekrana yazdıran konsol uygulaması.
 * ============================================================================
 */

using System;
using System.Text;

namespace EnesOzturk.Algoritmalar
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Title = "İlk ve Son Karakter Değiştirici - Enes Öztürk";
            
            // Başlık ve Telif Hakkı Banner'ı
            YazdirBaslik();

            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.Write("Lütfen bir metin giriniz: ");
            Console.ResetColor();

            string? giris = Console.ReadLine();

            if (string.IsNullOrEmpty(giris))
            {
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine("[Uyarı] Herhangi bir metin girilmedi!");
                Console.ResetColor();
                return;
            }

            // Algoritmanın çalıştırılması
            string cikti = IlkVeSonKarakterleriDegistir(giris);

            Console.WriteLine();
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"Giriş : {giris}");
            Console.WriteLine($"Çıktı : {cikti}");
            Console.ResetColor();

            // Telif hakkı ve imza çıktısı
            Console.WriteLine();
            Console.ForegroundColor = ConsoleColor.DarkGray;
            Console.WriteLine("----------------------------------------------------------------------------");
            Console.WriteLine("© 2026 Enes Öztürk. Tüm Hakları Saklıdır. Telif Hakları Koruması Altındadır.");
            Console.WriteLine("----------------------------------------------------------------------------");
            Console.ResetColor();

            Console.WriteLine("\nÇıkmak için bir tuşa basınız...");
            Console.ReadKey();
        }

        /// <summary>
        /// Verilen cümledeki her kelimenin ilk ve son karakterini yer değiştirir.
        /// Geliştirici: Enes Öztürk
        /// </summary>
        public static string IlkVeSonKarakterleriDegistir(string cumle)
        {
            if (string.IsNullOrEmpty(cumle))
                return cumle;

            string[] kelimeler = cumle.Split(' ');
            for (int i = 0; i < kelimeler.Length; i++)
            {
                string kelime = kelimeler[i];
                if (kelime.Length <= 1)
                {
                    continue;
                }

                char ilk = kelime[0];
                char son = kelime[kelime.Length - 1];
                string orta = kelime.Substring(1, kelime.Length - 2);

                kelimeler[i] = son + orta + ilk;
            }

            return string.Join(" ", kelimeler);
        }

        private static void YazdirBaslik()
        {
            Console.ForegroundColor = ConsoleColor.DarkCyan;
            Console.WriteLine("╔══════════════════════════════════════════════════════════════════╗");
            Console.WriteLine("║   İLK VE SON KARAKTER DEĞİŞTİRİCİ KONSOL UYGULAMASI               ║");
            Console.WriteLine("║   Yazılım Geliştirici: Enes Öztürk                               ║");
            Console.WriteLine("║   Telif Hakkı: © 2026 Enes Öztürk. Tüm Hakları Saklıdır.         ║");
            Console.WriteLine("╚══════════════════════════════════════════════════════════════════╝");
            Console.ResetColor();
            Console.WriteLine();
        }
    }
}`,
  },

  python: {
    language: 'python',
    name: 'Python 3 Console Script',
    filename: 'main.py',
    fileExtension: 'py',
    compilerCommand: 'python3 -m py_compile main.py',
    runCommand: 'python3 main.py',
    code: `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
============================================================================
PROJE ADI     : Karakter Değiştirici Konsol Uygulaması
GELİŞTİRİCİ   : Enes Öztürk
TELİF HAKKI   : © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
AÇIKLAMA      : Verilen string ifade içerisindeki ilk ve son karakterin 
                yerini değiştirip ekrana yazdıran konsol uygulaması.
============================================================================
"""

def ilk_ve_son_karakter_degistir(kelime: str) -> str:
    """
    Tek bir kelimenin ilk ve son karakterlerini yer değiştirir.
    Geliştirici: Enes Öztürk
    """
    if len(kelime) <= 1:
        return kelime
    return kelime[-1] + kelime[1:-1] + kelime[0]


def metni_donustur(metin: str) -> str:
    """
    Tüm cümledeki kelimelerin ilk ve son karakterlerini dönüştürür.
    """
    kelimeler = metin.split(" ")
    donusturulen = [ilk_ve_son_karakter_degistir(k) for k in kelimeler]
    return " ".join(donusturulen)


def main():
    print("=" * 68)
    print("  İLK VE SON KARAKTER DEĞİŞTİRİCİ KONSOL UYGULAMASI")
    print("  Geliştirici: Enes Öztürk | © 2026 Tüm Hakları Saklıdır.")
    print("=" * 68)
    print()

    # Kullanıcıdan girdi alma
    giris = input("Lütfen string ifadeyi giriniz: ")

    if not giris.strip():
        print("[Hata] Boş ifade girilemez!")
        return

    # Algoritmayı uygula
    cikti = metni_donustur(giris)

    print()
    print(f"Giriş: {giris}")
    print(f"Çıktı: {cikti}")
    print()
    print("-" * 68)
    print("© 2026 Enes Öztürk İmzasıyla Oluşturulmuştur. Telif Hakları Saklıdır.")
    print("-" * 68)


if __name__ == "__main__":
    main()
`,
  },

  java: {
    language: 'java',
    name: 'Java (JDK 17 / 21 Console Application)',
    filename: 'Main.java',
    fileExtension: 'java',
    compilerCommand: 'javac Main.java',
    runCommand: 'java Main',
    code: `/*
 * ============================================================================
 * PROJE ADI     : Karakter Değiştirici Konsol Uygulaması
 * GELİŞTİRİCİ   : Enes Öztürk
 * TELİF HAKKI   : © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * AÇIKLAMA      : Verilen metindeki her kelimenin ilk ve son karakterini
 *                 takas eden konsol uygulaması.
 * ============================================================================
 */

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        System.out.println("====================================================================");
        System.out.println("  İLK VE SON KARAKTER DEĞİŞTİRİCİ - ENES ÖZTÜRK");
        System.out.println("  © 2026 Enes Öztürk. Tüm Telif Hakları Saklıdır.");
        System.out.println("====================================================================\n");

        Scanner scanner = new Scanner(System.in);
        System.out.print("Lütfen bir string ifade giriniz: ");
        String giris = scanner.nextLine();

        if (giris == null || giris.trim().isEmpty()) {
            System.out.println("[Uyarı] Metin girilmedi!");
            scanner.close();
            return;
        }

        String cikti = karakterleriDegistir(giris);

        System.out.println("\nGiriş : " + giris);
        System.out.println("Çıktı : " + cikti);

        System.out.println("\n--------------------------------------------------------------------");
        System.out.println("Enes Öztürk İmzasıyla Sunulmuştur. © 2026 Tüm Hakları Saklıdır.");
        System.out.println("--------------------------------------------------------------------");

        scanner.close();
    }

    /**
     * İlk ve son karakteri takas eden metot.
     * @author Enes Öztürk
     */
    public static String karakterleriDegistir(String str) {
        String[] kelimeler = str.split(" ");
        StringBuilder sonuc = new StringBuilder();

        for (int i = 0; i < kelimeler.length; i++) {
            String kelime = kelimeler[i];
            if (kelime.length() > 1) {
                char ilk = kelime.charAt(0);
                char son = kelime.charAt(kelime.length() - 1);
                String orta = kelime.substring(1, kelime.length() - 1);
                sonuc.append(son).append(orta).append(ilk);
            } else {
                sonuc.append(kelime);
            }

            if (i < kelimeler.length - 1) {
                sonuc.append(" ");
            }
        }
        return sonuc.toString();
    }
}
`,
  },

  typescript: {
    language: 'typescript',
    name: 'Node.js / TypeScript Console CLI',
    filename: 'index.ts',
    fileExtension: 'ts',
    compilerCommand: 'npx tsx index.ts',
    runCommand: 'node dist/index.js',
    code: `/**
 * ============================================================================
 * PROJE ADI     : Karakter Değiştirici Konsol Uygulaması (Node.js CLI)
 * GELİŞTİRİCİ   : Enes Öztürk
 * TELİF HAKKI   : © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * ============================================================================
 */

import * as readline from 'readline';

function swapFirstAndLast(word: string): string {
  if (word.length <= 1) return word;
  const first = word[0];
  const last = word[word.length - 1];
  const middle = word.slice(1, -1);
  return \`\${last}\${middle}\${first}\`;
}

function processInput(text: string): string {
  return text
    .split(' ')
    .map(swapFirstAndLast)
    .join(' ');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('\\x1b[36m%s\\x1b[0m', '════════════════════════════════════════════════════════════════');
console.log('\\x1b[1m%s\\x1b[0m', '  İLK VE SON KARAKTER DEĞİŞTİRİCİ KONSOL UYGULAMASI');
console.log('\\x1b[33m%s\\x1b[0m', '  Geliştirici: Enes Öztürk | © 2026 Tüm Hakları Saklıdır.');
console.log('\\x1b[36m%s\\x1b[0m', '════════════════════════════════════════════════════════════════\\n');

rl.question('Metin giriniz (Örn: Merhaba Hello Algoritma x): ', (answer) => {
  const result = processInput(answer);

  console.log('\\n\\x1b[32m%s\\x1b[0m', \`Giriş : \${answer}\`);
  console.log('\\x1b[32m%s\\x1b[0m', \`Çıktı : \${result}\`);

  console.log('\\n\\x1b[90m%s\\x1b[0m', '----------------------------------------------------------------');
  console.log('\\x1b[90m%s\\x1b[0m', 'Enes Öztürk imzasıyla hazırlanmıştır. Telif hakları tescillidir.');
  console.log('\\x1b[90m%s\\x1b[0m', '----------------------------------------------------------------');

  rl.close();
});
`,
  },

  cpp: {
    language: 'cpp',
    name: 'C++ (C++20 Console Application)',
    filename: 'main.cpp',
    fileExtension: 'cpp',
    compilerCommand: 'g++ -std=c++20 main.cpp -o app',
    runCommand: './app',
    code: `/*
 * ============================================================================
 * PROJE ADI     : Karakter Degistirici Konsol Uygulamasi
 * GELISTIRICI   : Enes Ozturk
 * TELIF HAKKI   : © 2026 Enes Ozturk. Tum Haklari Saklidir.
 * ============================================================================
 */

#include <iostream>
#include <sstream>
#include <string>
#include <vector>

std::string swapFirstLast(const std::string& word) {
    if (word.length() <= 1) return word;
    std::string result = word;
    std::swap(result[0], result[result.length() - 1]);
    return result;
}

std::string processText(const std::string& input) {
    std::istringstream iss(input);
    std::string word;
    std::string result = "";
    bool first = true;

    while (iss >> word) {
        if (!first) result += " ";
        result += swapFirstLast(word);
        first = false;
    }
    return result;
}

int main() {
    std::cout << "===================================================================\\n";
    std::cout << "  ILK VE SON KARAKTER DEGISTIRICI - ENES OZTURK\\n";
    std::cout << "  (C) 2026 Enes Ozturk. Tum Haklari Saklidir.\\n";
    std::cout << "===================================================================\\n\\n";

    std::cout << "Lutfen bir string ifade giriniz: ";
    std::string line;
    std::getline(std::cin, line);

    std::string output = processText(line);

    std::cout << "\\nGiris : " << line << "\\n";
    std::cout << "Cikti : " << output << "\\n\\n";

    std::cout << "-------------------------------------------------------------------\\n";
    std::cout << "Enes Ozturk Imzasiyla Sunulmustur. Telif Haklari Saklidir.\\n";
    std::cout << "-------------------------------------------------------------------\\n";

    return 0;
}
`,
  },
};
