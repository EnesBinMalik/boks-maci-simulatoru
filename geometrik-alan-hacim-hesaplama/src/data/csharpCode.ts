/**
 * @license
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * C# Console Uygulaması Eksiksiz Kaynak Kodları
 */

export interface CSharpFile {
  filename: string;
  path: string;
  description: string;
  code: string;
}

export const CSHARP_FILES: CSharpFile[] = [
  {
    filename: 'Program.cs',
    path: 'GeometryApp/Program.cs',
    description: 'Uygulamanın ana giriş noktası. Sadece uygulama yaşam döngüsünü ve bağımlılıkları yönetir (SRP).',
    code: `// ============================================================================
// Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
// Proje: Geometrik Alan, Çevre ve Hacim Hesaplama Console Uygulaması
// Geliştirici: Enes Öztürk
// Lisans / Telif: Enes Öztürk adına tescillidir.
// Tasarım İlkeleri: SOLID - Single Responsibility Principle (SRP) & DRY
// ============================================================================

using System;
using GeometryApp.Services;

namespace GeometryApp
{
    /// <summary>
    /// Programın ana giriş sınıfı.
    /// Single Responsibility: Sadece uygulamanın yaşam döngüsünü başlatmaktan ve döngüyü sürdürmekten sorumludur.
    /// </summary>
    internal class Program
    {
        static void Main(string[] args)
        {
            // Bağımlılıkların oluşturulması (Dependency Injection / Separation of Concerns)
            IInputService inputService = new ConsoleInputService();
            ICalculatorPresenter presenter = new ConsolePresenter();
            GeometryAppManager appManager = new GeometryAppManager(inputService, presenter);

            // Uygulamayı başlat
            appManager.Run();
        }
    }
}
`
  },
  {
    filename: 'IShape.cs',
    path: 'GeometryApp/Interfaces/IShape.cs',
    description: 'Arayüz hiyerarşisi. 2D ve 3D geometrik şekillerin sözleşmelerini tanımlar.',
    code: `// ============================================================================
// Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
// Geliştirici: Enes Öztürk
// ============================================================================

using System.Collections.Generic;

namespace GeometryApp.Interfaces
{
    /// <summary>
    /// Tüm geometrik şekiller için temel arayüz.
    /// </summary>
    public interface IShape
    {
        string Name { get; }
        int Dimension { get; }
        string Description { get; }
    }

    /// <summary>
    /// 2 Boyutlu geometrik şekiller için sözleşme (Çevre ve Alan).
    /// Single Responsibility: 2D düzlem hesaplama sözleşmesini yönetir.
    /// </summary>
    public interface IShape2D : IShape
    {
        double CalculateArea();
        double CalculatePerimeter();
        CalculationReport GetCalculationReport(string calculationChoice);
    }

    /// <summary>
    /// 3 Boyutlu geometrik şekiller için sözleşme (Hacim, Yanal Alan, Toplam Yüzey Alanı).
    /// Single Responsibility: 3D uzay hesaplama sözleşmesini yönetir.
    /// </summary>
    public interface IShape3D : IShape
    {
        double CalculateVolume();
        double CalculateTotalSurfaceArea();
        double CalculateLateralArea();
        CalculationReport GetCalculationReport(string calculationChoice);
    }

    /// <summary>
    /// Adım adım hesaplama raporu modeli.
    /// </summary>
    public class CalculationReport
    {
        public string Title { get; set; } = string.Empty;
        public string ShapeName { get; set; } = string.Empty;
        public string CalculationType { get; set; } = string.Empty;
        public double ResultValue { get; set; }
        public string Unit { get; set; } = "cm";
        public List<string> GivenValues { get; set; } = new List<string>();
        public List<string> FormulaSteps { get; set; } = new List<string>();
        public string ConclusionSummary { get; set; } = string.Empty;
    }
}
`
  },
  {
    filename: 'Shapes2D.cs',
    path: 'GeometryApp/Models/Shapes2D.cs',
    description: '2 Boyutlu şekil sınıfları (Daire, Kare, Dikdörtgen, Üçgen). Her sınıf yalnızca kendi geometrisini bilir (SRP).',
    code: `// ============================================================================
// Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
// Geliştirici: Enes Öztürk
// ============================================================================

using System;
using System.Collections.Generic;
using GeometryApp.Interfaces;

namespace GeometryApp.Models
{
    /// <summary>
    /// Daire Sınıfı.
    /// Single Responsibility: Sadece Daire şeklinin özelliklerini ve matematiksel hesaplarını tutar.
    /// </summary>
    public class Circle : IShape2D
    {
        public string Name => "Daire";
        public int Dimension => 2;
        public string Description => "Sabit merkeze eşit uzaklıktaki noktalar kümesi.";

        public double Radius { get; }

        public Circle(double radius)
        {
            if (radius <= 0)
                throw new ArgumentException("Yarıçap sıfırdan büyük pozitif bir sayı olmalıdır.");
            Radius = radius;
        }

        public double CalculateArea() => Math.PI * Math.Pow(Radius, 2);

        public double CalculatePerimeter() => 2 * Math.PI * Radius;

        public CalculationReport GetCalculationReport(string calculationChoice)
        {
            var report = new CalculationReport
            {
                ShapeName = Name,
                GivenValues = new List<string> { $"Yarıçap (r): {Radius:F2} cm" }
            };

            if (calculationChoice == "1") // Çevre
            {
                report.Title = "Daire Çevre Hesaplaması";
                report.CalculationType = "Çevre (Ç)";
                report.ResultValue = CalculatePerimeter();
                report.Unit = "cm";
                report.FormulaSteps.Add("Formül: Ç = 2 · π · r");
                report.FormulaSteps.Add($"Yerine Koyma: Ç = 2 · {Math.PI:F4} · {Radius:F2}");
                report.FormulaSteps.Add($"Sonuç: {report.ResultValue:F4} cm");
                report.ConclusionSummary = $"Yarıçapı {Radius:F2} cm olan dairenin çevre uzunluğu {report.ResultValue:F4} cm'dir.";
            }
            else if (calculationChoice == "2") // Alan
            {
                report.Title = "Daire Alan Hesaplaması";
                report.CalculationType = "Alan (A)";
                report.ResultValue = CalculateArea();
                report.Unit = "cm²";
                report.FormulaSteps.Add("Formül: A = π · r²");
                report.FormulaSteps.Add($"Yerine Koyma: A = {Math.PI:F4} · ({Radius:F2})² = {Math.PI:F4} · {Math.Pow(Radius, 2):F2}");
                report.FormulaSteps.Add($"Sonuç: {report.ResultValue:F4} cm²");
                report.ConclusionSummary = $"Yarıçapı {Radius:F2} cm olan dairenin kapladığı alan {report.ResultValue:F4} cm²'dir.";
            }
            else // Her İkisi
            {
                double p = CalculatePerimeter();
                double a = CalculateArea();
                report.Title = "Daire Çevre ve Alan Analiz Raporu";
                report.CalculationType = "Çevre ve Alan";
                report.ResultValue = a;
                report.Unit = "cm²";
                report.FormulaSteps.Add($"1. Çevre Hesabı: Ç = 2 · π · r = 2 · {Math.PI:F4} · {Radius:F2} = {p:F4} cm");
                report.FormulaSteps.Add($"2. Alan Hesabı : A = π · r² = {Math.PI:F4} · ({Radius:F2})² = {a:F4} cm²");
                report.ConclusionSummary = $"Yarıçapı {Radius:F2} cm olan dairenin Çevresi: {p:F4} cm | Alanı: {a:F4} cm²'dir.";
            }

            return report;
        }
    }

    /// <summary>
    /// Kare Sınıfı.
    /// Single Responsibility: Sadece Kare geometrisi ve hesaplarından sorumludur.
    /// </summary>
    public class Square : IShape2D
    {
        public string Name => "Kare";
        public int Dimension => 2;
        public string Description => "Dört kenarı eşit, tüm iç açıları 90 derece düzgün dörtgen.";

        public double Side { get; }

        public Square(double side)
        {
            if (side <= 0)
                throw new ArgumentException("Kenar uzunluğu sıfırdan büyük olmalıdır.");
            Side = side;
        }

        public double CalculateArea() => Side * Side;

        public double CalculatePerimeter() => 4 * Side;

        public CalculationReport GetCalculationReport(string calculationChoice)
        {
            var report = new CalculationReport
            {
                ShapeName = Name,
                GivenValues = new List<string> { $"Kenar Uzunluğu (a): {Side:F2} cm" }
            };

            if (calculationChoice == "1") // Çevre
            {
                report.Title = "Kare Çevre Hesaplaması";
                report.CalculationType = "Çevre (Ç)";
                report.ResultValue = CalculatePerimeter();
                report.Unit = "cm";
                report.FormulaSteps.Add("Formül: Ç = 4 · a");
                report.FormulaSteps.Add($"Yerine Koyma: Ç = 4 · {Side:F2}");
                report.FormulaSteps.Add($"Sonuç: {report.ResultValue:F2} cm");
                report.ConclusionSummary = $"Bir kenarı {Side:F2} cm olan karenin çevresi {report.ResultValue:F2} cm'dir.";
            }
            else if (calculationChoice == "2") // Alan
            {
                report.Title = "Kare Alan Hesaplaması";
                report.CalculationType = "Alan (A)";
                report.ResultValue = CalculateArea();
                report.Unit = "cm²";
                report.FormulaSteps.Add("Formül: A = a²");
                report.FormulaSteps.Add($"Yerine Koyma: A = {Side:F2} · {Side:F2}");
                report.FormulaSteps.Add($"Sonuç: {report.ResultValue:F2} cm²");
                report.ConclusionSummary = $"Bir kenarı {Side:F2} cm olan karenin alanı {report.ResultValue:F2} cm²'dir.";
            }
            else
            {
                double p = CalculatePerimeter();
                double a = CalculateArea();
                report.Title = "Kare Çevre ve Alan Analiz Raporu";
                report.CalculationType = "Çevre ve Alan";
                report.ResultValue = a;
                report.Unit = "cm²";
                report.FormulaSteps.Add($"1. Çevre Hesabı: Ç = 4 · a = 4 · {Side:F2} = {p:F2} cm");
                report.FormulaSteps.Add($"2. Alan Hesabı : A = a² = ({Side:F2})² = {a:F2} cm²");
                report.ConclusionSummary = $"Kenarı {Side:F2} cm olan karenin Çevresi: {p:F2} cm | Alanı: {a:F2} cm²'dir.";
            }

            return report;
        }
    }

    /// <summary>
    /// Dikdörtgen Sınıfı.
    /// </summary>
    public class Rectangle : IShape2D
    {
        public string Name => "Dikdörtgen";
        public int Dimension => 2;
        public string Description => "Karşılıklı kenarları eşit ve açıları dik olan dörtgen.";

        public double Width { get; }
        public double Height { get; }

        public Rectangle(double width, double height)
        {
            if (width <= 0 || height <= 0)
                throw new ArgumentException("Kenar uzunlukları sıfırdan büyük olmalıdır.");
            Width = width;
            Height = height;
        }

        public double CalculateArea() => Width * Height;

        public double CalculatePerimeter() => 2 * (Width + Height);

        public CalculationReport GetCalculationReport(string calculationChoice)
        {
            var report = new CalculationReport
            {
                ShapeName = Name,
                GivenValues = new List<string>
                {
                    $"Kısa Kenar (a): {Width:F2} cm",
                    $"Uzun Kenar (b): {Height:F2} cm"
                }
            };

            if (calculationChoice == "1") // Çevre
            {
                report.Title = "Dikdörtgen Çevre Hesaplaması";
                report.CalculationType = "Çevre (Ç)";
                report.ResultValue = CalculatePerimeter();
                report.Unit = "cm";
                report.FormulaSteps.Add("Formül: Ç = 2 · (a + b)");
                report.FormulaSteps.Add($"Yerine Koyma: Ç = 2 · ({Width:F2} + {Height:F2}) = 2 · {Width + Height:F2}");
                report.FormulaSteps.Add($"Sonuç: {report.ResultValue:F2} cm");
                report.ConclusionSummary = $"Kenarları {Width:F2} cm ve {Height:F2} cm olan dikdörtgenin çevresi {report.ResultValue:F2} cm'dir.";
            }
            else if (calculationChoice == "2") // Alan
            {
                report.Title = "Dikdörtgen Alan Hesaplaması";
                report.CalculationType = "Alan (A)";
                report.ResultValue = CalculateArea();
                report.Unit = "cm²";
                report.FormulaSteps.Add("Formül: A = a · b");
                report.FormulaSteps.Add($"Yerine Koyma: A = {Width:F2} · {Height:F2}");
                report.FormulaSteps.Add($"Sonuç: {report.ResultValue:F2} cm²");
                report.ConclusionSummary = $"Kenarları {Width:F2} cm ve {Height:F2} cm olan dikdörtgenin alanı {report.ResultValue:F2} cm²'dir.";
            }
            else
            {
                double p = CalculatePerimeter();
                double a = CalculateArea();
                report.Title = "Dikdörtgen Çevre ve Alan Analiz Raporu";
                report.CalculationType = "Çevre ve Alan";
                report.ResultValue = a;
                report.Unit = "cm²";
                report.FormulaSteps.Add($"1. Çevre: Ç = 2 · ({Width:F2} + {Height:F2}) = {p:F2} cm");
                report.FormulaSteps.Add($"2. Alan : A = {Width:F2} · {Height:F2} = {a:F2} cm²");
                report.ConclusionSummary = $"Dikdörtgenin Çevresi: {p:F2} cm | Alanı: {a:F2} cm²'dir.";
            }

            return report;
        }
    }

    /// <summary>
    /// Üçgen Sınıfı.
    /// Heron formülü kullanarak 3 kenardan alan hesaplar.
    /// </summary>
    public class Triangle : IShape2D
    {
        public string Name => "Üçgen";
        public int Dimension => 2;
        public string Description => "Üç kenarlı düzlemsel geometrik şekil.";

        public double SideA { get; }
        public double SideB { get; }
        public double SideC { get; }

        public Triangle(double a, double b, double c)
        {
            if (a <= 0 || b <= 0 || c <= 0)
                throw new ArgumentException("Tüm kenarlar sıfırdan büyük olmalıdır.");

            // Üçgen eşitsizliği kontrolü (DRY & Domain Validation)
            if (a + b <= c || a + c <= b || b + c <= a)
                throw new ArgumentException($"Girilen kenarlar ({a}, {b}, {c}) üçgen oluşturamaz! Her kenar diğer ikisinin toplamından küçük olmalıdır.");

            SideA = a;
            SideB = b;
            SideC = c;
        }

        public double CalculatePerimeter() => SideA + SideB + SideC;

        public double CalculateArea()
        {
            // Heron Formülü: A = √(s · (s-a) · (s-b) · (s-c)), burada s = Ç/2
            double s = CalculatePerimeter() / 2.0;
            double areaSquared = s * (s - SideA) * (s - SideB) * (s - SideC);
            return Math.Sqrt(Math.Max(0, areaSquared));
        }

        public CalculationReport GetCalculationReport(string calculationChoice)
        {
            double p = CalculatePerimeter();
            double s = p / 2.0;
            double a = CalculateArea();

            var report = new CalculationReport
            {
                ShapeName = Name,
                GivenValues = new List<string>
                {
                    $"a kenarı: {SideA:F2} cm",
                    $"b kenarı: {SideB:F2} cm",
                    $"c kenarı: {SideC:F2} cm"
                }
            };

            if (calculationChoice == "1") // Çevre
            {
                report.Title = "Üçgen Çevre Hesaplaması";
                report.CalculationType = "Çevre (Ç)";
                report.ResultValue = p;
                report.Unit = "cm";
                report.FormulaSteps.Add("Formül: Ç = a + b + c");
                report.FormulaSteps.Add($"Yerine Koyma: Ç = {SideA:F2} + {SideB:F2} + {SideC:F2}");
                report.FormulaSteps.Add($"Sonuç: {p:F2} cm");
                report.ConclusionSummary = $"Kenarları {SideA:F2}, {SideB:F2}, {SideC:F2} cm olan üçgenin çevresi {p:F2} cm'dir.";
            }
            else if (calculationChoice == "2") // Alan
            {
                report.Title = "Üçgen Alan Hesaplaması (Heron Formülü)";
                report.CalculationType = "Alan (A)";
                report.ResultValue = a;
                report.Unit = "cm²";
                report.FormulaSteps.Add("1. Adım: Yarı çevre s = (a + b + c) / 2");
                report.FormulaSteps.Add($"         s = ({SideA:F2} + {SideB:F2} + {SideC:F2}) / 2 = {s:F2} cm");
                report.FormulaSteps.Add("2. Adım: Heron Alan Formülü: A = √(s · (s-a) · (s-b) · (s-c))");
                report.FormulaSteps.Add($"         A = √({s:F2} · {s - SideA:F2} · {s - SideB:F2} · {s - SideC:F2})");
                report.FormulaSteps.Add($"Sonuç  : {a:F4} cm²");
                report.ConclusionSummary = $"Üçgenin alanı Heron formülü ile {a:F4} cm² olarak hesaplanmıştır.";
            }
            else
            {
                report.Title = "Üçgen Çevre ve Alan Analiz Raporu";
                report.CalculationType = "Çevre ve Alan";
                report.ResultValue = a;
                report.Unit = "cm²";
                report.FormulaSteps.Add($"1. Çevre: Ç = {SideA:F2} + {SideB:F2} + {SideC:F2} = {p:F2} cm");
                report.FormulaSteps.Add($"2. Yarı Çevre (s): {s:F2} cm");
                report.FormulaSteps.Add($"3. Alan (Heron): A = √(s·(s-a)·(s-b)·(s-c)) = {a:F4} cm²");
                report.ConclusionSummary = $"Üçgenin Çevresi: {p:F2} cm | Alanı: {a:F4} cm²'dir.";
            }

            return report;
        }
    }
}
`
  },
  {
    filename: 'Shapes3D.cs',
    path: 'GeometryApp/Models/Shapes3D.cs',
    description: '3 Boyutlu şekil sınıfları (Küp, Silindir, Küre, Dikdörtgenler Prizması). Hacim ve yüzey alanı hesapları.',
    code: `// ============================================================================
// Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
// Geliştirici: Enes Öztürk
// ============================================================================

using System;
using System.Collections.Generic;
using GeometryApp.Interfaces;

namespace GeometryApp.Models
{
    /// <summary>
    /// Küp Sınıfı.
    /// Single Responsibility: Küp 3D uzay geometrisini hesaplar.
    /// </summary>
    public class Cube : IShape3D
    {
        public string Name => "Küp";
        public int Dimension => 3;
        public string Description => "6 eşit kareden oluşan düzgün altıyüzlü.";

        public double Edge { get; }

        public Cube(double edge)
        {
            if (edge <= 0)
                throw new ArgumentException("Ayrıt uzunluğu sıfırdan büyük olmalıdır.");
            Edge = edge;
        }

        public double CalculateVolume() => Math.Pow(Edge, 3);
        public double CalculateTotalSurfaceArea() => 6 * Math.Pow(Edge, 2);
        public double CalculateLateralArea() => 4 * Math.Pow(Edge, 2);

        public CalculationReport GetCalculationReport(string calculationChoice)
        {
            var report = new CalculationReport
            {
                ShapeName = Name,
                GivenValues = new List<string> { $"Ayrıt (a): {Edge:F2} cm" }
            };

            if (calculationChoice == "1") // Hacim
            {
                report.Title = "Küp Hacim Hesaplaması";
                report.CalculationType = "Hacim (V)";
                report.ResultValue = CalculateVolume();
                report.Unit = "cm³";
                report.FormulaSteps.Add("Formül: V = a³");
                report.FormulaSteps.Add($"Yerine Koyma: V = ({Edge:F2})³ = {Edge:F2} · {Edge:F2} · {Edge:F2}");
                report.FormulaSteps.Add($"Sonuç: {report.ResultValue:F2} cm³");
                report.ConclusionSummary = $"Bir ayrıtı {Edge:F2} cm olan küpün hacmi {report.ResultValue:F2} cm³'tür.";
            }
            else if (calculationChoice == "2") // Toplam Yüzey Alanı
            {
                report.Title = "Küp Toplam Yüzey Alanı";
                report.CalculationType = "Toplam Yüzey Alanı (At)";
                report.ResultValue = CalculateTotalSurfaceArea();
                report.Unit = "cm²";
                report.FormulaSteps.Add("Formül: At = 6 · a²");
                report.FormulaSteps.Add($"Yerine Koyma: At = 6 · ({Edge:F2})² = 6 · {Math.Pow(Edge, 2):F2}");
                report.FormulaSteps.Add($"Sonuç: {report.ResultValue:F2} cm²");
                report.ConclusionSummary = $"Bir ayrıtı {Edge:F2} cm olan küpün toplam yüzey alanı {report.ResultValue:F2} cm²'dir.";
            }
            else // Detaylı
            {
                double v = CalculateVolume();
                double ay = CalculateLateralArea();
                double at = CalculateTotalSurfaceArea();

                report.Title = "Küp Tam Hacim ve Alan Raporu";
                report.CalculationType = "Hacim ve Alanlar";
                report.ResultValue = v;
                report.Unit = "cm³";
                report.FormulaSteps.Add($"1. Hacim        : V = a³ = ({Edge:F2})³ = {v:F2} cm³");
                report.FormulaSteps.Add($"2. Yanal Alan   : Ay = 4 · a² = 4 · {Math.Pow(Edge, 2):F2} = {ay:F2} cm²");
                report.FormulaSteps.Add($"3. Toplam Alan  : At = 6 · a² = 6 · {Math.Pow(Edge, 2):F2} = {at:F2} cm²");
                report.ConclusionSummary = $"Küpün Hacmi: {v:F2} cm³ | Toplam Yüzey Alanı: {at:F2} cm² | Yanal Alanı: {ay:F2} cm²'dir.";
            }

            return report;
        }
    }

    /// <summary>
    /// Silindir Sınıfı.
    /// </summary>
    public class Cylinder : IShape3D
    {
        public string Name => "Silindir";
        public int Dimension => 3;
        public string Description => "Dairesel tabanlı dik prizmatik cisim.";

        public double Radius { get; }
        public double Height { get; }

        public Cylinder(double radius, double height)
        {
            if (radius <= 0 || height <= 0)
                throw new ArgumentException("Yarıçap ve yükseklik sıfırdan büyük olmalıdır.");
            Radius = radius;
            Height = height;
        }

        public double CalculateVolume() => Math.PI * Math.Pow(Radius, 2) * Height;
        public double CalculateLateralArea() => 2 * Math.PI * Radius * Height;
        public double CalculateTotalSurfaceArea() => CalculateLateralArea() + (2 * Math.PI * Math.Pow(Radius, 2));

        public CalculationReport GetCalculationReport(string calculationChoice)
        {
            var report = new CalculationReport
            {
                ShapeName = Name,
                GivenValues = new List<string>
                {
                    $"Taban Yarıçapı (r): {Radius:F2} cm",
                    $"Yükseklik (h): {Height:F2} cm"
                }
            };

            if (calculationChoice == "1") // Hacim
            {
                report.Title = "Silindir Hacim Hesaplaması";
                report.CalculationType = "Hacim (V)";
                report.ResultValue = CalculateVolume();
                report.Unit = "cm³";
                report.FormulaSteps.Add("Formül: V = π · r² · h");
                report.FormulaSteps.Add($"Yerine Koyma: V = {Math.PI:F4} · ({Radius:F2})² · {Height:F2}");
                report.FormulaSteps.Add($"Sonuç: {report.ResultValue:F4} cm³");
                report.ConclusionSummary = $"Silindirin hacmi {report.ResultValue:F4} cm³'tür.";
            }
            else if (calculationChoice == "2") // Toplam Alan
            {
                report.Title = "Silindir Toplam Yüzey Alanı";
                report.CalculationType = "Toplam Alan (At)";
                report.ResultValue = CalculateTotalSurfaceArea();
                report.Unit = "cm²";
                report.FormulaSteps.Add("Formül: At = 2·π·r·h + 2·(π·r²)");
                report.FormulaSteps.Add($"Sonuç: {report.ResultValue:F4} cm²");
                report.ConclusionSummary = $"Silindirin toplam yüzey alanı {report.ResultValue:F4} cm²'dir.";
            }
            else
            {
                double v = CalculateVolume();
                double ay = CalculateLateralArea();
                double at = CalculateTotalSurfaceArea();

                report.Title = "Silindir Tam Geometrik Raporu";
                report.CalculationType = "Hacim ve Yüzeyler";
                report.ResultValue = v;
                report.Unit = "cm³";
                report.FormulaSteps.Add($"1. Hacim      : V = π·r²·h = {v:F4} cm³");
                report.FormulaSteps.Add($"2. Yanal Alan : Ay = 2·π·r·h = {ay:F4} cm²");
                report.FormulaSteps.Add($"3. Toplam Alan: At = Ay + 2·TabanAlanı = {at:F4} cm²");
                report.ConclusionSummary = $"Silindirin Hacmi: {v:F4} cm³ | Toplam Alanı: {at:F4} cm²'dir.";
            }

            return report;
        }
    }

    /// <summary>
    /// Küre Sınıfı.
    /// </summary>
    public class Sphere : IShape3D
    {
        public string Name => "Küre";
        public int Dimension => 3;
        public string Description => "Uzayda sabit merkeze eşit uzaklıktaki noktaların kapalı yüzeyi.";

        public double Radius { get; }

        public Sphere(double radius)
        {
            if (radius <= 0)
                throw new ArgumentException("Yarıçap sıfırdan büyük olmalıdır.");
            Radius = radius;
        }

        public double CalculateVolume() => (4.0 / 3.0) * Math.PI * Math.Pow(Radius, 3);
        public double CalculateTotalSurfaceArea() => 4 * Math.PI * Math.Pow(Radius, 2);
        public double CalculateLateralArea() => CalculateTotalSurfaceArea();

        public CalculationReport GetCalculationReport(string calculationChoice)
        {
            var report = new CalculationReport
            {
                ShapeName = Name,
                GivenValues = new List<string> { $"Yarıçap (r): {Radius:F2} cm" }
            };

            if (calculationChoice == "1") // Hacim
            {
                report.Title = "Küre Hacim Hesaplaması";
                report.CalculationType = "Hacim (V)";
                report.ResultValue = CalculateVolume();
                report.Unit = "cm³";
                report.FormulaSteps.Add("Formül: V = (4/3) · π · r³");
                report.FormulaSteps.Add($"Yerine Koyma: V = (4/3) · {Math.PI:F4} · ({Radius:F2})³");
                report.FormulaSteps.Add($"Sonuç: {report.ResultValue:F4} cm³");
                report.ConclusionSummary = $"Yarıçapı {Radius:F2} cm olan kürenin hacmi {report.ResultValue:F4} cm³'tür.";
            }
            else if (calculationChoice == "2") // Yüzey Alanı
            {
                report.Title = "Küre Yüzey Alanı Hesaplaması";
                report.CalculationType = "Yüzey Alanı (A)";
                report.ResultValue = CalculateTotalSurfaceArea();
                report.Unit = "cm²";
                report.FormulaSteps.Add("Formül: A = 4 · π · r²");
                report.FormulaSteps.Add($"Yerine Koyma: A = 4 · {Math.PI:F4} · ({Radius:F2})²");
                report.FormulaSteps.Add($"Sonuç: {report.ResultValue:F4} cm²");
                report.ConclusionSummary = $"Yarıçapı {Radius:F2} cm olan kürenin yüzey alanı {report.ResultValue:F4} cm²'dir.";
            }
            else
            {
                double v = CalculateVolume();
                double a = CalculateTotalSurfaceArea();
                report.Title = "Küre Hacim ve Alan Raporu";
                report.CalculationType = "Hacim ve Alan";
                report.ResultValue = v;
                report.Unit = "cm³";
                report.FormulaSteps.Add($"1. Hacim: V = (4/3)·π·r³ = {v:F4} cm³");
                report.FormulaSteps.Add($"2. Alan : A = 4·π·r² = {a:F4} cm²");
                report.ConclusionSummary = $"Kürenin Hacmi: {v:F4} cm³ | Yüzey Alanı: {a:F4} cm²'dir.";
            }

            return report;
        }
    }
}
`
  },
  {
    filename: 'InputService.cs',
    path: 'GeometryApp/Services/InputService.cs',
    description: 'Kullanıcı giriş işlemlerini ve doğrulamaları yöneten servis. DRY ve SRP gereği tüm giriş mantığı tek merkezdedir.',
    code: `// ============================================================================
// Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
// Geliştirici: Enes Öztürk
// Tasarım İlkesi: DRY (Kod Tekrarından Kaçınma) & SRP
// ============================================================================

using System;
using System.Globalization;

namespace GeometryApp.Services
{
    public interface IInputService
    {
        double ReadPositiveDouble(string prompt);
        string ReadChoice(string prompt, string[] validChoices);
        bool ReadYesNo(string prompt);
    }

    /// <summary>
    /// Konsoldan veri okuma ve tip doğrulaması yapan servis.
    /// Single Responsibility: Yalnızca konsol girişlerini okumak ve kullanıcı verilerini doğrulamakla yükümlüdür.
    /// Kod tekrarından kaçınmak (DRY) için tüm double kontrolleri tek metod üzerinden yürütülür.
    /// </summary>
    public class ConsoleInputService : IInputService
    {
        public double ReadPositiveDouble(string prompt)
        {
            while (true)
            {
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.Write($"{prompt}: ");
                Console.ResetColor();

                string? input = Console.ReadLine()?.Trim();

                // Hem virgül hem nokta ile ondalık ayrımını destekle (Kullanıcı dostu DRY yaklaşımı)
                if (!string.IsNullOrEmpty(input))
                {
                    input = input.Replace(',', '.');
                    if (double.TryParse(input, NumberStyles.Any, CultureInfo.InvariantCulture, out double value))
                    {
                        if (value > 0)
                        {
                            return value;
                        }
                        ShowError("Hata: Değer sıfırdan büyük pozitif bir sayı olmalıdır.");
                    }
                    else
                    {
                        ShowError("Hata: Lütfen geçerli bir sayısal değer giriniz (Örn: 5 veya 7.5).");
                    }
                }
                else
                {
                    ShowError("Hata: Boş değer bırakılamaz.");
                }
            }
        }

        public string ReadChoice(string prompt, string[] validChoices)
        {
            while (true)
            {
                Console.ForegroundColor = ConsoleColor.Cyan;
                Console.Write($"{prompt}: ");
                Console.ResetColor();

                string input = Console.ReadLine()?.Trim().ToUpperInvariant() ?? string.Empty;

                foreach (var choice in validChoices)
                {
                    if (string.Equals(choice, input, StringComparison.OrdinalIgnoreCase))
                    {
                        return input;
                    }
                }

                ShowError($"Hata: Lütfen geçerli bir seçenek giriniz [{string.Join(", ", validChoices)}].");
            }
        }

        public bool ReadYesNo(string prompt)
        {
            while (true)
            {
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.Write($"{prompt} (E/H): ");
                Console.ResetColor();

                string input = Console.ReadLine()?.Trim().ToUpperInvariant() ?? string.Empty;
                if (input == "E" || input == "EVET") return true;
                if (input == "H" || input == "HAYIR") return false;

                ShowError("Lütfen 'E' (Evet) veya 'H' (Hayır) giriniz.");
            }
        }

        private void ShowError(string message)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"[!] {message}");
            Console.ResetColor();
        }
    }
}
`
  },
  {
    filename: 'Presenter.cs',
    path: 'GeometryApp/Services/Presenter.cs',
    description: 'Konsol UI çıktısını, renkleri, ASCII başlıklarını ve Enes Öztürk telif hakkı bildirimini biçimlendiren sunucu (SRP).',
    code: `// ============================================================================
// Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
// Geliştirici: Enes Öztürk
// Tasarım İlkesi: Single Responsibility Principle (Sunum ve Biçimlendirme)
// ============================================================================

using System;
using GeometryApp.Interfaces;

namespace GeometryApp.Services
{
    public interface ICalculatorPresenter
    {
        void ShowWelcomeBanner();
        void ShowShapeMenu();
        void ShowCalculationMenu2D();
        void ShowCalculationMenu3D();
        void PresentReport(CalculationReport report);
        void ShowGoodbye();
    }

    /// <summary>
    /// Konsol çıktılarını biçimlendiren sınıf.
    /// Single Responsibility: Sadece ekrana renkli, anlaşılır ve estetik çıktı basmaktan sorumludur.
    /// </summary>
    public class ConsolePresenter : ICalculatorPresenter
    {
        public void ShowWelcomeBanner()
        {
            Console.Clear();
            Console.ForegroundColor = ConsoleColor.DarkCyan;
            Console.WriteLine("╔══════════════════════════════════════════════════════════════════════╗");
            Console.WriteLine("║                 GEOMETRİK HESAPLAMA MOTORU                          ║");
            Console.WriteLine("║            (Alan, Çevre ve Hacim Hesaplama Sistemi)                 ║");
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("║  Telif Hakkı (c) 2026 Enes Öztürk - Tüm Hakları Saklıdır.            ║");
            Console.WriteLine("║  Geliştirici : Enes Öztürk                                           ║");
            Console.WriteLine("║  Mimari      : SOLID (Single Responsibility) & DRY Prensipleri       ║");
            Console.ForegroundColor = ConsoleColor.DarkCyan;
            Console.WriteLine("╚══════════════════════════════════════════════════════════════════════╝");
            Console.ResetColor();
            Console.WriteLine();
        }

        public void ShowShapeMenu()
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("─── İŞLEM YAPILACAK GEOMETRİK ŞEKLİ SEÇİNİZ ───");
            Console.ResetColor();
            Console.WriteLine(" [1] Daire                (2 Boyutlu)");
            Console.WriteLine(" [2] Kare                 (2 Boyutlu)");
            Console.WriteLine(" [3] Dikdörtgen           (2 Boyutlu)");
            Console.WriteLine(" [4] Üçgen                (2 Boyutlu - Heron / 3 Kenar)");
            Console.WriteLine(" [5] Küp                  (3 Boyutlu)");
            Console.WriteLine(" [6] Silindir             (3 Boyutlu)");
            Console.WriteLine(" [7] Küre                 (3 Boyutlu)");
            Console.WriteLine(" [Ç] Çıkış");
            Console.WriteLine();
        }

        public void ShowCalculationMenu2D()
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("─── HESAPLANMAK İSTENEN BOYUTU SEÇİNİZ (2D) ───");
            Console.ResetColor();
            Console.WriteLine(" [1] Çevre Uzunluğu (Ç)");
            Console.WriteLine(" [2] Alan (A)");
            Console.WriteLine(" [3] Hem Çevre Hem Alan (Detaylı Analiz)");
            Console.WriteLine();
        }

        public void ShowCalculationMenu3D()
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("─── HESAPLANMAK İSTENEN BOYUTU SEÇİNİZ (3D) ───");
            Console.ResetColor();
            Console.WriteLine(" [1] Hacim (V)");
            Console.WriteLine(" [2] Toplam Yüzey Alanı (At)");
            Console.WriteLine(" [3] Tümü (Hacim, Yanal Alan ve Toplam Yüzey Alanı)");
            Console.WriteLine();
        }

        public void PresentReport(CalculationReport report)
        {
            Console.WriteLine();
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("╔══════════════════════════════════════════════════════════════════════╗");
            Console.WriteLine($"║ HESAPLAMA SONUCU : {report.Title,-49} ║");
            Console.WriteLine("╚══════════════════════════════════════════════════════════════════════╝");
            Console.ResetColor();

            Console.ForegroundColor = ConsoleColor.DarkGray;
            Console.WriteLine("GİRİLEN DEĞERLER:");
            Console.ResetColor();
            foreach (var val in report.GivenValues)
            {
                Console.WriteLine($"  • {val}");
            }
            Console.WriteLine();

            Console.ForegroundColor = ConsoleColor.DarkYellow;
            Console.WriteLine("ADIM ADIM MATEMATİKSEL İŞLEM:");
            Console.ResetColor();
            foreach (var step in report.FormulaSteps)
            {
                Console.WriteLine($"  → {step}");
            }
            Console.WriteLine();

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("┌──────────────────────────────────────────────────────────────────────┐");
            Console.WriteLine($"│ ANLAŞILIR ÖZET :                                                     │");
            Console.WriteLine($"│ {report.ConclusionSummary,-68} │");
            Console.WriteLine("└──────────────────────────────────────────────────────────────────────┘");
            Console.ResetColor();

            // Telif hakkı imza satırı
            Console.ForegroundColor = ConsoleColor.DarkCyan;
            Console.WriteLine(" [✓] Geliştirici ve Telif Sahibi: Enes Öztürk | Tüm Hakları Saklıdır.");
            Console.ResetColor();
            Console.WriteLine();
        }

        public void ShowGoodbye()
        {
            Console.ForegroundColor = ConsoleColor.Magenta;
            Console.WriteLine("\nUygulamayı kullandığınız için teşekkür ederiz.");
            Console.WriteLine("Telif Hakkı (c) 2026 Enes Öztürk.");
            Console.ResetColor();
        }
    }
}
`
  },
  {
    filename: 'GeometryAppManager.cs',
    path: 'GeometryApp/Services/GeometryAppManager.cs',
    description: 'Ana iş akışını yöneten orkestratör. Şekil fabrikasını çağırır ve akışı yürütür.',
    code: `// ============================================================================
// Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
// Geliştirici: Enes Öztürk
// Tasarım İlkesi: Single Responsibility (İş Akışı Yönetimi)
// ============================================================================

using System;
using GeometryApp.Interfaces;
using GeometryApp.Models;

namespace GeometryApp.Services
{
    /// <summary>
    /// Uygulama iş akışını yöneten koordinatör sınıf.
    /// </summary>
    public class GeometryAppManager
    {
        private readonly IInputService _input;
        private readonly ICalculatorPresenter _presenter;

        public GeometryAppManager(IInputService input, ICalculatorPresenter presenter)
        {
            _input = input;
            _presenter = presenter;
        }

        public void Run()
        {
            bool continueApp = true;

            while (continueApp)
            {
                _presenter.ShowWelcomeBanner();
                _presenter.ShowShapeMenu();

                string shapeChoice = _input.ReadChoice("Lütfen bir şekil seçiniz (1-7 veya Ç)", new[] { "1", "2", "3", "4", "5", "6", "7", "Ç", "C" });

                if (shapeChoice == "Ç" || shapeChoice == "C")
                {
                    break;
                }

                try
                {
                    ProcessShapeChoice(shapeChoice);
                }
                catch (Exception ex)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"\\n[HATA] Bir sorun oluştu: {ex.Message}\\n");
                    Console.ResetColor();
                }

                continueApp = _input.ReadYesNo("Yeni bir hesaplama yapmak istiyor musunuz?");
            }

            _presenter.ShowGoodbye();
        }

        private void ProcessShapeChoice(string choice)
        {
            Console.WriteLine();

            switch (choice)
            {
                case "1": // Daire
                    {
                        double r = _input.ReadPositiveDouble("Dairenin yarıçapını (r) giriniz [cm]");
                        var circle = new Circle(r);
                        _presenter.ShowCalculationMenu2D();
                        string calcChoice = _input.ReadChoice("Hesaplama türünü seçiniz (1-3)", new[] { "1", "2", "3" });
                        var report = circle.GetCalculationReport(calcChoice);
                        _presenter.PresentReport(report);
                        break;
                    }

                case "2": // Kare
                    {
                        double a = _input.ReadPositiveDouble("Karenin bir kenar uzunluğunu (a) giriniz [cm]");
                        var square = new Square(a);
                        _presenter.ShowCalculationMenu2D();
                        string calcChoice = _input.ReadChoice("Hesaplama türünü seçiniz (1-3)", new[] { "1", "2", "3" });
                        var report = square.GetCalculationReport(calcChoice);
                        _presenter.PresentReport(report);
                        break;
                    }

                case "3": // Dikdörtgen
                    {
                        double w = _input.ReadPositiveDouble("Kısa kenarı (a) giriniz [cm]");
                        double h = _input.ReadPositiveDouble("Uzun kenarı (b) giriniz [cm]");
                        var rect = new Rectangle(w, h);
                        _presenter.ShowCalculationMenu2D();
                        string calcChoice = _input.ReadChoice("Hesaplama türünü seçiniz (1-3)", new[] { "1", "2", "3" });
                        var report = rect.GetCalculationReport(calcChoice);
                        _presenter.PresentReport(report);
                        break;
                    }

                case "4": // Üçgen
                    {
                        while (true)
                        {
                            try
                            {
                                double a = _input.ReadPositiveDouble("1. Kenar uzunluğunu (a) giriniz [cm]");
                                double b = _input.ReadPositiveDouble("2. Kenar uzunluğunu (b) giriniz [cm]");
                                double c = _input.ReadPositiveDouble("3. Kenar uzunluğunu (c) giriniz [cm]");
                                var triangle = new Triangle(a, b, c);
                                _presenter.ShowCalculationMenu2D();
                                string calcChoice = _input.ReadChoice("Hesaplama türünü seçiniz (1-3)", new[] { "1", "2", "3" });
                                var report = triangle.GetCalculationReport(calcChoice);
                                _presenter.PresentReport(report);
                                break;
                            }
                            catch (ArgumentException argEx)
                            {
                                Console.ForegroundColor = ConsoleColor.Red;
                                Console.WriteLine($"\\n[UYARI] {argEx.Message} Lütfen tekrar giriniz.\\n");
                                Console.ResetColor();
                            }
                        }
                        break;
                    }

                case "5": // Küp
                    {
                        double edge = _input.ReadPositiveDouble("Küpün bir ayrıt uzunluğunu (a) giriniz [cm]");
                        var cube = new Cube(edge);
                        _presenter.ShowCalculationMenu3D();
                        string calcChoice = _input.ReadChoice("Hesaplama türünü seçiniz (1-3)", new[] { "1", "2", "3" });
                        var report = cube.GetCalculationReport(calcChoice);
                        _presenter.PresentReport(report);
                        break;
                    }

                case "6": // Silindir
                    {
                        double r = _input.ReadPositiveDouble("Silindirin taban yarıçapını (r) giriniz [cm]");
                        double h = _input.ReadPositiveDouble("Silindirin yüksekliğini (h) giriniz [cm]");
                        var cylinder = new Cylinder(r, h);
                        _presenter.ShowCalculationMenu3D();
                        string calcChoice = _input.ReadChoice("Hesaplama türünü seçiniz (1-3)", new[] { "1", "2", "3" });
                        var report = cylinder.GetCalculationReport(calcChoice);
                        _presenter.PresentReport(report);
                        break;
                    }

                case "7": // Küre
                    {
                        double r = _input.ReadPositiveDouble("Kürenin yarıçapını (r) giriniz [cm]");
                        var sphere = new Sphere(r);
                        _presenter.ShowCalculationMenu3D();
                        string calcChoice = _input.ReadChoice("Hesaplama türünü seçiniz (1-3)", new[] { "1", "2", "3" });
                        var report = sphere.GetCalculationReport(calcChoice);
                        _presenter.PresentReport(report);
                        break;
                    }
            }
        }
    }
}
`
  },
  {
    filename: 'GeometryCalculator.csproj',
    path: 'GeometryApp/GeometryCalculator.csproj',
    description: '.NET 8 / 9 SDK proje dosyası. Telif hakkı ve derleme metadata tanımlarını içerir.',
    code: `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <AssemblyTitle>Geometrik Alan, Çevre ve Hacim Hesaplama</AssemblyTitle>
    <Product>GeometryCalculator</Product>
    <Company>Enes Öztürk</Company>
    <Authors>Enes Öztürk</Authors>
    <Copyright>Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.</Copyright>
    <Description>SOLID (SRP) ve DRY kurallarına uygun C# Console Alan, Çevre ve Hacim Hesaplayıcı.</Description>
  </PropertyGroup>

</Project>
`
  }
];
