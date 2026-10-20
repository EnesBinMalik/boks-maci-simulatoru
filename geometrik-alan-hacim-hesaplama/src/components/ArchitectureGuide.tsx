/**
 * @license
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * Mimari ve SOLID (SRP) Dokümantasyonu
 */

import React from 'react';
import { AUTHOR_NAME, COPYRIGHT_NOTICE } from '../data/shapesConfig';
import { Layers, ShieldCheck, CheckCircle, Cpu, GitBranch, Sparkles } from 'lucide-react';

export const ArchitectureGuide: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 text-slate-200">
      {/* Mimari Başlık Kartı */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
              <Sparkles className="w-4 h-4" />
              <span>SOLID YAZILIM PRENSİPLERİ VE MİMARİ RAPOR</span>
            </div>
            <h2 className="text-xl font-bold text-slate-100">
              Single Responsibility (SRP) ve DRY Uygulama Mimarisi
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Bu uygulama, nesne yönelimli programlama (OOP) ilkelerine, tek sorumluluk kuralına ve kod tekrarını engelleyen temiz kod standartlarına göre tasarlanmıştır.
            </p>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-right">
            <span className="text-[11px] text-slate-400 block">Telif Sahibi</span>
            <span className="text-sm font-bold text-cyan-300">{AUTHOR_NAME}</span>
            <span className="text-[10px] text-slate-500 block">{COPYRIGHT_NOTICE}</span>
          </div>
        </div>
      </div>

      {/* 2 Sütunlu Karşılaştırma & Prensip Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SRP Kartı */}
        <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-950 border border-cyan-800 rounded-xl text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                1. Single Responsibility Principle (SRP)
              </h3>
              <p className="text-xs text-slate-400">Tek Sorumluluk Prensibi</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            &ldquo;Bir sınıfın veya modülün değişmek için yalnızca tek bir nedeni olmalıdır.&rdquo; Uygulamadaki sorumluluk paylaşımı şöyledir:
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="font-semibold text-cyan-300 block">Şekil Sınıfları (Circle, Square, Triangle, Cube...):</span>
              <span className="text-slate-400 text-[11px]">
                Yalnızca kendi matematiksel formüllerini ve kenar niteliklerini bilir. Konsol giriş veya yazdırma işlemleriyle asla ilgilenmez.
              </span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="font-semibold text-cyan-300 block">ConsoleInputService (IInputService):</span>
              <span className="text-slate-400 text-[11px]">
                Yalnızca konsoldan kullanıcı girdisini okuma, tip dönüşümü (double parse) ve pozitif sayı doğrulamasından sorumludur.
              </span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="font-semibold text-cyan-300 block">ConsolePresenter (ICalculatorPresenter):</span>
              <span className="text-slate-400 text-[11px]">
                Yalnızca ekrana renkli çıktı basma, ASCII bannerları, Enes Öztürk imza ve telif haklarını biçimlendirmekle yükümlüdür.
              </span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="font-semibold text-cyan-300 block">GeometryAppManager & Program.cs:</span>
              <span className="text-slate-400 text-[11px]">
                İş akışını orkestre eder ve uygulamanın yaşam döngüsünü kontrol eder.
              </span>
            </div>
          </div>
        </div>

        {/* DRY Kartı */}
        <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-950 border border-emerald-800 rounded-xl text-emerald-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                2. Don&apos;t Repeat Yourself (DRY)
              </h3>
              <p className="text-xs text-slate-400">Kod Tekrarından Kaçınma</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            &ldquo;Her bilgi parçası bir sistem içinde tek, belirgin ve yetkili bir temsile sahip olmalıdır.&rdquo; Projede tekrarlar şöyle önlenmiştir:
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="font-semibold text-emerald-300 block">Merkezi Sayısal Doğrulama:</span>
              <span className="text-slate-400 text-[11px]">
                Her şekil için ayrı ayrı <code className="text-amber-300">double.TryParse</code> ve hata mesajı yazmak yerine, <code className="text-amber-300">ReadPositiveDouble(prompt)</code> ortak metodu kullanılır. Hem virgüllü hem noktalı ondalıklar tek noktada çözülür.
              </span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="font-semibold text-emerald-300 block">IShape2D ve IShape3D Arayüz Sözleşmeleri:</span>
              <span className="text-slate-400 text-[11px]">
                Polimorfizm kullanılarak 2D ve 3D geometrik şekiller standart bir rapor yapısına (<code className="text-amber-300">CalculationReport</code>) bağlanmıştır.
              </span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="font-semibold text-emerald-300 block">Üçgen Eşitsizliği Denetimi:</span>
              <span className="text-slate-400 text-[11px]">
                Üçgen kenarlarının geometrik geçerliliği nesne oluşturulurken (<code className="text-amber-300">Triangle</code> constructor) denetlenerek geçersiz geometri hesaplamaları tek noktada engellenir.
              </span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="font-semibold text-emerald-300 block">Birleşik Rapor Sunumu:</span>
              <span className="text-slate-400 text-[11px]">
                Konsola sonuç basma şablonu her şekil için tekrar yazılmaz; <code className="text-amber-300">PresentReport</code> metodu tüm şekil raporlarını ortak şablonla basar.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sınıf Diyagramı ve İlişkiler */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-slate-100">
            Sınıf Hiyerarşisi ve Arayüz İlişkileri
          </h3>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs overflow-x-auto text-cyan-300 leading-relaxed">
          <pre>{`IShape (Temel Geometri)
  ├── IShape2D (Alan & Çevre)
  │     ├── Circle      ──> CalculateArea(), CalculatePerimeter(), GetCalculationReport()
  │     ├── Square      ──> CalculateArea(), CalculatePerimeter(), GetCalculationReport()
  │     ├── Rectangle   ──> CalculateArea(), CalculatePerimeter(), GetCalculationReport()
  │     └── Triangle    ──> Heron Formülü, Üçgen Eşitsizliği Doğrulaması
  │
  └── IShape3D (Hacim & Yüzey Alanları)
        ├── Cube        ──> CalculateVolume(), CalculateTotalSurfaceArea(), CalculateLateralArea()
        ├── Cylinder    ──> CalculateVolume(), CalculateTotalSurfaceArea(), CalculateLateralArea()
        └── Sphere      ──> CalculateVolume(), CalculateTotalSurfaceArea()

Hizmet Sınıfları (Services):
  ├── IInputService          ──> ConsoleInputService (Doğrulanmış pozitif sayı ve seçim okuyucu)
  ├── ICalculatorPresenter   ──> ConsolePresenter (Renkli UI, banner, Enes Öztürk telif raporu)
  └── GeometryAppManager     ──> Orkestratör (Döngü ve kullanıcı etkileşimi yönetimi)`}</pre>
        </div>
      </div>

      {/* Telif Hakkı ve İmzalar */}
      <div className="p-4 bg-cyan-950/30 border border-cyan-800/40 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-300">
            Bu projenin tüm hakları ve telif koruması <strong className="text-cyan-300">{AUTHOR_NAME}</strong> adına kayıtlıdır.
          </span>
        </div>
        <span className="font-mono text-cyan-400 font-semibold">{COPYRIGHT_NOTICE}</span>
      </div>
    </div>
  );
};
