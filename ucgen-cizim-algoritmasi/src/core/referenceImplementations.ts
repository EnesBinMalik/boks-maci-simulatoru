/**
 * @license
 * Telif Hakkı © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * 
 * Bu dosya, Patika.dev / Üniversite / Bootcamp Algoritma ödevleri için
 * C# (.NET) ve Java dillerindeki tam referans mimarisini sunar.
 */

export const CSHARP_IMPLEMENTATION = `// ==============================================================================
// Telif Hakkı (C) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
// Proje: Konsol Üçgen Çizim Algoritması (Console Triangle Drawer)
// Mimari: Single Responsibility Principle (SRP) & DRY (Don't Repeat Yourself)
// Geliştirici: Enes Öztürk
// ==============================================================================

using System;
using System.Collections.Generic;
using System.Text;

namespace EnesOzturk.AlgorithmSolutions
{
    #region 1. Model & Veri Tipleri (Data Contracts)
    public enum TriangleType
    {
        Pyramid,        // Eşkenar Piramit
        RightAngledLeft,// Sola Dayalı Dik Üçgen
        RightAngledRight// Sağa Dayalı Dik Üçgen
    }

    public class ValidationResult
    {
        public bool IsValid { get; set; }
        public string? ErrorMessage { get; set; }
        public int ParsedValue { get; set; }
    }
    #endregion

    #region 2. Girdi Doğrulama Servisi (Single Responsibility: Input Validation)
    /// <summary>
    /// TEK SORUMLULUK (SRP):
    /// Kullanıcıdan konsol aracılığıyla alınan verinin doğrulanması,
    /// sayısal dönüşümü ve sınır denetimini gerçekleştirir.
    /// </summary>
    public class InputValidator
    {
        private readonly int _minSize;
        private readonly int _maxSize;

        public InputValidator(int minSize = 1, int maxSize = 40)
        {
            _minSize = minSize;
            _maxSize = maxSize;
        }

        public ValidationResult Validate(string? rawInput)
        {
            if (string.IsNullOrWhiteSpace(rawInput))
            {
                return new ValidationResult { IsValid = false, ErrorMessage = "Boyut bilgisi boş bırakılamaz." };
            }

            if (!int.TryParse(rawInput.Trim(), out int parsed))
            {
                return new ValidationResult { IsValid = false, ErrorMessage = "Lütfen geçerli bir pozitif tam sayı giriniz." };
            }

            if (parsed < _minSize || parsed > _maxSize)
            {
                return new ValidationResult 
                { 
                    IsValid = false, 
                    ErrorMessage = $"Boyut {_minSize} ile {_maxSize} arasında olmalıdır. Girilen: {parsed}" 
                };
            }

            return new ValidationResult { IsValid = true, ParsedValue = parsed };
        }
    }
    #endregion

    #region 3. Geometri ve Algoritma Motoru (Single Responsibility: Geometry Math)
    /// <summary>
    /// TEK SORUMLULUK (SRP) & DRY:
    /// Üçgenin satır satır boşluk ve karakter sayılarını matematiksel olarak hesaplar.
    /// Ekrana çıktı vermez, girdi almaz; sadece saf matematik üretir.
    /// </summary>
    public class TriangleGeometryCalculator
    {
        // DRY: Karakter dizisi üretimini tek noktadan yönetir
        private string Repeat(char character, int count)
        {
            if (count <= 0) return string.Empty;
            return new string(character, count);
        }

        public List<string> GeneratePyramidRows(int size, char symbol = '*')
        {
            var rows = new List<string>(size);

            for (int i = 1; i <= size; i++)
            {
                // Standart Eşkenar Piramit Formülü:
                // Boşluk sayısı = size - i
                // Sembol sayısı = (2 * i) - 1
                int spaceCount = size - i;
                int symbolCount = (2 * i) - 1;

                string row = Repeat(' ', spaceCount) + Repeat(symbol, symbolCount);
                rows.Add(row);
            }

            return rows;
        }
    }
    #endregion

    #region 4. Konsol Yazıcı ve Sunum Katmanı (Single Responsibility: Console Output)
    /// <summary>
    /// TEK SORUMLULUK (SRP):
    /// Hazırlanmış verilerin konsola yazdırılması, başlık ve telif hakkı
    /// bilgilerinin ekranda gösterilmesinden sorumludur.
    /// </summary>
    public class ConsoleOutputService
    {
        public void PrintBanner()
        {
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("================================================================");
            Console.WriteLine("     KONSOL ÜÇGEN ÇİZİMİ UYGULAMASI (SRP & DRY MİMARİSİ)       ");
            Console.WriteLine("     Telif Hakkı (C) 2026 Enes Öztürk. Tüm Hakları Saklıdır.    ");
            Console.WriteLine("================================================================");
            Console.ResetColor();
        }

        public void PrintError(string message)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"[HATA]: {message}");
            Console.ResetColor();
        }

        public void PrintTriangle(IEnumerable<string> rows)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            foreach (var row in rows)
            {
                Console.WriteLine(row);
            }
            Console.ResetColor();
        }
    }
    #endregion

    #region 5. Uygulama Yöneticisi ve Giriş Noktası (Application Orchestrator)
    public class TriangleAppController
    {
        private readonly InputValidator _validator;
        private readonly TriangleGeometryCalculator _calculator;
        private readonly ConsoleOutputService _outputService;

        // Dependency Injection ile sınıflar gevşek bağlı (loosely coupled) entegre edilir
        public TriangleAppController(
            InputValidator validator,
            TriangleGeometryCalculator calculator,
            ConsoleOutputService outputService)
        {
            _validator = validator;
            _calculator = calculator;
            _outputService = outputService;
        }

        public void Run()
        {
            _outputService.PrintBanner();

            Console.Write("\\nLütfen üçgenin boyutunu (yüksekliğini) giriniz: ");
            string? input = Console.ReadLine();

            var validation = _validator.Validate(input);
            if (!validation.IsValid)
            {
                _outputService.PrintError(validation.ErrorMessage!);
                return;
            }

            int size = validation.ParsedValue;
            var rows = _calculator.GeneratePyramidRows(size, '*');

            Console.WriteLine($"\\n{size} Boyutundaki Eşkenar Piramit Üçgen Çiziliyor:\\n");
            _outputService.PrintTriangle(rows);

            Console.WriteLine("\\nProgram başarıyla tamamlandı. Geliştirici: Enes Öztürk");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var validator = new InputValidator();
            var calculator = new TriangleGeometryCalculator();
            var output = new ConsoleOutputService();

            var app = new TriangleAppController(validator, calculator, output);
            app.Run();
        }
    }
    #endregion
}`;

