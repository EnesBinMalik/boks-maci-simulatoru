# Karakter Değiştirme Algoritması

Metinlerdeki karakterleri döngüsel olarak sola veya sağa kaydırmayı inceleyen interaktif algoritma uygulaması. Kelime veya tam metin üzerinde işlem yapabilir; kaydırma adımlarını görselleştirir ve birden fazla örnek durumu sınar.

## Özellikler

- Karakterleri sola veya sağa döngüsel kaydırma
- Kaydırma yönünü ve adım sayısını seçme
- Kelime bazında veya metnin tamamında çalışma
- İsteğe bağlı noktalama işaretlerini koruma
- Karakter hareketlerini adım adım görselleştirme
- Hazır test durumları ve toplu girdi işleme
- Algoritmanın örnek kodlarını ve açıklamalarını inceleme

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

- `src/utils/algorithm.ts` — metin kaydırma algoritmaları ve adım izleri
- `src/utils/codeSnippets.ts` — örnek kod parçacıkları
- `src/components/` — terminal, görselleştirici, test durumları ve kod görünümü
- `src/App.tsx` — uygulama akışı ve ekran bileşenlerinin koordinasyonu
- `src/main.tsx` — uygulama giriş noktası

## Kullanım

1. Metni girin ve sola ya da sağa kaydırma yönünü seçin.
2. Kaydırma adım sayısını ve kelime/tam metin modunu ayarlayın.
3. İsterseniz noktalama işaretlerinin korunmasını etkinleştirin.
4. Dönüştürmeyi çalıştırıp sonucu ve karakterlerin hareket adımlarını inceleyin.
