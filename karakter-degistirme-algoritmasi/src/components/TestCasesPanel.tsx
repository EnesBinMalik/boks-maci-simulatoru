import React, { useState } from 'react';
import { CheckCircle2, Play, Plus, RefreshCw, Send, Terminal } from 'lucide-react';
import { PRESET_TEST_CASES, transformString } from '../utils/algorithm';
import { AlgorithmOptions, TestCase } from '../types';

interface TestCasesPanelProps {
  options: AlgorithmOptions;
  onSendToConsole: (text: string) => void;
  onSendToVisualizer: (word: string) => void;
}

export const TestCasesPanel: React.FC<TestCasesPanelProps> = ({
  options,
  onSendToConsole,
  onSendToVisualizer,
}) => {
  const [testCases, setTestCases] = useState<TestCase[]>(PRESET_TEST_CASES);
  const [customInput, setCustomInput] = useState('');
  const [customTitle, setCustomTitle] = useState('');

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const expected = transformString(customInput.trim(), options);
    const newCase: TestCase = {
      id: `custom-${Date.now()}`,
      title: customTitle.trim() || `Özel Test #${testCases.length + 1}`,
      input: customInput.trim(),
      expectedWordLeft: expected,
      description: 'Kullanıcı tarafından eklenen özel test senaryosu.',
    };

    setTestCases((prev) => [...prev, newCase]);
    setCustomInput('');
    setCustomTitle('');
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 shadow-2xl flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Algoritma Test Masası &amp; Senaryo Doğrulama</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Örnek girdiler ve beklenen çıktılar üzerinde algoritmanın doğruluğunu test edin.
          </p>
        </div>
        <button
          onClick={() => setTestCases(PRESET_TEST_CASES)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-md transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Varsayılanları Yükle</span>
        </button>
      </div>

      {/* Test Cases List */}
      <div className="space-y-3">
        {testCases.map((tc, index) => {
          const actualOutput = transformString(tc.input, options);
          const isMatch = actualOutput === tc.expectedWordLeft;

          return (
            <div
              key={tc.id}
              className="bg-zinc-900/60 border border-zinc-800/80 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-zinc-700 transition-colors"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-zinc-400">
                    #{index + 1}
                  </span>
                  <span className="text-sm font-semibold text-zinc-200">
                    {tc.title}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-mono font-medium ${
                      isMatch
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                        : 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
                    }`}
                  >
                    {isMatch ? '✓ BAŞARILI (PASS)' : 'UYUŞMAZLIK'}
                  </span>
                </div>

                <p className="text-[11px] text-zinc-400">{tc.description}</p>

                {/* Input vs Output display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 font-mono text-xs">
                  <div className="bg-black/40 p-2 rounded border border-zinc-800/80">
                    <span className="text-[10px] text-zinc-500 block uppercase tracking-wider mb-0.5">
                      Girdi:
                    </span>
                    <span className="text-zinc-200 font-semibold">{tc.input}</span>
                  </div>
                  <div className="bg-black/40 p-2 rounded border border-zinc-800/80">
                    <span className="text-[10px] text-zinc-500 block uppercase tracking-wider mb-0.5">
                      Algoritma Çıktısı:
                    </span>
                    <span className="text-emerald-400 font-semibold">
                      {actualOutput}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 md:flex-col shrink-0">
                <button
                  onClick={() => onSendToConsole(tc.input)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-xs border border-zinc-700 transition-colors w-full"
                  title="Konsolda Çalıştır"
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Konsola Gönder</span>
                </button>

                <button
                  onClick={() => {
                    const firstWord = tc.input.split(' ')[0];
                    if (firstWord) onSendToVisualizer(firstWord);
                  }}
                  className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-sky-950/60 hover:bg-sky-900/60 text-sky-400 rounded text-xs border border-sky-800/50 transition-colors w-full"
                  title="Görselleştiricide İncele"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Simüle Et</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Test Form */}
      <form
        onSubmit={handleAddCustom}
        className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 flex flex-col gap-3"
      >
        <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5 text-emerald-400" />
          <span>Yeni Test Senaryosu Ekle</span>
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder="Test Başlığı (Örn: Cümle Testi)"
            className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
          />
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Test Edilecek Metin..."
            className="sm:col-span-2 px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono"
            required
          />
        </div>

        <button
          type="submit"
          className="self-end px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-medium transition-colors flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Test Masasına Ekle</span>
        </button>
      </form>
    </div>
  );
};
