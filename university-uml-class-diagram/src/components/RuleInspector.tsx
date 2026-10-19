import React from 'react';
import { RuleAnalysis, UMLRelationship } from '../types/uml';
import { RULES_ANALYSIS } from '../data/umlData';
import { CheckCircle2, ChevronRight, HelpCircle, BookOpen, ArrowRight } from 'lucide-react';

interface RuleInspectorProps {
  activeRule: 1 | 2 | 3 | 4 | null;
  onSelectRule: (rule: 1 | 2 | 3 | 4 | null) => void;
  relationships: UMLRelationship[];
}

export const RuleInspector: React.FC<RuleInspectorProps> = ({
  activeRule,
  onSelectRule,
  relationships,
}) => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
          <BookOpen className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Senaryo Maddeleri & UML Eşleştirmesi</span>
        </div>
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">
          İstenen 4 Kuralın Mimari Çözümü
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Diyagramdaki ilişkileri ve kardinaliteleri incelemek için kurallara tıklayın.
        </p>
      </div>

      {/* Rules Accordion / List */}
      <div className="p-4 space-y-3 flex-1">
        {RULES_ANALYSIS.map((rule) => {
          const isActive = activeRule === rule.ruleNumber;
          return (
            <div
              key={rule.ruleNumber}
              onClick={() => onSelectRule(isActive ? null : rule.ruleNumber)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-50/70 border-blue-400 dark:bg-blue-950/40 dark:border-blue-600 shadow-xs'
                  : 'bg-slate-50/60 border-slate-200 dark:bg-slate-800/40 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              {/* Rule Title */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {rule.ruleNumber}
                  </span>
                  <span className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">
                    Madde {rule.ruleNumber}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {rule.umlConcept.split(' ')[0]}
                </span>
              </div>

              {/* Original Prompt Text */}
              <p className="mt-2 text-xs font-medium text-slate-700 dark:text-slate-300 italic border-l-2 border-slate-300 dark:border-slate-600 pl-2 py-0.5">
                "{rule.promptText}"
              </p>

              {/* Detailed Breakdown when active */}
              {isActive ? (
                <div className="mt-3 pt-3 border-t border-blue-200/60 dark:border-blue-900/50 space-y-2.5 text-xs">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                      UML İlişki Türü:
                    </span>
                    <span className="font-semibold text-blue-700 dark:text-blue-300">
                      {rule.umlConcept}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-0.5">
                      İlgili Sınıflar:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {rule.involvedClasses.map((cls) => (
                        <span
                          key={cls}
                          className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-mono text-[11px]"
                        >
                          {cls}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-0.5">
                      Gerekçe & Analiz:
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                      {rule.explanation}
                    </p>
                  </div>

                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200">
                    <span className="font-bold block mb-0.5">Teknik Standart:</span>
                    {rule.technicalNote}
                  </div>
                </div>
              ) : (
                <div className="mt-2 flex items-center justify-between text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                  <span>Detayları ve diyagramdaki yerini göster</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Note about no attributes/methods requested */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 shrink-0">
        <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="font-semibold text-slate-900 dark:text-white">İstisna Notu: </span>
          Kullanıcı isteği uyarınca sınıflara ait nitelik (özellik) ve davranışların (metot) belirtilmesine gerek yoktur. Diyagram salt sınıf adları ve aralarındaki doğru UML ilişkileri ile kurgulanmıştır.
        </div>
      </div>
    </div>
  );
};
