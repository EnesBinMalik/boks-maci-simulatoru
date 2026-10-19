/**
 * ============================================================================
 * Proje Adı   : Fabrika Çalışan Maaş Hesaplama Sistemi (Main Class)
 * Geliştirici : Enes Öztürk
 * İmza        : Enes Öztürk
 * ============================================================================
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("   FABRİKA PERSONEL MAAŞ HESAPLAMA SİSTEMİ");
        System.out.println("   Geliştirici & İmza: Enes Öztürk");
        System.out.println("==================================================");

        // Örnek Test: Kemal personeli
        // Adı : kemal, Maaşı : 2000.0, Çalışma Saati : 45, Başlangıç Yılı : 1985
        Employee kemal = new Employee("kemal", 2000.0, 45, 1985);

        // toString() metodunu ekrana bastır
        System.out.println(kemal.toString());

        System.out.println("--------------------------------------------------");
        System.out.println("İmza: Enes Öztürk");
        System.out.println("==================================================");
    }
}
