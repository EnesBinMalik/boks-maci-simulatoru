import React from 'react';
import { UMLClass, ThemeMode } from '../types/uml';

interface ClassNodeProps {
  cls: UMLClass;
  isDetailed: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  isDimmed: boolean;
  theme: ThemeMode;
  onSelect: (cls: UMLClass) => void;
  onMouseDown: (e: React.MouseEvent, id: string) => void;
}

export const ClassNode: React.FC<ClassNodeProps> = ({
  cls,
  isDetailed,
  isSelected,
  isHighlighted,
  isDimmed,
  theme,
  onSelect,
  onMouseDown,
}) => {
  // Theme palette styling
  const getThemeClasses = () => {
    switch (theme) {
      case 'blueprint':
        return {
          container: isSelected
            ? 'bg-blue-950/90 border-blue-400 ring-2 ring-blue-400/50 text-blue-100 shadow-lg shadow-blue-500/20'
            : isHighlighted
            ? 'bg-slate-900/95 border-sky-400 text-sky-100 shadow-md shadow-sky-500/10'
            : 'bg-slate-900/90 border-slate-700 text-slate-200 hover:border-slate-500',
          headerBg: 'bg-blue-900/40 border-b border-blue-800/60',
          divider: 'border-blue-900/50',
          muted: 'text-blue-300/70',
          codeText: 'text-blue-200',
        };
      case 'slate':
        return {
          container: isSelected
            ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/40 text-white shadow-xl'
            : isHighlighted
            ? 'bg-slate-900 border-indigo-400 text-slate-100 shadow-lg'
            : 'bg-slate-800/95 border-slate-700 text-slate-200 hover:border-slate-600',
          headerBg: 'bg-slate-900/60 border-b border-slate-700/80',
          divider: 'border-slate-700/80',
          muted: 'text-slate-400',
          codeText: 'text-slate-300',
        };
      case 'academic':
        return {
          container: isSelected
            ? 'bg-amber-50/95 border-amber-600 ring-2 ring-amber-600/30 text-amber-950 shadow-lg'
            : isHighlighted
            ? 'bg-amber-50/90 border-amber-500 text-amber-950 shadow'
            : 'bg-amber-50/70 border-amber-300 text-amber-950 hover:border-amber-400',
          headerBg: 'bg-amber-100/60 border-b border-amber-300',
          divider: 'border-amber-200',
          muted: 'text-amber-800/70',
          codeText: 'text-amber-900',
        };
      case 'minimal':
      default:
        return {
          container: isSelected
            ? 'bg-white border-blue-600 ring-2 ring-blue-600/20 text-slate-900 shadow-lg'
            : isHighlighted
            ? 'bg-white border-blue-500 text-slate-900 shadow-md'
            : 'bg-white border-slate-300 text-slate-800 hover:border-slate-400 shadow-xs',
          headerBg: 'bg-slate-50 border-b border-slate-200',
          divider: 'border-slate-200',
          muted: 'text-slate-500',
          codeText: 'text-slate-700',
        };
    }
  };

  const styleConfig = getThemeClasses();
  const opacity = isDimmed ? 'opacity-30' : 'opacity-100';

  return (
    <div
      style={{
        transform: `translate3d(${cls.x}px, ${cls.y}px, 0)`,
        width: `${cls.width}px`,
        position: 'absolute',
        left: 0,
        top: 0,
        touchAction: 'none',
      }}
      className={`rounded-lg border transition-[border-color,box-shadow,opacity] duration-150 select-none cursor-move ${styleConfig.container} ${opacity}`}
      onMouseDown={(e) => onMouseDown(e, cls.id)}
      onClick={() => onSelect(cls)}
    >
      {/* UML Class Header */}
      <div className={`px-3 py-2.5 rounded-t-lg text-center ${styleConfig.headerBg}`}>
        {cls.stereotype && (
          <div className={`text-[10px] font-mono uppercase tracking-wider mb-0.5 ${styleConfig.muted}`}>
            &laquo;{cls.stereotype}&raquo;
          </div>
        )}
        <div className="font-bold text-sm tracking-tight flex items-center justify-center gap-1.5">
          <span>{cls.name}</span>
        </div>
        <div className={`text-[11px] mt-0.5 ${styleConfig.muted}`}>
          {cls.turkishName !== cls.name ? cls.turkishName : ''}
        </div>
      </div>

      {/* When in prompt-strictly requested mode ("Not: Sınıflara ait nitelik ve davranışların belirtilmesine gerek yoktur") */}
      {!isDetailed ? (
        <div className="px-3 py-2 text-[11px] text-center opacity-75">
          <span className="font-mono text-[10px] tracking-tight text-slate-400">
            [UML Sınıfı]
          </span>
        </div>
      ) : (
        /* Detailed compartments when user toggles detailed mode */
        <div className="text-[11px] font-mono">
          {/* Attributes Compartment */}
          <div className={`px-3 py-2 border-b ${styleConfig.divider} ${styleConfig.codeText}`}>
            {cls.sampleAttributes && cls.sampleAttributes.length > 0 ? (
              cls.sampleAttributes.map((attr, idx) => (
                <div key={idx} className="truncate leading-tight">
                  {attr}
                </div>
              ))
            ) : (
              <div className="italic opacity-50 text-[10px]">Nitelik yok</div>
            )}
          </div>

          {/* Operations Compartment */}
          <div className={`px-3 py-2 rounded-b-lg ${styleConfig.codeText}`}>
            {cls.sampleMethods && cls.sampleMethods.length > 0 ? (
              cls.sampleMethods.map((meth, idx) => (
                <div key={idx} className="truncate leading-tight">
                  {meth}
                </div>
              ))
            ) : (
              <div className="italic opacity-50 text-[10px]">Metot yok</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
