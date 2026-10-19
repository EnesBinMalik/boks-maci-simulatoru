export interface EmployeeData {
  id: string;
  name: string;
  salary: number;
  workHours: number;
  hireYear: number;
}

export interface EmployeeCalculations {
  tax: number;
  bonus: number;
  raiseSalary: number;
  salaryWithTaxAndBonus: number;
  totalSalary: number;
  yearsWorked: number;
  overtimeHours: number;
  taxRatePercent: number;
  raiseRatePercent: number;
}

export const CURRENT_YEAR = 2021;

export function calculateEmployee(emp: EmployeeData): EmployeeCalculations {
  const salary = Number(emp.salary) || 0;
  const workHours = Number(emp.workHours) || 0;
  const hireYear = Number(emp.hireYear) || CURRENT_YEAR;

  // 1. tax(): Maaşa uygulanan vergi
  // Maaş < 1000 TL ise vergi yok, > 1000 TL ise %3 vergi
  let tax = 0;
  let taxRatePercent = 0;
  if (salary > 1000) {
    taxRatePercent = 3;
    tax = salary * 0.03;
  }

  // 2. bonus(): Haftada 40 saatten fazla çalışılmışsa saat başı 30 TL
  const overtimeHours = workHours > 40 ? workHours - 40 : 0;
  const bonus = overtimeHours * 30;

  // 3. raiseSalary(): İşe başlangıç yılına göre zam hesabı (Mevcut yıl: 2021)
  const yearsWorked = Math.max(0, CURRENT_YEAR - hireYear);
  let raiseRatePercent = 0;
  if (yearsWorked < 10) {
    raiseRatePercent = 5;
  } else if (yearsWorked < 20) {
    // 9 yıldan fazla ve 20 yıldan az (10 - 19 yıl arası)
    raiseRatePercent = 10;
  } else {
    // 19 yıldan fazla (20 yıl ve üzeri)
    raiseRatePercent = 15;
  }
  const raiseSalary = salary * (raiseRatePercent / 100);

  // 4. Vergi ve Bonuslar ile birlikte maaş = salary - tax + bonus
  const salaryWithTaxAndBonus = salary - tax + bonus;

  // 5. Toplam Maaş = salary + raiseSalary + bonus - tax
  const totalSalary = salary + raiseSalary + bonus - tax;

  return {
    tax,
    bonus,
    raiseSalary,
    salaryWithTaxAndBonus,
    totalSalary,
    yearsWorked,
    overtimeHours,
    taxRatePercent,
    raiseRatePercent,
  };
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('tr-TR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }) + ' TL';
}

export function formatRawNumber(amount: number): string {
  // Format as Java double output, e.g. 2000.0
  return amount.toFixed(1);
}
