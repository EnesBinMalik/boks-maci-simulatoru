export const EMPLOYEE_JAVA_CODE = `/**
 * ============================================================================
 * Proje Adı   : Fabrika Çalışan Maaş Hesaplama Sistemi (Employee Class)
 * Yazar / İmza: Enes Öztürk
 * Tarih       : 2021 / 2026
 * Açıklama    : Fabrika çalışanlarını temsil eden; maaş, vergi, bonus,
 *               ve kıdem yılına göre zam hesaplayan nesne yönelimli Java sınıfı.
 * ============================================================================
 */
public class Employee {
    // Sınıfın Nitelikleri (Attributes)
    private String name;       // Çalışanın adı ve soyadı
    private double salary;     // Çalışanın maaşı
    private int workHours;     // Haftalık çalışma saati
    private int hireYear;      // İşe başlangıç yılı

    /**
     * Employee Kurucu Metodu (Constructor)
     * 4 parametre alarak yeni bir çalışan nesnesi oluşturur.
     *
     * @param name      Çalışanın adı ve soyadı
     * @param salary    Çalışanın brüt taban maaşı
     * @param workHours Haftalık toplam çalışma saati
     * @param hireYear  İşe başlama yılı
     */
    public Employee(String name, double salary, int workHours, int hireYear) {
        this.name = name;
        this.salary = salary;
        this.workHours = workHours;
        this.hireYear = hireYear;
    }

    /**
     * tax() Metodu:
     * Maaşa uygulanan vergiyi hesaplar.
     * - Maaş 1000 TL'den az ise vergi uygulanmaz (0 TL).
     * - Maaş 1000 TL veya daha fazla ise maaşının %3'ü kadar vergi uygulanır.
     *
     * @return Uygulanan vergi tutarı
     */
    public double tax() {
        if (this.salary > 1000) {
            return this.salary * 0.03;
        }
        return 0.0;
    }

    /**
     * bonus() Metodu:
     * Haftalık çalışma saatine göre mesai bonusunu hesaplar.
     * - Eğer çalışan haftada 40 saatten fazla çalışmış ise,
     *   fazladan çalıştığı her saat başına 30 TL bonus verilir.
     *
     * @return Kazanılan toplam bonus tutarı
     */
    public double bonus() {
        if (this.workHours > 40) {
            int extraHours = this.workHours - 40;
            return extraHours * 30.0;
        }
        return 0.0;
    }

    /**
     * raiseSalary() Metodu:
     * Çalışanın işe başlangıç yılına göre maaş artışını hesaplar.
     * Şuan ki yıl 2021 olarak baz alınmıştır.
     * - 10 yıldan az çalışmışsa: %5 zam
     * - 9 yıldan fazla ve 20 yıldan az (10 - 19 yıl): %10 zam
     * - 19 yıldan fazla (20 yıl ve üzeri): %15 zam
     *
     * @return Maaş artış tutarı (zam miktarı)
     */
    public double raiseSalary() {
        int currentYear = 2021;
        int yearsWorked = currentYear - this.hireYear;

        if (yearsWorked < 10) {
            return this.salary * 0.05;
        } else if (yearsWorked < 20) {
            return this.salary * 0.10;
        } else {
            return this.salary * 0.15;
        }
    }

    /**
     * toString() Metodu:
     * Çalışana ait tüm bordro ve hesaplama bilgilerini formatlı şekilde metin olarak döndürür.
     *
     * @return Formatlanmış çalışan bordro raporu
     */
    @Override
    public String toString() {
        double taxAmount = tax();
        double bonusAmount = bonus();
        double raiseAmount = raiseSalary();
        double salaryWithTaxAndBonus = this.salary - taxAmount + bonusAmount;
        double totalSalary = this.salary + raiseAmount + bonusAmount - taxAmount;

        return "Adı : " + this.name + "\\n" +
               "Maaşı : " + this.salary + "\\n" +
               "Çalışma Saati : " + this.workHours + "\\n" +
               "Başlangıç Yılı : " + this.hireYear + "\\n" +
               "Vergi : " + taxAmount + "\\n" +
               "Bonus : " + bonusAmount + "\\n" +
               "Maaş Artışı : " + raiseAmount + "\\n" +
               "Vergi ve Bonuslar ile birlikte maaş : " + salaryWithTaxAndBonus + "\\n" +
               "Toplam Maaş : " + totalSalary;
    }

    // Getter ve Setter Metotları (İhtiyaç halinde erişim için)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public int getWorkHours() {
        return workHours;
    }

    public void setWorkHours(int workHours) {
        this.workHours = workHours;
    }

    public int getHireYear() {
        return hireYear;
    }

    public void setHireYear(int hireYear) {
        this.hireYear = hireYear;
    }
}
`;

export const MAIN_JAVA_CODE = `/**
 * ============================================================================
 * Proje Adı   : Fabrika Çalışan Maaş Hesaplama Sistemi (Test Runner)
 * Yazar / İmza: Enes Öztürk
 * ============================================================================
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("   FABRİKA PERSONEL MAAŞ HESAPLAMA SİSTEMİ");
        System.out.println("   Geliştirici & İmza: Enes Öztürk");
        System.out.println("==================================================");

        // Örnek Test Vakası (Problem açıklamasında verilen "kemal" personeli)
        // Ad: kemal, Maaş: 2000.0, Çalışma Saati: 45, Başlangıç Yılı: 1985
        Employee kemal = new Employee("kemal", 2000.0, 45, 1985);

        // toString() metodunun konsola yazdırılması
        System.out.println(kemal.toString());

        System.out.println("--------------------------------------------------");
        System.out.println("İmza: Enes Öztürk");
        System.out.println("==================================================");

        // İkinci bir örnek çalışan testi:
        System.out.println("\\n--- Ek Test: Yeni İşe Başlayan Çalışan ---");
        Employee ahmet = new Employee("Ahmet Yılmaz", 950.0, 38, 2018);
        System.out.println(ahmet.toString());
    }
}
`;
