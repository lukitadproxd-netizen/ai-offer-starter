export type PricingInput = {
  baseSetupFee: number;
  baseMonthlyFee?: number;
  currency?: string;
  includeRecurring?: boolean;
};

export type PricingTier = {
  name: "beta" | "standard" | "pro";
  setupFee: number;
  monthlyFee: number;
  description: string;
};

export type UnitEconomicsInput = {
  setupFee: number;
  monthlyFee?: number;
  estimatedDeliveryHours: number;
  recurringHoursPerMonth?: number;
  minimumHealthyHourlyRate?: number;
};

export type UnitEconomicsResult = {
  setupRevenue: number;
  monthlyRevenue: number;
  estimatedDeliveryHours: number;
  hourlyEquivalent: number;
  warnings: string[];
};

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

export function generatePricingTiers(input: PricingInput): PricingTier[] {
  if (!Number.isFinite(input.baseSetupFee) || input.baseSetupFee <= 0) {
    throw new Error("baseSetupFee must be a positive number.");
  }

  const baseMonthlyFee = input.includeRecurring === false ? 0 : Math.max(0, input.baseMonthlyFee ?? input.baseSetupFee * 0.25);

  return [
    {
      name: "beta",
      setupFee: roundMoney(input.baseSetupFee * 0.6),
      monthlyFee: roundMoney(baseMonthlyFee * 0.5),
      description: "Discounted pilot for a narrow scope, limited revisions, and explicit feedback."
    },
    {
      name: "standard",
      setupFee: roundMoney(input.baseSetupFee),
      monthlyFee: roundMoney(baseMonthlyFee),
      description: "Core offer with the normal delivery process, QA, handoff, and support window."
    },
    {
      name: "pro",
      setupFee: roundMoney(input.baseSetupFee * 1.8),
      monthlyFee: roundMoney(baseMonthlyFee * 1.75),
      description: "Expanded scope with priority delivery, deeper customization, and recurring improvement."
    }
  ];
}

export function calculateSimpleUnitEconomics(input: UnitEconomicsInput): UnitEconomicsResult {
  if (!Number.isFinite(input.setupFee) || input.setupFee < 0) {
    throw new Error("setupFee must be zero or greater.");
  }

  if (!Number.isFinite(input.estimatedDeliveryHours) || input.estimatedDeliveryHours <= 0) {
    throw new Error("estimatedDeliveryHours must be a positive number.");
  }

  const monthlyRevenue = Math.max(0, input.monthlyFee ?? 0);
  const recurringHours = Math.max(0, input.recurringHoursPerMonth ?? 0);
  const totalHours = input.estimatedDeliveryHours + recurringHours;
  const hourlyEquivalent = roundMoney((input.setupFee + monthlyRevenue) / totalHours);
  const minimumHealthyHourlyRate = input.minimumHealthyHourlyRate ?? 30;
  const warnings: string[] = [];

  if (hourlyEquivalent < minimumHealthyHourlyRate) {
    warnings.push("The hourly equivalent is low; this may become underpriced freelancing.");
  }

  if (monthlyRevenue > 0 && recurringHours === 0) {
    warnings.push("Monthly revenue has no recurring hours estimate; add support or improvement time.");
  }

  return {
    setupRevenue: roundMoney(input.setupFee),
    monthlyRevenue: roundMoney(monthlyRevenue),
    estimatedDeliveryHours: roundMoney(totalHours),
    hourlyEquivalent,
    warnings
  };
}
