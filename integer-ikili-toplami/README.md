# Integer İkililerin Toplamı

Boşluk, virgül veya satır sonlarıyla ayrılmış tam sayıları ikili gruplar halinde işleyen interaktif algoritma uygulaması. Farklı iki sayının toplamını, eşit sayı çiftleri için seçilen matematik moduna göre sonucu hesaplar; işlem adımlarını konsol ve görsel izleyicide gösterir.

## Özellikler

- Tam sayıları ikili gruplar halinde işleme
- Farklı sayılar için toplam hesabı
- Eşit sayılar için iki seçenek: örnek çıktı uyumlu `(a × b)²` veya matematiksel toplamın karesi `(a + b)²`
- Girdi doğrulama ve tek kalan sayı için uyarı
- Konsol simülatörü ve çift çift görsel hesaplama
- Hazır test örnekleri
- C#, Python, TypeScript, C++ ve Java kod örnekleri

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

- `src/utils/algorithm.ts` — girdi doğrulama ve integer ikililerin hesaplanması
- `src/data/codeSnippets.ts` — farklı programlama dillerinde örnek kodlar
- `src/components/` — konsol, görselleştirici, kod gezgini ve test örnekleri
- `src/types.ts` — algoritma sonucu ve mod tipleri
- `src/App.tsx` — uygulama akışı

## Kullanım

1. Tam sayıları boşluk veya virgülle ayırarak girin; örnek: `2 3 1 5 2 5 3 3`.
2. Eşit çiftler için kullanılacak hesaplama modunu seçin.
3. Sonuçları ve ikililerin işlem adımlarını inceleyin.
4. İsterseniz hazır testleri veya diğer dillerdeki örnek kodları açın.
