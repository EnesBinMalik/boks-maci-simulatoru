import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Dices } from 'lucide-react';
import { FighterData } from '../types/boxing';

interface CoinFlipModalProps {
  isOpen: boolean;
  f1: FighterData;
  f2: FighterData;
  winnerFirst: 'f1' | 'f2';
  randomValue: number;
  onProceed: () => void;
}

export const CoinFlipModal: React.FC<CoinFlipModalProps> = ({
  isOpen,
  f1,
  f2,
  winnerFirst,
  randomValue,
  onProceed,
}) => {
  const [stage, setStage] = useState<'flipping' | 'revealed'>('flipping');

  useEffect(() => {
    if (isOpen) {
      setStage('flipping');
      const timer = setTimeout(() => {
        setStage('revealed');
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const firstFighter = winnerFirst === 'f1' ? f1 : f2;
  const isF1 = winnerFirst === 'f1';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-center relative overflow-hidden"
        >
          {/* Subtle glow accent */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <Dices className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white tracking-tight">
              Yazı-Tura Atışı (%50 Olasılık)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-6">
            Ödev Şartı: İlk yumruğu kimin vuracağı %50 şans ile belirlenir.
          </p>

          {/* Animated Coin */}
          <div className="h-32 flex items-center justify-center my-4">
            {stage === 'flipping' ? (
              <motion.div
                animate={{
                  rotateY: [0, 1800],
                  scale: [1, 1.25, 1],
                }}
                transition={{
                  duration: 1.6,
                  ease: 'easeInOut',
                }}
                className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 border-4 border-amber-300 shadow-lg shadow-amber-500/20 flex items-center justify-center text-slate-950 font-black text-2xl"
              >
                ?
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.5, rotateY: 90 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                className={`w-28 h-28 rounded-full border-4 shadow-xl flex flex-col items-center justify-center p-2 ${
                  isF1
                    ? 'bg-blue-950/90 border-blue-500 text-blue-300 shadow-blue-500/30'
                    : 'bg-red-950/90 border-red-500 text-red-300 shadow-red-500/30'
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">İlk Vuran</span>
                <span className="text-xl font-bold truncate max-w-full px-1">{firstFighter.name}</span>
                <span className="text-[10px] font-mono opacity-80 mt-0.5">
                  {isF1 ? 'Mavi Köşe' : 'Kırmızı Köşe'}
                </span>
              </motion.div>
            )}
          </div>

          {/* Math breakdown */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 mb-6 text-left font-mono text-xs text-slate-300 space-y-1">
            <div className="flex justify-between items-center text-slate-400">
              <span>Java İfadesi:</span>
              <span className="text-amber-400 font-semibold">Math.random() &lt;= 0.5</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Üretilen Rastgele Değer:</span>
              <span className="text-emerald-400 font-bold tabular-nums">
                {randomValue.toFixed(5)}
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Karar:</span>
              <span>
                {randomValue <= 0.5 ? (
                  <span className="text-blue-400 font-semibold">{f1.name} (≤ 0.50)</span>
                ) : (
                  <span className="text-red-400 font-semibold">{f2.name} (&gt; 0.50)</span>
                )}
              </span>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={onProceed}
            className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-98"
          >
            <span>Ringde Dövüşü Başlat</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
