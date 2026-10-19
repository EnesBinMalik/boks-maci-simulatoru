import React from 'react';
import { UMLClass, UMLRelationship, ThemeMode } from '../types/uml';
import { computeConnection } from '../utils/geometry';

interface RelationshipLineProps {
  relationship: UMLRelationship;
  sourceClass: UMLClass;
  targetClass: UMLClass;
  isHighlighted: boolean;
  isDimmed: boolean;
  theme: ThemeMode;
  onSelect: (rel: UMLRelationship) => void;
}

export const RelationshipLine: React.FC<RelationshipLineProps> = ({
  relationship,
  sourceClass,
  targetClass,
  isHighlighted,
  isDimmed,
  theme,
  onSelect,
}) => {
  const { start, end, midPoint, angle } = computeConnection(sourceClass, targetClass);

  // Theme-dependent colors
  const baseStroke = theme === 'blueprint' 
    ? '#60A5FA' 
    : theme === 'slate'
    ? '#94A3B8'
    : theme === 'academic'
    ? '#854D0E'
    : '#475569';

  const strokeColor = isHighlighted 
    ? (theme === 'blueprint' ? '#38BDF8' : '#2563EB')
    : baseStroke;

  const strokeWidth = isHighlighted ? 2.5 : 1.75;
  const opacity = isDimmed ? 0.25 : 1;

  // Diamond size
  const diamondLen = 14;
  const diamondWidth = 8;
  // Arrow size for generalization
  const arrowLen = 14;
  const arrowWidth = 7;

  // Unit vector along the line (from start to end)
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const ux = dist > 0 ? dx / dist : 1;
  const uy = dist > 0 ? dy / dist : 0;
  // Perpendicular unit vector
  const px = -uy;
  const py = ux;

  // Position adjustments so line doesn't poke through marker
  let lineStart = { ...start };
  let lineEnd = { ...end };

  // Markers
  let sourceMarker: React.ReactNode = null;
  let targetMarker: React.ReactNode = null;

  if (relationship.type === 'composition') {
    // Solid filled diamond at SOURCE end
    const p1 = `${start.x},${start.y}`;
    const p2 = `${start.x + ux * (diamondLen / 2) + px * diamondWidth},${start.y + uy * (diamondLen / 2) + py * diamondWidth}`;
    const p3 = `${start.x + ux * diamondLen},${start.y + uy * diamondLen}`;
    const p4 = `${start.x + ux * (diamondLen / 2) - px * diamondWidth},${start.y + uy * (diamondLen / 2) - py * diamondWidth}`;

    lineStart = {
      x: start.x + ux * diamondLen,
      y: start.y + uy * diamondLen
    };

    sourceMarker = (
      <polygon
        points={`${p1} ${p2} ${p3} ${p4}`}
        fill={strokeColor}
        stroke={strokeColor}
        strokeWidth="1.5"
      />
    );
  } else if (relationship.type === 'aggregation') {
    // Hollow diamond at SOURCE end
    const p1 = `${start.x},${start.y}`;
    const p2 = `${start.x + ux * (diamondLen / 2) + px * diamondWidth},${start.y + uy * (diamondLen / 2) + py * diamondWidth}`;
    const p3 = `${start.x + ux * diamondLen},${start.y + uy * diamondLen}`;
    const p4 = `${start.x + ux * (diamondLen / 2) - px * diamondWidth},${start.y + uy * (diamondLen / 2) - py * diamondWidth}`;

    lineStart = {
      x: start.x + ux * diamondLen,
      y: start.y + uy * diamondLen
    };

    const bgColor = theme === 'blueprint' 
      ? '#0F172A' 
      : theme === 'slate'
      ? '#1E293B'
      : theme === 'academic'
      ? '#FEFCE8'
      : '#FFFFFF';

    sourceMarker = (
      <polygon
        points={`${p1} ${p2} ${p3} ${p4}`}
        fill={bgColor}
        stroke={strokeColor}
        strokeWidth="1.75"
      />
    );
  } else if (relationship.type === 'generalization') {
    // Hollow triangle at TARGET end (pointing towards superclass)
    // Tip at end.x, end.y
    const tip = `${end.x},${end.y}`;
    const b1 = `${end.x - ux * arrowLen + px * arrowWidth},${end.y - uy * arrowLen + py * arrowWidth}`;
    const b2 = `${end.x - ux * arrowLen - px * arrowWidth},${end.y - uy * arrowLen - py * arrowWidth}`;

    lineEnd = {
      x: end.x - ux * arrowLen,
      y: end.y - uy * arrowLen
    };

    const bgColor = theme === 'blueprint' 
      ? '#0F172A' 
      : theme === 'slate'
      ? '#1E293B'
      : theme === 'academic'
      ? '#FEFCE8'
      : '#FFFFFF';

    targetMarker = (
      <polygon
        points={`${tip} ${b1} ${b2}`}
        fill={bgColor}
        stroke={strokeColor}
        strokeWidth="1.75"
      />
    );
  }

  // Multiplicity label positions
  const srcMultPos = {
    x: start.x + ux * 24 + px * 14,
    y: start.y + uy * 24 + py * 14
  };

  const tgtMultPos = {
    x: end.x - ux * 28 + px * 14,
    y: end.y - uy * 28 + py * 14
  };

  // Mid label offset
  const labelPos = {
    x: midPoint.x + px * 14,
    y: midPoint.y + py * 14
  };

  const textBgFill = theme === 'blueprint'
    ? 'rgba(15, 23, 42, 0.85)'
    : theme === 'slate'
    ? 'rgba(30, 41, 59, 0.85)'
    : theme === 'academic'
    ? 'rgba(254, 252, 232, 0.9)'
    : 'rgba(255, 255, 255, 0.9)';

  const textFill = theme === 'blueprint'
    ? '#93C5FD'
    : theme === 'slate'
    ? '#E2E8F0'
    : theme === 'academic'
    ? '#713F12'
    : '#334155';

  return (
    <g
      className="cursor-pointer transition-opacity duration-200"
      opacity={opacity}
      onClick={() => onSelect(relationship)}
    >
      {/* Invisible wider hit area for easy clicking */}
      <line
        x1={lineStart.x}
        y1={lineStart.y}
        x2={lineEnd.x}
        y2={lineEnd.y}
        stroke="transparent"
        strokeWidth="16"
      />

      {/* Actual visible UML connector line */}
      <line
        x1={lineStart.x}
        y1={lineStart.y}
        x2={lineEnd.x}
        y2={lineEnd.y}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={relationship.type === 'association' && isHighlighted ? '4 2' : undefined}
      />

      {/* Markers */}
      {sourceMarker}
      {targetMarker}

      {/* Source Multiplicity */}
      {relationship.sourceMultiplicity && (
        <text
          x={srcMultPos.x}
          y={srcMultPos.y}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-[11px] font-mono font-semibold select-none pointer-events-none"
          fill={textFill}
        >
          {relationship.sourceMultiplicity}
        </text>
      )}

      {/* Target Multiplicity */}
      {relationship.targetMultiplicity && (
        <text
          x={tgtMultPos.x}
          y={tgtMultPos.y}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-[11px] font-mono font-semibold select-none pointer-events-none"
          fill={textFill}
        >
          {relationship.targetMultiplicity}
        </text>
      )}

      {/* Label (if any) */}
      {relationship.label && (
        <g transform={`translate(${labelPos.x}, ${labelPos.y})`}>
          <rect
            x="-26"
            y="-10"
            width="52"
            height="20"
            rx="4"
            fill={textBgFill}
            stroke={strokeColor}
            strokeWidth="0.75"
          />
          <text
            x="0"
            y="0"
            textAnchor="middle"
            dominantBaseline="central"
            className="text-[11px] font-medium select-none pointer-events-none"
            fill={textFill}
          >
            {relationship.label}
          </text>
        </g>
      )}
    </g>
  );
};
