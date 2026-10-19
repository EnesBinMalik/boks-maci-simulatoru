import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, Scale, Trophy, Flame } from 'lucide-react';
import { CombatStep, FighterData } from '../types/boxing';

interface BoxingRingProps {
  f1: FighterData;
  f2: FighterData;
  f1Health: number;
  f2Health: number;
  currentRound: number;
  lastStep: CombatStep | null;
  winner: FighterData | null;
  isFighting: boolean;
  firstAttacker: 'f1' | 'f2' | null;
}

export const BoxingRing: React.FC<BoxingRingProps> = ({
  f1,
  f2,
  f1Health,
  f2Health,
  currentRound,
  lastStep,
  winner,
  isFighting,
  firstAttacker,
}) => {
  const f1Percent = Math.max(0, Math.min(100, (f1Health / f1.maxHealth) * 100));
  const f2Percent = Math.max(0, Math.min(100, (f2Health / f2.maxHealth) * 100));

  // Determine current puncher / defender state
  const isF1Attacking = lastStep?.attackerId === 'f1' && isFighting;
  const isF2Attacking = lastStep?.attackerId === 'f2' && isFighting;
  const isF1Dodging = lastStep?.defenderId === 'f1' && lastStep.isDodged;
  const isF2Dodging = lastStep?.defenderId === 'f2' && lastStep.isDodged;
  const isF1Hit = lastStep?.defenderId === 'f1' && !lastStep.isDodged && isFighting;
  const isF2Hit = lastStep?.defenderId === 'f2' && !lastStep.isDodged && isFighting;

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* HUD: Top Fighter Health Bars & Round Indicator */}
      <div className="p-4 sm:p-6 bg-slate-950/80 border-b border-slate-800">
        <div className="grid grid-cols-12 gap-3 sm:gap-6 items-center">
          {/* Fighter 1 (Blue Corner) */}
          <div className="col-span-5 flex flex-col">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                <span className="font-bold text-sm sm:text-base text-white truncate">{f1.name}</span>
                {firstAttacker === 'f1' && (
                  <span className="hidden sm:inline-block text-[11px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                    1. Vuruş
                  </span>
                )}
              </div>
              <span className="font-mono text-xs sm:text-sm font-bold text-blue-400 tabular-nums">
                {f1Health} <span className="text-slate-500 font-normal">/ {f1.maxHealth}</span>
              </span>
            </div>

            {/* Health Bar */}
            <div className="h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <motion.div
                initial={false}
                animate={{ width: `${f1Percent}%` }}
                transition={{ duration: 0.3 }}
                className={`h-full rounded-full transition-colors ${
                  f1Percent > 50
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-400'
                    : f1Percent > 20
                    ? 'bg-gradient-to-r from-amber-600 to-amber-400'
                    : 'bg-gradient-to-r from-red-600 to-rose-400'
                }`}
              />
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1" title="Vuruş Hasarı">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>{f1.damage} Hasar</span>
              </span>
              <span className="flex items-center gap-1" title="Savurma Oranı">
                <Shield className="w-3 h-3 text-cyan-400" />
                <span>%{f1.dodge} Savurma</span>
              </span>
              <span className="hidden sm:flex items-center gap-1" title="Ağırlık">
                <Scale className="w-3 h-3 text-slate-400" />
                <span>{f1.weight} kg</span>
              </span>
            </div>
          </div>

          {/* Center: Round / VS Badge */}
          <div className="col-span-2 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-400">
              {winner ? 'BİTTİ' : 'ROUND'}
            </span>
            <span className="text-lg sm:text-2xl font-black text-amber-400 tabular-nums">
              {winner ? 'KO' : Math.max(1, currentRound)}
            </span>
          </div>

          {/* Fighter 2 (Red Corner) */}
          <div className="col-span-5 flex flex-col text-right">
            <div className="flex items-center justify-between gap-2 mb-1.5 flex-row-reverse">
              <div className="flex items-center gap-2 truncate flex-row-reverse">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                <span className="font-bold text-sm sm:text-base text-white truncate">{f2.name}</span>
                {firstAttacker === 'f2' && (
                  <span className="hidden sm:inline-block text-[11px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                    1. Vuruş
                  </span>
                )}
              </div>
              <span className="font-mono text-xs sm:text-sm font-bold text-rose-400 tabular-nums">
                {f2Health} <span className="text-slate-500 font-normal">/ {f2.maxHealth}</span>
              </span>
            </div>

            {/* Health Bar (Reversed direction for symmetry) */}
            <div className="h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50 flex justify-end">
              <motion.div
                initial={false}
                animate={{ width: `${f2Percent}%` }}
                transition={{ duration: 0.3 }}
                className={`h-full rounded-full transition-colors ${
                  f2Percent > 50
                    ? 'bg-gradient-to-l from-rose-600 to-red-400'
                    : f2Percent > 20
                    ? 'bg-gradient-to-l from-amber-600 to-amber-400'
                    : 'bg-gradient-to-l from-red-600 to-rose-400'
                }`}
              />
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-end gap-3 mt-1.5 text-[11px] text-slate-400 font-mono">
              <span className="hidden sm:flex items-center gap-1" title="Ağırlık">
                <span>{f2.weight} kg</span>
                <Scale className="w-3 h-3 text-slate-400" />
              </span>
              <span className="flex items-center gap-1" title="Savurma Oranı">
                <span>%{f2.dodge} Savurma</span>
                <Shield className="w-3 h-3 text-cyan-400" />
              </span>
              <span className="flex items-center gap-1" title="Vuruş Hasarı">
                <span>{f2.damage} Hasar</span>
                <Zap className="w-3 h-3 text-amber-400" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* The Boxing Ring Arena Floor */}
      <div className="relative h-72 sm:h-96 w-full bg-radial from-slate-800/60 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden select-none">
        {/* Overhead Arena Spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Ring Ropes Canvas Background (Isometric Perspective) */}
        <div className="absolute inset-x-8 sm:inset-x-16 bottom-10 h-44 sm:h-56 border-b-4 border-slate-700 rounded-3xl pointer-events-none opacity-60">
          {/* Ring Floor Grid */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent rounded-3xl" />
          {/* Ring Ropes Top, Mid, Low */}
          <div className="absolute top-6 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-amber-400 to-red-500 opacity-70" />
          <div className="absolute top-16 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-amber-400 to-red-500 opacity-70" />
          <div className="absolute top-28 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-amber-400 to-red-500 opacity-70" />

          {/* Corner Turnbuckles */}
          <div className="absolute -top-2 -left-2 w-4 h-40 bg-blue-600 rounded-sm shadow-lg shadow-blue-500/50" />
          <div className="absolute -top-2 -right-2 w-4 h-40 bg-rose-600 rounded-sm shadow-lg shadow-rose-500/50" />
        </div>

        {/* Floating Combat Feedback Badges */}
        <AnimatePresence>
          {lastStep && (
            <div className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none z-30">
              {lastStep.isDodged ? (
                <motion.div
                  key={`dodge-${lastStep.round}-${lastStep.subStep}`}
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="px-3 py-1 bg-cyan-950/90 border border-cyan-400 text-cyan-300 rounded-lg font-mono text-xs font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>{lastStep.defenderName} SAVURDU! (0 HASAR)</span>
                </motion.div>
              ) : (
                <motion.div
                  key={`hit-${lastStep.round}-${lastStep.subStep}`}
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="px-3 py-1 bg-rose-950/90 border border-rose-500 text-rose-200 rounded-lg font-mono text-xs font-bold shadow-lg shadow-rose-500/20 flex items-center gap-1.5"
                >
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span>
                    {lastStep.attackerName} {lastStep.damage} HASAR VURDU!
                  </span>
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>

        {/* Fighters Stage */}
        <div className="relative z-20 w-full max-w-xl flex items-end justify-between px-6 sm:px-16 pb-12 sm:pb-14">
          {/* Fighter 1 (Blue Corner Sprite) */}
          <div className="relative flex flex-col items-center">
            {/* Impact Flash or Floating Damage */}
            <AnimatePresence>
              {isF1Hit && (
                <motion.div
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 1, y: -40, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-6 text-red-400 font-mono font-black text-xl z-30"
                >
                  -{lastStep?.damage} HP
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              animate={{
                x: isF1Attacking ? 70 : isF1Dodging ? -30 : isF1Hit ? -15 : 0,
                rotate: isF1Hit ? -8 : f1Health <= 0 ? -90 : 0,
                y: f1Health <= 0 ? 50 : 0,
                opacity: f1Health <= 0 ? 0.7 : 1,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="relative cursor-default"
            >
              {/* Boxer 1 Vector Graphic */}
              <svg
                width="110"
                height="150"
                viewBox="0 0 110 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)]"
              >
                {/* Shadow */}
                <ellipse cx="55" cy="142" rx="36" ry="7" fill="black" fillOpacity="0.4" />
                {/* Legs */}
                <rect x="38" y="98" width="12" height="42" rx="5" fill="#e2b18a" />
                <rect x="60" y="98" width="12" height="42" rx="5" fill="#e2b18a" />
                {/* Boxing Boots */}
                <rect x="36" y="132" width="16" height="10" rx="3" fill="#1e293b" />
                <rect x="58" y="132" width="16" height="10" rx="3" fill="#1e293b" />
                {/* Shorts (Blue) */}
                <path d="M32 78 H78 L74 102 H58 L55 90 L52 102 H36 Z" fill="#2563eb" />
                <rect x="32" y="76" width="46" height="5" fill="#60a5fa" rx="2" />
                {/* Torso & Muscle */}
                <path
                  d="M36 40 C36 36 74 36 74 40 L70 80 H40 Z"
                  fill="#e2b18a"
                />
                {/* Head */}
                <circle cx="55" cy="24" r="14" fill="#e2b18a" />
                {/* Hair */}
                <path d="M43 22 C43 12 67 12 67 22 Z" fill="#451a03" />
                {/* Face feature */}
                <circle cx="60" cy="23" r="2" fill="#0f172a" />
                {/* Mouthguard */}
                <rect x="57" y="29" width="6" height="2" fill="#ffffff" rx="1" />
                {/* Arms & Left Glove */}
                <path d="M36 42 L24 55 L38 65" stroke="#e2b18a" strokeWidth="8" strokeLinecap="round" />
                {/* Extended Right Arm / Glove (Lunges on attack) */}
                {isF1Attacking ? (
                  <g>
                    <path d="M68 45 L95 45" stroke="#e2b18a" strokeWidth="9" strokeLinecap="round" />
                    <circle cx="102" cy="45" r="11" fill="#3b82f6" />
                    <circle cx="102" cy="45" r="8" fill="#1d4ed8" />
                  </g>
                ) : (
                  <g>
                    <path d="M64 45 L78 58 L70 66" stroke="#e2b18a" strokeWidth="8" strokeLinecap="round" />
                    <circle cx="70" cy="65" r="9" fill="#2563eb" />
                    <circle cx="38" cy="65" r="8" fill="#1d4ed8" />
                  </g>
                )}
              </svg>
            </motion.div>

            {/* Corner Base Label */}
            <span className="mt-1 text-xs font-bold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/30">
              {f1.name} (Mavi)
            </span>
          </div>

          {/* Versus Center Spark or Winner Spotlight */}
          <div className="flex flex-col items-center justify-center pb-8">
            {winner ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center gap-1 bg-amber-500/20 border border-amber-500/40 px-4 py-2 rounded-xl text-center shadow-lg backdrop-blur-sm"
              >
                <Trophy className="w-6 h-6 text-amber-400" />
                <span className="text-xs uppercase font-mono font-bold tracking-wider text-amber-300">
                  ŞAMPİYON
                </span>
                <span className="text-sm font-black text-white">{winner.name}</span>
              </motion.div>
            ) : (
              <div className="font-black text-slate-700/60 text-3xl font-mono select-none">
                VS
              </div>
            )}
          </div>

          {/* Fighter 2 (Red Corner Sprite) */}
          <div className="relative flex flex-col items-center">
            {/* Impact Flash or Floating Damage */}
            <AnimatePresence>
              {isF2Hit && (
                <motion.div
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 1, y: -40, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-6 text-red-400 font-mono font-black text-xl z-30"
                >
                  -{lastStep?.damage} HP
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              animate={{
                x: isF2Attacking ? -70 : isF2Dodging ? 30 : isF2Hit ? 15 : 0,
                rotate: isF2Hit ? 8 : f2Health <= 0 ? 90 : 0,
                y: f2Health <= 0 ? 50 : 0,
                opacity: f2Health <= 0 ? 0.7 : 1,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="relative cursor-default"
            >
              {/* Boxer 2 Vector Graphic (Flipped horizontally) */}
              <svg
                width="110"
                height="150"
                viewBox="0 0 110 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)] scale-x-[-1]"
              >
                {/* Shadow */}
                <ellipse cx="55" cy="142" rx="36" ry="7" fill="black" fillOpacity="0.4" />
                {/* Legs */}
                <rect x="38" y="98" width="12" height="42" rx="5" fill="#d49b6a" />
                <rect x="60" y="98" width="12" height="42" rx="5" fill="#d49b6a" />
                {/* Boxing Boots */}
                <rect x="36" y="132" width="16" height="10" rx="3" fill="#0f172a" />
                <rect x="58" y="132" width="16" height="10" rx="3" fill="#0f172a" />
                {/* Shorts (Red) */}
                <path d="M32 78 H78 L74 102 H58 L55 90 L52 102 H36 Z" fill="#dc2626" />
                <rect x="32" y="76" width="46" height="5" fill="#f87171" rx="2" />
                {/* Torso & Muscle */}
                <path
                  d="M36 40 C36 36 74 36 74 40 L70 80 H40 Z"
                  fill="#d49b6a"
                />
                {/* Head */}
                <circle cx="55" cy="24" r="14" fill="#d49b6a" />
                {/* Hair */}
                <path d="M43 22 C43 12 67 12 67 22 Z" fill="#171717" />
                {/* Face feature */}
                <circle cx="60" cy="23" r="2" fill="#0f172a" />
                {/* Mouthguard */}
                <rect x="57" y="29" width="6" height="2" fill="#ffffff" rx="1" />
                {/* Arms & Left Glove */}
                <path d="M36 42 L24 55 L38 65" stroke="#d49b6a" strokeWidth="8" strokeLinecap="round" />
                {/* Extended Right Arm / Glove (Lunges on attack) */}
                {isF2Attacking ? (
                  <g>
                    <path d="M68 45 L95 45" stroke="#d49b6a" strokeWidth="9" strokeLinecap="round" />
                    <circle cx="102" cy="45" r="11" fill="#ef4444" />
                    <circle cx="102" cy="45" r="8" fill="#b91c1c" />
                  </g>
                ) : (
                  <g>
                    <path d="M64 45 L78 58 L70 66" stroke="#d49b6a" strokeWidth="8" strokeLinecap="round" />
                    <circle cx="70" cy="65" r="9" fill="#dc2626" />
                    <circle cx="38" cy="65" r="8" fill="#991b1b" />
                  </g>
                )}
              </svg>
            </motion.div>

            {/* Corner Base Label */}
            <span className="mt-1 text-xs font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30">
              {f2.name} (Kırmızı)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
