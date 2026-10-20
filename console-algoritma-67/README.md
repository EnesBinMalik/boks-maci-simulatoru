# Console Algoritma 67

Girilen sayıları 67 eşiğine göre değerlendiren etkileşimli bir algoritma ve konsol simülatörü. 67’den küçük değerlerin eşik farklarını toplar; büyük değerlerin 67’den farklarının karelerini toplar. Her sayı için işlem adımları ve ara sonuçlar görüntülenebilir.

## Özellikler

- Sayıları boşluk veya virgülle ayırarak girme
- 67’den küçük, eşit ve büyük değerleri ayrı ayrı değerlendirme
- Formül ve katkı değerlerini adım adım inceleme
- Etkileşimli terminal simülatörü
- Hazır örnek girdiler ve beklenen sonuçlar
- C#, Python, JavaScript ve C++ için konsol kod örnekleri

## Hesaplama kuralı

Her sayı `x` için:

- `x < 67` ise küçük fark toplamına `67 - x` eklenir.
- `x > 67` ise kare toplamına `(x - 67)²` eklenir.
- `x = 67` ise her iki toplama da `0` katkı yapar.

Örneğin `56 45 68 77` girdisi için çıktı `33 101` olur.

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

- `src/utils/algorithm.ts` — 67 eşiğine göre hesaplama ve hazır örnekler
- `src/components/` — terminal, adım adım analiz, kod görünümü ve örnekler
- `src/types/algorithm.ts` — hesaplama sonucu ve arayüz tipleri
- `src/App.tsx` — uygulama akışı ve sekmeler
- `src/main.tsx` — uygulama giriş noktası

## Kullanım

1. Sayıları boşluk veya virgülle ayırarak girin.
2. Hesaplamayı çalıştırıp iki toplam sonucunu görüntüleyin.
3. Adım adım analizden her sayının katkısını inceleyin.
4. İsterseniz hazır örneklerden birini veya kaynak kod görünümünü açın.
