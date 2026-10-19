import React from 'react';
import { UMLClass, UMLRelationship } from '../types/uml';
import { X, Info, GitBranch, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ElementInspectorProps {
  selectedClass: UMLClass | null;
  selectedRelationship: UMLRelationship | null;
  classes: UMLClass[];
  relationships: UMLRelationship[];
  onClose: () => void;
  onSelectClass: (cls: UMLClass) => void;
}

export const ElementInspector: React.FC<ElementInspectorProps> = ({
  selectedClass,
  selectedRelationship,
  classes,
  relationships,
  onClose,
  onSelectClass,
}) => {
  if (!selectedClass && !selectedRelationship) return null;

  return (
    <div className="absolute top-16 right-6 z-30 w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
            {selectedClass ? 'Sınıf Detayı' : 'UML İlişki Detayı'}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-3 text-xs max-h-[70vh] overflow-y-auto">
        {selectedClass && (
          <>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                {selectedClass.stereotype ? `<<${selectedClass.stereotype}>>` : 'Sınıf'}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {selectedClass.name}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {selectedClass.description}
              </p>
            </div>

            {/* Connected Relationships */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Bağlı Olduğu İlişkiler:
              </span>
              <div className="space-y-1.5">
                {relationships
                  .filter((r) => r.sourceId === selectedClass.id || r.targetId === selectedClass.id)
                  .map((rel) => {
                    const otherId = rel.sourceId === selectedClass.id ? rel.targetId : rel.sourceId;
                    const otherClass = classes.find((c) => c.id === otherId);
                    return (
                      <div
                        key={rel.id}
                        className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium text-slate-800 dark:text-slate-200">
                            {otherClass?.name}
                          </div>
                          <div className="text-[10px] text-blue-600 dark:text-blue-400 font-mono capitalize">
                            {rel.type === 'composition'
                              ? '◆ Bileşim'
                              : rel.type === 'aggregation'
                              ? '◇ Kümeleme'
                              : rel.type === 'generalization'
                              ? '▷ Kalıtım'
                              : '— İlişki'}
                            {rel.label ? ` (${rel.label})` : ''}
                          </div>
                        </div>
                        {otherClass && (
                          <button
                            onClick={() => onSelectClass(otherClass)}
                            className="p-1 text-slate-400 hover:text-blue-600"
                            title="Diğer sınıfa odaklan"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        )}

        {selectedRelationship && (
          <>
            <div>
              <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                {selectedRelationship.ruleDescription}
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                {selectedRelationship.type === 'composition'
                  ? 'Bileşim (Composition)'
                  : selectedRelationship.type === 'aggregation'
                  ? 'Kümeleme (Aggregation)'
                  : selectedRelationship.type === 'generalization'
                  ? 'Genelleme / Kalıtım (Generalization)'
                  : 'İlişki (Association)'}
              </h3>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 leading-relaxed text-slate-600 dark:text-slate-300">
              {selectedRelationship.detailedRationale}
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 font-mono">
              <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-center">
                <span className="block text-slate-400 text-[10px]">Kaynak Çoğulluk</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {selectedRelationship.sourceMultiplicity || '1'}
                </span>
              </div>
              <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-center">
                <span className="block text-slate-400 text-[10px]">Hedef Çoğulluk</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {selectedRelationship.targetMultiplicity || '—'}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
