# Fibonacci Serisi ve Ortalama Hesaplayıcı

Kullanıcı tarafından belirlenen terim sayısına göre Fibonacci dizisini üretir; toplam, aritmetik ve geometrik ortalamaları, rakam dağılımını ve altın oran yakınsamasını analiz eder. Sonuçlar etkileşimli görselleştirmelerle incelenebilir ve dışa aktarılabilir.

## Özellikler

- Fibonacci dizisini farklı başlangıç varyantlarıyla hesaplama
- Girdi doğrulama ve adım adım hesaplama dökümü
- Toplam ve ortalama metriklerini görüntüleme
- Altın spiral görselleştirmesi ve altın oran yakınsama analizi
- Dizi terimleri ile 0–9 rakam frekanslarını inceleme
- Sonuçları CSV veya JSON olarak dışa aktarma
- Sorumlulukların ayrıldığı, Facade kullanan TypeScript mimarisi

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

`npm run lint`, TypeScript tip denetimini; `npm run build` ise üretim derlemesini çalıştırır. Derlemeyi yerel olarak görüntülemek için `npm run build` sonrasında `npm run preview` komutunu kullanın.

## Proje yapısı

- `src/core/` — Fibonacci üretimi, girdi doğrulama, ortalama ve rakam analizi, dışa aktarma
- `src/components/` — hesaplama kontrolleri, metrikler, tablolar ve görselleştirmeler
- `src/App.tsx` — uygulama akışı ve ekran bileşenlerinin koordinasyonu
- `src/main.tsx` — uygulama giriş noktası

## Kullanım

1. Hesaplama derinliğini ve dizi varyantını seçin.
2. Üretilen terimleri, metrikleri ve adım adım çözümü inceleyin.
3. Altın spiral veya rakam frekansı sekmelerinden ek analizlere göz atın.
4. Raporu panoya kopyalayın ya da CSV/JSON biçiminde dışa aktarın.
