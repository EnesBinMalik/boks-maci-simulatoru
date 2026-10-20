import React, { useState } from 'react';
import { ArrowRight, ArrowLeftRight, Check, Copy, RefreshCw, Info } from 'lucide-react';
import { AlgorithmResult, SwapMode } from '../types';
import { runSwapAlgorithm, PRESET_EXAMPLES } from '../utils/algorithm';

interface VisualSwapInspectorProps {
  initialResult?: AlgorithmResult | null;
}

export const VisualSwapInspector: React.FC<VisualSwapInspectorProps> = ({ initialResult }) => {
  const [inputText, setInputText] = useState(
    initialResult?.rawInput || 'Merhaba Hello Algoritma x'
  );
  const [mode, setMode] = useState<SwapMode>(initialResult?.mode || 'words');
  const [copied, setCopied] = useState(false);

  const currentResult = runSwapAlgorithm(inputText, mode);

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(currentResult.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Controls Box */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Görsel Algoritma İnceleyicisi & Karakter Takas İzleyici
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Her bir kelimenin ilk ve son karakterinin nasıl ayrılıp yer değiştirdiğini adım adım inceleyin.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center p-0.5 bg-slate-950 rounded-lg border border-slate-800">
              <button
                onClick={() => setMode('words')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  mode === 'words'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Kelime Bazlı (Örnek)
              </button>
              <button
                onClick={() => setMode('fullString')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  mode === 'fullString'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Tüm Cümle Bazlı
              </button>
            </div>
          </div>
        </div>

        {/* Input box */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
            <span>Test Edilecek String İfade:</span>
            <span className="text-slate-500 font-mono text-[11px]">
              {inputText.length} karakter · {currentResult.wordCount} kelime
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="String ifade yazınız..."
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
            />
            {inputText && (
              <button
                onClick={() => setInputText('')}
                className="absolute right-3 top-2.5 text-xs text-slate-500 hover:text-slate-300"
              >
                Temizle
              </button>
            )}
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
          <span className="text-slate-500">Hazır Testler:</span>
          {PRESET_EXAMPLES.map((preset) => (
            <button
              key={preset.title}
              onClick={() => setInputText(preset.input)}
              className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded border border-slate-800 transition-colors"
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Output summary ribbon */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs text-slate-400 font-medium">Algoritma Çıktısı:</div>
          <div className="text-lg md:text-xl font-mono font-bold text-emerald-400 break-all">
            {currentResult.output || <span className="text-slate-600 italic">Boş ifade</span>}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right text-xs text-slate-400 hidden sm:block">
            <div>İşlem Süresi: <span className="text-cyan-400 font-mono tabular-nums">{currentResult.executionTimeMs} ms</span></div>
            <div>İmza: <span className="text-slate-300 font-medium">Enes Öztürk</span></div>
          </div>
          <button
            onClick={handleCopyOutput}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Kopyalandı' : 'Çıktıyı Kopyala'}</span>
          </button>
        </div>
      </div>

      {/* Step by Step Breakdown Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <span>Kelimelerin Karakter Ayrıştırması & Takas Adımları</span>
            <span className="text-xs text-slate-500 font-normal">
              ({currentResult.steps.length} öğe işlendi)
            </span>
          </h3>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-cyan-400 inline-block"></span>
              İlk Karakter
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-slate-600 inline-block"></span>
              Orta Kısım
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-amber-400 inline-block"></span>
              Son Karakter
            </span>
          </div>
        </div>

        {currentResult.steps.length === 0 ? (
          <div className="p-8 rounded-xl bg-slate-900/40 border border-slate-800 text-center text-slate-500 text-sm">
            İncelenecek bir metin girilmedi. Lütfen yukarıdaki kutuya bir metin yazınız.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentResult.steps.map((step, idx) => (
              <div
                key={step.id || idx}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between gap-3 font-mono"
              >
                {/* Header of card */}
                <div className="flex items-center justify-between text-xs font-sans text-slate-400 border-b border-slate-800 pb-2">
                  <span className="font-semibold text-slate-300">
                    Kelime #{idx + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <span>Uzunluk: <strong className="text-slate-200 tabular-nums">{step.length}</strong></span>
                    <span aria-hidden="true">·</span>
                    {step.isSingleChar ? (
                      <span className="text-amber-400 text-[11px]">Değişim Yok (Tek Karakter)</span>
                    ) : (
                      <span className="text-emerald-400 text-[11px]">Takas Başarılı</span>
                    )}
                  </div>
                </div>

                {/* Visual swap anatomy */}
                {step.isSingleChar ? (
                  <div className="py-2 flex items-center justify-between bg-slate-950/60 px-3 rounded-lg border border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-slate-800 text-white font-bold text-sm">
                        {step.original}
                      </span>
                      <span className="text-xs text-slate-400 font-sans">
                        (Kelime uzunluğu 1 olduğu için aynen kaldı)
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold text-sm border border-emerald-500/30">
                      {step.result}
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Before swap */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-sans">Orijinal:</span>
                      <div className="flex items-center gap-1 font-bold text-sm">
                        <span
                          className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                          title="İlk Karakter (Index 0)"
                        >
                          {step.firstChar}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                          title="Orta Kısım"
                        >
                          {step.middleStr}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          title={`Son Karakter (Index ${step.length - 1})`}
                        >
                          {step.lastChar}
                        </span>
                      </div>
                    </div>

                    {/* Swap transition arrow */}
                    <div className="flex items-center justify-center gap-2 text-xs text-cyan-400/80 font-sans py-0.5">
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                      <span className="text-[11px]">İlk ({step.firstChar}) ↔ Son ({step.lastChar}) Yer Değiştirdi</span>
                    </div>

                    {/* After swap */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-sans font-medium">Sonuç:</span>
                      <div className="flex items-center gap-1 font-bold text-sm">
                        <span
                          className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          title="Eski Son Karakter (Şimdi Başta)"
                        >
                          {step.lastChar}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                          title="Orta Kısım (Değişmedi)"
                        >
                          {step.middleStr}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                          title="Eski İlk Karakter (Şimdi Sonda)"
                        >
                          {step.firstChar}
                        </span>
                        <span className="text-slate-500 mx-1">=</span>
                        <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          {step.result}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card footer formula note */}
                <div className="text-[11px] text-slate-500 font-sans pt-1 border-t border-slate-800/60">
                  Formül: <code>result = str[{step.length - 1}] + str[1..{Math.max(1, step.length - 2)}] + str[0]</code>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Educational note on algorithm complexity */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-slate-200 font-semibold">Algoritma Karmaşıklık Analizi (Big-O Notation):</span>
          <p>
            Her kelime için ilk ve son karaktere erişim <strong className="text-cyan-300">O(1)</strong> sabit sürede gerçekleşir.
            Orta alt dizgi (substring) kopyalama işlemi kelime uzunluğu <strong className="text-cyan-300">k</strong> kadar sürer.
            N karakterlik bir metin için toplam zaman karmaşıklığı <strong className="text-emerald-400 font-mono">O(N)</strong> (Lineer) olup,
            ekstra bellek kullanımı da <strong className="text-emerald-400 font-mono">O(N)</strong>'dir. Enes Öztürk tarafından optimize edilmiştir.
          </p>
        </div>
      </div>
    </div>
  );
};
