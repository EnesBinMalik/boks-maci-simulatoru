# Karakter Değiştirici Konsol Uygulaması

İlk ve son karakterlerin yerini değiştiren interaktif metin algoritması. Kelime modunda her kelime ayrı işlenir ve aradaki boşluklar korunur; tam metin modunda metnin ilk ve son karakteri değiştirilir. İşlem adımları konsolda ve görsel inceleyicide gösterilir.

## Özellikler

- Her kelimenin ilk ve son karakterini değiştirme
- Tam metnin ilk ve son karakterini değiştirme
- Boşlukları ve kelime düzenini koruma
- Tek karakterli ve boş metinleri güvenli biçimde işleme
- Karakter takaslarını adım adım görselleştirme
- Etkileşimli terminal ve hazır test senaryoları
- C#, Python, Java, TypeScript ve C++ örnek kodları

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

- `src/utils/algorithm.ts` — karakter takası algoritması ve hazır testler
- `src/utils/codeTemplates.ts` — farklı programlama dillerinde örnek kodlar
- `src/components/` — terminal, görsel inceleyici ve kod çalışma alanı
- `src/types/index.ts` — algoritma sonucu ve arayüz tipleri
- `src/App.tsx` — uygulama akışı
- `src/main.tsx` — uygulama giriş noktası

## Kullanım

1. İşlenecek metni girin.
2. Kelime bazlı veya tam metin modunu seçin.
3. Algoritmayı çalıştırıp dönüştürülmüş metni inceleyin.
4. Her kelimenin ilk ve son karakterinin nasıl değiştiğini adımlardan takip edin.
