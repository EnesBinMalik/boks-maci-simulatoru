# İkili Sessiz Harf Algoritması

Metindeki kelimeleri inceleyerek yan yana en az iki sessiz harf içerip içermediklerini belirleyen etkileşimli bir algoritma uygulaması. Türkçe karakterleri ve büyük/küçük harfleri destekler; her kelimenin harf analizini ve bulunan sessiz harf çiftlerini görselleştirir.

## Özellikler

- Birden fazla kelimeyi tek seferde analiz etme
- Türkçe sesli harfleri tanıma: `a, e, ı, i, o, ö, u, ü`
- Unicode harfleri ve Türkçe büyük/küçük harf dönüşümlerini destekleme
- Kelimedeki ardışık sessiz harf çiftlerini konumlarıyla gösterme
- Sonuçları Türkçe, İngilizce, Pascal biçiminde veya `1`/`0` olarak sunma
- Görsel inceleyici, interaktif terminal ve kod çalışma alanı
- Hazır C#, Python, Java, TypeScript ve C++ örneklerini inceleme

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

- `src/utils/algorithm.ts` — harf tanıma, kelime analizi ve sonuç biçimlendirme
- `src/utils/codeSnippets.ts` — farklı programlama dillerinde örnek kodlar
- `src/components/` — terminal, görsel inceleyici, kod alanı ve telif görünümü
- `src/types/algorithm.ts` — analiz sonucu ve arayüz tipleri
- `src/App.tsx` — uygulama akışı
- `src/main.tsx` — uygulama giriş noktası

## Kullanım

1. Analiz edilecek kelime veya kelimeleri girin.
2. Sonuç biçimini seçin: Türkçe, İngilizce, Pascal veya ikili.
3. Analizi çalıştırıp her kelimenin sonucunu görüntüleyin.
4. Görsel inceleyicide harf sınıflarını ve bulunan ardışık sessiz harf çiftlerini inceleyin.
