export interface FighterData {
  id: 'f1' | 'f2';
  name: string;
  damage: number;
  health: number;
  maxHealth: number;
  weight: number;
  dodge: number; // 0 to 100 percent
  color: string;
  avatarSeed: string;
}

export interface RingConfig {
  minWeight: number;
  maxWeight: number;
}

export interface CombatStep {
  round: number;
  subStep: 1 | 2; // 1 = first punch, 2 = second punch
  attackerId: 'f1' | 'f2';
  defenderId: 'f1' | 'f2';
  attackerName: string;
  defenderName: string;
  damage: number;
  isDodged: boolean;
  defenderHealthBefore: number;
  defenderHealthAfter: number;
  f1Health: number;
  f2Health: number;
  consoleLines: string[];
  isGameOver: boolean;
  winnerName: string | null;
}

export interface MatchState {
  status: 'idle' | 'flipping_coin' | 'fighting' | 'finished' | 'weight_mismatch';
  f1: FighterData;
  f2: FighterData;
  ring: RingConfig;
  firstAttacker: 'f1' | 'f2' | null;
  randomFirstValue: number | null; // e.g. 0.42
  currentRound: number;
  currentStepIndex: number;
  allSteps: CombatStep[];
  consoleLogs: string[];
  winner: FighterData | null;
}

export interface MonteCarloResult {
  totalMatches: number;
  f1StartsCount: number;
  f2StartsCount: number;
  f1WinsCount: number;
  f2WinsCount: number;
  averageRounds: number;
  totalDodges: number;
}
