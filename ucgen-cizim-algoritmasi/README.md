# Üçgen Çizim Algoritması

Farklı üçgen desenlerini seçilen boyut ve karakterle oluşturan, algoritmanın satır hesaplarını açıklayan etkileşimli bir eğitim uygulaması. Girdi doğrulama, geometri hesaplama ve konsol çıktısı sorumlulukları ayrı servislerde düzenlenmiştir.

## Özellikler

- Eşkenar piramit, sola ve sağa dayalı dik üçgen, içi boş ve ters piramit çizimi
- Boyut ve çizim karakteri seçimi
- Satır numaraları ve formül açıklamaları
- İnteraktif terminal simülatörü ve adım adım algoritma görselleştirmesi
- Farklı uygulamaları ve mimariyi inceleme
- SRP ve DRY ilkelerini izleyen, servisleri koordine eden Facade mimarisi

## Teknolojiler

- React
- TypeScript
- Vite
- Tailwind CSS

## Gereksinimler

- Node.js LTS
- npm

## Kurulum ve çalıştırma

```bash
npm install
npm run dev
```

Geliştirme sunucusu başladıktan sonra terminalde gösterilen yerel adresi tarayıcıda açın.

## Kontroller ve üretim derlemesi

```bash
npm run lint
npm run build
```

`npm run lint` TypeScript tip denetimini, `npm run build` ise üretim derlemesini çalıştırır. Derlemeyi yerel olarak görüntülemek için `npm run build` sonrasında `npm run preview` komutunu kullanın.

## Proje yapısı

- `src/core/` — girdi doğrulama, satır geometrisi, çıktı biçimlendirme ve konsol tamponu
- `src/components/` — desen kontrolleri, terminal, görselleştirici ve mimari görünümleri
- `src/core/TriangleApplication.ts` — çizim akışını koordine eden uygulama servisi
- `src/main.tsx` — uygulama giriş noktası

## Kullanım

1. Desen türünü ve üçgen boyutunu seçin.
2. İsterseniz çizim karakterini ve satır numarası gösterimini ayarlayın.
3. Çizimi çalıştırıp terminal çıktısını ve her satırın formül açıklamasını inceleyin.
4. Diğer desenleri, örnek Java uygulamalarını ve mimari görünümünü karşılaştırın.
