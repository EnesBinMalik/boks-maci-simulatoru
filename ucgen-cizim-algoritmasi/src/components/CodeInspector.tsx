/**
 * @license
 * Telif Hakkı © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 */

import React, { useState } from 'react';
import { Copy, Check, Code, FileText, FileCode2 } from 'lucide-react';
import { CSHARP_IMPLEMENTATION, JAVA_IMPLEMENTATION } from '../core/referenceImplementations';

type LanguageTab = 'csharp' | 'java' | 'typescript';

export const CodeInspector: React.FC = () => {
  const [activeLang, setActiveLang] = useState<LanguageTab>('csharp');
  const [copied, setCopied] = useState(false);

  const getCode = () => {
    switch (activeLang) {
      case 'csharp':
        return CSHARP_IMPLEMENTATION;
      case 'java':
        return JAVA_IMPLEMENTATION;
      case 'typescript':
        return `// ==============================================================================
// Telif Hakkı (C) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
// Proje: Üçgen Çizim Algoritması (TypeScript - OOP / SRP / DRY)
// Geliştirici: Enes Öztürk
// ==============================================================================

// 1. Sorumluluk: Girdi Doğrulama (SRP)
export class InputValidator {
  constructor(private min = 1, private max = 35) {}

  public validate(raw: unknown): { isValid: boolean; message?: string; value?: number } {
    const num = Number(raw);
    if (isNaN(num) || !Number.isInteger(num)) {
      return { isValid: false, message: "Geçerli bir pozitif tam sayı giriniz." };
    }
    if (num < this.min || num > this.max) {
      return { isValid: false, message: \`Boyut \${this.min} ile \${this.max} arasında olmalıdır.\` };
    }
    return { isValid: true, value: num };
  }
}

// 2. Sorumluluk: Geometri Hesaplayıcı (SRP & DRY)
export class TriangleGeometryCalculator {
  // DRY: Tekrar eden karakter dizisini üreten tekil metot
  private repeat(char: string, count: number): string {
    return count > 0 ? char.repeat(count) : '';
  }

  public calculatePyramid(size: number, char = '*'): string[] {
    const rows: string[] = [];
    for (let i = 1; i <= size; i++) {
      const spaces = size - i;
      const chars = 2 * i - 1;
      rows.push(this.repeat(' ', spaces) + this.repeat(char, chars));
    }
    return rows;
  }
}

// 3. Sorumluluk: Konsol Render & Sunum (SRP)
export class ConsoleShapeRenderer {
  public render(rows: string[], showLineNumbers = false): string[] {
    return rows.map((r, i) => (showLineNumbers ? \`[\${i + 1}] \${r}\` : r));
  }
}

// 4. Orkestratör (Facade)
export class TriangleApplication {
  constructor(
    private validator = new InputValidator(),
    private calculator = new TriangleGeometryCalculator(),
    private renderer = new ConsoleShapeRenderer()
  ) {}

  public run(input: number, char = '*') {
    const valid = this.validator.validate(input);
    if (!valid.isValid || !valid.value) throw new Error(valid.message);
    const rawRows = this.calculator.calculatePyramid(valid.value, char);
    return this.renderer.render(rawRows);
  }
}`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden shadow-xl">
      {/* Tab selection */}
      <div className="bg-neutral-950/80 px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-neutral-200">
            Kaynak Kod & Algoritmik Mimari
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-neutral-900 p-1 rounded-lg border border-neutral-800 text-xs">
            <button
              onClick={() => setActiveLang('csharp')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                activeLang === 'csharp'
                  ? 'bg-neutral-800 text-emerald-400 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              C# (.NET)
            </button>
            <button
              onClick={() => setActiveLang('java')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                activeLang === 'java'
                  ? 'bg-neutral-800 text-emerald-400 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Java
            </button>
            <button
              onClick={() => setActiveLang('typescript')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                activeLang === 'typescript'
                  ? 'bg-neutral-800 text-emerald-400 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              TypeScript
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg border border-neutral-700 transition-colors flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Display */}
      <div className="p-4 bg-neutral-950 font-mono text-xs overflow-x-auto max-h-[580px] overflow-y-auto leading-relaxed select-text text-neutral-300">
        <pre className="whitespace-pre">
          <code>{getCode()}</code>
        </pre>
      </div>

      {/* Footer attribution */}
      <div className="bg-neutral-900/90 px-4 py-2 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
        <span className="flex items-center gap-1.5">
          <FileCode2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Telif Hakkı © 2026 Enes Öztürk · Single Responsibility & DRY Standardı</span>
        </span>
        <span className="font-mono">
          {activeLang === 'csharp' ? 'Program.cs' : activeLang === 'java' ? 'Main.java' : 'TriangleApp.ts'}
        </span>
      </div>
    </div>
  );
};
