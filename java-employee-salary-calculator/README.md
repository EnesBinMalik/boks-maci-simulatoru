# ☕ Java Employee Maaş Hesaplayıcı (Factory Payroll System)

[![Java](https://img.shields.io/badge/Java-8%20%7C%2011%20%7C%2017%20%7C%2021-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Developer](https://img.shields.io/badge/Developer-Enes%20Öztürk-indigo?style=for-the-badge)](https://github.com/)

Bu proje, bir fabrikada çalışan personellerin (**Employee**) maaş, vergi, mesai bonusu ve kıdem yılına bağlı maaş artışlarını (zam) hesaplayan nesne yönelimli (**OOP**) Java sınıfını ve etkileşimli simülatörünü içerir.

> **İmza:** Bu çalışma **Enes Öztürk** tarafından geliştirilmiştir.

---

## 📋 Problem Tanımı ve Kurallar

Fabrika çalışanlarını temsil eden `Employee` sınıfı **4 nitelik** ve **5 metot** barındırır.

### Sınıfın Nitelikleri (Attributes)
- `name` : Çalışanın adı ve soyadı (`String`)
- `salary` : Çalışanın taban brüt maaşı (`double`)
- `workHours` : Haftalık çalışma saati (`int`)
- `hireYear` : İşe başlangıç yılı (`int`)

### Sınıfın Metotları (Methods)
1. **`Employee(name, salary, workHours, hireYear)`** : 4 parametreli kurucu metot (Constructor).
2. **`tax()`** :
   - Maaş **1000 TL'den az ise** vergi uygulanmaz (`0.0 TL`).
   - Maaş **1000 TL'den fazla ise** maaşın **%3'ü** kadar vergi kesilir (`salary * 0.03`).
3. **`bonus()`** :
   - Çalışan haftada **40 saatten fazla** çalışmışsa, 40 saati aşan her saat için **30 TL** bonus ödenir (`(workHours - 40) * 30`).
4. **`raiseSalary()`** :
   - Çalışanın kıdemine göre (Referans yıl: **2021**) maaş zammı hesaplanır:
     - 10 yıldan az ise: **%5 zam** (`salary * 0.05`)
     - 9 yıldan fazla ve 20 yıldan az ise (10 - 19 yıl): **%10 zam** (`salary * 0.10`)
     - 19 yıldan fazla ise (20 yıl ve üzeri): **%15 zam** (`salary * 0.15`)
5. **`toString()`** :
   - Çalışanın tüm vergi, bonus, zam ve nihai maaş bilgilerini formatlı şekilde döndürür.

---

## 🧪 Örnek Test Vakası (Kemal)

Girdiler:
- **Adı:** kemal
- **Maaşı:** 2000.0 TL
- **Çalışma Saati:** 45 saat/hafta
- **Başlangıç Yılı:** 1985

Konsol Çıktısı:
```text
Adı : kemal
Maaşı : 2000.0
Çalışma Saati : 45
Başlangıç Yılı : 1985
Vergi : 60.0
Bonus : 150.0
Maaş Artışı : 300.0
Vergi ve Bonuslar ile birlikte maaş : 2090.0
Toplam Maaş : 2390.0
```

---

## 🚀 Projeyi Yerel Ortamda Çalıştırma

### Gereksinimler
- Java Development Kit (JDK 8 veya üzeri)

### Derleme ve Çalıştırma
```bash
# Kaynak dosyaları derleyin
javac Employee.java Main.java

# Programı çalıştırın
java Main
```

---

## 📂 Proje Yapısı

```
├── Employee.java    # Employee ana sınıfı (4 nitelik, 5 metot)
├── Main.java        # Test ve konsol çalıştırma sınıfı
└── README.md        # Proje dokümantasyonu
```

---

## 👤 Geliştirici

**Enes Öztürk**
- GitHub: [@enes-ozturk](https://github.com)
- Proje: Java Nesne Yönelimli Programlama - Fabrika Maaş Sistemi
