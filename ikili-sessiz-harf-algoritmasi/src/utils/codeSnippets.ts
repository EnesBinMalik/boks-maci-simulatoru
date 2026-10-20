export interface CodeSnippet {
  language: string;
  filename: string;
  description: string;
  code: string;
}

export const CODE_SNIPPETS: Record<string, CodeSnippet> = {
  csharp: {
    language: 'C# (.NET)',
    filename: 'Program.cs',
    description: 'C# Console Uygulaması (Türkçe karakter desteği ve Enes Öztürk telif imzası ile)',
    code: `// ============================================================================
// Algoritma: İkili Ardışık Sessiz Harf Kontrolü (Console Uygulaması)
// Geliştirici: Enes Öztürk
// Telif Hakkı: © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
// Lisans: Özel Mülkiyet (Telif Korumalı Algoritma Mimarisi)
// ============================================================================

using System;
using System.Collections.Generic;
using System.Text;

namespace SessizHarfAlgoritmasi
{
    class Program
    {
        // Sesli harfler kümesi (Türkçe karakterler dahil)
        private static readonly HashSet<char> SesliHarfler = new HashSet<char>()
        {
            'a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü'
        };

        static void Main(string[] args)
        {
            Console.OutputEncoding = Encoding.UTF8;

            Console.WriteLine("=== İkili Sessiz Harf Algoritması - Enes Öztürk ===");
            Console.WriteLine("Örnek Giriş: Merhaba Umut Arya\\n");

            Console.Write("Lütfen metni giriniz: ");
            string input = Console.ReadLine();

            if (string.IsNullOrWhiteSpace(input))
            {
                input = "Merhaba Umut Arya"; // Varsayılan örnek
            }

            string[] kelimeler = input.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            List<string> sonuclar = new List<string>();

            foreach (var kelime in kelimeler)
            {
                bool ikiliSessizVarMi = IkiSessizHarfVarMi(kelime);
                sonuclar.Add(ikiliSessizVarMi ? "Doğru" : "Yanlış");
            }

            string cikti = string.Join(" ", sonuclar);

            // Çıktı ve Telif Hakkı İmzası
            Console.WriteLine("\\nÇıktı: " + cikti);
            Console.WriteLine("--------------------------------------------------");
            Console.WriteLine("Geliştirici & Telif: Enes Öztürk (Tüm Hakları Saklıdır © 2026)");
        }

        /// <summary>
        /// Verilen kelimede ardışık iki sessiz harf olup olmadığını kontrol eder.
        /// </summary>
        public static bool IkiSessizHarfVarMi(string kelime)
        {
            string temiz = kelime.ToLower(new System.Globalization.CultureInfo("tr-TR"));

            for (int i = 0; i < temiz.Length - 1; i++)
            {
                if (SessizMi(temiz[i]) && SessizMi(temiz[i + 1]))
                {
                    return true;
                }
            }
            return false;
        }

        public static bool SessizMi(char c)
        {
            // Harf olup sesli olmayan karakter sessizdir
            return char.IsLetter(c) && !SesliHarfler.Contains(c);
        }
    }
}`
  },

  python: {
    language: 'Python 3',
    filename: 'algoritma.py',
    description: 'Python 3 Console Scripti (Enes Öztürk telif hakkı ile)',
    code: `# ============================================================================
# Algoritma: İkili Ardışık Sessiz Harf Kontrolü (Console Uygulaması)
# Geliştirici: Enes Öztürk
# Telif Hakkı: © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
# ============================================================================

import sys

# Türkçe sesli harfler
SESLI_HARFLER = set(['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü'])

def sessiz_mi(karakter: str) -> bool:
    """Karakterin sessiz harf olup olmadığını denetler."""
    return karakter.isalpha() and karakter not in SESLI_HARFLER

def ikili_sessiz_var_mi(kelime: str) -> bool:
    """Kelimede yan yana 2 sessiz harf olup olmadığını kontrol eder."""
    # Türkçe küçük harf dönüşümü
    kucuk = kelime.replace('I', 'ı').replace('İ', 'i').lower()
    
    for i in range(len(kucuk) - 1):
        if sessiz_mi(kucuk[i]) and sessiz_mi(kucuk[i + 1]):
            return True
    return False

def main():
    print("=== İkili Sessiz Harf Algoritması - Enes Öztürk ===")
    
    giris = input("Lütfen metni giriniz (Boş bırakılırsa örnek çalışır): ").strip()
    if not giris:
        giris = "Merhaba Umut Arya"

    kelimeler = giris.split()
    sonuclar = ["Doğru" if ikili_sessiz_var_mi(k) else "Yanlış" for k in kelimeler]
    
    cikti = " ".join(sonuclar)
    
    print("\\nÇıktı:", cikti)
    print("-" * 50)
    print("Geliştirici & Telif: Enes Öztürk (Tüm Hakları Saklıdır © 2026)")

if __name__ == "__main__":
    main()`
  },

  javascript: {
    language: 'JavaScript / Node.js',
    filename: 'index.js',
    description: 'Node.js Terminal Uygulaması (Enes Öztürk telif hakkı ile)',
    code: `// ============================================================================
// Algoritma: İkili Ardışık Sessiz Harf Kontrolü (Console Uygulaması)
// Geliştirici: Enes Öztürk
// Telif Hakkı: © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
// ============================================================================

const readline = require('readline');

const SESLI_HARFLER = new Set(['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü']);

function isLetter(char) {
  return /^\\p{L}$/u.test(char);
}

function isConsonant(char) {
  if (!isLetter(char)) return false;
  const lower = char.toLocaleLowerCase('tr-TR');
  return !SESLI_HARFLER.has(lower);
}

function hasConsecutiveConsonants(word) {
  const chars = Array.from(word);
  for (let i = 0; i < chars.length - 1; i++) {
    if (isConsonant(chars[i]) && isConsonant(chars[i + 1])) {
      return true;
    }
  }
  return false;
}

function runAlgorithm(input) {
  const words = input.trim().split(/\\s+/);
  const results = words.map(w => hasConsecutiveConsonants(w) ? "Doğru" : "Yanlış");
  const output = results.join(" ");

  console.log("Çıktı:", output);
  console.log("Telif Hakkı: © Enes Öztürk - Tüm Hakları Saklıdır");
  return output;
}

// Örnek Çalıştırma
const ornekGiris = "Merhaba Umut Arya";
console.log("Giriş:", ornekGiris);
runAlgorithm(ornekGiris);`
  },

  java: {
    language: 'Java',
    filename: 'Main.java',
    description: 'Java CLI Uygulaması (Enes Öztürk telif hakkı ile)',
    code: `// ============================================================================
// Algoritma: İkili Ardışık Sessiz Harf Kontrolü (Console Uygulaması)
// Geliştirici: Enes Öztürk
// Telif Hakkı: © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
// ============================================================================

import java.util.*;

public class Main {
    private static final Set<Character> SESLI_HARFLER = new HashSet<>(
        Arrays.asList('a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü')
    );

    public static boolean isConsonant(char c) {
        return Character.isLetter(c) && !SESLI_HARFLER.contains(c);
    }

    public static boolean hasTwoConsecutiveConsonants(String word) {
        String lower = word.toLowerCase(Locale.forLanguageTag("tr-TR"));
        for (int i = 0; i < lower.length() - 1; i++) {
            if (isConsonant(lower.charAt(i)) && isConsonant(lower.charAt(i + 1))) {
                return true;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in, "UTF-8");
        System.out.println("=== İkili Sessiz Harf Algoritması - Enes Öztürk ===");
        System.out.print("Metin giriniz (Örn: Merhaba Umut Arya): ");
        
        String input = scanner.hasNextLine() ? scanner.nextLine() : "";
        if (input.trim().isEmpty()) {
            input = "Merhaba Umut Arya";
        }

        String[] words = input.trim().split("\\\\s+");
        List<String> results = new ArrayList<>();

        for (String word : words) {
            results.add(hasTwoConsecutiveConsonants(word) ? "Doğru" : "Yanlış");
        }

        String output = String.join(" ", results);
        System.out.println("\\nÇıktı: " + output);
        System.out.println("Geliştirici & Telif: Enes Öztürk (Tüm Hakları Saklıdır © 2026)");
        scanner.close();
    }
}`
  },

  cpp: {
    language: 'C++',
    filename: 'main.cpp',
    description: 'C++ Console Uygulaması (Enes Öztürk telif hakkı ile)',
    code: `// ============================================================================
// Algoritma: İkili Ardışık Sessiz Harf Kontrolü (Console Uygulaması)
// Geliştirici: Enes Öztürk
// Telif Hakkı: © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
// ============================================================================

#include <iostream>
#include <sstream>
#include <vector>
#include <string>
#include <unordered_set>
#include <cctype>

const std::unordered_set<char> SESLILER = {'a', 'e', 'i', 'o', 'u'};

bool isConsonant(char c) {
    c = std::tolower(static_cast<unsigned char>(c));
    return std::isalpha(static_cast<unsigned char>(c)) && SESLILER.find(c) == SESLILER.end();
}

bool hasConsecutiveConsonants(const std::string& word) {
    for (size_t i = 0; i + 1 < word.length(); ++i) {
        if (isConsonant(word[i]) && isConsonant(word[i + 1])) {
            return true;
        }
    }
    return false;
}

int main() {
    std::string input = "Merhaba Umut Arya";
    std::cout << "Giriş: " << input << "\\n";

    std::stringstream ss(input);
    std::string word;
    std::string output = "";

    while (ss >> word) {
        if (!output.empty()) output += " ";
        output += hasConsecutiveConsonants(word) ? "Doğru" : "Yanlış";
    }

    std::cout << "Çıktı: " << output << "\\n";
    std::cout << "Geliştirici & Telif: Enes Öztürk (Tüm Hakları Saklıdır © 2026)\\n";
    return 0;
}`
  }
};
