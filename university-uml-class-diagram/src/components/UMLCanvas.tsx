import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  UMLClass, 
  UMLRelationship, 
  ThemeMode, 
  LayoutPreset 
} from '../types/uml';
import { RelationshipLine } from './RelationshipLine';
import { ClassNode } from './ClassNode';
import { LAYOUT_PRESETS } from '../data/umlData';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Move, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  Palette,
  Maximize2
} from 'lucide-react';

interface UMLCanvasProps {
  classes: UMLClass[];
  relationships: UMLRelationship[];
  onUpdateClasses: (classes: UMLClass[]) => void;
  activeRule: 1 | 2 | 3 | 4 | null;
  onSelectRule: (rule: 1 | 2 | 3 | 4 | null) => void;
  selectedClass: UMLClass | null;
  onSelectClass: (cls: UMLClass | null) => void;
  selectedRelationship: UMLRelationship | null;
  onSelectRelationship: (rel: UMLRelationship | null) => void;
  theme: ThemeMode;
  onChangeTheme: (theme: ThemeMode) => void;
  isDetailed: boolean;
  onToggleDetailed: () => void;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

export const UMLCanvas: React.FC<UMLCanvasProps> = ({
  classes,
  relationships,
  onUpdateClasses,
  activeRule,
  onSelectRule,
  selectedClass,
  onSelectClass,
  selectedRelationship,
  onSelectRelationship,
  theme,
  onChangeTheme,
  isDetailed,
  onToggleDetailed,
  canvasRef,
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Apply layout preset
  const handleApplyPreset = (preset: LayoutPreset) => {
    const layout = LAYOUT_PRESETS[preset];
    if (!layout) return;

    const updated = classes.map((cls) => {
      if (layout[cls.id]) {
        return {
          ...cls,
          x: layout[cls.id].x,
          y: layout[cls.id].y,
        };
      }
      return cls;
    });

    onUpdateClasses(updated);
  };

  // Node Dragging Handler
  const handleNodeMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const node = classes.find((c) => c.id === id);
    if (!node) return;

    setDraggingNodeId(id);
    setDragOffset({
      x: e.clientX / zoom - node.x,
      y: e.clientY / zoom - node.y,
    });
  };

  // Canvas Pan Handler
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).tagName === 'svg') {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      onSelectClass(null);
      onSelectRelationship(null);
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (draggingNodeId) {
      const newX = Math.round(e.clientX / zoom - dragOffset.x);
      const newY = Math.round(e.clientY / zoom - dragOffset.y);

      onUpdateClasses(
        classes.map((cls) => (cls.id === draggingNodeId ? { ...cls, x: Math.max(10, newX), y: Math.max(10, newY) } : cls))
      );
    } else if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  }, [draggingNodeId, isPanning, dragOffset, zoom, panStart, classes, onUpdateClasses]);

  const handleMouseUp = useCallback(() => {
    setDraggingNodeId(null);
    setIsPanning(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Zoom controls
  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.min(1.8, Math.max(0.5, Number((prev + delta).toFixed(2)))));
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    handleApplyPreset('hierarchical');
  };

  // Get background style by theme
  const getCanvasBackground = () => {
    switch (theme) {
      case 'blueprint':
        return 'bg-[#0B1329] text-blue-100';
      case 'slate':
        return 'bg-[#0F172A] text-slate-100';
      case 'academic':
        return 'bg-[#FDFBF7] text-amber-950';
      case 'minimal':
      default:
        return 'bg-[#F8FAFC] text-slate-900';
    }
  };

  // Determine grid color for CSS grid pattern
  const gridPatternColor = theme === 'blueprint' 
    ? 'rgba(56, 189, 248, 0.08)' 
    : theme === 'slate'
    ? 'rgba(148, 163, 184, 0.08)'
    : theme === 'academic'
    ? 'rgba(180, 83, 9, 0.06)'
    : 'rgba(100, 116, 139, 0.08)';

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col select-none">
      {/* Top Filter and Actions Strip */}
      <div className="shrink-0 z-20 flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-slate-200/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
        {/* Rule Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">
            Madde Vurgula:
          </span>
          <button
            onClick={() => onSelectRule(null)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              activeRule === null
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            Tüm Sistem
          </button>
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => onSelectRule(activeRule === num ? null : (num as 1 | 2 | 3 | 4))}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${
                activeRule === num
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <span>Madde {num}</span>
            </button>
          ))}
        </div>

        {/* View Options & Theme */}
        <div className="flex items-center gap-2">
          {/* Detail Level Toggle */}
          <button
            onClick={onToggleDetailed}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 border ${
              isDetailed
                ? 'bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-950/50 dark:border-blue-700 dark:text-blue-200'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
            }`}
            title="Sınıf nitelik ve metotlarını göster/gizle"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isDetailed ? 'Sadeye Dön (İstenen)' : 'Ayrıntılı Görünüm'}</span>
          </button>

          {/* Theme Selector */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
            {(['minimal', 'blueprint', 'slate', 'academic'] as ThemeMode[]).map((t) => (
              <button
                key={t}
                onClick={() => onChangeTheme(t)}
                className={`px-2 py-1 text-[11px] font-medium rounded-md capitalize transition-colors ${
                  theme === t
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {t === 'minimal' ? 'Açık' : t === 'blueprint' ? 'Mavi Plan' : t === 'slate' ? 'Koyu' : 'Akademik'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Draggable / Zoomable Canvas Area */}
      <div
        ref={containerRef}
        onMouseDown={handleCanvasMouseDown}
        className={`relative flex-1 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden ${getCanvasBackground()}`}
        style={{
          backgroundImage: `radial-gradient(${gridPatternColor} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      >
        {/* Transformable Canvas Container for PNG / SVG export */}
        <div
          ref={canvasRef}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            width: '1350px',
            height: '750px',
            position: 'absolute',
            left: 0,
            top: 0,
          }}
          className="transition-transform duration-75 ease-out"
        >
          {/* SVG Connection Lines Layer */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-auto"
            style={{ overflow: 'visible' }}
          >
            {relationships.map((rel) => {
              const src = classes.find((c) => c.id === rel.sourceId);
              const tgt = classes.find((c) => c.id === rel.targetId);
              if (!src || !tgt) return null;

              const isHighlighted =
                activeRule === rel.ruleNumber ||
                selectedRelationship?.id === rel.id ||
                selectedClass?.id === rel.sourceId ||
                selectedClass?.id === rel.targetId;

              const isDimmed =
                activeRule !== null
                  ? activeRule !== rel.ruleNumber
                  : selectedClass !== null
                  ? selectedClass.id !== rel.sourceId && selectedClass.id !== rel.targetId
                  : false;

              return (
                <RelationshipLine
                  key={rel.id}
                  relationship={rel}
                  sourceClass={src}
                  targetClass={tgt}
                  isHighlighted={Boolean(isHighlighted)}
                  isDimmed={Boolean(isDimmed)}
                  theme={theme}
                  onSelect={onSelectRelationship}
                />
              );
            })}
          </svg>

          {/* HTML Class Boxes Layer */}
          {classes.map((cls) => {
            const isHighlighted =
              (activeRule !== null &&
                relationships.some(
                  (r) => r.ruleNumber === activeRule && (r.sourceId === cls.id || r.targetId === cls.id)
                )) ||
              selectedClass?.id === cls.id;

            const isDimmed =
              activeRule !== null
                ? !relationships.some(
                    (r) => r.ruleNumber === activeRule && (r.sourceId === cls.id || r.targetId === cls.id)
                  )
                : selectedClass !== null
                ? selectedClass.id !== cls.id &&
                  !relationships.some(
                    (r) =>
                      (r.sourceId === selectedClass.id && r.targetId === cls.id) ||
                      (r.targetId === selectedClass.id && r.sourceId === cls.id)
                  )
                : false;

            return (
              <ClassNode
                key={cls.id}
                cls={cls}
                isDetailed={isDetailed}
                isSelected={selectedClass?.id === cls.id}
                isHighlighted={Boolean(isHighlighted)}
                isDimmed={Boolean(isDimmed)}
                theme={theme}
                onSelect={onSelectClass}
                onMouseDown={handleNodeMouseDown}
              />
            );
          })}

          {/* Canvas Signature Stamp (Bottom Left of Canvas) */}
          <div className="absolute left-8 bottom-8 pointer-events-none p-4 rounded-xl border border-slate-300/40 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm max-w-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
              <span className="text-xs font-bold tracking-tight text-slate-800 dark:text-slate-100">
                Üniversite Sistemi Sınıf Diyagramı
              </span>
            </div>
            <div className="text-[12px] font-semibold text-blue-600 dark:text-blue-400">
              Hazırlayan: Enes Öztürk
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              UML 2.5 Standardı · Nesne Yönelimli Yazılım Mimarisi
            </div>
          </div>
        </div>

        {/* Floating Canvas Controls (Bottom Right) */}
        <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-md">
          <button
            onClick={() => handleZoom(0.1)}
            className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Yakınlaştır"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="text-[10px] font-mono text-center text-slate-500">
            {Math.round(zoom * 100)}%
          </div>
          <button
            onClick={() => handleZoom(-0.1)}
            className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Uzaklaştır"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="w-full h-px bg-slate-200 dark:bg-slate-700 my-0.5" />
          <button
            onClick={handleResetView}
            className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Görünümü ve Yerleşimi Sıfırla"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Legend Bar (Top Left) */}
        <div className="absolute top-4 left-6 z-10 hidden md:flex items-center gap-4 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md px-3.5 py-2 rounded-lg border border-slate-200/70 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 shadow-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-900 dark:text-white">◆</span>
            <span>Bileşim (Composition)</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-900 dark:text-white">◇</span>
            <span>Kümeleme (Aggregation)</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-900 dark:text-white">◁</span>
            <span>Genelleme (Kalıtım)</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <div className="flex items-center gap-1.5">
            <span className="font-mono font-bold text-slate-900 dark:text-white">—</span>
            <span>İlişki (1 : 1..*)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
