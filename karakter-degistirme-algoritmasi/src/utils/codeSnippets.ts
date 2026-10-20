export interface CodeSnippet {
  language: string;
  filename: string;
  runCommand: string;
  code: string;
  explanation: string;
}

export const CODE_SNIPPETS: Record<string, CodeSnippet> = {
  csharp: {
    language: 'C# (.NET 8/9)',
    filename: 'Program.cs',
    runCommand: 'dotnet run',
    code: `using System;

namespace KarakterDegistirmeApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("==================================================");
            Console.WriteLine("  KARAKTER DEĞİŞTİRME KONSOL UYGULAMASI (.NET)");
            Console.WriteLine("==================================================");
            Console.Write("Lütfen dönüştürülecek ifadeyi giriniz: ");
            
            string? input = Console.ReadLine();

            if (string.IsNullOrWhiteSpace(input))
            {
                Console.WriteLine("Hata: Boş bir metin girdiniz.");
                return;
            }

            string result = KarakterleriKaydir(input);

            Console.WriteLine("\\n--- Çıktı ---");
            Console.WriteLine(result);
            Console.WriteLine("----------------");
            Console.WriteLine("Çıkmak için bir tuşa basınız...");
            Console.ReadKey();
        }

        /// <summary>
        /// Verilen string ifadedeki her kelimenin karakterlerini 
        /// bir önceki karakter ile yer değiştirir (ilk harf sona geçer).
        /// </summary>
        static string KarakterleriKaydir(string input)
        {
            // Kelimeleri boşluklara göre ayırıyoruz
            string[] words = input.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            string[] transformedWords = new string[words.Length];

            for (int i = 0; i < words.Length; i++)
            {
                string word = words[i];

                // Tek karakterli veya boş kelimelerde işlem yapılmaz
                if (word.Length <= 1)
                {
                    transformedWords[i] = word;
                }
                else
                {
                    // 1. indeksten sona kadar olan kısım + 0. indisteki ilk karakter
                    // Örnek: "Merhaba" -> "erhaba" + "M" = "erhabaM"
                    //        "Hello"   -> "ello"   + "H" = "elloH"
                    //        "Question"-> "uestion"+ "Q" = "uestionQ"
                    transformedWords[i] = word.Substring(1) + word[0];
                }
            }

            return string.Join(" ", transformedWords);
        }
    }
}`,
    explanation:
      'C# Substring(1) + word[0] yöntemi: Kelimenin ilk karakterini (indeks 0) alır, 1. indeksten itibaren sonuna kadar olan kısmı başa yerleştirir. Böylece her karakter bir önceki indekse kaymış, ilk karakter ise kelimenin sonuna yerleşmiş olur. Zaman karmaşıklığı O(N), alan karmaşıklığı O(N).',
  },

  python: {
    language: 'Python 3',
    filename: 'main.py',
    runCommand: 'python3 main.py',
    code: `def karakterleri_kaydir(metin: str) -> str:
    """
    Her kelimedeki karakterleri bir önceki karakter ile yer değiştirir.
    İlk karakter sona geçer.
    Örnek: 'Merhaba Hello Question' -> 'erhabaM elloH uestionQ'
    """
    if not metin or not metin.strip():
        return ""
    
    kelimeler = metin.split()
    sonuc = []
    
    for kelime in kelimeler:
        if len(kelime) <= 1:
            sonuc.append(kelime)
        else:
            # Slicing: [1:] tüm harfleri 1 sola kaydırır, [0] ilk harfi sona ekler
            sonuc.append(kelime[1:] + kelime[0])
            
    return " ".join(sonuc)


if __name__ == "__main__":
    print("=== Karakter Değiştirme Konsol Uygulaması (Python) ===")
    girdi = input("Bir ifade giriniz: ")
    cikti = karakterleri_kaydir(girdi)
    print(f"\\nÇıktı:\\n{cikti}")
`,
    explanation:
      "Python dilinde dize dilimleme (string slicing) yöntemi olan `kelime[1:] + kelime[0]` en hızlı ve temiz yaklaşımdır. Tek satırda `[w[1:] + w[0] if len(w) > 1 else w for w in metin.split()]` şeklinde de yazılabilir.",
  },

  javascript: {
    language: 'JavaScript / Node.js',
    filename: 'index.js',
    runCommand: 'node index.js',
    code: `const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function karakterleriKaydir(str) {
  if (!str) return '';
  return str
    .split(/\\s+/)
    .filter(Boolean)
    .map(word => (word.length > 1 ? word.slice(1) + word[0] : word))
    .join(' ');
}

rl.question('Lütfen metni giriniz: ', (answer) => {
  console.log('\\nSonuç:');
  console.log(karakterleriKaydir(answer));
  rl.close();
});`,
    explanation:
      'JavaScript `String.prototype.slice(1) + word[0]` ve `Array.prototype.map()` fonksiyonel zincirleme yapısını kullanır. Düzenli ifade /\\s+/ birden fazla boşluğu güvenle ele alır.',
  },

  cpp: {
    language: 'C++20',
    filename: 'main.cpp',
    runCommand: 'g++ -std=c++20 main.cpp -o app && ./app',
    code: `#include <iostream>
#include <sstream>
#include <string>
#include <vector>

std::string shiftWord(const std::string& word) {
    if (word.length() <= 1) return word;
    // std::string substr(1) + word[0]
    return word.substr(1) + word[0];
}

int main() {
    std::cout << "Karakter Degistirme Konsol Uygulamasi (C++)" << std::endl;
    std::cout << "Giris: ";
    
    std::string line;
    if (std::getline(std::cin, line)) {
        std::stringstream ss(line);
        std::string word;
        std::string result = "";
        bool first = true;
        
        while (ss >> word) {
            if (!first) result += " ";
            result += shiftWord(word);
            first = false;
        }
        
        std::cout << "Cikti: " << result << std::endl;
    }
    return 0;
}`,
    explanation:
      'C++ std::stringstream akışı ile kelimeler ayrıştırılır ve substr(1) + word[0] ile bellek kopyalaması minimumda tutularak hız elde edilir.',
  },
};
