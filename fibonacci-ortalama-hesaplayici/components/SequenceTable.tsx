/**
 * @file SequenceTable.tsx
 * @description Fibonacci serisinin tüm terimlerini, oranlarını ve basamak özelliklerini
 * listeleyen yüksek performanslı tablo bileşeni.
 */

import React, { useState, useMemo } from 'react';
import { FibonacciTerm } from '../core/FibonacciGenerator';
import { Search, Filter, Copy, Check, Download, Table as TableIcon } from 'lucide-react';

interface SequenceTableProps {
  terms: FibonacciTerm[];
  onExportCSV: () => void;
  onExportJSON: () => void;
}

export const SequenceTable: React.FC<SequenceTableProps> = ({
  terms,
  onExportCSV,
  onExportJSON
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterMode, setFilterMode] = useState<'all' | 'even' | 'odd'>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const pageSize = 20;

  const filteredTerms = useMemo(() => {
    return terms.filter((term) => {
      // Mod filtresi
      if (filterMode === 'even' && !term.isEven) return false;
      if (filterMode === 'odd' && term.isEven) return false;

      // Arama filtresi
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        term.index.toString().includes(q) ||
        term.stringValue.toLowerCase().includes(q)
      );
    });
  }, [terms, filterMode, searchQuery]);

  const totalPages = Math.ceil(filteredTerms.length / pageSize) || 1;
  const paginatedTerms = filteredTerms.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCopyTerm = (term: FibonacciTerm) => {
    navigator.clipboard.writeText(term.stringValue);
    setCopiedIndex(term.index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-sm shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            <TableIcon className="w-3.5 h-3.5" />
            <span>Terim Dökümü & İnceleme</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Fibonacci Terimleri Tablosu
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Toplam {terms.length} terim üretildi. Tablo üzerinden filtreleme ve değer kopyalama yapabilirsiniz.
          </p>
        </div>

        {/* Export buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onExportCSV}
            className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-700 rounded-lg transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>CSV İndir</span>
          </button>
          <button
            type="button"
            onClick={onExportJSON}
            className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-700 rounded-lg transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>JSON İndir</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Terim no veya değer ara..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 font-mono"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg self-end sm:self-auto">
          <button
            type="button"
            onClick={() => { setFilterMode('all'); setCurrentPage(1); }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filterMode === 'all' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tümü ({terms.length})
          </button>
          <button
            type="button"
            onClick={() => { setFilterMode('even'); setCurrentPage(1); }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filterMode === 'even' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Çift Sayılar
          </button>
          <button
            type="button"
            onClick={() => { setFilterMode('odd'); setCurrentPage(1); }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filterMode === 'odd' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tek Sayılar
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-3 px-4 w-16">Sıra (n)</th>
              <th className="py-3 px-4">Fibonacci Değeri (F_n)</th>
              <th className="py-3 px-4 w-24">Parite</th>
              <th className="py-3 px-4 w-28 text-center">Basamak</th>
              <th className="py-3 px-4 w-36 text-right">F_n / F_{'{n-1}'}</th>
              <th className="py-3 px-4 w-16 text-center">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {paginatedTerms.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500 font-sans">
                  Aramanıza uygun terim bulunamadı.
                </td>
              </tr>
            ) : (
              paginatedTerms.map((term) => (
                <tr key={term.index} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-4 text-slate-500 tabular-nums">#{term.index}</td>
                  <td className="py-2.5 px-4 text-white font-semibold tabular-nums break-all max-w-xs md:max-w-md">
                    {term.stringValue}
                  </td>
                  <td className="py-2.5 px-4 font-sans">
                    <span className={`text-[11px] ${term.isEven ? 'text-sky-400' : 'text-amber-400'}`}>
                      {term.isEven ? 'Çift' : 'Tek'}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-center text-slate-400 tabular-nums">
                    {term.digitCount} basamak
                  </td>
                  <td className="py-2.5 px-4 text-right text-emerald-400 tabular-nums">
                    {term.ratioToPrev !== undefined ? term.ratioToPrev.toFixed(6) : '-'}
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleCopyTerm(term)}
                      title="Değeri Kopyala"
                      className="p-1 text-slate-500 hover:text-white rounded hover:bg-slate-800 transition-colors"
                    >
                      {copiedIndex === term.index ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <div>
            Toplam {filteredTerms.length} kayıttan {(currentPage - 1) * pageSize + 1} -{' '}
            {Math.min(currentPage * pageSize, filteredTerms.length)} arası
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed rounded text-slate-200"
            >
              Önceki
            </button>
            <span className="px-2 font-mono text-slate-300">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed rounded text-slate-200"
            >
              Sonraki
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
