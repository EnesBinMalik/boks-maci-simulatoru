import { CombatStep, FighterData, MonteCarloResult, RingConfig } from '../types/boxing';

export interface SimulationResult {
  weightOk: boolean;
  firstAttacker: 'f1' | 'f2';
  randomFirstValue: number;
  steps: CombatStep[];
  allConsoleLogs: string[];
  winner: FighterData | null;
  totalRounds: number;
}

export function checkWeight(f1: FighterData, f2: FighterData, ring: RingConfig): boolean {
  return (
    f1.weight >= ring.minWeight &&
    f1.weight <= ring.maxWeight &&
    f2.weight >= ring.minWeight &&
    f2.weight <= ring.maxWeight
  );
}

export function runFullSimulation(
  initialF1: FighterData,
  initialF2: FighterData,
  ring: RingConfig
): SimulationResult {
  const f1: FighterData = { ...initialF1, health: initialF1.maxHealth };
  const f2: FighterData = { ...initialF2, health: initialF2.maxHealth };

  const weightOk = checkWeight(f1, f2, ring);
  const consoleLogs: string[] = [];

  if (!weightOk) {
    consoleLogs.push("Sporcuların ağırlıkları uyuşmuyor.");
    consoleLogs.push(`Kategori Limitleri: ${ring.minWeight} kg - ${ring.maxWeight} kg`);
    consoleLogs.push(`${f1.name}: ${f1.weight} kg | ${f2.name}: ${f2.weight} kg`);
    return {
      weightOk: false,
      firstAttacker: 'f1',
      randomFirstValue: 0,
      steps: [],
      allConsoleLogs: consoleLogs,
      winner: null,
      totalRounds: 0,
    };
  }

  // %50 Olasılıkla ilk vuranı belirleme (Ödev kuralı)
  const randomFirstValue = Math.random();
  const f1Starts = randomFirstValue <= 0.5;
  const firstAttacker: 'f1' | 'f2' = f1Starts ? 'f1' : 'f2';

  consoleLogs.push("==================================================");
  consoleLogs.push(
    `YAZI-TURA ATIŞI: İlk Vuruşu Yapan (%50 Şans): ${f1Starts ? f1.name : f2.name} (Rastgele Değer: ${randomFirstValue.toFixed(4)})`
  );
  consoleLogs.push("==================================================");

  const steps: CombatStep[] = [];
  let round = 1;
  let winner: FighterData | null = null;

  while (f1.health > 0 && f2.health > 0) {
    const roundLog: string[] = [];
    roundLog.push(`======== YENİ ROUND (${round}) ===========`);

    // Determine order for this round
    const order: Array<{ attacker: FighterData; defender: FighterData; subStep: 1 | 2 }> = f1Starts
      ? [
          { attacker: f1, defender: f2, subStep: 1 },
          { attacker: f2, defender: f1, subStep: 2 },
        ]
      : [
          { attacker: f2, defender: f1, subStep: 1 },
          { attacker: f1, defender: f2, subStep: 2 },
        ];

    for (const action of order) {
      if (f1.health <= 0 || f2.health <= 0) break;

      const { attacker, defender, subStep } = action;
      const stepLogs: string[] = [];
      stepLogs.push("------------");
      stepLogs.push(`${attacker.name} => ${defender.name} ${attacker.damage} hasar vurdu.`);

      const defenderHealthBefore = defender.health;
      let isDodged = false;

      // Dodge check: Math.random() * 100 <= dodge
      const dodgeRoll = Math.random() * 100;
      if (dodgeRoll <= defender.dodge) {
        isDodged = true;
        stepLogs.push(`${defender.name} gelen hasarı savurdu. (Zar: %${dodgeRoll.toFixed(1)} <= %${defender.dodge})`);
      } else {
        defender.health = Math.max(0, defender.health - attacker.damage);
      }

      const defenderHealthAfter = defender.health;
      const isGameOver = f1.health === 0 || f2.health === 0;
      let winnerName: string | null = null;

      if (isGameOver) {
        if (f1.health === 0) {
          winner = f2;
          winnerName = f2.name;
        } else {
          winner = f1;
          winnerName = f1.name;
        }
        stepLogs.push("----------------------------");
        stepLogs.push(`Maçı Kazanan : ${winnerName}`);
        stepLogs.push("----------------------------");
      }

      steps.push({
        round,
        subStep,
        attackerId: attacker.id,
        defenderId: defender.id,
        attackerName: attacker.name,
        defenderName: defender.name,
        damage: attacker.damage,
        isDodged,
        defenderHealthBefore,
        defenderHealthAfter,
        f1Health: f1.health,
        f2Health: f2.health,
        consoleLines: [...roundLog, ...stepLogs],
        isGameOver,
        winnerName,
      });

      consoleLogs.push(...roundLog);
      roundLog.length = 0; // Clear so only logged once per round
      consoleLogs.push(...stepLogs);

      if (isGameOver) break;
    }

    if (f1.health > 0 && f2.health > 0) {
      const scoreLogs = [
        "------------",
        `${f1.name} Kalan Can \t:${f1.health}`,
        `${f2.name} Kalan Can \t:${f2.health}`,
      ];
      consoleLogs.push(...scoreLogs);
    }

    round++;
    if (round > 50) break; // safeguard
  }

  return {
    weightOk: true,
    firstAttacker,
    randomFirstValue,
    steps,
    allConsoleLogs: consoleLogs,
    winner,
    totalRounds: round - 1,
  };
}

export function runMonteCarlo(
  f1: FighterData,
  f2: FighterData,
  ring: RingConfig,
  iterations: number = 100
): MonteCarloResult {
  let f1StartsCount = 0;
  let f2StartsCount = 0;
  let f1WinsCount = 0;
  let f2WinsCount = 0;
  let totalRounds = 0;
  let totalDodges = 0;

  for (let i = 0; i < iterations; i++) {
    const res = runFullSimulation(f1, f2, ring);
    if (!res.weightOk) break;

    if (res.firstAttacker === 'f1') f1StartsCount++;
    else f2StartsCount++;

    if (res.winner?.id === 'f1') f1WinsCount++;
    else if (res.winner?.id === 'f2') f2WinsCount++;

    totalRounds += res.totalRounds;
    totalDodges += res.steps.filter((s) => s.isDodged).length;
  }

  return {
    totalMatches: iterations,
    f1StartsCount,
    f2StartsCount,
    f1WinsCount,
    f2WinsCount,
    averageRounds: Number((totalRounds / iterations).toFixed(1)),
    totalDodges,
  };
}