export const JAVA_IMPLEMENTATION = `// ==============================================================================
// Telif Hakkı (C) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
// Proje: Console Triangle Drawer (Single Responsibility & DRY Principles)
// Geliştirici: Enes Öztürk
// ==============================================================================

package com.enesozturk.triangle;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

// 1. Doğrulama Sorumluluğu (Single Responsibility)
class InputValidator {
    private final int minSize;
    private final int maxSize;

    public InputValidator(int minSize, int maxSize) {
        this.minSize = minSize;
        this.maxSize = maxSize;
    }

    public ValidationResult validate(String raw) {
        if (raw == null || raw.trim().isEmpty()) {
            return new ValidationResult(false, "Boyut bilgisi boş girilemez.", 0);
        }
        try {
            int parsed = Integer.parseInt(raw.trim());
            if (parsed < minSize || parsed > maxSize) {
                return new ValidationResult(false, 
                    "Boyut " + minSize + " ile " + maxSize + " arasında olmalıdır.", 0);
            }
            return new ValidationResult(true, null, parsed);
        } catch (NumberFormatException e) {
            return new ValidationResult(false, "Lütfen geçerli bir tam sayı giriniz.", 0);
        }
    }
}

record ValidationResult(boolean isValid, String errorMessage, int value) {}

// 2. Geometri Hesaplama Sorumluluğu (Single Responsibility & DRY)
class TriangleCalculator {
    // DRY: Tekrarlayan string oluşturma metodu
    private String repeat(char c, int count) {
        if (count <= 0) return "";
        return String.valueOf(c).repeat(count);
    }

    public List<String> calculatePyramid(int size, char symbol) {
        List<String> rows = new ArrayList<>(size);
        for (int i = 1; i <= size; i++) {
            int spaces = size - i;
            int symbols = (2 * i) - 1;
            rows.add(repeat(' ', spaces) + repeat(symbol, symbols));
        }
        return rows;
    }
}

// 3. Konsol Yazdırma Sorumluluğu (Single Responsibility)
class ConsoleRenderer {
    public void printCopyrightBanner() {
        System.out.println("==================================================");
        System.out.println("     KONSOL ÜÇGEN ÇİZİMİ UYGULAMASI              ");
        System.out.println("     Telif Hakkı (C) 2026 Enes Öztürk            ");
        System.out.println("==================================================");
    }

    public void printLines(List<String> lines) {
        for (String line : lines) {
            System.out.println(line);
        }
    }
}

// 4. Ana Uygulama Orkestratörü
public class Main {
    public static void main(String[] args) {
        InputValidator validator = new InputValidator(1, 35);
        TriangleCalculator calculator = new TriangleCalculator();
        ConsoleRenderer renderer = new ConsoleRenderer();

        renderer.printCopyrightBanner();
        System.out.print("\\nBoyut giriniz: ");

        try (Scanner scanner = new Scanner(System.in)) {
            String input = scanner.nextLine();
            ValidationResult result = validator.validate(input);

            if (!result.isValid()) {
                System.err.println("[HATA]: " + result.errorMessage());
                return;
            }

            List<String> rows = calculator.calculatePyramid(result.value(), '*');
            renderer.printLines(rows);
            System.out.println("\\n(C) 2026 Enes Öztürk. Tüm Hakları Saklıdır.");
        }
    }
}`;

