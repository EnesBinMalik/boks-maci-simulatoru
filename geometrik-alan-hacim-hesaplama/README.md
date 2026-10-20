# Geometrik Alan ve Hacim Hesaplama

2D geometrik şekillerin alan ve çevrelerini, 3D cisimlerin hacim ve yüzey alanlarını hesaplayan etkileşimli bir matematik uygulaması. Hesaplamalar formüller ve adım adım açıklamalarla gösterilir; C# Console örnek kodları uygulama içinden incelenebilir.

## Özellikler

- Daire, kare, dikdörtgen ve üçgen için alan ve çevre hesaplama
- Küp, silindir ve küre için hacim ve yüzey alanı hesaplama
- Üçgen kenarları için üçgen eşitsizliği doğrulaması
- Formül, yerine koyma ve sonuç adımlarını inceleme
- Görsel hesaplama arayüzü ve konsol simülatörü
- C# Console kaynak kodu örneklerini görüntüleme
- Geometri motoru ve uygulama mimarisi rehberi

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

- `src/services/geometryEngine.ts` — geometrik hesaplamalar ve adım adım sonuçlar
- `src/data/shapesConfig.ts` — şekillerin parametreleri, formülleri ve hesaplama seçenekleri
- `src/data/csharpCode.ts` — C# Console kod örnekleri
- `src/components/` — görsel hesaplayıcı, konsol simülatörü ve mimari rehber
- `src/types/geometry.ts` — hesaplama ve şekil yapılandırması tipleri
- `src/App.tsx` — uygulama akışı

## Kullanım

1. Hesaplanacak 2D şekli veya 3D cismi seçin.
2. Boyut değerlerini ve birimleri girin.
3. Alan, çevre, hacim veya yüzey alanı hesaplamasını seçin.
4. Sonucu ve formülün adım adım uygulanışını inceleyin.
5. İlgili C# Console kodunu kod görünümünde açın.
