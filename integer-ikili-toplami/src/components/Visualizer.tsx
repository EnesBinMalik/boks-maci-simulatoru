/**
 * @license
 * Enes Öztürk Algoritma Görselleştiricisi ve Adım Adım Simülasyonu
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 */

import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Info,
  Pause,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { AlgorithmResult, MathMode } from '../types';
import { sounds } from '../utils/audio';

interface Props {
  result: AlgorithmResult | null;
  mode: MathMode;
  onModeChange: (mode: MathMode) => void;
}

export const Visualizer: React.FC<Props> = ({ result, mode, onModeChange }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  if (!result || !result.isValid || result.pairs.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 space-y-3">
        <Info className="w-10 h-10 mx-auto text-amber-400 opacity-80" />
        <h3 className="text-lg font-semibold text-white">Görselleştirilecek Veri Bulunamadı</h3>
        <p className="text-sm max-w-md mx-auto">
          Lütfen konsol terminalinden veya hızlı testlerden geçerli bir tamsayı dizisi giriniz (örn: <code className="text-amber-300">2 3 1 5 2 5 3 3</code>).
        </p>
      </div>
    );
  }

  const { pairs, outputString } = result;
  const currentPair = pairs[Math.min(activeStep, pairs.length - 1)];

  const handleNext = () => {
    sounds.playKeyClick();
    setActiveStep((prev) => (prev < pairs.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    sounds.playKeyClick();
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleReset = () => {
    sounds.playKeyClick();
    setActiveStep(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    sounds.playKeyClick();
    if (!isPlaying) {
      setIsPlaying(true);
      let step = activeStep >= pairs.length - 1 ? 0 : activeStep;
      setActiveStep(step);

      const interval = setInterval(() => {
        step++;
        if (step >= pairs.length) {
          clearInterval(interval);
          setIsPlaying(false);
        } else {
          setActiveStep(step);
          sounds.playKeyClick();
        }
      }, 1200);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Üst Özet Kartı */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
              {pairs.length} Adet İkili Tespit Edildi
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs font-mono text-slate-400">
              Girdi: [{result.numbers.join(', ')}]
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Toplu Çıktı:</span>
            <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400 tracking-wider">
              {outputString}
            </span>
          </div>
        </div>

        {/* Simülasyon Oynatıcı Kontrolleri */}
        <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={handlePrev}
            disabled={activeStep === 0}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-850 disabled:opacity-30 disabled:pointer-events-none transition"
            title="Önceki İkili"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Duraklat' : 'Otomatik Oynat'}</span>
          </button>

          <button
            onClick={handleNext}
            disabled={activeStep === pairs.length - 1}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-850 disabled:opacity-30 disabled:pointer-events-none transition"
            title="Sonraki İkili"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-850 transition"
            title="Başa Dön"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Aktif Adım Detay Paneli */}
      <div className="bg-slate-900 border-2 border-amber-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        {/* Dekoratif Arka Plan Işıltısı */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm font-mono">
              #{currentPair.id}
            </span>
            <span className="text-sm font-semibold text-white">
              İkili #{currentPair.id} İnceleniyor ({activeStep + 1} / {pairs.length})
            </span>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${
              currentPair.isEqual
                ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
            }`}
          >
            {currentPair.isEqual ? 'EŞİT SAYILAR (a == b)' : 'FARKLI SAYILAR (a != b)'}
          </span>
        </div>

        {/* Görsel Matematiksel Akış */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {/* 1. Girdi İkilisi */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">1. İkili Elemanları</span>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-xl font-black font-mono text-amber-400 shadow-inner">
                {currentPair.first}
              </div>
              <span className="text-slate-500 font-bold">&</span>
              <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-xl font-black font-mono text-amber-400 shadow-inner">
                {currentPair.second}
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2 font-mono">
              a = {currentPair.first}, b = {currentPair.second}
            </p>
          </div>

          {/* 2. Mantıksal Koşul & Formül */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-center text-center">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">2. Koşul & Formül</span>
            <div className="mt-2 text-sm font-semibold text-slate-200">
              {currentPair.first} {currentPair.isEqual ? '==' : '!='} {currentPair.second}
            </div>
            <div className="mt-1 font-mono text-xs text-amber-300 bg-slate-900/80 py-1.5 px-2 rounded-lg border border-slate-800 inline-block mx-auto">
              {currentPair.formulaDescription}
            </div>
            <p className="text-xs text-slate-400 mt-2 font-mono">
              {currentPair.calculationBreakdown}
            </p>
          </div>

          {/* 3. Hesaplanan Sonuç */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center flex flex-col justify-center items-center">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">3. Üretilen Değer</span>
            <div className="mt-2 text-3xl font-black font-mono text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              {currentPair.result}
            </div>
            <span className="text-[11px] text-slate-500 mt-1">Ekrana basılan sonuç</span>
          </div>
        </div>

        {/* İkili Gezinme Küçük Önizleme Çubuğu */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
          {pairs.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                sounds.playKeyClick();
                setActiveStep(idx);
              }}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs transition border flex items-center gap-1.5 ${
                idx === activeStep
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              <span>({p.first}, {p.second})</span>
              <span className="text-slate-600">→</span>
              <span className={idx === activeStep ? 'text-slate-950' : 'text-emerald-400 font-bold'}>
                {p.result}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Soru Arka Planı & 81 Değeri Hakkında Açıklama Paneli */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Enes Öztürk Algoritma Notu: Neden Örnek Çıktıda 81 Yazıyor?</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Bu klasik algoritma sorusunda (<code className="text-amber-300 font-mono">2 3 1 5 2 5 3 3</code>)
          son ikili <code className="text-amber-300 font-mono">(3, 3)</code> için soru metninde
          "sayılar aynıysa toplamının karesini yazdıran" ifadesi yer alır. Matematiksel olarak <code className="text-emerald-400 font-mono">(3 + 3)² = 36</code>
          olması gerekirken, soru örneğinde çıktı <code className="text-emerald-400 font-mono">81</code> olarak verilmiştir. Bu durum, soru yazarının
          <code className="text-cyan-300 font-mono">(3 × 3)² = 9² = 81</code> formülünü veya <code className="text-cyan-300 font-mono">3⁴ = 81</code>
          hesabını uygulamasından kaynaklanmaktadır.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <span className="text-xs text-slate-400 font-medium">Mod Değiştir:</span>
          <button
            onClick={() => onModeChange('sample_match_81')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition border ${
              mode === 'sample_match_81'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            Örnek Çıktı Modu (81): (a × b)²
          </button>
          <button
            onClick={() => onModeChange('strict_sum_square_36')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition border ${
              mode === 'strict_sum_square_36'
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            Matematiksel Mod (36): (a + b)²
          </button>
        </div>
      </div>
    </div>
  );
};