export const SRP_EXPLANATION = {
  title: "Single Responsibility Principle (Tek Sorumluluk İlkesi) Analizi",
  author: "Enes Öztürk",
  summary: "Robert C. Martin (Uncle Bob) tarafından ortaya konan SOLID prensiplerinin ilki olan SRP, 'Bir sınıfın değişmesi için yalnızca bir tek nedeni olmalıdır' der.",
  classes: [
    {
      name: "InputValidator",
      responsibility: "Girdi Güvenliği ve Doğrulama",
      reasonToChange: "İş kuralları veya boyut sınırları (örneğin min/max değerleri veya yeni bir girdi formatı) değiştiğinde yalnızca bu sınıf güncellenir.",
      doesNotDo: "Ekrana yazı yazmaz, üçgenin kaç yıldızdan oluşacağını hesaplamaz.",
    },
    {
      name: "TriangleGeometryCalculator",
      responsibility: "Matematiksel Algoritma & Geometri",
      reasonToChange: "Piramit formülü veya üçgen geometrisi değiştiğinde (örneğin içi boş üçgen eklendiğinde) yalnızca bu sınıf güncellenir.",
      doesNotDo: "Girdi almaz, konsol tamponu tutmaz, UI render etmez.",
    },
    {
      name: "ConsoleShapeRenderer",
      responsibility: "Çıktı Biçimlendirme & Sunum",
      reasonToChange: "Satır numaralandırma formatı, boşluk ön ekleri veya metin hizalama kuralları değiştiğinde yalnızca bu sınıf güncellenir.",
      doesNotDo: "Formül hesaplamaz, kullanıcı girdisi denetlemez.",
    },
    {
      name: "ConsoleBufferManager",
      responsibility: "Konsol Akışı ve Telif Hakları",
      reasonToChange: "Konsol tampon boyutu, Enes Öztürk lisans başlıkları veya log akışı formatı değiştiğinde güncellenir.",
      doesNotDo: "Üçgenin kaç karakter olacağına karışmaz.",
    },
    {
      name: "TriangleApplication",
      responsibility: "Orkestrasyon (Facade)",
      reasonToChange: "Uygulama yaşam döngüsü ve sınıflar arası veri akış adımları değiştiğinde güncellenir.",
      doesNotDo: "İç iş mantığını kendisi icra etmez; ilgili uzman sınıflara delege eder.",
    },
  ],
  dryAnalysis: [
    "Karakter ve boşluk üretimi string.repeat / StringBuilder mantığı ile tekil metotta toplanmıştır (generateCharSequence).",
    "Girdi doğrulama ve hata mesajı şablonları merkezileştirilmiştir.",
    "Telif hakkı başlığı ve imza verileri AUTHOR_SIGNATURE sabitinde toplanarak kodun muhtelif yerlerinde tekrar yazılması engellenmiştir.",
    "Satır indeksi ve hizalama hesaplamaları ConsoleShapeRenderer içinde tek noktada normalize edilmiştir.",
  ],
};
