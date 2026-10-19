/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { BoxingRing } from './components/BoxingRing';
import { CombatControls } from './components/CombatControls';
import { TerminalConsole } from './components/TerminalConsole';
import { CoinFlipModal } from './components/CoinFlipModal';
import { FighterEditor } from './components/FighterEditor';
import { JavaCodeViewer } from './components/JavaCodeViewer';
import { MonteCarloSection } from './components/MonteCarloSection';
import { SignatureCard } from './components/SignatureCard';
import { FighterData, RingConfig, CombatStep } from './types/boxing';
import { runFullSimulation, SimulationResult, checkWeight } from './utils/simulationEngine';
import { soundManager } from './utils/audio';

// Default initial fighters matching the prompt
const DEFAULT_F1: FighterData = {
  id: 'f1',
  name: 'Marc',
  damage: 15,
  health: 100,
  maxHealth: 100,
  weight: 90,
  dodge: 20,
  color: '#2563eb',
  avatarSeed: 'marc',
};

const DEFAULT_F2: FighterData = {
  id: 'f2',
  name: 'Alex',
  damage: 10,
  health: 95,
  maxHealth: 95,
  weight: 100,
  dodge: 30,
  color: '#dc2626',
  avatarSeed: 'alex',
};

const DEFAULT_RING: RingConfig = {
  minWeight: 90,
  maxWeight: 100,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'ring' | 'code' | 'montecarlo' | 'author'>('ring');
  const [isMuted, setIsMuted] = useState(false);

  // Boxer & Ring settings
  const [f1, setF1] = useState<FighterData>(DEFAULT_F1);
  const [f2, setF2] = useState<FighterData>(DEFAULT_F2);
  const [ring, setRing] = useState<RingConfig>(DEFAULT_RING);

  // Modal states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [showCoinModal, setShowCoinModal] = useState(false);

  // Simulation execution state
  const [simResult, setSimResult] = useState<SimulationResult | null>(null);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(-1);
  const [isFighting, setIsFighting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "Boks Maçı Simülasyonu Hazır.",
    "Java Sınıfları Yüklendi: Fighter.class, Ring.class, Main.class",
    "Ödev Entegrasyonu: İlk vuran %50 olasılıkla isFirst() metodu ile belirlenecektir.",
    "Dövüşü başlatmak için 'Dövüşü Başlat' butonuna basın.",
  ]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isWeightValid = checkWeight(f1, f2, ring);

  // Current fighter health
  const lastStep: CombatStep | null =
    simResult && currentStepIdx >= 0 && currentStepIdx < simResult.steps.length
      ? simResult.steps[currentStepIdx]
      : null;

  const currentF1Health = lastStep ? lastStep.f1Health : f1.maxHealth;
  const currentF2Health = lastStep ? lastStep.f2Health : f2.maxHealth;
  const currentRound = lastStep ? lastStep.round : 1;
  const winner = isFinished && simResult ? simResult.winner : null;

  // Handle start simulation
  const handleStartMatch = () => {
    if (!isWeightValid) {
      setConsoleLogs([
        "Sporcuların ağırlıkları uyuşmuyor.",
        `Kategori: ${ring.minWeight} - ${ring.maxWeight} kg`,
        `${f1.name}: ${f1.weight} kg, ${f2.name}: ${f2.weight} kg`,
      ]);
      return;
    }

    // Pre-calculate full sequence
    const result = runFullSimulation(f1, f2, ring);
    setSimResult(result);
    setCurrentStepIdx(-1);
    setIsFinished(false);
    setIsPaused(false);

    // Initial logs for coin flip
    setConsoleLogs([
      "==================================================",
      `YAZI-TURA ATIŞI: İlk Vuruşu Yapan (%50 Şans): ${
        result.firstAttacker === 'f1' ? f1.name : f2.name
      } (Rastgele Değer: ${result.randomFirstValue.toFixed(4)})`,
      "==================================================",
    ]);

    soundManager.playCoinToss();
    setShowCoinModal(true);
  };

  // When user proceeds from coin flip modal
  const handleProceedFromCoin = () => {
    setShowCoinModal(false);
    setIsFighting(true);
    soundManager.playBell();
  };

  // Step advancement logic
  const advanceStep = () => {
    if (!simResult || !isFighting) return;

    setCurrentStepIdx((prevIdx) => {
      const nextIdx = prevIdx + 1;
      if (nextIdx >= simResult.steps.length) {
        // Combat is complete
        setIsFighting(false);
        setIsFinished(true);

        if (simResult.winner) {
          soundManager.playVictory();
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: simResult.winner.id === 'f1' ? ['#3b82f6', '#60a5fa', '#93c5fd'] : ['#ef4444', '#f87171', '#fca5a5'],
            });
          } catch {
            // Confetti fallback
          }
        }
        return prevIdx;
      }

      // Step sound effects
      const step = simResult.steps[nextIdx];
      if (step.isDodged) {
        soundManager.playDodge();
      } else {
        soundManager.playPunch();
      }

      // Append logs
      setConsoleLogs((prev) => [...prev, ...step.consoleLines]);

      // If game over at this step
      if (step.isGameOver) {
        setIsFighting(false);
        setIsFinished(true);
        soundManager.playVictory();
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
          });
        } catch {}
      }

      return nextIdx;
    });
  };

  // Automated playback loop
  useEffect(() => {
    if (isFighting && !isPaused && !isFinished) {
      const delay = Math.max(200, 900 / speed);
      timerRef.current = setTimeout(() => {
        advanceStep();
      }, delay);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isFighting, isPaused, isFinished, currentStepIdx, speed, simResult]);

  // Pause / Resume
  const handlePauseToggle = () => {
    setIsPaused((prev) => !prev);
  };

  // Fast forward to match conclusion
  const handleFastForward = () => {
    if (!simResult) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    setCurrentStepIdx(simResult.steps.length - 1);
    setIsFighting(false);
    setIsFinished(true);
    setConsoleLogs(simResult.allConsoleLogs);
    soundManager.playVictory();

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {}
  };

  // Reset match
  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsFighting(false);
    setIsPaused(false);
    setIsFinished(false);
    setCurrentStepIdx(-1);
    setSimResult(null);
    setConsoleLogs([
      "Simülasyon sıfırlandı.",
      "Yeni bir karşılaşma başlatmak için 'Dövüşü Başlat' butonuna basın.",
    ]);
  };

  // Handle saving new fighter settings
  const handleSaveFighters = (newF1: FighterData, newF2: FighterData, newRing: RingConfig) => {
    setF1(newF1);
    setF2(newF2);
    setRing(newRing);
    handleReset();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onQuickStart={handleStartMatch}
        isMatchRunning={isFighting}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Tab 1: Ring & Simulation */}
        {activeTab === 'ring' && (
          <div className="space-y-6">
            {/* Top Info Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-xl px-5 py-3.5 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-white">
                  Java 101 Boks Maçı Simülasyonu
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-amber-400 font-mono">
                  isFirst() = Math.random() &lt;= 0.5 (%50 Şans)
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Hazırlayan: <span className="text-slate-200 font-semibold">Enes Öztürk</span>
              </div>
            </div>

            {/* Arena Grid: Left Stage (Ring + Controls), Right Stage (Terminal Console) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Visual Ring & Controls */}
              <div className="lg:col-span-7 space-y-4">
                <BoxingRing
                  f1={f1}
                  f2={f2}
                  f1Health={currentF1Health}
                  f2Health={currentF2Health}
                  currentRound={currentRound}
                  lastStep={lastStep}
                  winner={winner}
                  isFighting={isFighting}
                  firstAttacker={simResult?.firstAttacker || null}
                />

                <CombatControls
                  isFighting={isFighting}
                  isPaused={isPaused}
                  isFinished={isFinished}
                  speed={speed}
                  weightMismatch={!isWeightValid}
                  onStart={handleStartMatch}
                  onPauseToggle={handlePauseToggle}
                  onNextStep={advanceStep}
                  onFastForward={handleFastForward}
                  onReset={handleReset}
                  onSpeedChange={setSpeed}
                  onOpenEditor={() => setIsEditorOpen(true)}
                />
              </div>

              {/* Right Column: Real-time Java Terminal Output */}
              <div className="lg:col-span-5 space-y-4">
                <TerminalConsole
                  logs={consoleLogs}
                  onClear={() => setConsoleLogs([])}
                />

                {/* Quick Info Pill-free card */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-400 space-y-2">
                  <div className="font-bold text-slate-200 flex items-center justify-between">
                    <span>Sıklet & Ring Kuralları</span>
                    <span className="font-mono text-amber-400">{ring.minWeight} - {ring.maxWeight} kg</span>
                  </div>
                  <p className="leading-relaxed">
                    Ring sınıfının <code className="text-amber-300">checkWeight()</code> metodu sporcuların ağırlıklarını kontrol eder.
                    Her iki boksörün ağırlığı da ring sınırları içerisindeyse maç başlar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Java Source Code */}
        {activeTab === 'code' && <JavaCodeViewer />}

        {/* Tab 3: Monte Carlo 50% Probability Analysis */}
        {activeTab === 'montecarlo' && <MonteCarloSection f1={f1} f2={f2} ring={ring} />}

        {/* Tab 4: Author Signature & Homework Verification */}
        {activeTab === 'author' && <SignatureCard />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Boks Maçı Simülatörü · Java OOP Ödev Çözümü</span>
          <span className="text-slate-400 font-semibold">Hazırlayan: Enes Öztürk</span>
        </div>
      </footer>

      {/* Coin Flip Modal for 50% Chance */}
      {simResult && (
        <CoinFlipModal
          isOpen={showCoinModal}
          f1={f1}
          f2={f2}
          winnerFirst={simResult.firstAttacker}
          randomValue={simResult.randomFirstValue}
          onProceed={handleProceedFromCoin}
        />
      )}

      {/* Boxer & Ring Settings Drawer / Modal */}
      <FighterEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        f1={f1}
        f2={f2}
        ring={ring}
        onSave={handleSaveFighters}
      />
    </div>
  );
}
