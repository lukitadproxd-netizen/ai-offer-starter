export type OfferReadinessInput = {
  customer?: string;
  pain?: string;
  outcome?: string;
  price?: number | string;
  delivery?: string;
  salesChannel?: string;
  claims?: string[];
  dependsOnSpam?: boolean;
};

export type OfferReadinessResult = {
  score: number;
  ready: boolean;
  passed: string[];
  missing: string[];
  warnings: string[];
};

const guaranteedIncomePattern = /\b(guarantee|guaranteed|garantizado|garantiza|asegurado|money printer|dinero facil|dinero fácil|hac[eé] dinero)\b/i;

function hasValue(value: unknown): boolean {
  if (typeof value === "number") return Number.isFinite(value) && value > 0;
  if (typeof value === "string") return value.trim().length >= 3;
  return false;
}

export function scoreOfferReadiness(input: OfferReadinessInput): OfferReadinessResult {
  const checks: Array<[string, boolean]> = [
    ["clear customer", hasValue(input.customer)],
    ["clear pain", hasValue(input.pain)],
    ["clear outcome", hasValue(input.outcome)],
    ["clear price", hasValue(input.price)],
    ["defined delivery", hasValue(input.delivery)],
    ["low hype risk", !(input.claims ?? []).some((claim) => guaranteedIncomePattern.test(claim))],
    ["defined sales channel", hasValue(input.salesChannel) && input.dependsOnSpam !== true]
  ];

  const passed = checks.filter(([, ok]) => ok).map(([name]) => name);
  const missing = checks.filter(([, ok]) => !ok).map(([name]) => name);
  const score = Math.round((passed.length / checks.length) * 100);
  const warnings: string[] = [];

  if ((input.claims ?? []).some((claim) => guaranteedIncomePattern.test(claim))) {
    warnings.push("Remove guaranteed income or magic outcome claims.");
  }

  if (input.dependsOnSpam) {
    warnings.push("Replace spam-dependent sales with permission-based outreach.");
  }

  return {
    score,
    ready: score >= 85 && warnings.length === 0,
    passed,
    missing,
    warnings
  };
}
