export const JAVA_FIGHTER_CODE = `/**
 * Boks Maçı Simülasyonu - Dövüşçü Sınıfı
 * Hazırlayan: Enes Öztürk
 */
public class Fighter {
    String name;
    int damage;
    int health;
    int weight;
    double dodge;

    public Fighter(String name, int damage, int health, int weight, double dodge) {
        this.name = name;
        this.damage = damage;
        this.health = health;
        this.weight = weight;
        this.dodge = dodge;
    }

    public int hit(Fighter foe) {
        System.out.println("------------");
        System.out.println(this.name + " => " + foe.name + " " + this.damage + " hasar vurdu.");

        // Rakip hasarı savurabilir mi kontrolü
        if (foe.dodge()) {
            System.out.println(foe.name + " gelen hasarı savurdu.");
            return foe.health;
        }

        if (foe.health - this.damage < 0) {
            return 0;
        }

        return foe.health - this.damage;
    }

    public boolean dodge() {
        double randomValue = Math.random() * 100; // 0.0 ile 99.9 arasında rastgele değer
        return randomValue <= this.dodge;
    }
}`;

export const JAVA_RING_CODE = `/**
 * Boks Maçı Simülasyonu - Ring Sınıfı
 * %50 Başlangıç Olasılığı Entegre Edilmiş Sürüm
 * Hazırlayan: Enes Öztürk
 */
public class Ring {
    Fighter f1;
    Fighter f2;
    int minWeight;
    int maxWeight;

    public Ring(Fighter f1, Fighter f2, int minWeight, int maxWeight) {
        this.f1 = f1;
        this.f2 = f2;
        this.minWeight = minWeight;
        this.maxWeight = maxWeight;
    }

    /**
     * ÖDEV ŞARTI: İlk kimin dövüşe başlayacağını %50 olasılık ile hesaplayan metot.
     * Math.random() 0.0 (dahil) ile 1.0 (hariç) arasında double değer üretir.
     * 0.5'ten küçük veya eşit olma olasılığı tam olarak %50'dir.
     * @return true ise f1 başlar, false ise f2 başlar.
     */
    public boolean isFirst() {
        double randomValue = Math.random(); // 0.0 ile 1.0 arası rastgele sayı
        return randomValue <= 0.5;          // %50 şans
    }

    public void run() {
        if (checkWeight()) {
            // İlk dövüşe kimin başlayacağı %50 olasılıkla belirlenir:
            boolean f1Starts = isFirst();
            System.out.println("==================================================");
            System.out.println("YAZI-TURA ATIŞI: İlk Vuruşu Yapan (%50 Şans): " + (f1Starts ? f1.name : f2.name));
            System.out.println("==================================================");

            while (f1.health > 0 && f2.health > 0) {
                System.out.println("======== YENİ ROUND ===========");

                // Eğer yazı-turayı f1 kazandıysa önce f1 vurur, sonra f2 vurur
                if (f1Starts) {
                    f2.health = f1.hit(f2);
                    if (isWin()) {
                        break;
                    }
                    f1.health = f2.hit(f1);
                    if (isWin()) {
                        break;
                    }
                } 
                // Eğer f2 kazandıysa önce f2 vurur, sonra f1 vurur
                else {
                    f1.health = f2.hit(f1);
                    if (isWin()) {
                        break;
                    }
                    f2.health = f1.hit(f2);
                    if (isWin()) {
                        break;
                    }
                }

                printScore();
            }

        } else {
            System.out.println("Sporcuların ağırlıkları uyuşmuyor.");
        }
    }

    public boolean checkWeight() {
        return (f1.weight >= minWeight && f1.weight <= maxWeight) &&
               (f2.weight >= minWeight && f2.weight <= maxWeight);
    }

    public boolean isWin() {
        if (f1.health == 0) {
            System.out.println("----------------------------");
            System.out.println("Maçı Kazanan : " + f2.name);
            System.out.println("----------------------------");
            return true;
        } else if (f2.health == 0) {
            // NOT: Orijinal kod şablonundaki f2.name hatası f1.name olarak düzeltilmiştir.
            System.out.println("----------------------------");
            System.out.println("Maçı Kazanan : " + f1.name);
            System.out.println("----------------------------");
            return true;
        }

        return false;
    }

    public void printScore() {
        System.out.println("------------");
        System.out.println(f1.name + " Kalan Can \\t:" + f1.health);
        System.out.println(f2.name + " Kalan Can \\t:" + f2.health);
    }
}`;

export const JAVA_MAIN_CODE = `/**
 * Boks Maçı Simülasyonu - Ana Çalıştırıcı (Main)
 * Hazırlayan: Enes Öztürk
 */
public class Main {
    public static void main(String[] args) {
        // Fighter(name, damage, health, weight, dodge)
        Fighter marc = new Fighter("Marc", 15, 100, 90, 20); // Örn: %20 savurma
        Fighter alex = new Fighter("Alex", 10, 95, 100, 30); // Örn: %30 savurma

        // Ring(f1, f2, minWeight, maxWeight)
        Ring r = new Ring(marc, alex, 90, 100);
        
        // Simülasyonu çalıştır
        r.run();
    }
}`;

export const HOMEWORK_DETAILS = {
  title: "Boks Maçı Simülasyonu - %50 İlk Vuruş Entegrasyonu",
  author: "Enes Öztürk",
  subject: "Java OOP (Sınıflar & Nesneler) ve Olasılık Mantığı",
  solutionDescription: 
    "Projeye ilk vuruşu kimin yapacağını belirleyen isFirst() metodu entegre edilmiştir. " +
    "Math.random() metodu 0.0 (dahil) ile 1.0 (hariç) arasında tekdüze (uniform) dağılımla sayı üretir. " +
    "Üretilen sayının 0.5 değerinden küçük veya eşit olma ihtimali tam olarak %50'dir. " +
    "Eğer koşul sağlanırsa f1, sağlanmazsa f2 ilk vuruşu gerçekleştirir.",
  improvements: [
    "%50 başlangıç olasılığı için 'isFirst()' metodu eklendi.",
    "Orijinal şablondaki f2'nin canı sıfırlanmasına rağmen ekrana f2 yazdıran 'isWin()' mantık hatası düzeltildi (f2.health == 0 ise kazanan f1.name'dir).",
    "Sporcuların ağırlık kontrolü (checkWeight) başlangıçta denetlenir.",
    "Savurma mekanizması (dodge) yüzde kontrolü ile korunmuştur."
  ]
};
